export class User {
  id: number;
  firstName: String;
  lastName: String;
  token: String;

  constructor(public username: String, public password: String){};

}