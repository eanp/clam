import express from "express";
import { csrf_verify } from "../utils/csrf.js";
const route = express.Router();

route.get("/", async (req, res, next) => {
    res.render("index", { title: "Dashboard Clam" });
});

route.get("/auth-login", async (req, res, next) => {
    res.render("auth/auth-login", {
        title: "Login Clam",
        layout: false,
    });
});

route.post("/auth-login", async (req, res, next) => {
    let data = req.body;

	console.log("checker csrf ",csrf_verify(data.token))

	if(!csrf_verify(data.token)){
		console.log("csrf verify")
		res.redirect("/auth-login");
		return;
	}

    if (data.email === "test@test.com" && req.body.password === "12345678") {
        req.session.profile.email = data.email;
        res.redirect("/");
        return;
    } else if (
        data.email === "test@test.com" &&
        req.body.password !== "12345678"
    ) {
        let result = res.render("components/alert", {
            status: "alert",
            layout: false,
        });
        result && res.send(result);
        return;
    } else {
        let result = res.render("components/alert", {
            status: "alert",
            layout: false,
        });
        result && res.send(result);
        return;
    }
    // req.session.profile = {
    // 	email: "clam@test.com",
    // };
    let result = res.render("modal", { layout: false });
    result && res.send(result);
    return;

    res.redirect("/");
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
