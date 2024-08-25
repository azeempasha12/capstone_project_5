
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = "mongodb+srv://ishitamalik68:pasha123@cluster0.t3jtoov.mongodb.net/";
const Client = new MongoClient(URL);

// Authentication

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      await Client.connect();
      const db = Client.db('myDatabase');
      const user = await db.collection('UserAuthentication').findOne({ email, password });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Create JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
  
      return res.status(200).json({ message: 'login successfully', token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await Client.close();
    }
});

// Regular expression for Gmail validation
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

// Middleware for verifying JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Attach user info to request object
    next();
  });
};

// Fetch bookmarks
app.get('/bookmarks', authenticateToken, async (req, res) => {
  try {
    await Client.connect();
    const db = Client.db("myDatabase");
    const { userId } = req.user;
    const bookmarks = await db.collection("Bookmarks").find({ userId: ObjectId(userId) }).toArray();
    const tvShows = bookmarks.filter(b => b.type === 'tv');
    const movies = bookmarks.filter(b => b.type === 'movie');
    res.json({ tvShows, movies });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await Client.close();
  }
});

// Delete a bookmark
app.delete('/bookmarks/:id', authenticateToken, async (req, res) => {
  try {
    await Client.connect();
    const db = Client.db("myDatabase");
    const { userId } = req.user;
    const { id } = req.params;
    await db.collection("Bookmarks").deleteOne({ _id: ObjectId(id), userId: ObjectId(userId) });
    res.status(200).json({ message: "Bookmark removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await Client.close();
  }
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
