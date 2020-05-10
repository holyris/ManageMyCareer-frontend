export class CompanyModel {
  constructor(
    public id: Number = null,
    public name: string = null,
    public description: string = null
  ) {
  }

  public static fromJson(json: Object): CompanyModel {
    return new CompanyModel(
      json['id'],
      json['name'],
      json['description']
    )
  }
}