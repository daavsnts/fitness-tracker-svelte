import {
  createUserWithEmailAndPassword,
  type Auth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

export class FirebaseAuthenticator {
  private _auth: Auth;

  constructor(auth: Auth) {
    this._auth = auth;
  }

  async userRegister(
    email: string,
    password: string,
    displayName: string
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(user, { displayName: displayName });

    return user;
  }

  async userLogin(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    return userCredential.user;
  }

  async userLogout() {
    await signOut(this._auth);
  }

  getUser(): User {
    return this._auth.currentUser;
  }
}
