const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = {
    id: 42,
    name: 'Cotton',
    email: 'cotton.g@gmail.com',
    admin: true,
};

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1000s'});
}

const accessToken = generateAccessToken(user);
console.log('accessToken', accessToken);

app.post('/api/login', (req, res) => {
    if (req.body.email !== user.email) {
        res.status(401).send('Invalid credentials');
    }
    if (req.body.password !== user.password) {
        res.status(401).send('Invalid credentials');
    }

    const accessToken = generateAccessToken(user);
    res.send({
        accessToken,
    });
});

app.listen(3000, () => {
    console.log('Server runnning on port 3000');
})