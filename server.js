const express=require("express")
const app = express()
const fs=require('fs');
const bp=require('body-parser');
app.use(bp.urlencoded({ extended: false }))
const port = 3000
app.set("view engine","ejs")
app.use(express.static('public'));

var s,r;
app.get('/', (req, res) => {
  res.render('index');
})
app.get('/Accounts.ejs', (req, res) => {
  fs.readFile('./bs.json',(err,data1)=>{
res.render('Accounts',{data:JSON.parse(data1)});
  })
  
})
app.get('/MoneyTransfer.ejs', (req, res) => {
    res.render('MoneyTransfer');
  })
app.get('/TransactionHistory.ejs', (req, res) => {
  fs.readFile('./history.json',(err,data)=>{
    res.render('TransactionHistory',{data:JSON.parse(data)});
  })
  
})
app.get('/FAQ.ejs', (req, res) => {
  res.render('FAQ');
})
app.get('/Contact.ejs', (req, res) => {
  res.render('Contact');
})
app.post('/ds',(req,res)=>{
fs.readFile('./bs.json',(err,data1)=>{
 let data=JSON.parse(data1);
 for(let i=0;i<11;i++){
   if(data.AccountId[i]==parseInt(req.body.sa_id))s=i;
   else if(data.AccountId[i]==parseInt(req.body.ra_id))r=i;
 }
data.balance[s]=data.balance[s]-parseInt(req.body.attr);
data.balance[r]=data.balance[r]+parseInt(req.body.attr);
fs.writeFile('./bs.json',JSON.stringify(data),(err)=>{
  if(err)throw err;
  fs.readFile('./history.json',(err1,his)=>{
   let histo=JSON.parse(his);
   histo.history.push([data.AccountId[s],data.AccountId[r],parseInt(req.body.attr)]);
   fs.writeFile('./history.json',JSON.stringify(histo),(err)=>{
     if(err)throw err;
     console.log('History saved');
   })
  })
  res.redirect('/Accounts.ejs');
})  
})
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

