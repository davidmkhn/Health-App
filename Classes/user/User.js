class User{
    constructor(name, gender, weight, height, age, coefActivity, goalCPFC){
        this.name = name;
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.age = age;
        this.coefActivity = coefActivity; // 1,25 = sit 1.375 = low 1.55 = medium 1.725 = high;
        this.goalCPFC = this.calculateGoal(gender, weight, height, age, coefActivity);
    }

 calculateGoal(gender, weight, height, age, coefActivity){
    if (gender == "Жінка"){
        return ((10*weight)+(6.25*height)-(5*age)-161)*coefActivity;
    } else if (gender == "Чоловік"){
        return ((10*weight)+(6.25*height)-(5*age)+5)*coefActivity;
    }
    }
}