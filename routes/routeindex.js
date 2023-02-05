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

// Eliminar un post
router.get('/delete/:id', async (req,res) =>{
  let id = req.params.id
  await Post.remove({_id:id});
  res.redirect('/')
});

// Editar un post -> ruta 1 de 2 . Esta solo es para redirigir a edit.ejs
router.get('/edit/:id', async (req,res) =>{

  let id = req.params.id
  let post = await Post.findById(id)
  res.render('edit', {post}) // edit.ejs ya tiene a su disposicion el objeto 'post'
});

// Editar un post -> ruta 2 de 2 . Para actualizar los datos.
router.post('/edit/:id', async (req,res) =>{

  let id = req.params.id
  await Post.updateOne({_id: id}, req.body)

  res.redirect('/') // edit.ejs ya tiene a su disposicion el objeto 'post'
});


module.exports = router;