
export class FileModel {
  constructor(
    public id: Number = null,
    public name: string = '',
    public size: Number = null,
    public type: string = '',
    public documentType: string = '',
    public company: string = '',
    public workplace: string = '',
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
}