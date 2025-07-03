import { Client } from "pg";
import express from 'express';

const app = express();




// const pgClient = new Client ({
//     user: "neondb_owner",
//     password: "****",
//     port: 5432,
//     host:"****.aws.neon.tech",
//     database:"neondb",
//     ssl: true
// })




// async function main(){
//     await pgClient.connect();
//     const response = await pgClient.query(' SELECT * FROM "User" ');
//     console.log(response.rows);
// }

pgClient.connect();

app.post("/signup" , async(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const response =  await pgClient.query(`INSERT INTO "User" (username, password) VALUES (${username}, ${password})`);
    res.json({

    })

})