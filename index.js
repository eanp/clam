import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import moment from "moment";
import expressLayouts from "express-ejs-layouts";
import router from "./routers/route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.disable('etag');

app.use(cookieParser());
app.use(
    session({
        name: "mysecretKeySandbox",
        secret: "secretKeySandbox",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
    );

app.set("view engine", "ejs");
app.set('layout', 'partials/layout-main');
app.use(expressLayouts);

app.use(function (req, res, next) {
    moment.locale("id")
    res.locals.profile = req.session.profile;
    res.locals.moment = moment;
    next();
});

// morgan
app.use(morgan("dev"));

app.use(router);

app.listen(process.env.PORT, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:3000`)
);
