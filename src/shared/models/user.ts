export class User {
  id: number;
  firstName: string;
  lastName: string;
  token: string;

  constructor(public username: string, public password: string){};

}