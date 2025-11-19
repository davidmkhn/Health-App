class Dish{
    constructor (name, weight, calories, proteins, fats, carbs, date = new Date()){
        this.name = name;
        this.weight = weight;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.date = date;
    }
}
class Water extends Dish{
     constructor(volume, date){
     super("Вода", 0, 0, 0, 0, 0, date);
     this.volume = volume;
     }
}



class kbzhu_tracker 
{
 constructor() {
 this.goal;
 this.cpfc = [];
 this.waterArr = [];
 }


addFood(name, weight, calories, proteins, fats, carbs, date)
{
 this.cpfc.push(new Dish(name, weight, calories, proteins, fats, carbs, date));
}
addWater(name, volume, date)
{
 this.waterArr.push(new Water(name, volume, date));
}


 TotalCPFC()
 {
    const now = new Date();
return this.cpfc.filter(dish => 
    dish.date.getFullYear() === now.getFullYear() &&
    dish.date.getMonth() === now.getMonth() &&
    dish.date.getDate() === now.getDate()
)
.reduce(
    (totals, dish) => {
        totals.calories += dish.calories;
        totals.proteins += dish.proteins;
        totals.fats += dish.fats;
        totals.carbs += dish.carbs;
        return totals;
    },
{ calories : 0, proteins: 0, fats: 0, carbs: 0 }
);
}

TotalWater(){
    const now = new Date();

    return this.waterArr.filter(water => 
    water.date.getFullYear() === now.getFullYear() &&
    water.date.getMonth() === now.getMonth() &&
    water.date.getDate() === now.getDate()
    )
    .reduce(
        (totalWater, water) => {
        totalWater.volume += water.volume;
        return totalWater;
        },
        {volume: 0}
    )
}

removeDish(name){
    this.cpfc = this.cpfc.filter(dish => dish.name !== name);
    
}

 Clear(){
    this.cpfc = [];
 }
}

const KBZHU = new kbzhu_tracker;
const Bot1 = new User("Джейк", "Чоловік", 84, 186, 34, 1.25);

KBZHU.goal = Bot1.goalCPFC;
console.log(KBZHU.goal);

KBZHU.addWater(250);
console.log(KBZHU.TotalCPFC());
console.log(KBZHU.TotalWater());
 KBZHU.addFood("Котлета", 200, 34, 56, 76, 91);
 KBZHU.addFood("Суп", 34, 100, 4, 30, 66);
 console.log(KBZHU.TotalCPFC());
 console.log(KBZHU.cpfc);
  KBZHU.removeDish("Суп");
  console.log(KBZHU.cpfc);
KBZHU.Clear();
console.log(KBZHU.TotalCPFC());


