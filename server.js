if (process.env.NODE_ENV !== 'praduction') {
    require('dotenv').config()
}





const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const flash = require('express-flash')
const passport = require('passport')

const session = require('express-session')
const initalizePassport = require('./passport-confeg')

initalizePassport(passport,
    email => users.find(user => user.email === email)
)


const users = []
const pprt = process.env.PORT || 3001
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs', { name: ' Olimajon ' })
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login', passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'login',
    failureFlash:true
}))


app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashPassword

        })
        res.redirect('/login')

    }
    catch {
        res.redirect('/register')

    }

    console.log(users)
})





app.listen(pprt, () => {
    console.log(`men ${pprt}chi esshitim`)
})


   //davomi bor
