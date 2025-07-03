import { Client } from "pg";
import express from 'express';

const app = express();
app.use(express.json());





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

    try{
        //const response =  await pgClient.query(`INSERT INTO "User" (username, password) VALUES ('${username}', '${password}')`);
            const response =  await pgClient.query('INSERT INTO "User" (username, password) VALUES ($1, $2)', [username, password]);
    res.json({
            message: "User created successfully"
    })

    }catch(e){
        res.json({
            message : 'error creating user',
        })
    }

    

})

app.listen(3000);