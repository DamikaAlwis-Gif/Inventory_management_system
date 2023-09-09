import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "damika",
  database: "inventorydbv2",
  timezone: 'UTC'
});

export default db;
