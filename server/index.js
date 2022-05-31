const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql  = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "CodeAuction"
  });
  app.get('/teams', (req, res) => {
    con.query("SELECT * FROM leaderboard", function (err, result, fields) {
      if (err) console.log(err);
      res.send(result);
    });

  app.get('/questions',(req,res)=>{
    con.query("SELECT TeamName , QuestionName , SoldPrice,type FROM leaderboard NATURAL JOIN question ORDER BY TeamName",function(err,result,fields){
      if(err) console.log(err);
      console.log(result)
      res.send(result);

    })

  });
   

  });
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
app.put('/update',updateValue);
app.listen(PORT,()=>{
    console.log(`Server is running on $(PORT)`);
})

function updateValue(req,res){
  var body = req.body.body;
  console.log(req.body);
  if(body === undefined){
    res.statusMessage = "please send a valid body to update record";
    res.statusCode = 400;
    res.end();
    return
  }
  console.log(body);
  const {TeamName,QuestionName,price,type} = body;
  console.log(`TeamName `,TeamName);
  var query1 = "Update leaderboard set coins = coins - ? where teamname = ?" ;
  var query2 = "insert into question values(?,?,?,?) ";
  var queryParams = [price,TeamName];
  

  con.query(query1, queryParams, function(err,results){
    if(err){
      res.statusMessage = "an error has occurred";
      res.statusCode = 400;
      res.end();
  
    }
   
})
queryParams =[QuestionName,type,price,TeamName,];
con.query(query2, queryParams, function(err,results){
  if(err){
    res.statusMessage = "an error has occurred";
    res.statusCode = 400;
    res.end();

  }
 
})
res.statusMessage = "updated successfully";
res.statusCode = 200;
res.end();


}

