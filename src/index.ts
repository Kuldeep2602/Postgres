import { Client } from "pg";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const pgClient = new Client(process.env.DATABASE_URL);




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

// app.post("/signup" , async(req, res) =>{
//     const username = req.body.username;
//     const password = req.body.password;
//     const email = req.body.email;

//     const city = req.body.city;
//     const country = req.body.country;
//     const street = req.body.street;
//     const pincode = req.body.pincode;

//     try{
//         //const response =  await pgClient.query(`INSERT INTO "User" (username, password) VALUES ('${username}', '${password}')`);
            
//         const InsertQuery = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id;`
//         const AddQuery = `INSERT INTO addresses (city, country, street, pincode) VALUES ($1, $2, $3, $4)`;

        
        
         
//        await pgClient.query("BEGIN;")
        
        
//         const response = await pgClient.query(InsertQuery, [username, password, email]);
//         const userId = response.rows[0].id; // Get the inserted user ID
//        console.log("User ID:", userId);
//         const res1 = await pgClient.query(AddQuery, [city, country, street, pincode]);
        

//         await pgClient.query("COMMIT;")


//         //const response =  await pgClient.query('INSERT INTO "User" (username, password) VALUES ($1, $2)', [username, password]);
//     res.json({
//             message: "User created successfully"
//     })

//     }catch(e : any){
//         console.log(e);
//         res.json({
//             message : 'error creating user',
//             error: e.message
//         })
//     }

    

// })





app.post("/signup", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;

    try {
        // Start transaction
        await pgClient.query("BEGIN;");
        
        try {
            const InsertQuery = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id;`
            const AddQuery = `INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)`;
            
            const response = await pgClient.query(InsertQuery, [username, password, email]);
            const userId = response.rows[0].id; // Get the inserted user ID
            console.log("User ID:", userId);
            const res1 = await pgClient.query(AddQuery, [ userId, city, country, street, pincode]);
            
            // Commit transaction
            await pgClient.query("COMMIT;");

            
            
            res.json({
                message: "User created successfully"
            });
        } catch (err) {
            // Rollback transaction if any error occurs
            await pgClient.query("ROLLBACK;");
            throw err; // Re-throw to be caught by the outer catch block
        }
    } catch (e: any) {
        console.log(e);
        res.json({
            message: 'error creating user',
            error: e.message
        });
    }
});


 app.listen(3000);