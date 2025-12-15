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
 this.goal = 0;
 this.cpfc = [];
 this.waterArr = [];
 this.subscribers = [];
 }

 //===================FOR OBSERVER======================
 subscribe(subscriber){
    this.subscribers.push(subscriber);
 }
 unsubscribe(){
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
 }

 notify(eventName) {
    const payload = {
      event: eventName,
      totalsCPFC: this.TotalCPFC(),
      cpfc: this.cpfc,
      waterArr: this.waterArr
    };
    this.subscribers.forEach(sub => sub.update(payload));
  }

 //===================FOR OBSERVER======================


 //===================ADD METHODS=======================
addFood(name, weight, calories, proteins, fats, carbs, date)
{
 this.cpfc.push(new Dish(name, weight, calories, proteins, fats, carbs, date));
 this.notify("food_added");
}
addWater(name, volume, date)
{
 this.waterArr.push(new Water(name, volume, date));
 this.notify("water_added");
}
 //===================ADD METHODS=======================

 //=====================TOTAL=========================
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
//=====================TOTAL=========================

//=======================AI==========================
async recognizeDishByDescription(description){
 const responce = await puter.ai.chat(("Який кбжу такої страви?: " + description + 
    "Опиши строго у форматі: назва, вага г, калорії, білки г, жири г, вуглеводи г"),
     {model: "gpt-5.1", temperature: 0.1});
     console.log(responce.message.content);
}

async recognizeDishByImage(photo){
 const responce = await puter.ai.chat(("Який кбжу страви яка зображена на фото?: " + photo + 
    "Опиши строго у форматі: назва, вага г, калорії, білки г, жири г, вуглеводи г. " + "Відповідь що ти не можеш прочитати фото не приймається, в тебе є доступ до фото"),
     {model: "gpt-5.1", temperature: 0.1});
     console.log(responce.message.content);
}
//=======================AI==========================


//==================CLEAR===========================
removeDish(name){
    this.cpfc = this.cpfc.filter(dish => dish.name !== name);
    this.notify("dish_removed");
}

 Clear(){
    this.cpfc = [];
    this.notify('cleared');
 }
 //==================CLEAR===========================
}



const KBZHU = new kbzhu_tracker;
const kbzhuChart = new kbzhu_chart("container");
const Bot1 = new Man("Джейк", 84, 186, 34, 1.25);
 
anychart.onDocumentReady(function (){
    kbzhuChart.init();
    KBZHU.subscribe(kbzhuChart);

    setTimeout(() => {
    KBZHU.addFood("Котлета", 200, 34, 56, 76, 91);
    KBZHU.addFood("Суп", 34, 100, 4, 30, 66);
  console.log("TotalCPFC");
  console.log(KBZHU.TotalCPFC());
  }, 2000);
  setTimeout(() => {
   KBZHU.removeDish("Суп");
   console.log("cpfc after removal");
   console.log(KBZHU.cpfc);
  }, 5000);

  console.log(Bot1.weight);

console.log("Гендер бота: " + Bot1.gender);

KBZHU.recognizeDishByDescription("Біг Мак з McDonalds");
KBZHU.recognizeDishByImage("Classes/kbzhu/AI_img_test/kfc.jpg");


KBZHU.addWater(250);
console.log("TotalWater:");
console.log(KBZHU.TotalWater());

  

setTimeout(() =>{
KBZHU.Clear();
console.log("Clear:");
console.log(KBZHU.TotalCPFC());
console.log("cfpc arr:");
 console.log(KBZHU.cpfc);
}, 50000);


})

