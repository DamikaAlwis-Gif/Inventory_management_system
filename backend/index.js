// to import export add "type":"module"
// without nodemon => node index.js  and to run it again kill the connection
// alter user "root" @ "localhost" identified with mysql_native_password by "damika";
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'damika';

import express from "express";
const app = express();
import resourceRouter from "./routes/resource.js";
import authRouter from "./routes/auth.js";
import checkoutRouter from "./routes/checkout.js";
import checkinRouter from "./routes/checkin.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import reportRouter from "./routes/report.js"; 

import accessRouter from "./routes/access.js";

import reservRouter from "./routes/reserv.js";
import maintenanceRouter from "./routes/maintenance.js";


app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.listen(8800, () => {
  console.log("Connected to backend!");
});
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Hello this is backend");
});
app.use("/resources", resourceRouter);
app.use("/auth", authRouter);
app.use("/checkout", checkoutRouter);
app.use("/checkin", checkinRouter);
app.use("/report", reportRouter);

app.use("/access", accessRouter);

app.use("/reservations", reservRouter);
app.use("/maintenance", maintenanceRouter);

