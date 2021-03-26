require('dotenv').config();
const massive = require('massive')
const session = require('express-session')
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')


const app = express();
app.use(express.json());
const{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 *7
    }
}))



//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, _ => console.log(`db connected and server running on ${SERVER_PORT}`));
})