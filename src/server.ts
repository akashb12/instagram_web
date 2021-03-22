import express, { Application} from 'express';
import bodyParser from 'body-parser';
import path from 'path'
const setupDb = require('./DataBase/DbSetup')
const app: Application = express();
// setting up database
setupDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/api/user', require('./Routes/Users'));

app.use('/api/follow', require('./Routes/Followers'));

app.use('/api/post', require('./Routes/Posts'));

app.use('/api/like', require('./Routes/Likes'));

app.use('/api/comment', require('./Routes/Comments'));

app.use('/api/reply', require('./Routes/Replies'));

app.use('/uploads', express.static('uploads'));


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }
app.listen(5000, () => console.log('server started'));