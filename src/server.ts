import express, { Application} from 'express';
import bodyParser from 'body-parser';
const setupDb = require('./DataBase/DbSetup')
const app: Application = express();
// setting up database
setupDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('./uploads', express.static('uploads'));
// routes
app.use('/api/user', require('./Routes/Users'));

app.use('/api/post', require('./Routes/Posts'));

app.use('/api/like', require('./Routes/Likes'));

app.use('/api/comment', require('./Routes/Comments'));

app.use('/api/reply', require('./Routes/Replies'));

app.listen(5000, () => console.log('server started'));