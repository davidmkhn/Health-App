class Fitness {
  constructor() {
    this.exercises = [];
    this.favorites = [];
    this.currentWorkout = [];
//  this.workoutHistory = [];
//  this.streak = 0;
//  this.lastTrainingDate = null;
  }

  add_Exercises(name, grup, calories, level) {
    this.exercises.push({name, grup, calories, level})
  }

  add_Favotites(name){
    let found = this.exercises.find(exercises => exercises.name === name)
    if (found == undefined) {
      console.log("Такої вправи немає")
    }
    this.favorites.push(found)
  }

  new_Workout() {
    this.currentWorkout = [];

    console.log("Рівень тренування?\n 1. easy\n 2. medium\n 3. hard\n");
    let level = prompt("введіть цифру: ")

    if (level < 1 || level > 3) {
      console.log("Введіть корекне число")
      return this.new_Workout()
    }

    for (let index = 0; index < this.exercises.length; index++) {
      if (this.exercises[index].level == level) {
        this.currentWorkout.push(this.exercises[index])
      } 
    }

  //  this.challenge()
    console.log(this.currentWorkout);
  }

 // recommended_Exercises() {}

 // challenge() {}
}

///TESTS///

const fitnessApp = new Fitness();

fitnessApp.add_Exercises("Присід", "333", 354, 3);
fitnessApp.add_Exercises("Відтискання", "323", 332, 3);
fitnessApp.add_Exercises("Підтягування", "133", 332, 1);
console.log(fitnessApp.exercises);

fitnessApp.add_Favotites("Підтягування");
fitnessApp.add_Favotites("Прес");
console.log(fitnessApp.favorites); 

fitnessApp.new_Workout();


