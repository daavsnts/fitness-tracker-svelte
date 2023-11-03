import { FirestoreDao } from "../data/network/FirestoreDao";
import { FirebaseService } from "../data/network/FirebaseService";
import { WaterRepository } from "../data/repositories/WaterRepository";
import { ExerciseRepository } from "../data/repositories/ExerciseRepository";

class AppContainer {
  private _firebaseService: FirebaseService;
  private _firebaseDao: FirestoreDao;
  private _waterRepository: WaterRepository;
  private _exerciseRepository: ExerciseRepository;

  constructor() {
    this._firebaseService = new FirebaseService();
    this._firebaseDao = new FirestoreDao(this._firebaseService.db);
    this._waterRepository = new WaterRepository(this._firebaseDao);
    this._exerciseRepository = new ExerciseRepository(this._firebaseDao);
  }

  get waterRepository() {
    return this._waterRepository;
  }
  get exerciseRepository() {
    return this._exerciseRepository;
  }
}

const appContainer = new AppContainer();
export default appContainer;
