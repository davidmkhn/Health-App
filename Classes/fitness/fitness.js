class Exercise {
  constructor(name, group, calories, level) {
    this.name = name;
    this.group = group;
    this.calories = calories;
    this.level = level;
  }

  getPlan(level) {
    return "Виконувати згідно інструкції";
  }
}

class CardioExercise extends Exercise {
  constructor(name, group, calories, level, duration) {
    super(name, group, calories, level);
    this.duration = duration;
  }

  getPlan(level) {
    const duration = level * 10;
    return `Бігти ${duration} хвилин`;
  }
}

class StrengthExercise extends Exercise {
  constructor(name, group, calories, level, sets, reps) {
    super(name, group, calories, level);
    this.sets = sets;
    this.reps = reps;
  }

  getPlan(level) {
    const sets = level + 1;
    const currentReps = this.reps + (level * 2);
    return `${sets} підходи по ${currentReps} разів`;
  }
}

class Workout {
  constructor(date, level, exercises) {
    this.date = date;
    this.level = level;
    this.exercises = exercises.filter(ex => ex.level == level);
  }

  showWorkout() {
    console.log(`Дата тренування: ${this.date}`);
    console.log(`Тренування рівня ${this.level}:`);

    if (this.exercises.length === 0) {
      console.log("Немає вправ для цього рівня");
      return;
    }

    this.exercises.forEach(ex => {
      const plan = ex.getPlan(this.level);
      console.log(`- ${ex.name}: ${plan}`);
    });
  }
}

class Fitness {
  constructor() {
    this.exercises = [];
    this.workouts = [];
    this.favorites = [];
    this.currentWorkout = null;
  }

  add_Exercise(name, group, calories, level) {
    const exercise = new Exercise(name, group, calories, level);
    this.exercises.push(exercise);
  }

  add_Cardio(name, group, calories, level, duration) {
    const exercise = new CardioExercise(name, group, calories, level, duration);
    this.exercises.push(exercise);
  }

  add_Strength(name, group, calories, level, sets, reps) {
    const exercise = new StrengthExercise(name, group, calories, level, sets, reps);
    this.exercises.push(exercise);
  }

  add_Favorite(name) {
    const found = this.exercises.find(ex => ex.name === name);
    if (!found) {
      console.log("Такої вправи немає");
      return;
    }
    this.favorites.push(found);
  }

  new_Workout() {
    console.log("Рівень тренування?\n 1. easy\n 2. medium\n 3. hard\n");
    const input = prompt("Введіть цифру: ");
    const level = Number(input);
    const date = new Date().toLocaleDateString();

    if (level < 1 || level > 3) {
      console.log("Введіть коректне число");
      return;
    }

    this.currentWorkout = new Workout(date, level, this.exercises);
    this.currentWorkout.showWorkout();
    this.workouts.push(this.currentWorkout);
  }
}

const fitnessApp = new Fitness();

fitnessApp.add_Exercise("Звичайна розминка", "загальна", 100, 1);
fitnessApp.add_Cardio("Біг", "кардіо", 500, 1, 30);
fitnessApp.add_Cardio("Спринт", "кардіо", 600, 2, 20);
fitnessApp.add_Strength("Силовий жим", "груди", 300, 2, 3, 10);
fitnessApp.add_Strength("Присідання з вагою", "ноги", 400, 3, 4, 8);

console.log("Створення тренування...");
fitnessApp.new_Workout();