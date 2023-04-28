class Hero {
   constructor(heroName, secretIdentity) {
      this.heroName = heroName;
      this.secretIdentity = secretIdentity;
      this.powers = [];
   }

   addPower(power) {
      this.powers.push(power);
   }

   deletePower(index) {
      if (this.powers[index] !== undefined) {
         this.powers.splice(index, 1);
      }
   }

   editHeroName(newHeroName) {
      this.heroName = newHeroName;
   }

   editSecretIdentity(newSecretIdentity) {
      this.secretIdentity = newSecretIdentity;
   }

   viewHero() {
      return `${this.heroName}: (${this.secretIdentity})\n`;
   }

   viewPowers() {
      let powerList = "";
      if (this.powers.length > 0) {
         powerList += `Powers\n---------\n`;
         this.powers.forEach((power, index) => {
            powerList += `${index}) ${power}\n`;
         });
      } else {
         powerList = "No Powers";
      }
      return powerList;
   }
}

export default Hero;
