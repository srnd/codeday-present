export default class Config {
  static async get(id) {
    if (typeof(window) === 'undefined') {
      require('dotenv').config({ path: '.env' })
      return process.env[id];
    } else return null;
  }
}