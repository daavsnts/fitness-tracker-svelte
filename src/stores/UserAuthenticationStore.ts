import type { UserRepository } from "src/data/repositories/UserRepository";
import appContainer from "../di/AppContainer";

export class UserAuthenticationStore {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async userRegister(email: string, password: string, displayName: string) {
    await this._userRepository.userRegister(email, password, displayName);
  }

  async userLogin(email: string, password: string) {
    await this._userRepository.userLogin(email, password);
  }
}

const userAuthenticationStore = new UserAuthenticationStore(
  appContainer.userRepository
);
export default userAuthenticationStore;
