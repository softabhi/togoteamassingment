import { db } from "../db/database.js";
import  Jwt  from "jsonwebtoken";
import nodemailer from "nodemailer"

// ixws gblb avzw rufx

const jwtSecret = "fdsdeg4521serfs"







export const allUser  = (req, res) =>{
    const query = 'SELECT * FROM customers';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving users');
            return;
        }
        res.json(results);
    });
}



export const deleteUser = (req,res) =>{
    const name = req.params.name;
    const query = 'DELETE FROM customers WHERE name=?';

    db.query(query, [name], (err) => {
        if (err) throw err;
        res.json({ message: 'Item deleted successfully', name });
    });
}




export const registerUser = (req,res) =>{

    console.log(req.body)

    const { name, email, password, repassword } = req.body;

    const imagePath = req.file.path;
     
    console.log(imagePath)

    const query = 'INSERT INTO customers (name, email, password, repassword, userImg) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, password, repassword, imagePath], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ success: true, message: 'User registered successfully' });
    });



    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "kdhar499@gmail.com",
          pass: "ixws gblb avzw rufx",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <kdhar499@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Thank You For Register As TadkaShop Member</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);


}




export const userLogin = (req,res) =>{
    const { email, password } = req.body;

    const query = 'SELECT * FROM customers WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }


       let user = results[0];

        if (results.length > 0) {
            // User found, login successful


            // Create JWT token
            const token = Jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
                expiresIn: '1h', // Token expiration time
            });

            res.json({ success: true, message: 'Login successful', results, token });
        } else {
            // User not found or password incorrect
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
}


// export const deleteUser = (req,res) =>{
    
// }


export const allUserName  = (req, res) =>{
    const query = 'SELECT name FROM customers';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving users');
            return;
        }
        res.json(results);
    });
}



export const registerEmpolye = (req,res) =>{

    console.log(req.body)
    // console.log("mona")

    const { first_name, last_name, contact_num, salary, age, department, city ,country } = req.body;



    const query = 'INSERT INTO employee ( first_name, last_name, contact_num, age, salary,  department, city ,country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [ first_name, last_name, contact_num, age, salary, department, city ,country], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ success: true, message: 'User registered successfully' });
    });
}