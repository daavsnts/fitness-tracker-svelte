export class WaterIntake {
  constructor(public quantity: number, public timeStamp: Date) {}
}

export class WaterGoal {
  constructor(public quantity: number, public timeStamp: Date) {}
}

export class Exercise {
  constructor(public type: string, public timeStamp: Date) {}
}

export class ExerciseGoal {
  constructor(public quantity: number, public timeStamp: Date) {}
}

export class TodayInterval {
  public start: Date;
  public end: Date;

  constructor() {
    this.start = new Date(new Date().setHours(0, 0, 0, 0));
    this.end = new Date(new Date().setHours(23, 59, 59, 999));
  }
}
