import express from "express";
import { csrf_print, csrf_validate } from "../utils/csrf.js";
import { Users } from "../models/pool.js";
import { auth } from "../utils/middleware.js";
import argon2 from "argon2";
const route = express.Router();

route.get("/test", auth, async (req, res, next) => {
    let result = await Users.selectId("test@test.com", "email");
    let password = await argon2.hash("12345678");
    console.log(password);
    res.send(result.rows[0]);
});

route.get("/", auth, csrf_print, async (req, res, next) => {
    res.render("index", { title: "Dashboard Clam" });
});

route.get("/auth-login", csrf_print, async (req, res, next) => {
    if (req.session.profile) {
        res.redirect("/");
    }
    res.render("auth/auth-login", {
        title: "Login Clam",
        layout: false,
        token: req.session.token,
    });
});

route.get("/auth-register", csrf_print, async (req, res, next) => {
    if (req.session.profile) {
        res.redirect("/");
    }
    res.render("auth/auth-register", {
        title: "Register Clam",
        layout: false,
        token: req.session.token,
    });
});

route.post("/auth-login", csrf_validate, csrf_print, async (req, res, next) => {
    let data = req.body;
    let helper = { layout: false, token: req.session.token };
    let isVerify = await Users.login(data.email, data.password);
    let result;

    switch (isVerify) {
        case false:
            result = res.render("auth/form-login", {
                ...helper,
                messages: "wrong password",
                status: "error",
            });
            result && res.send(result);
            return;
        case "email not found":
            result = res.render("auth/form-login", {
                ...helper,
                status: "error",
                messages: "account not found",
            });
            result && res.send(result);
            return;
        case true:
            delete data.password;
            req.session.profile = data;
            res.header({ "Hx-redirect": "/" }).send("Login successful!");
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
