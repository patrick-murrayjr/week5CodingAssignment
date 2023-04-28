// class Hero {
//    constructor(heroName, secretIdentity) {
//       this.heroName = heroName;
//       this.secretIdentity = secretIdentity;
//       this.powers = [];
//    }

//    addPower(power) {
//       this.powers.push(power);
//    }

//    deletePower(index) {
//       if (this.powers[index] !== undefined) {
//          this.powers.splice(index, 1);
//       }
//    }

//    editHeroName(newHeroName) {
//       this.heroName = newHeroName;
//    }

//    editSecretIdentity(newSecretIdentity) {
//       this.secretIdentity = newSecretIdentity;
//    }

//    viewHero() {
//       return `${this.heroName}: (${this.secretIdentity})\n`;
//    }

//    viewPowers() {
//       let powerList = "";
//       if (this.powers.length > 0) {
//          powerList += `Powers\n---------\n`;
//          this.powers.forEach((power, index) => {
//             powerList += `${index}) ${power}\n`;
//          });
//       } else {
//          powerList = "No Powers";
//       }
//       return powerList;
//    }
// }

// class Squad {
//    constructor(squadName) {
//       this.squadName = squadName;
//       this.roster = [];
//    }

//    addHero(hero) {
//       if (hero instanceof Hero) {
//          this.roster.push(hero);
//       } else {
//          throw new Error("Invalid assignment: Function expects Hero object");
//       }
//    }

//    deleteHero(index) {
//       if (this.roster[index] !== undefined) {
//          this.roster.splice(index, 1);
//       }
//    }
//    editSquadName(newSquadName) {
//       this.squadName = newSquadName;
//    }

//    viewSquad() {
//       return `${this.squadName} - Heroes: ${this.roster.length}`;
//    }

//    viewSquadRoster() {
//       let rosterList = "";
//       if (this.roster.length > 0) {
//          //rosterList += "--------\n";
//          this.roster.forEach((member, index) => {
//             rosterList += `${index + 1}) ${member.viewHero()}`;
//             // rosterList += `${member.viewHero()}`;
//          });
//       } else {
//          rosterList = "No Heroes";
//       }
//       return rosterList;
//    }
// }
import Squad from "./class_modules/squad.js";
import Hero from "./class_modules/hero.js";

class Menu {
   constructor() {
      this.squads = [];
      this.selectedSquad = null;
   }

   start() {
      let selection = this.showMainMenuOptions();
      while (selection != 0) {
         switch (selection) {
            case "1":
               this.showAllSquads();
               break;
            case "2":
               this.createSquad();
               break;
            case "3":
               this.editSquad();
               break;
            case "4":
               this.deleteSquad();
               break;
            default:
               selection = 0;
         }
         if (selection != 0) {
            selection = this.showMainMenuOptions();
         }
      }
      alert("Exiting Application");
   }

   showMainMenuOptions() {
      //
      return prompt(
         "Superhero Squad Manager\n" +
            "------------------------------\n" +
            "0) Exit\n" +
            "1) View All Squads\n" +
            "2) Create New Squad\n" +
            "3) Edit Squad\n" +
            "4) Delete Squad\n"
      );
   }
   showSquadMenuOptions(index) {
      let displayString = this.getHeroList(index);
      return prompt(
         displayString +
            "\n" +
            "Please make a selection:\n" +
            "------------------------------\n" +
            "1) Add new hero\n" +
            "2) Delete hero\n" +
            "3) Edit hero\n" +
            "0) Return to main menu\n"
      );
   }

   getSquadList() {
      //
      let squadList = "";
      this.squads.forEach((squad, index) => {
         squadList += `${index + 1}) ${squad.viewSquad()}\n`;
      });
      return squadList;
   }
   //TODO
   getHeroList(index) {
      let heroList = `${this.squads[index - 1].viewSquad()}\n`;
      heroList += `${this.squads[index - 1].viewSquadRoster()}`;
      return heroList;
   }
   //TODO
   getHeroListMenu(index) {
      let heroList = `${this.squads[index - 1].viewSquadRoster()}`;
      return heroList;
   }

   createSquad() {
      //alert("createSquad");
      let newSquadName = prompt("What name shall we call our group of heroes?");
      this.squads.push(new Squad(newSquadName));
      this.showSquadInfo(this.squads.length);
   }

   createHero(index) {
      const heroName = prompt("By what name should we call this hero?");
      const secretIdentity = prompt("What is this hero's secret identity?");
      this.squads[index - 1].addHero(new Hero(heroName, secretIdentity));
   }
   //TODO
   editHeroMenu(index) {
      let heroList = "";
      let selection = "";
      if (this.squads[index - 1].roster.length > 0) {
         heroList = "Please select a Hero to edit:\n-------------------------\n";
         heroList += this.getHeroListMenu(index);
         console.log(`Edit Hero Menu: ${this.getHeroList(index)}`);
         heroList += `0) Return to main manu\n`;
      } else {
         heroList += "There are no Heroes to edit\n";
         alert(heroList);
         return;
      }
      selection = prompt(heroList);
      console.log(`Selection: ${selection}`);
      if (selection > 0 && selection <= this.squads[index - 1].roster.length) {
         this.editHero(index - 1, selection - 1);
      }
   }
   //TODO
   editHero(index, selection) {
      const heroName = prompt("What should we rename this hero?");
      this.squads[index].roster[selection].editHeroName(heroName);
      let changeIdentity = prompt("Change secret identity?\n1) Yes\n0) No");
      if (changeIdentity == "1") {
         let secretIdentity = prompt("What is this hero's new secret identity?");
         console.log(`Secret: ${this.squads[index].roster[selection].secretIdentity}`);
         this.squads[index].roster[selection].editSecretIdentity(secretIdentity);
      }
   }

   deleteHeroMenu(index) {
      let heroList = "";
      let selection = "";
      if (this.squads[index - 1].roster.length > 0) {
         heroList = "Please select a Hero to delete:\n-------------------------\n";
         heroList += this.getHeroListMenu(index);
         heroList += `0) Return to main manu\n`;
      } else {
         heroList += "There are no Heroes to delete\n";
         alert(heroList);
         return;
      }
      selection = prompt(heroList);
      console.log(`Selection: ${selection}`);
      console.log(`Index: ${index}`);
      if (selection > 0 && selection <= this.squads[index - 1].roster.length) {
         // this.editHero(index - 1, selection - 1);
         console.log("TESTING DELETE:", this.squads[index - 1].roster[selection - 1].heroName);
         let confirmation = prompt(
            "Confirm deletion of " +
               this.squads[index - 1].roster[selection - 1].heroName +
               "?\n1) DELETE\n0) Cancel"
         );
         if (confirmation == "1") {
            if (this.squads[index - 1].roster[selection - 1] !== undefined) {
               //console.log("TESTING: ", this.squads[selection - 1].roster[index - 1]);
               let deletedItem = this.squads[index - 1].roster.splice(selection - 1, 1);
               console.log(deletedItem);
               alert(`${deletedItem[0].heroName} has been deleted`);
            }
         }
      }
   }
   deleteHero(index) {
      //
      alert("Delete Hero Called");
   }

   showSquadInfo(index) {
      let selection = this.showSquadMenuOptions(index);
      while (selection != 0) {
         switch (selection) {
            case "1":
               this.createHero(index);
               break;
            case "2":
               this.deleteHeroMenu(index);
               break;
            case "3":
               //console.log(this.squads[index - 1]);
               this.editHeroMenu(index);
               break;
            default:
               selection = 0;
               break;
         }
         console.log(selection);
         if (selection != 0) {
            selection = this.showSquadMenuOptions(index);
         }
      }
   }

   editSquad() {
      let squadList = "";
      let selection = "";
      if (this.squads.length > 0) {
         squadList = "Please select a Squad to edit:\n-------------------------\n";
         squadList += this.getSquadList();
      } else {
         squadList += "There are no Squads to edit\n";
         alert(squadList);
         return;
      }
      squadList += `0) Return to main manu\n`;
      selection = prompt(squadList);
      console.log(`Selection: ${selection}`);
      if (selection > 0 && selection <= this.squads.length) {
         let newSquadName = prompt("How should we rename our group of heroes?");
         this.squads[selection - 1].editSquadName(newSquadName);
      }
   }

   deleteSquad() {
      let squadList = "";
      let selection = "";
      if (this.squads.length > 0) {
         squadList = "Please select a Squad to delete:\n-------------------------\n";
         squadList += this.getSquadList();
      } else {
         squadList += "There are no Squads to delete\n";
         alert(squadList);
         return;
      }
      squadList += `0) Return to main manu\n`;
      selection = prompt(squadList);
      console.log(`Selection: ${selection}`);
      if (selection > 0 && selection <= this.squads.length) {
         let confirmation = prompt(
            `Confirm deletion of ${this.squads[selection - 1].squadName}?\n1) DELETE\n0) Cancel`
         );
         if (confirmation == "1") {
            if (this.squads[selection - 1] !== undefined) {
               let deletedItem = this.squads.splice(selection - 1, 1);
               console.log(deletedItem);
               alert(`${deletedItem[0].squadName} has been deleted`);
            }
         }
      }
   }

   showAllSquads() {
      let squadList = "";
      let selection = "";
      if (this.squads.length > 0) {
         squadList = "Please make a selection:\n-------------------------\n";
         squadList += this.getSquadList();
      } else {
         squadList += "There are no Squads to display\n";
         alert(squadList);
         return;
      }
      squadList += `0) Return to main manu\n`;
      selection = prompt(squadList);
      if (selection > 0 && selection <= this.squads.length) {
         this.showSquadInfo(selection);
      }
   }
}

let menu = new Menu();
menu.start();
