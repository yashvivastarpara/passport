const express = require("express");
const app = express();
const{connectmongoose,User}=require("./db.js");
const ejs = require("ejs");
const passport = require("passport");
const {initializingPassport} = require("./passportconfig.js")

connectmongoose();

initializingPassport(passport);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(expressSession({secret:"secret"}))

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/register",async(req,res)=>{
    const user = await User.findOne({username: req.body.username});
    if (user)return res.status(400).send("usrers already exist");
    const newUser = await User.create(res.body);
    res.status(201).send(newUser);
})

app.post("/login",passport.authenticate("local"),{
    faliureRedirect : "/register",
    successResirect : "/"
})
app.listen(3606,()=>{
    console.log("listining port on http://localhost:1234");
})