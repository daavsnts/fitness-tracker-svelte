import type { User } from "firebase/auth";
import type { FirebaseAuthenticator } from "../network/FirebaseAuthenticator";

export class UserRepository {
  private _authenticator: FirebaseAuthenticator;

  constructor(authenticator: FirebaseAuthenticator) {
    this._authenticator = authenticator;
  }

  async userRegister(
    email: string,
    password: string,
    displayName: string
  ): Promise<User> {
    return await this._authenticator.userRegister(email, password, displayName);
  }

  getUser() {
    return this._authenticator.getUser();
  }

  async userLogin(email: string, password: string): Promise<User> {
    return await this._authenticator.userLogin(email, password);
  }

  async userLogout() {
    return await this._authenticator.userLogout();
  }
}
