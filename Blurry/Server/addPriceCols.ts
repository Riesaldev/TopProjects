import { AppDataSource } from "./src/database/data-source";
async function addPrice() {
  await AppDataSource.initialize();
  try {
    await AppDataSource.query(`ALTER TABLE games ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0;`);
    console.log("Added price to games");
  } catch (e: any) {
    console.log(e.message);
  }
  try {
    await AppDataSource.query(`ALTER TABLE services_status ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0;`);
    console.log("Added price to services_status");
  } catch (e: any) {
    console.log(e.message);
  }
  process.exit();
}
addPrice();

