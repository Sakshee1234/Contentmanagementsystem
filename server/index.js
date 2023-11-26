import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import Router from './routes/route.js';
import Post from './model/post.js';
import mongoose from 'mongoose';
import Comment from './model/comment.js'
import User from './model/user.js';
import bcrypt from 'bcrypt';
dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


Connection(username, password);

app.delete('/deletePost',async (req,res)=>{
        const id=req.query.id;
        const objectId = mongoose.Types.ObjectId(id);
        const p = await Post.findById(objectId);

        if (p) {
            await p.delete();
            res.status(200).send({ message: 'Post deleted successfully' });
        } else {
            res.status(404).send({ message: 'Post not found' });
        }
        }
)

app.delete('/deleteComment',async(req,res)=>{
    const id=req.query.id;
    const objectId = mongoose.Types.ObjectId(id);
    const comment = await Comment.findById(objectId);
    if(comment)
    {
        comment.delete();
        res.status(200).send({message:'Comment deleted successfully'});
    }
    else{
        res.status(404).send({message:'Comment not found'});
    }
})
 // Adjust the path as needed

app.post("/register", async (req, res) => {
    const { name, username, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    if(password=='x')
    {
        return res.status(500).json({ error: "error" });
    }
    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({ error: "Username Already Exists" });
        }

        await User.create({
            name,
            username,
            password: encryptedPassword,
        });

        res.json({ status: "ok" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
        
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' }); // 7 days, for example
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
     
      res.json({ token, username: user.name });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

export default app;