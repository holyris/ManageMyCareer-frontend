
export class FileModel {
  // public id: Number;
  // public name: String;
  // public size: Number;
  // public type: String;
  // public documentType: String;
  // public company: String;
  // public workplace: String;
  // public addedDate: Date;
  // public modifiedDate: Date;
  // public documentDate: Date;
  // public grossSalary: Number;
  // public netSalary: Number;
  // public fileContent: String;

  constructor(
    public id: Number = null,
    public name: String = '',
    public size: Number = null,
    public type: String = '',
    public documentType: String = '',
    public company: String = '',
    public workplace: String = '',
    public addedDate: Date = null,
    public modifiedDate: Date = null,
    public documentDate: Date = null,
    public grossSalary: Number = null,
    public netSalary: Number = null,
    public fileContent: String = null
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
}