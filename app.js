import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import userRouter from "./routes/user.Routes.js";
import enquiryRouter from "./routes/enquiry.Routes.js";
import cardRouter from "./routes/card.Routes.js";
import digitalRouter from "./routes/digitalCard.Routes.js";
import radioRouter from "./routes/radio.Routes.js";
import transitRouter from "./routes/transit.Routes.js";
import outdoor from "./routes/outdoor.Routes.js";
import newsRoutetr from "./routes/newpaper.Routes.js";
import tvRouter from "./routes/television.Routes.js"
import aiportRouter from "./routes/aiport.Routes.js";
import magazineRouter from "./routes/magazines.Routes.js";
import btlRouter from "./routes/btl.Routes.js";
import vanRouter from "./routes/mobilevan.Routes.js";
import metrotrainRouter from "./routes/metrotrain.Routes.js";
// import contactRouter from "./routes/contact.Route.js";
const app = express();
app.use(cors());
// setup to access the permission of the cors

// app.use((req, res, next) => {
//     console.log('Incoming request:', req.body, req.file);
//     next();
//   });

// configuration
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// To acess and set the user server cookies.
app.use(cookieParser());

//routes path define
app.use("/api/v1/users", userRouter);
app.use("/api/v1/enquiry", enquiryRouter);
app.use("/api/v1/card", cardRouter);
app.use("/api/v1/digital", digitalRouter);
app.use("/api/v1/transit", transitRouter);
app.use("/api/v1/radio", radioRouter);
app.use("/api/v1/outdoor", outdoor);
app.use("/api/v1/news",newsRoutetr);
app.use("/api/v1/tv", tvRouter);
app.use("/api/v1/airport", aiportRouter);
app.use("/api/v1/magazine", magazineRouter);
app.use("/api/v1/mobilevan",vanRouter);
app.use("/api/v1/btl", btlRouter);

app.use("/api/v1/metrotrain", metrotrainRouter);

export { app };
