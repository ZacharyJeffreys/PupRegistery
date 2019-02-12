const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

module.exports = function(app){

//connect to Mongo db,
var db

MongoClient.connect('mongodb+srv://testtest1:testtest1@cluster0-iyzox.mongodb.net/test?retryWrites=true', (err, client)=>{
  if(err) return console.log(err)
  db = client.db('dogs')

  app.listen(3000, ()=>{
    console.log('listening ot port 3000')
  })
})
app.set('view engine', 'ejs')
//extract data from the form
app.use(bodyParser.urlencoded({extended: true}))

//get info from browser
app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/index.html')
})
app.get('/dogs', (req,res)=>{
  //res.sendFile(__dirname + '/index.html');
  db.collection('dogs').find().toArray(function(err,results){
    if(err) return console.log(err);
    //renders index.ejs
    res.render('index.ejs', {dogs: results})
  })
});
app.get('/store',(req,res)=>{
  res.render(__dirname + '/views/store.ejs')
})

//Post from db
app.post('/dogs', (req,res)=>{
  db.collection('dogs').save(req.body, (err, result)=>{
    if(err) return console.log(err)

    console.log('saved to database');
    console.log(result);
    //res.redirect('/')
  })
})

}
