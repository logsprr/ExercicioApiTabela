const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
var full = []
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
// app.get('/',(req,resp)=>{
//     resp.send({message:'EJS JSONPLACEHOLDER'}).status(200);
// })
axios.delete('https://jsonplaceholder.typicode.com/posts/1');
app.get('/',(req,resp)=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((data)=>data.data)
    .then((rows)=>{
        let id = 0;
         rows.forEach((row)=>{
            full.push({id:id,...row})
            id++
        })     
        resp.render('index.ejs', {full,id})
    })
    .catch((err)=>{
        resp.json({message:err})
    })

});
app.get('/posts/:id',(req,resp)=>{
    const id = req.params.id;
    resp.render('data.ejs', {full, id})
});

app.delete('/posts/:id',(req,resp)=>{
    const id = req.params.id;
    resp.render('index.ejs', {full, id})
    console.log(resp.data);
}).listen(port);

