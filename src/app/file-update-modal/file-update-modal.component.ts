import { Component, OnInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { DocumentType } from 'src/shared/models/DocumentType';
import { FileService } from 'src/shared/services/file.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { MY_FORMATS } from 'src/shared/models/MatDateFormat';

@Component({
  selector: 'app-file-update-modal',
  templateUrl: './file-update-modal.component.html',
  styleUrls: ['./file-update-modal.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class FileUpdateModalComponent implements OnInit {
  @Output() submitted = new EventEmitter();
  loading: Boolean = false;
  companies: string[] = [];
  workplaces: string[] = [];
  form: FormGroup;
  filteredCompanies: Observable<string[]>;
  filteredWorkplaces: Observable<string[]>;
  types : Array<any> = Object.values(DocumentType);

  constructor(
    @Inject(MAT_DIALOG_DATA) public fileData: any,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadDataFromApi();
    this.form = this.formBuilder.group(this.fileData);
  }

  async submit() {
    if (this.form.invalid) return;
    this.submitted.emit(this.file);
  }

  loadDataFromApi() {
    this.fileService.getCompanies().subscribe(
      data => {
        this.companies = data;
        this.filteredCompanies = this.form.get('company').valueChanges.pipe(startWith(''), map(value => this.filterCompanies(value)))
      }
    )

    this.fileService.getWorkplaces().subscribe(
      data => {
        this.workplaces = data;
        this.filteredWorkplaces = this.form.get('workplace').valueChanges.pipe(startWith(''), map(value => this.filterWorkplaces(value)))
      }
    )
  }

  get file() {
    return this.form.value;
  }

  isSelectedFichePaie() {
    return this.file && this.file.documentType === DocumentType.FichePaie;
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
