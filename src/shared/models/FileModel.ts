import { EnumTypeValue } from 'src/shared/models/EnumTypeValue.model';

export class FileModel {
  constructor(
    public id: Number = null,
    public name: string = null,
    public size: Number = null,
    public type: string = null,
    public documentType: string = null,
    public company: string = null,
    public workplace: string = null,
    public addedDate: Date = null,
    public modifiedDate: Date = null,
    public documentDate: Date = null,
    public grossSalary: Number = null,
    public netSalary: Number = null,
    public fileContent: string = null
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
      json['grossSalary'],
      json['netSalary'],
      json['fileContent']
    )
  }

  public reformat(): void {
    if (this.isLettre() || this.isCv() || this.isAutre()) {
      this.company = null;
      this.workplace = null;
      this.grossSalary = null;
      this.netSalary = null;
      this.documentDate = null;
    } else if(this.isContrat()){
      this.grossSalary = null;
      this.netSalary = null;
    }
  }

  public isFichePaie(): Boolean {
    return this.documentType === EnumTypeValue.FichePaie;
  }

  public isContrat(): Boolean {
    return this.documentType === EnumTypeValue.Contrat;
  }

  public isLettre(): Boolean {
    return this.documentType === EnumTypeValue.Lettre;
  }

  public isCv(): Boolean {
    return this.documentType === EnumTypeValue.Cv;
  }

  public isAutre(): Boolean {
    return this.documentType === EnumTypeValue.Autre;
  }
}