import Hero from "./hero.js";
class Squad {
   constructor(squadName) {
      this.squadName = squadName;
      this.roster = [];
   }

   addHero(hero) {
      if (hero instanceof Hero) {
         this.roster.push(hero);
      } else {
         throw new Error("Invalid assignment: Function expects Hero object");
      }
   }

   deleteHero(index) {
      if (this.roster[index] !== undefined) {
         this.roster.splice(index, 1);
      }
   }

   editSquadName(newSquadName) {
      this.squadName = newSquadName;
   }

   viewSquad() {
      return `${this.squadName} - Heroes: ${this.roster.length}`;
   }

   viewSquadRoster() {
      let rosterList = "";
      if (this.roster.length > 0) {
         //rosterList += "--------\n";
         this.roster.forEach((member, index) => {
            rosterList += `${index + 1}) ${member.viewHero()}`;
            // rosterList += `${member.viewHero()}`;
         });
      } else {
         rosterList = "No Heroes";
      }
      return rosterList;
   }
}

export default Squad;
