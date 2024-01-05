import * as dotenv from "dotenv";
import CryptoJS from 'crypto-js';
import {timeConverter} from "./common.js"
dotenv.config()


const csrf_secret = process.env.CSRF_TOKEN

const encrypted = (data) => {
    return CryptoJS.AES.encrypt(data, csrf_secret).toString();
} 
const decrypted  = (data) => {
    const bytes  = CryptoJS.AES.decrypt(data, csrf_secret);
    return bytes.toString(CryptoJS.enc.Utf8);
} 

export const csrf_print = (req,res,next) => {
    if(req.session.profile){
        console.log("profile session")
        console.log(req.session.profile)
        let stringProfile = JSON.stringify(req.session.profile) 
        let token = encrypted(`${Math.floor(Date.now())}#${stringProfile}`)
        console.log(token)
        req.session.token = token
    } else {
        console.log("no profile session")
        let token = encrypted(`${Math.floor(Date.now())}#guest`)
        console.log(token)
        req.session.token = token
    }   
    return next()
}

export const csrf_validate = (req,res,next) => {
    let form_token = req.body.token;
    let session_token = req.session.token

    let csrf_time = parseInt(decrypted(form_token).split("#")[0])
    console.log("csrf at ", timeConverter(csrf_time))

    let interval = ( Math.floor(Date.now()) -  csrf_time) / 1000
    
    let expired_csrf = 600 - interval

    if (form_token !== session_token || expired_csrf <= 0) {
        console.log("different token")
        return res.header({ "HX-Refresh": true}).send();
    } else {
        return next()
    }
}