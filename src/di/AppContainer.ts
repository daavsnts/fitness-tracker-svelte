import { FirebaseService } from "../data/network/FirebaseService";
import { WaterRepository } from "../data/repositories/WaterRepository";
import { ExerciseRepository } from "../data/repositories/ExerciseRepository";
import { FirestoreDaoUtils } from "../data/network/FirestoreDaoUtils";
import { FirestoreWaterDao } from "../data/network/FirestoreWaterDao";
import { FirestoreExerciseDao } from "../data/network/FirestoreExerciseDao";
import { UserRepository } from "../data/repositories/UserRepository";
import { FirebaseAuthenticator } from "../data/network/FirebaseAuthenticator";

class AppContainer {
  private _firebaseService: FirebaseService;
  private _firebaseAuth: FirebaseAuthenticator;
  private _firestoreDaoUtils: FirestoreDaoUtils;
  private _firestoreWaterDao: FirestoreWaterDao;
  private _firestoreExerciseDao: FirestoreExerciseDao;
  private _waterRepository: WaterRepository;
  private _exerciseRepository: ExerciseRepository;
  private _userRepository: UserRepository;

  constructor() {
    this._firebaseService = new FirebaseService();
    this._firebaseAuth = new FirebaseAuthenticator(this._firebaseService.auth);
    this._firestoreDaoUtils = new FirestoreDaoUtils(this._firebaseService.db);
    this._firestoreWaterDao = new FirestoreWaterDao(
      this._firebaseService.db,
      this._firestoreDaoUtils
    );
    this._firestoreExerciseDao = new FirestoreExerciseDao(
      this._firebaseService.db,
      this._firestoreDaoUtils
    );
    this._userRepository = new UserRepository(this._firebaseAuth);
    this._waterRepository = new WaterRepository(
      this._firestoreWaterDao,
      this._userRepository
    );
    this._exerciseRepository = new ExerciseRepository(
      this._firestoreExerciseDao,
      this._userRepository
    );
  }

  get waterRepository() {
    return this._waterRepository;
  }

  get exerciseRepository() {
    return this._exerciseRepository;
  }

  get userRepository() {
    return this._userRepository;
  }
}

const appContainer = new AppContainer();
export default appContainer;
