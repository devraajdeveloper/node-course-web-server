const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if(err)
    {
      console.log('Unable to write in file');
    }
  });
  next();
})

// app.use((req,res,next)=>{
//   res.render('mantainence.hbs');
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('capitalize',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
// res.send('Hello Express');
// res.send({
// name:'Rajesh',
// likes:[
//   'Coading',
//   'cooking'
// ]
// });
res.render('home.hbs',{
  pageTitle:'Home Page',
  message:'Welcome to the first page',
})
});
app.get('/about',(req,res)=>{
// res.send('About');
res.render('about.hbs',{
  pageTitle:'About Page',
});
});
app.get('/bad',(req,res)=>{
res.send({
  errorMessage:'Some error occured'
});
});
app.listen(3000,()=>{
  console.log('server started on port 3000');
});
