import { CompanyModel } from './CompanyModel';

export class WorkplaceModel {
  constructor(
    public id: Number = null,
    public name: string = null,
    public description: string = null,
    public companyId: Number = null
  ) {
  }

  public static fromJson(json: Object): WorkplaceModel {
    return new WorkplaceModel(
      json['id'],
      json['name'],
      json['description'],
      json['companyId']
    )
  }
}