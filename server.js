const fs = require('fs');
const express = require('express');
var app = express();

const PORT = process.env.PORT || 5000;

app.set('view-engine','hbs');
app.use('/assets',express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var date = new Date().toString();
  var url = req.url;
  var method = req.method;
  var log = `->${date}\n>${url}\n>${method}\n\n`;
  fs.appendFile('log.txt', log, (err)=>{
    if(err)
    console.log(`Error logging the request.\n${err}`);
  })
  next();
})

app.get('/',(req, res)=>{
  res.render('index.hbs',{username:'Franco'});
});

app.use((req,res)=>{
  res.send('<h1>ERROR 404</h1><h2>ROUTE NOT FOUND</h2>');
});

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`);
});
