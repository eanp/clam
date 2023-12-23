import pg_pool from "../utils/db.js";
import argon2 from "argon2"

// user model //

const selectId = async (data,target) => {
    console.log("model selectId");
	let query_request = `SELECT * FROM users WHERE ${target}='${data}'`
	return await pg_pool(query_request)
};
const login = async (email,password) => {
    console.log("model login");
	let result = await selectId(email,"email")

	if(result.rowCount === 0){
		return "email not found"
	}
	
	let isVerify = await argon2.verify(result.rows[0].password,password)
	return isVerify
};

export const Users = {selectId,login} 