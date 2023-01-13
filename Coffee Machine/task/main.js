const input = require('sync-input');

let cupsCoffee = 0;

let coffeeMachine = {
  mlOfWater: 400,
  mlOfMilk: 540,
  gramsOfCoffeeBeans: 120,
  disposableCups: 9,
  money: 550
};

let exitStatus = false;

function  printTheStateOfTheCoffeeMachine() {
  console.log(`The coffee machine has:
  ${coffeeMachine.mlOfWater} ml of water
  ${coffeeMachine.mlOfMilk} ml of milk
  ${coffeeMachine.gramsOfCoffeeBeans} g of coffee beans
  ${coffeeMachine.disposableCups} disposable cups
  $${coffeeMachine.money} of money`);
}

function makeCoffee(coffee) {
  if (cupsCoffee >= 1) {
        console.log(`I have enough resources, making you a coffee!`);
        coffeeMachine.mlOfWater -= coffee.mlOfWater;
        coffeeMachine.mlOfMilk -= coffee.mlOfMilk;
        coffeeMachine.gramsOfCoffeeBeans -= coffee.gramsOfCoffeeBeans;
        coffeeMachine.disposableCups -= coffee.disposableCups;
        coffeeMachine.money += coffee.money;        
      } else {
          if (coffeeMachine.disposableCups < 1) {
            console.log("Sorry, not enough cups!");
          }

          if (coffeeMachine.mlOfWater < coffee.mlOfWater) {
            console.log("Sorry, not enough water!");
          }

          if (coffeeMachine.mlOfMilk < coffee.mlOfMilk) {
            console.log("Sorry, not enough milk!");
          }

          if (coffeeMachine.gramsOfCoffeeBeans < coffee.gramsOfCoffeeBeans) {
            console.log("Sorry, not enough coffee beans!");
          }
      }
}

function buyCoffee() {
  let espresso = {mlOfWater: 250, mlOfMilk: 0, gramsOfCoffeeBeans: 16, disposableCups: 1, money: 4}
  let latte = {mlOfWater: 350, mlOfMilk: 75, gramsOfCoffeeBeans: 20, disposableCups: 1, money: 7}
  let cappuccino = {mlOfWater: 200, mlOfMilk: 100, gramsOfCoffeeBeans: 12, disposableCups: 1, money: 6}
  let typeOfCoffee = Number(input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:"));
  
  switch (typeOfCoffee) {

    case 1:
      cupsCoffee = Math.min(parseInt(coffeeMachine.mlOfWater / espresso.mlOfWater), parseInt(coffeeMachine.gramsOfCoffeeBeans / espresso.gramsOfCoffeeBeans));
      makeCoffee(espresso);  
      break;

    case 2:
      cupsCoffee = Math.min(parseInt(coffeeMachine.mlOfWater / latte.mlOfWater), Math.min(parseInt(coffeeMachine.mlOfMilk / latte.mlOfMilk), parseInt(coffeeMachine.gramsOfCoffeeBeans / latte.gramsOfCoffeeBeans)));
      makeCoffee(latte);
      break;

    case 3:
      cupsCoffee = Math.min(parseInt(coffeeMachine.mlOfWater / cappuccino.mlOfWater), Math.min(parseInt(coffeeMachine.mlOfMilk / cappuccino.mlOfMilk), parseInt(coffeeMachine.gramsOfCoffeeBeans / cappuccino.gramsOfCoffeeBeans)));
      makeCoffee(cappuccino);        
      break;

    case "back":
      chooseAction();
      break;

    default:
      console.log(`Wrong input`);
      break;
  } 
}

function fillTheCoffeeMachine() {
  console.log("Write how many ml of water you want to add:");
  coffeeMachine.mlOfWater += Number(input());
  console.log("Write how many ml of milk you want to add:");
  coffeeMachine.mlOfMilk += Number(input());
  console.log("Write how many grams of coffee beans you want to add:");
  coffeeMachine.gramsOfCoffeeBeans += Number(input());
  console.log("Write how many disposable coffee cups you want to add:");  
  coffeeMachine.disposableCups += Number(input()); 
}

function takeMoneyFromCoffeeMachine() {
  console.log(`I gave you $${coffeeMachine.money}`);
  coffeeMachine.money = 0; 
}

function chooseAction() {
  console.log(``);
  let action = input("Write action (buy, fill, take, remaining, exit):");
  console.log(``);

  switch (action) {

    case "buy":
      buyCoffee();
      break;

    case "fill":
      fillTheCoffeeMachine();
      break;  

    case "take":
      takeMoneyFromCoffeeMachine();
      break;

    case "remaining":
      printTheStateOfTheCoffeeMachine();
      break;

    case "exit":
      console.log("Have a nice day!");
      exitStatus = true;      
      break;

    default:
      console.log(`Unknown input`);
      break;
  } 
}

while (!exitStatus) {
  chooseAction();
  }