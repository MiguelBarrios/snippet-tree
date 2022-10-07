

export class User {

  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  enabled: boolean | null;
  role: string;
  email: string | null;
  createdAt: Date | null;


  constructor(  id: number = 0, username: string = "", firstName: string | null = "", lastName: string | null = "",
   password: string | null = "", enabled: boolean | null = true, role: string = "", email: string | null = "",
   createdAt: Date | null = null) {

      this.id = id,
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.enabled = enabled;
      this.role = role;
      this.email = email;
      this.createdAt = createdAt;
  }

}