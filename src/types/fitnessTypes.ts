export type WaterIntake = {
  quantity: number;
  timeStamp: Date;
};

export type WaterGoal = {
  quantity: number;
  timeStamp: Date;
};

export type ExercisePause = {
  type: string;
  timeStamp: Date;
};

export type ExercisePausesGoal = {
  quantity: number;
  timeStamp: Date;
};

export type Goal = {
  quantity: number;
  timeStamp: Date;
};

export class TodayInterval {
  public start: Date;
  public end: Date;

  constructor() {
    this.start = new Date(new Date().setHours(0, 0, 0, 0));
    this.end = new Date(new Date().setHours(23, 59, 59, 999));
  }
}
