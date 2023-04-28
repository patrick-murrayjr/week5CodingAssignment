class Hero {
   constructor(heroName, secretIdentity) {
      this.heroName = heroName;
      this.secretIdentity = secretIdentity;
      this.powers = [];
   }

   editHero(newHeroName, newSecretIdentity = this.secretIdentity) {
      this.heroName = newHeroName;
      this.secretIdentity = newSecretIdentity;
   }

   viewHero() {
      return `${this.heroName}: (${this.secretIdentity})\n`;
   }
}

export default Hero;
