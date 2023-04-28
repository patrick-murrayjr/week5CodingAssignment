/*  Hero Class
    Models a Superhero. 
    
    author: Patrick Murray

*/
class Hero {
   constructor(heroName, secretIdentity) {
      this.heroName = heroName;
      this.secretIdentity = secretIdentity;
   }

   /* editHero Method 
      Used to update the heroName and secretIdentity proprties.
      If the function call does not include a newSecretIdentity then
      the secretIdentity property will remain unchanged 
   */
   editHero(newHeroName, newSecretIdentity = this.secretIdentity) {
      this.heroName = newHeroName;
      this.secretIdentity = newSecretIdentity;
   }

   /* viewHero Method
      returns the heroName and secretIdentity as a formatted string
   */
   viewHero() {
      return `${this.heroName}: (${this.secretIdentity})\n`;
   }
}

export default Hero;
