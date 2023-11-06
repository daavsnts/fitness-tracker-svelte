import type { UserRepository } from "src/data/repositories/UserRepository";
import appContainer from "../di/AppContainer";
import type { User } from "firebase/auth";
import { writable, type Writable } from "svelte/store";

export class UserAuthenticationStore {
  private _userRepository: UserRepository;
  private _userLoggedIn: Writable<User> = writable(null as User);
  private _isUserLoggedIn: Writable<boolean> = writable(false);

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  private refreshStoreStates() {
    const user = this._userRepository.getUser();
    this._userLoggedIn.set(user);
    this._isUserLoggedIn.set(user != null);
  }

  async userRegister(email: string, password: string, displayName: string) {
    await this._userRepository.userRegister(email, password, displayName);
  }

  async userLogin(email: string, password: string) {
    await this._userRepository.userLogin(email, password);
    this.refreshStoreStates();
  }

  async userLogout() {
    await this._userRepository.userLogout();
    this.refreshStoreStates();
  }

  get user() {
    return this._userLoggedIn;
  }

  get isUserLoggedIn() {
    return this._isUserLoggedIn;
  }
}

const userAuthenticationStore = new UserAuthenticationStore(
  appContainer.userRepository
);
export default userAuthenticationStore;
