export class User {
  constructor(
    public email: string,
    public password?: string,
    public name?: string,
    public id?: string,
    public avatar?: string,
    public type?: string
  ) {}
}
