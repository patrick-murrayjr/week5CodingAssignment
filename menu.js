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

   showSquadMenu(index) {
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
               this.editHeroMenu(index);
               break;
            default:
               selection = 0;
               break;
         }
         if (selection != 0) {
            selection = this.showSquadMenuOptions(index);
         }
      }
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
      let squadList = "";
      this.squads.forEach((squad, index) => {
         squadList += `${index + 1}) ${squad.viewSquad()}\n`;
      });
      return squadList;
   }

   getHeroList(index) {
      let heroList = `${this.squads[index - 1].viewSquad()}\n`;
      heroList += `${this.squads[index - 1].viewSquadRoster()}`;
      return heroList;
   }

   getHeroListMenu(index) {
      let heroList = `${this.squads[index - 1].viewSquadRoster()}`;
      return heroList;
   }

   createSquad() {
      let newSquadName = prompt("What name shall we call our group of heroes?");
      this.squads.push(new Squad(newSquadName));
      this.showSquadMenu(this.squads.length);
   }

   createHero(index) {
      const heroName = prompt("By what name should we call this hero?");
      const secretIdentity = prompt("What is this hero's secret identity?");
      this.squads[index - 1].addHero(new Hero(heroName, secretIdentity));
   }

   editHeroMenu(index) {
      let heroList = "";
      let selection = "";
      if (this.squads[index - 1].roster.length > 0) {
         heroList = "Please select a Hero to edit:\n-------------------------\n";
         heroList += this.getHeroListMenu(index);
         heroList += `0) Return to main manu\n`;
      } else {
         heroList += "There are no Heroes to edit\n";
         alert(heroList);
         return;
      }
      selection = prompt(heroList);
      if (selection > 0 && selection <= this.squads[index - 1].roster.length) {
         this.renameHero(index - 1, selection - 1);
      }
   }

   renameHero(index, selection) {
      const heroName = prompt("What should we rename this hero?");
      let changeIdentity = prompt("Change secret identity?\n1) Yes\n0) No");
      if (changeIdentity == "1") {
         let secretIdentity = prompt("What is this hero's new secret identity?");
         this.squads[index].roster[selection].editHero(heroName, secretIdentity);
      }
      this.squads[index].roster[selection].editHero(heroName);
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
      if (selection > 0 && selection <= this.squads[index - 1].roster.length) {
         let confirmation = prompt(
            "Confirm deletion of " +
               this.squads[index - 1].roster[selection - 1].heroName +
               "?\n1) DELETE\n0) Cancel"
         );
         if (confirmation == "1") {
            if (this.squads[index - 1].roster[selection - 1] !== undefined) {
               let deletedItem = this.squads[index - 1].roster.splice(selection - 1, 1);
               alert(`${deletedItem[0].heroName} has been deleted`);
            }
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
      if (selection > 0 && selection <= this.squads.length) {
         let confirmation = prompt(
            `Confirm deletion of ${this.squads[selection - 1].squadName}?\n1) DELETE\n0) Cancel`
         );
         if (confirmation == "1") {
            if (this.squads[selection - 1] !== undefined) {
               let deletedItem = this.squads.splice(selection - 1, 1);
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
         this.showSquadMenu(selection);
      }
   }
}

let menu = new Menu();
menu.start();
