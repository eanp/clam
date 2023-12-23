import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config()

const csrf_secret = process.env.CSRF_TOKEN;

export const csrf_print = (payload) => {
    const verifyOpts ={
        expiresIn : '10m'
    }
    const token = jwt.sign(payload,csrf_secret,verifyOpts)
    return token
}

export const csrf_verify = (token) => {
	try{
        console.log("token",token)
        if(token){
            console.log(token)
            let decode = jwt.verify(token,csrf_secret)
            console.log("token success",decode)
            return true
        } else{
			console.log("token not found")
			return false  
        }
    }catch(error){
        if(error && error.name == 'JsonWebTokenError'){
			console.log("invalid token")
            return false      
        } else if(error && error.name == 'TokenExpiredError'){
			console.log("expired token")
            return false       
        } else{
			console.log("inactive token")
            return false       
        }
    }
}

export const csrf_validate = (req,res,next) => {
    let data = req.body;
    if (!csrf_verify(data.token)) {
        return res.header({ "HX-Refresh": true}).send();
    } else {
        return next()
    }
}