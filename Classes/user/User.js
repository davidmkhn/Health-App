class User{
    constructor(name, weight, height, age, coefActivity){
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.age = age;
        this.coefActivity = coefActivity; // 1,25 = sit 1.375 = low 1.55 = medium 1.725 = high;
       // this.goalCPFC = this.calculateGoal(gender, weight, height, age, coefActivity);
    }
}
class Man extends User{
        constructor(name, weight, height, age, coefActivity){
            super(name, weight, height, age, coefActivity);
            this.gender = "Чоловік";
        }
    }
class Woman extends User{
    constructor(name, weight, height, age, coefActivity){
            super(name, weight, height, age, coefActivity);
            this.gender = "Жінка";
        }
}