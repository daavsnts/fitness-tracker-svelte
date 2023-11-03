import { FirestoreDao } from "../data/network/FirestoreDao";
import { FirebaseService } from "../data/network/FirebaseService";
import { WaterRepository } from "../data/repositories/WaterRepository";

class AppContainer {
  private _firebaseService: FirebaseService;
  private _firebaseDao: FirestoreDao;
  private _waterRepository: WaterRepository;

  constructor() {
    this._firebaseService = new FirebaseService();
    this._firebaseDao = new FirestoreDao(this._firebaseService.db);
    this._waterRepository = new WaterRepository(this._firebaseDao);
  }

  get waterRepository() {
    return this._waterRepository;
  }
}

const appContainer = new AppContainer();
export default appContainer;
