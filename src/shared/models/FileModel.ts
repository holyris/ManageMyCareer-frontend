import { DocumentType, EnumTypeValue } from 'src/shared/models/document-type.model';


export class FileModel {
  public documentType: DocumentType;
  public company: String;
  public job: String;
  public date: Date;
  public file: File;

  constructor() {

  }
}