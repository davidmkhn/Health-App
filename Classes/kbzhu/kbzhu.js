class kbzhu_tracker 
{
 constructor() {
 this.cpfc = [];
 }

addFood(calories, proteins, fats, carbs)
{
 this.cpfc.push({calories, proteins, fats, carbs});
}

 TotalCPFC()
 {
return this.cpfc.reduce(
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

 Clear(){
    this.cpfc = [];
 }
}

const KBZHU = new kbzhu_tracker;
 KBZHU.addFood(34, 56, 76, 91);
 KBZHU.addFood(100, 4, 30, 66);
 console.log(KBZHU.TotalCPFC());
KBZHU.Clear();
console.log(KBZHU.TotalCPFC());

