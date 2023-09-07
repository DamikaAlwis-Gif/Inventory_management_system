import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "damika",
  database: "inventorydbv2",
});

export default db;
