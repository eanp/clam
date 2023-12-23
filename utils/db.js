import pkg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL

const {Pool} = pkg;
const pool = new Pool({
	connectionString,
})
const pg_pool = async (query_request) => {
	console.log(query_request)
	return new Promise((resolve, reject) =>
        pool.query(query_request, (err, result) => {
            if (!err) {
                return resolve(result);
            } else {
                reject(err);
            }
        })
    );
}
export default pg_pool