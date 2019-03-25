const express = require('express')
const app = express();
const Axios = require('axios');
const urlApi = 'https://swapi.co/api/';
const array = [{}]
var films = []
const port = process.env.PORT || 3000;


app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.get('/',(req,resp)=>{
    resp.send({message:'Bem vindo'}).status(200);
})
app.get('/films',(req,resp)=>{
    Axios.default.get('https://swapi.co/api/films')
    .then((data)=>data.data)
    .then((rows)=>{
        let id = 0;
         rows.results.forEach((row)=>{
            films.push({id:id,...row})
            id++
            
        })     
        resp.render('index.ejs', {films})
    })
    .catch((err)=>{
        resp.json({message:err})
    })

});
app.get('/films/:id',(req,resp)=>{
    const id = req.params.id;
    resp.render('data.ejs', {films, id})
}).listen(port);



