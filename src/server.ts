import express, { Application} from 'express';
import bodyParser from 'body-parser';
const setupDb = require('./DataBase/DbSetup')
const app: Application = express();
// setting up database
setupDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/api/user', require('./Routes/Users'));

app.listen(5000, () => console.log('server started'));