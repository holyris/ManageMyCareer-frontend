import { DocumentType } from 'src/shared/models/DocumentType';
export class FileModel {
  constructor(
    public id: number = null,
    public name: string = null,
    public size: number = null,
    public type: string = null,
    public documentType: string = null,
    public company: string = null,
    public workplace: string = null,
    public addedDate: Date = null,
    public modifiedDate: Date = null,
    public documentDate: Date = null,
    public documentYear: string = null,
    public documentMonth: string = null,
    public grossSalary: number = null,
    public netSalary: number = null,
    public fileContent: string = null,
    public folderId: string = null
  ) {
  }

  public static fromJson(json: Object): FileModel {
    return new FileModel(
      json['id'],
      json['name'],
      json['size'],
      json['type'],
      json['documentType'],
      json['company'],
      json['workplace'],
      new Date(json['addedDate']),
      new Date(json['modifiedDate']),
      json['documentDate'] ? new Date(json['documentDate']) : null,
      json['documentYear'],
      json['documentMonth'],
      json['grossSalary'],
      json['netSalary'],
      json['fileContent'],
      json['folderId']
    )
  }

  public isFichePaie(): Boolean {
    return this.documentType === DocumentType.FichePaie;
  }

  public isContrat(): Boolean {
    return this.documentType === DocumentType.Contrat;
  }

  public isLettre(): Boolean {
    return this.documentType === DocumentType.Lettre;
  }

  public isCv(): Boolean {
    return this.documentType === DocumentType.Cv;
  }

  public isAutre(): Boolean {
    return this.documentType === DocumentType.Autre;
  }

}