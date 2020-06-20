import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FileService } from 'src/shared/services/file.service';
import { DocumentType } from 'src/shared/models/DocumentType';
import { FileModel } from 'src/shared/models/FileModel';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class FileUploadModalComponent implements OnInit {
  loading: Boolean = false;
  filesLengthWarning: Boolean = false;
  selectedFiles: FileList;
  companies: string[] = [];
  workplaces: string[] = [];
  form: FormGroup;
  filter: string = "";
  filteredCompanies: Observable<string[]>;
  filteredWorkplaces: Observable<string[]>;
  types: Array<any> = Object.values(DocumentType);

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    public fileService: FileService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadDataFromApi();
    this.form = this.formBuilder.group({
      formArray: this.formBuilder.array([])
    })
  }

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    await this.fileService.upload(this.fileObjects)
    this.close();
    this.loading = false;
  }

  close() {
    this.dialog.closeAll();
  }

  addFiles(files) {
    this.filesLengthWarning = false;
    if ((files.length + this.formArray.length) > 100) {
      this.filesLengthWarning = true;
      return;
    }
    console.time("time")
    for (let index = 0, len = files.length; index < len; ++index) {
      let fileObject = new FileModel();
      fileObject.name = files[index].name;
      fileObject.size = files[index].size;
      fileObject.type = files[index].type;
      fileObject.folderId = this.injectedData.folderId;
      this.formArray.push(this.formBuilder.group(fileObject));
      this.filteredCompanies = this.formArray.at(index).get('company').valueChanges.pipe(startWith(''), map(value => this.filterCompanies(value)))
      this.filteredWorkplaces = this.formArray.at(index).get('workplace').valueChanges.pipe(startWith(''), map(value => this.filterWorkplaces(value)))

      let reader = new FileReader();
      //appelle cette fonction quand readAsArrayBuffer est fini
      reader.onload = () => {
        // converti reader.result en base64
        this.formArray.at(index).patchValue({
          fileContent: btoa(
            new Uint8Array(reader.result as ArrayBuffer)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
        });
        console.log("fin reader")
      }
      //prend le blob et le converti en tableau binaire dans reader.result
      reader.readAsArrayBuffer(files[index]);
    }
    console.timeEnd("time")
  }

  deleteFileObjectByIndex(index) {
    this.formArray.removeAt(index);
  }

  loadDataFromApi() {
    this.fileService.getCompanies().subscribe(
      data => {
        this.companies = data;
      }
    )

    this.fileService.getWorkplaces().subscribe(
      data => {
        this.workplaces = data;
      }
    )
  }

  applyToAllCompanies(event, company: string) {
    this.stopPropagation(event)
    if(!company) return null;
    for (let i = 0; i < this.fileObjects.length; i++) {
      this.formArray.at(i).patchValue({ company: company })
    }
  }

  applyToAllWorkplaces(event, workplace: string) {
    this.stopPropagation(event)
    if(!workplace) return null;
    for (let i = 0; i < this.fileObjects.length; i++) {
      this.formArray.at(i).patchValue({ workplace: workplace })
    }
  }

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  get formArray() {
    return this.form.get('formArray') as FormArray;
  }

  get fileObjects() {
    return this.formArray.value as FileModel[];
  }

  isSelectedFichePaie(index) {
    return this.fileObjects[index].documentType === DocumentType.FichePaie;
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number) {
    datepicker.close();
    this.formArray.at(index).patchValue({ documentDate: normalizedMonth.toDate() });
  }

  private filterCompanies(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companies.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterWorkplaces(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.workplaces.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
