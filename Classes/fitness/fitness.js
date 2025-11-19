class Exercise {
  constructor(name, group, calories, level) {
    this.name = name;
    this.group = group;
    this.calories = calories;
    this.level = level;
  }
}

class Workout {
  constructor(date, level, exercises) {
    this.date = date
    this.level = level;
    this.exercises = exercises.filter(ex => ex.level == level);
  }

  showWorkout() {
    console.log(`Дата тренування: ${this.date}`);
    console.log(`Тренування рівня ${this.level}:`);
    console.log(this.exercises);
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
    const level = Number(prompt("Введіть цифру: "));
    const date = new Date().toLocaleDateString();

    if (level < 1 || level > 3) {
      console.log("Введіть коректне число");
      return this.new_Workout();
    }

    this.currentWorkout = new Workout(date, level, this.exercises);
    this.currentWorkout.showWorkout();
    this.workouts.push(this.currentWorkout)
    console.log(this.workouts)
  }
}

/// TESTS ///
const fitnessApp = new Fitness();

console.log("Додавання вправ:");
fitnessApp.add_Exercise("Присід", "ноги", 354, 3);
fitnessApp.add_Exercise("Відтискання", "груди", 332, 2);
fitnessApp.add_Exercise("Підтягування", "спина", 300, 1);
console.log(fitnessApp.exercises);

console.log("\nДодавання улюблених вправ:");
fitnessApp.add_Favorite("Підтягування");
fitnessApp.add_Favorite("Присід");
console.log(fitnessApp.favorites);

console.log("\nПочаток нового тренування:");
fitnessApp.new_Workout();
