import Squad from "./class_modules/squad.js";
import Hero from "./class_modules/hero.js";

/*  Menu Class
    Manages Menu for application
    ***Requires Hero class***
    ***Requires Squad class***
    author: Patrick Murray

*/
class Menu {
   constructor() {
      this.squads = [];
      this.selectedSquad = null;
   }

   // APPLICATION ENTY POINT
   //#region MENU LOGIC METHODS

   /* start Method 
      Method to drive application
      This method calls the showMainMenuOptions method to display
      the menu options in a prompt and then loops until the user 
      chooses to exit. A switch is used to call the method that
      corresponds to the user's selection  
   */
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

   /* showSquadMenu Method 
      Method to manage user selection in the Show Squad menu
      This method calls the showSquadMenuOptions method to display
      the menu options in a prompt and then loops until the user 
      chooses to return to the main menu(start).
      A switch is used to call the method that
      corresponds to the user's selection  
   */
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
   //#endregion MENU LOGIC METHODS

   //#region MENU DISPLAY METHODS

   /* showMainMenuOptions Method 
      This method builds a string to display the options available to the user
      and displays them in a prompt, the user's selection is then returned to the caller
   */
   showMainMenuOptions() {
      //
      return prompt(
         "Superhero Squad Manager\n" +
            "------------------------------\n" +
            "1) View All Squads\n" +
            "2) Create New Squad\n" +
            "3) Edit Squad\n" +
            "4) Delete Squad\n" +
            "0) Exit\n"
      );
   }

   /* showSquadMenuOptions Method 
      This method builds a string to display the options available to the user in the Squad menu
      and displays them in a prompt, the user's selection is then returned to the caller.
      The method expects an index as an argument, this index is used to display the Squad and 
      all members of the squad roster using the getHeroList method.
   */
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
   //#endregion MENU DISPLAY METHODS

   //#region READ METHODS

   /* showAllSquads Method
      This method builds a string to display all current squads that have been created
      and prints them to the screen, it makes use of the getSquadList to create the list of
      squads and prompts the user to make a selection. If no squads exist then the function
      will use an alert to display this to the user.
   */
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
      squadList += `0) Return to main menu\n`;
      selection = prompt(squadList);
      if (selection > 0 && selection <= this.squads.length) {
         this.showSquadMenu(selection);
      }
   }

   /* getSquadList Method 
      This method reads the list of current squads from the squads array and returns
      the list as a formatted string. It makes use of the Squad.viewSquad() method
   */
   getSquadList() {
      let squadList = "";
      this.squads.forEach((squad, index) => {
         squadList += `${index + 1}) ${squad.viewSquad()}\n`;
      });
      return squadList;
   }

   /* getHeroList Method 
      This function takes a param of index to select an existing squad in order to display
      the roster information about that squad.
      This method reads the list of current heroes from the roster array in the selected
      squad and returns the information about the squad and then adds the list of heroes
      in the roster as a formatted string.
      It makes use of the Squad.viewSquad() and Squad.viewSquadRoster() methods
   */
   getHeroList(index) {
      let heroList = `${this.squads[index - 1].viewSquad()}\n`;
      heroList += `${this.squads[index - 1].viewSquadRoster()}`;
      return heroList;
   }

   /* getHeroListMenu Method 
      This function takes a param of index to select an existing squad.
      A string that lists each hero in the squad and the offset index in the roster
      arry is returned, This is intended to be used to build a menu so that a specific
      hero can be seleted.
   */
   getHeroListMenu(index) {
      let heroList = `${this.squads[index - 1].viewSquadRoster()}`;
      return heroList;
   }
   //#endregion READ METHODS

   //#region CREATE METHODS

   /* createSquad Method 
      This method prompts the user for a name for a new Squad object.
      A new Squad object is created and pushed to the squads array and then 
      the showSquadMenu is called so that the user is presented with the option to
      add/edit/delete heroes for thsi squad
   */
   createSquad() {
      let newSquadName = prompt("What name shall we call our group of heroes?");
      this.squads.push(new Squad(newSquadName));
      this.showSquadMenu(this.squads.length);
   }

   /* createHero Method
      The method expects an index as an argument, this index is used to display the currently
      selected squad.
      This method prompts the user for a name and secret identity for a new Hero
      object. A new Hero  object is then created and then the Squad.addHero method is
      called to add the new Hero object to the currently selected squad's roster.
   */
   createHero(index) {
      const heroName = prompt("By what name should we call this hero?");
      const secretIdentity = prompt("What is this hero's secret identity?");
      this.squads[index - 1].addHero(new Hero(heroName, secretIdentity));
   }
   //#endregion CREATE METHODS

   //#region UPDATE METHODS

   /* editHeroMenu Method 
      This method builds a string to display all current heroes that have been created and 
      exist in the roster for the currently selected squad and prints them to the screen.
      The index param is used to select a squad.
      It makes use of the getHeroListMenu to create the list of
      heroes and prompts the user to make a selection. If no heroes exist then the function
      will use an alert to display this to the user.
      The function then calls the renameHero method to edit the properties of the currently selected hero.
   */
   editHeroMenu(index) {
      let heroList = "";
      let selection = "";
      if (this.squads[index - 1].roster.length > 0) {
         heroList = "Please select a Hero to edit:\n-------------------------\n";
         heroList += this.getHeroListMenu(index);
         heroList += `0) Return to main menu\n`;
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

   /* renameHero Method 
      This method allows the user to edit the heroName and secretIdentity of a selected Hero.
      Two parameters are used; index to select the squad, and selection to select the hero.
      The user is prompted to enter a new heroName and allows the user to optionally enter
      a new secretIdentity. The updates are then applied using the Hero.editHero method.
   */
   renameHero(index, selection) {
      const heroName = prompt("What should we rename this hero?");
      let changeIdentity = prompt("Change secret identity?\n1) Yes\n0) No");
      if (changeIdentity == "1") {
         let secretIdentity = prompt("What is this hero's new secret identity?");
         this.squads[index].roster[selection].editHero(heroName, secretIdentity);
      }
      this.squads[index].roster[selection].editHero(heroName);
   }

   /* editSquad Method 
      This method builds a string to display all current squads that have been created
      and prints them to the screen, it makes use of the getSquadList method to create the list of
      squads and prompts the user to make a selection. If no squads exist then the function
      will use an alert to display this to the user.
      The user is then prompted to enter a new squadName and the update is made with a call
      to the Squad.editSquadName method.
   */
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
      squadList += `0) Return to main menu\n`;
      selection = prompt(squadList);
      if (selection > 0 && selection <= this.squads.length) {
         let newSquadName = prompt("How should we rename our group of heroes?");
         this.squads[selection - 1].editSquadName(newSquadName);
      }
   }
   //#endregion UPDATE METHODS

   //#region DELETE METHODS

   /* deleteHeroMenu Method
      This method builds a string to display all current heroes that have been created and 
      exist in the roster for the currently selected squad and prints them to the screen.
      The index param is used to select a squad.
      It makes use of the getHeroListMenu to create the list of
      heroes and prompts the user to make a selection. If no heroes exist then the function
      will use an alert to display this to the user.
      The function then prompts the user for confirmation that the delete action should occur.
      If the user confirms, then the splice method is used to remove the hero from the roster
      array of the currently selected squad.
   */
   deleteHeroMenu(index) {
      let heroList = "";
      let selection = "";
      if (this.squads[index - 1].roster.length > 0) {
         heroList = "Please select a Hero to delete:\n-------------------------\n";
         heroList += this.getHeroListMenu(index);
         heroList += `0) Return to main menu\n`;
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

   /* deleteSquad
      This method builds a string to display all current squads that have been created
      and prints them to the screen, it makes use of the getSquadList method to create the list of
      squads and prompts the user to make a selection. If no squads exist then the function
      will use an alert to display this to the user.
      The function then prompts the user for confirmation that the delete action should occur.
      If the user confirms, then the splice method is used to remove the squad from the squads array.
   */
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
      squadList += `0) Return to main menu\n`;
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
   //#endregion DELETE METHODS
}

// APPLICATION START
let menu = new Menu();
const element = document.getElementById("startButton");
element.addEventListener("click", () => menu.start());
