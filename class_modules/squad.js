import Hero from "./hero.js";

/*  Squad Class
    Models a collection of Superhero objects. 
    ***Requires Hero class***
    author: Patrick Murray

*/
class Squad {
   constructor(squadName) {
      this.squadName = squadName;
      this.roster = [];
   }

   /* addHero Method 
      expects a Hero object as a param, throws an error if the param is not of type Hero
      adds the argument onto the roster array
   */
   addHero(hero) {
      if (hero instanceof Hero) {
         this.roster.push(hero);
      } else {
         throw new Error("Invalid assignment: Function expects Hero object");
      }
   }

   /* deleteHero Method 
      requires an index as a param
      if the element exists at the given index, it is removed from the array
   */
   deleteHero(index) {
      if (this.roster[index] !== undefined) {
         this.roster.splice(index, 1);
      }
   }

   /* editSquadName Method 
      expects a newSquadName parameter
      sets the property squadName to be newSquadName
   */
   editSquadName(newSquadName) {
      this.squadName = newSquadName;
   }

   /* viewSquad Method 
      returns the squadName and number of elements in the roster array as a formatted string
   */
   viewSquad() {
      return `${this.squadName} - Heroes: ${this.roster.length}`;
   }

   /* viewSquadRoster Method 
      loops through the roster array and builds a string containing all elements in the 
      roster array using the viewHero method to retrieve a formatted element
      returns the built string || returns 'No Heroes' if the roster array is empty
   */
   viewSquadRoster() {
      let rosterList = "";
      if (this.roster.length > 0) {
         this.roster.forEach((member, index) => {
            rosterList += `${index + 1}) ${member.viewHero()}`;
         });
      } else {
         rosterList = "No Heroes";
      }
      return rosterList;
   }
}

export default Squad;
