import mysql from "mysql";

const db = mysql.createConnection({
  host: "mysql://u0iykdfonc4z1spz:pEX4MLxgMCsOtHEjeiyZ@bjobkmjrqevxml3klckh-mysql.services.clever-cloud.com:3306/bjobkmjrqevxml3klckh",
  user: "u0iykdfonc4z1spz",
  password: "pEX4MLxgMCsOtHEjeiyZ",
  database: "bjobkmjrqevxml3klckh",
  timezone: 'UTC'
});

export default db;
