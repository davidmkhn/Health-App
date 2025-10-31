class Dish{
    constructor (name, calories, proteins, fats, carbs, date = new Date()){
        this.name = name;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.date = date;
    }
}

class kbzhu_tracker 
{
 constructor() {
 this.cpfc = [];
 }

addFood(name, calories, proteins, fats, carbs, date)
{
 this.cpfc.push(new Dish(name, calories, proteins, fats, carbs, date));
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

removeDish(name){
    this.cpfc = this.cpfc.filter(dish => dish.name !== name);
    
}

 Clear(){
    this.cpfc = [];
 }
}

const KBZHU = new kbzhu_tracker;
 KBZHU.addFood("Котлета", 34, 56, 76, 91);
 KBZHU.addFood("Суп", 100, 4, 30, 66);
 console.log(KBZHU.TotalCPFC());
 console.log(KBZHU.cpfc);
  KBZHU.removeDish("Суп");
  console.log(KBZHU.cpfc);
KBZHU.Clear();
console.log(KBZHU.TotalCPFC());

