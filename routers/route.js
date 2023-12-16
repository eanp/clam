import express from "express";
const route = express.Router();

route.get("/",  async (req, res, next) => {
    res.render('index', { title: 'Dashboard Clam',test:' ada ada aja'});
});

route.get("/test",  async (req, res, next) => {
    // let html = ejs.render('index',{test:"ada ada aja"})
	// console.log(html)
    res.render('index copy', {test:' ada ada aja',layout: false})
});
route.get("/modal",  async (req, res, next) => {
	let data = res.render('modal',{layout: false})
	data && res.send(data)
	return
});

export default route