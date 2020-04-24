import { DocumentType, EnumTypeValue } from 'src/shared/models/document-type.model';
import { LongTapEvent } from 'ag-grid-community';


export class FileModel {
  public id: Number;
  public name: String;
  public size: Number;
  public type: String;
  public documentType: DocumentType;
  public company: String;
  public workplace: String;
  public date: Date;
  public grossSalary: Number;
  public netSalary: Number;
  public fileContent: String;
  
  constructor() {

  }
}