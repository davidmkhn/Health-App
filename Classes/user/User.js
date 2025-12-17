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
        calculateGoal(item){
        return this.goal = ((10*item.weight)+(6.25*item.height)-(5*item.age)-161)*item.coefActivity;
        }
    }
class Woman extends User{
    constructor(name, weight, height, age, coefActivity){
            super(name, weight, height, age, coefActivity);
            this.gender = "Жінка";
        }
        calculateGoal(item){
        return this.goal = ((10*item.weight)+(6.25*item.height)-(5*item.age)+5)*item.coefActivity;
        }
}

