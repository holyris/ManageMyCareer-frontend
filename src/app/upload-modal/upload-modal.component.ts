import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/shared/services/file.service';
import { EnumTypeValue } from 'src/shared/models/EnumTypeValue.model';
import { FileModel } from 'src/shared/models/FileModel';
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { startWith, map } from 'rxjs/operators';

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
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class UploadModalComponent implements OnInit {
  @ViewChild('uploadFileComponent') uploadFileComponent: any;
  loading: Boolean = false;
  companies: string[] = ['Acta DS', 'ISIR', 'Google', 'Facebook'];
  workplaces: string[] = ['Manager', 'Developpeur', 'Caissier', 'Croque-mort'];
  form: FormGroup;
  filteredCompanies: Observable<string[]>;
  filteredWorkplaces: Observable<string[]>;
  types: Array<any> = [
    {
      label: EnumTypeValue.FichePaie,
      value: EnumTypeValue.FichePaie
    },
    {
      label: EnumTypeValue.Contrat,
      value: EnumTypeValue.Contrat
    },
    {
      label: EnumTypeValue.Cv,
      value: EnumTypeValue.Cv
    },
    {
      label: EnumTypeValue.Lettre,
      value: EnumTypeValue.Lettre
    },
    {
      label: EnumTypeValue.Autre,
      value: EnumTypeValue.Autre
    }
  ];

  constructor(
    public fileService: FileService,
    public fileUploadEventService: FileUploadEventService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadDataFromApi();
    this.form = this.formBuilder.group({
      formArray: this.formBuilder.array([])
    })
  }

  async submit() {
    this.loading = true;
    await this.fileService.upload(this.fileObjects)
    this.fileUploadEventService.filesUploaded()
    this.loading = false;
    this.close();
    console.log(this.fileObjects);
  }

  close() {
    this.dialog.closeAll();
  }

  addFiles(event) {
    for (let [index, file] of event.files.entries()) {
      let fileObject = new FileModel();
      fileObject.name = file.name;
      fileObject.size = file.size;
      fileObject.type = file.type;
      this.formArray.push(this.formBuilder.group(fileObject));
      this.filteredCompanies = this.formArray.at(index).get('company').valueChanges.pipe(startWith(''), map(value => this.filterCompanies(value)))
      this.filteredWorkplaces = this.formArray.at(index).get('workplace').valueChanges.pipe(startWith(''), map(value => this.filterWorkplaces(value)))

      let reader = new FileReader();
      //appelle cette fonction quand readAsArrayBuffer est fini
      reader.onload = () => {
        // converti reader.result en base64
        let fileContent = btoa(
          new Uint8Array(reader.result as ArrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        this.formArray.at(index).patchValue({ fileContent: fileContent });
      }
      //prend le blob et le converti en tableau binaire dans reader.result
      reader.readAsArrayBuffer(file);
    }
    this.uploadFileComponent.clear();
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

  get formArray() {
    return this.form.get('formArray') as FormArray;
  }

  get fileObjects() {
    return this.formArray.value as FileModel[];
  }

  isSelectedFichePaie(index) {
    return this.fileObjects[index].documentType === EnumTypeValue.FichePaie;
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
