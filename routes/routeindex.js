const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post');


// Ruta usada para ir a HOME y muestra todos los posts actuales
router.get('/', async function(req,res){

  // Consulta a la db para recuperar todos los posts 
  let posts = await Post.find()
  res.render('index', {posts});
});

// Para ir a la pagina de NEW POST
router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

// Para enviar los datos del nuevo post al server
router.post('/newPost', async (req,res) =>{

  let post = new Post(req.body) // Como post_date es opcional, no lo tenemos que afuerza agregar
  await post.save()

  res.redirect("/");  
});

module.exports = router;