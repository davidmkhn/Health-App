class Exercise {
  constructor(name, group, calories, level) {
    this.name = name;
    this.group = group;
    this.calories = calories;
    this.level = level;
  }

  getPlan(userLevel) {
    return "Виконувати згідно інструкції";
  }
}

class CardioExercise extends Exercise {
  constructor(name, group, calories, level, duration) {
    super(name, group, calories, level);
    this.duration = duration;
  }

  getPlan(userLevel) {
    const duration = this.duration + (userLevel * 5);
    return `Бігти ${duration} хв`;
  }
}

class StrengthExercise extends Exercise {
  constructor(name, group, calories, level, sets, reps) {
    super(name, group, calories, level);
    this.sets = sets;
    this.reps = reps;
  }

  getPlan(userLevel) {
    const sets = this.sets;
    const currentReps = this.reps + (userLevel * 2);
    return `${sets} підходи по ${currentReps} разів`;
  }
}

class ExerciseFactory {
  static create(type, data) {
    switch (type) {
      case 'cardio':
        return new CardioExercise(data.name, 'cardio', data.calories, data.level, data.duration);
      case 'strength':
        return new StrengthExercise(data.name, 'strength', data.calories, data.level, data.sets, data.reps);
      case 'general':
      default:
        return new Exercise(data.name, 'general', data.calories, data.level);
    }
  }
}

class TrainingStrategy {
  filterExercises(allExercises, userLevel) {
    return [];
  }
}

class LevelStrategy extends TrainingStrategy {
  filterExercises(allExercises, userLevel) {
    return allExercises.filter(ex => ex.level === userLevel);
  }
}

class CardioOnlyStrategy extends TrainingStrategy {
  filterExercises(allExercises, userLevel) {
    return allExercises.filter(ex => ex instanceof CardioExercise);
  }
}

class StrengthOnlyStrategy extends TrainingStrategy {
  filterExercises(allExercises, userLevel) {
    return allExercises.filter(ex => ex instanceof StrengthExercise);
  }
}

class Workout {
  constructor(level, exercises) {
    this.date = new Date().toLocaleDateString();
    this.level = level;
    this.exercises = exercises;
  }

  showWorkout() {
    console.log(`\n=== Тренування від ${this.date} ===`);

    if (this.exercises.length === 0) {
      console.log("за обраною стратегією вправ не знайдено.");
      return;
    }

    this.exercises.forEach(ex => {
      const plan = ex.getPlan(this.level);
      console.log(`[${ex.group.toUpperCase()}] ${ex.name}: ${plan} (Рівень вправи: ${ex.level})`);
    });
    console.log("==============================\n");
  }
}

class Fitness {
  constructor() {
    this.exercises = [];
    this.workouts = [];
    this.strategy = new LevelStrategy();
  }

  addExercise(type, data) {
    const exercise = ExerciseFactory.create(type, data);
    this.exercises.push(exercise);
  }

  setStrategy(newStrategy) {
    this.strategy = newStrategy;
  }

  createWorkout(userLevel) {
    const selectedExercises = this.strategy.filterExercises(this.exercises, userLevel);
    const workout = new Workout(userLevel, selectedExercises);
    this.workouts.push(workout);
    workout.showWorkout();
  }
}

///  Test  ///

const fitnessApp = new Fitness();

fitnessApp.addExercise('general', { name: "Розминка суглобів", calories: 50, level: 1 });
fitnessApp.addExercise('cardio', { name: "Біг", calories: 300, level: 1, duration: 20 });
fitnessApp.addExercise('cardio', { name: "Інтервальний спринт", calories: 600, level: 3, duration: 15 });
fitnessApp.addExercise('strength', { name: "Жим лежачи", calories: 200, level: 2, sets: 3, reps: 10 });
fitnessApp.addExercise('strength', { name: "Присідання", calories: 250, level: 1, sets: 4, reps: 12 });
fitnessApp.addExercise('strength', { name: "Станова тяга", calories: 400, level: 3, sets: 5, reps: 5 });

console.log("TEST 1: Стандартна стратегія (за рівнем 1)");
fitnessApp.createWorkout(1);

console.log("TEST 2: Стратегія 'Тільки Силові' (Рівень користувача 2)");
fitnessApp.setStrategy(new StrengthOnlyStrategy());
fitnessApp.createWorkout(2);

console.log("TEST 3: Стратегія 'Тільки Кардіо'");
fitnessApp.setStrategy(new CardioOnlyStrategy());
fitnessApp.createWorkout(2);