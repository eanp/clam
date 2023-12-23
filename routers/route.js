import express from "express";
import { csrf_print, csrf_validate } from "../utils/csrf.js";
import { Users } from "../models/pool.js";
import argon2 from "argon2";
import {auth} from "../utils/common.js"
const route = express.Router();

route.get("/test",auth, async (req, res, next) => {
    let result = await Users.selectId('test@test.com',"email")
    let password = await argon2.hash("12345678")
    console.log(password)
    res.send(result.rows[0])
});


route.get("/", auth,async (req, res, next) => {
    res.render("index", { title: "Dashboard Clam" });
});

route.get("/auth-login", async (req, res, next) => {
    let user = req.session.profile
    if (user) {
        return res.redirect("/");
    }
    res.render("auth/auth-login", {
        title: "Login Clam",
        csrf_token: csrf_print({ user: "guest" }),
        layout: false,
    });
});

route.post("/auth-login", csrf_validate, async (req, res, next) => {
    let data = req.body;
    let csrf_token = csrf_print({ user: "guest" });
    let helper = { csrf_token, layout: false };
    let isVerify = await Users.login(data.email,data.password)
    let result

    switch(isVerify){
        case false:
            result = res.render("auth/form-login", {
                ...helper,
                messages:"wrong password",
                status:"error",
                
            });
            result && res.send(result);
            return;
        case "email not found":
            result = res.render("auth/form-login", {
                    ...helper,
                    status:"error",
                    messages:"account not found"
            });
            result && res.send(result);
            return;
        case true:
            delete data.password
            req.session.profile = data;
            res.header({ "Hx-redirect": "/"}).send("Login successful!");
            return;
    }
});

route.get("/auth-logout", async (req, res, next) => {
    req.session.destroy();
    res.redirect("/auth-login");
});

route.get("/modal", async (req, res, next) => {
    let data = res.render("modal", { layout: false });
    data && res.send(data);
    return;
});

export default route;
