var express = require('express');
var app = express();
 poort: 3000
app.use(express.static(__dirname + '/public/'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000);