const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = "mongodb+srv://ishitamalik68:pasha123@cluster0.t3jtoov.mongodb.net/";
const Client = new MongoClient(URL);

// Email validation regex for basic validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

app.post('/user', async (req, res) => {
    try {
        await Client.connect();
        const db = Client.db("myDatabase");
        const { email, password } = req.body;

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format. Only gmail.com addresses are allowed." });
        }

        // Check if email is already registered
        const existingUser = await db.collection("UserAuthentication").findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = { email, password };
        await db.collection("UserAuthentication").insertOne(user);
        res.status(201).json({ message: "Account has been created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    } finally {
        await Client.close();
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        await Client.connect();
        const db = Client.db("myDatabase");
        const user = await db.collection("UserAuthentication").findOne({ email, password });
        if (user) {
            res.status(200).json({message:'login successfully'});
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    } finally {
        await Client.close();
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
