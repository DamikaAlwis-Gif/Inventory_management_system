import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@inventory",
  database: "inventorydbv2",
  timezone: 'UTC'
});

export default db;
