var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
const alert = require('alert')

app.use(bodyParser.json())
app.use(express.static('Public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://mukish:Hsikum%40321@cluster0.minsz0l.mongodb.net/Tyckit');

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "user_name": name,
        "email" : email,
        "phone_no": phno,
        "password" : password
    }

    db.collection('Login').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('home-page.html')

})


app.post("/login_user",(req,res)=>{
    var userid = req.body.input_user;
    var pass = req.body.myInput;


    db.collection('Login').find( {user_name:userid,password:pass} ).toArray(function(err, result) {
        if (err) throw err;
        if (result.length === 0){
            alert("Invalid UserName or Password");
        }
        else{
            console.log('Login successful!');
            return res.redirect('home-page.html')
        }
      });
})

app.get("/",(req,res)=>{
    res.set({
        "Access-control-Allow-Origin": '*'
    })
    return res.redirect('intro-page.html');
}).listen(3000);


app.get("/view", function(req, res){
    user.find({}, function (err, docs){
        if(err) res.json(err);
        else res.render('index', {users: docs})
    });
});
  

console.log("Listening on PORT 3000");