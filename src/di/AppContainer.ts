import { FirebaseService } from "../data/network/FirebaseService";
import { WaterRepository } from "../data/repositories/WaterRepository";
import { ExerciseRepository } from "../data/repositories/ExerciseRepository";
import { FirestoreDaoUtils } from "../data/network/FirestoreDaoUtils";
import { FirestoreWaterDao } from "../data/network/FirestoreWaterDao";
import { FirestoreExerciseDao } from "../data/network/FirestoreExerciseDao";

class AppContainer {
  private _firebaseService: FirebaseService;
  private _daoUtils: FirestoreDaoUtils;
  private _waterDao: FirestoreWaterDao;
  private _exerciseDao: FirestoreExerciseDao;
  private _waterRepository: WaterRepository;
  private _exerciseRepository: ExerciseRepository;

  constructor() {
    this._firebaseService = new FirebaseService();
    this._daoUtils = new FirestoreDaoUtils(this._firebaseService.db);
    this._waterDao = new FirestoreWaterDao(
      this._firebaseService.db,
      this._daoUtils
    );
    this._exerciseDao = new FirestoreExerciseDao(
      this._firebaseService.db,
      this._daoUtils
    );
    this._waterRepository = new WaterRepository(this._waterDao);
    this._exerciseRepository = new ExerciseRepository(this._exerciseDao);
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
