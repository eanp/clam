import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import moment from "moment";
import expressLayouts from "express-ejs-layouts";
import router from "./routers/route.js";
import { csrf_print } from "./utils/csrf.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.disable('etag');

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
    app.use(cookieParser());

app.set("view engine", "ejs");
app.set('layout', 'partials/layout-main');
app.use(expressLayouts);

app.use(function (req, res, next) {
    let user = req.session.profile || {user:"guest"}
    moment.locale("id")
    res.locals.csrf_token = csrf_print(user) 
    res.locals.profile = user;
    res.locals.moment = moment;
    next();
});

// morgan
app.use(morgan("dev"));

app.use(router);

app.use((req, res, next) => {
    let user = req.session.profile
    console.log(user)
    if (user) {
        return next()
    } else {
        return res.redirect("/auth-login");
    }
});

app.listen(process.env.PORT, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:3000`)
);
