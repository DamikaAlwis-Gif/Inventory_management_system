import mysql from "mysql";

const db = mysql.createConnection({
  host: "bjobkmjrqevxml3klckh-mysql.services.clever-cloud.com",
  user: "u0iykdfonc4z1spz",
  password: "pEX4MLxgMCsOtHEjeiyZ",
  database: "bjobkmjrqevxml3klckh",
  timezone: 'UTC'
});

export default db;
