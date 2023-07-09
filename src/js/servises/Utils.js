export class Utils {
    static random(min, max) {
      return Math.floor(min + Math.random() * (max - min));
    }
  }
  