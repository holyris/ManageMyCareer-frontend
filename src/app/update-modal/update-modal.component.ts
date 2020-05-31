import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api/selectitem';
import { EnumTypeValue } from 'src/shared/models/EnumTypeValue.model';
import { FileService } from 'src/shared/services/file.service';
import { FileUploadEventService } from 'src/shared/services/file-upload-event.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MY_FORMATS } from '../upload-modal/upload-modal.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class UpdateModalComponent implements OnInit {
  loading: Boolean = false;
  companies: string[] = ['Acta DS', 'ISIR', 'Google', 'Facebook'];
  workplaces: string[] = ['Manager', 'Developpeur', 'Caissier', 'Croque-mort'];
  form: FormGroup;
  filteredCompanies: Observable<string[]>;
  filteredWorkplaces: Observable<string[]>;
  types: SelectItem[] = [
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
    @Inject(MAT_DIALOG_DATA) public fileData: any,
    private fileService: FileService,
    private fileUploadEventService: FileUploadEventService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadDataFromApi();
    this.form = this.formBuilder.group(this.fileData);
    this.filteredCompanies = this.form.get('company').valueChanges.pipe(startWith(''), map(value => this.filterCompanies(value)))
    this.filteredWorkplaces = this.form.get('workplace').valueChanges.pipe(startWith(''), map(value => this.filterWorkplaces(value)))
  }

  async submit() {
    this.loading = true;
    await this.fileService.update(this.file);
    this.fileUploadEventService.filesUploaded()
    this.loading = false;
    this.close();
  }

  close() {
    this.dialog.closeAll();
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

  get file() {
    return this.form.value;
  }

  isSelectedFichePaie() {
    return this.file && this.file.documentType === EnumTypeValue.FichePaie;
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    datepicker.close();
    this.form.patchValue({ documentDate: normalizedMonth.toDate() });
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
