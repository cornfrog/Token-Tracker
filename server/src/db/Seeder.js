/* eslint-disable no-console */
import { connection } from "../boot.js";
import UserSeeder from "./seeders/UserSeeder.js";
import CoinSeeder from "./seeders/CoinSeeder.js";
import UserCoinSeeder from "./seeders/UserCoinSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    // -- uncomment below line to seed 
    //    > users
    //    > coins
    // ====================================
    await CoinSeeder.seed()
    await UserSeeder.seed()
    await UserCoinSeeder.seed()
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
