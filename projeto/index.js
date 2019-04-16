const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
var inicial = []
var photos = []
var album = []
const port = process.env.PORT || 3000;
const app = express();

function react(){
    const comentarios = Math.random()*5000;
    const like= Math.random()*5000;    /// queria usar essa funcao para retornar no push, mas nao deu 
    const love =Math.random()*5000;
    const enjoo =Math.random()*5000;

    return comentarios, like, love, enjoo;
}
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.get('/',(req,resp)=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((data)=>data.data)
    .then((rows)=>{
        let id = 0;
         rows.forEach((row)=>{
            inicial.push({id:id,...row})
            id++
        })     
        resp.render('index.ejs', {inicial,id})
    })
    .catch((err)=>{
        resp.json({message:"ERRO NO JSON OU NA ROTA DE API"})
    })

});

app.get('/albums?:userId',(req,resp)=>{
    const id = req.params.id;
    axios.get('https://jsonplaceholder.typicode.com/albums?userId'+id)
    .then((data1)=>data1.data)
    .then((rows)=>{
        let userId = req.params.id;
         rows.forEach((row)=>{
            album.push({userId:userId,...row})
        })    
        resp.render('album.ejs', {inicial,id, album,userId})
    })
    .catch((err)=>{
        resp.json({message:"ERRO NO JSON OU NA ROTA DE API"})
    }) 
});

app.get('/photos?:albumId',(req,resp)=>{
    const id = req.params.id;
    axios.get('https://jsonplaceholder.typicode.com/photos?albumId'+id)
    .then((data2)=>data2.data)
    .then((rows)=>{
        const albumId = req.params.id;
        rows.forEach((row)=>{
            photos.push({albumId:albumId, ...row})
        })
        resp.render('photos.ejs', {photos, albumId, inicial, id})
    })
    
}).listen(port);