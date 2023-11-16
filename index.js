const connectToMango=require('./database.js');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

connectToMango();
const app=express()
app.use(bodyParser.json());
app.use(cors());

app.use(express.json())
const port = 5501
app.use(express.urlencoded({extended:true}));



app.use('/api/vendorauth',require('./routes/vendorauth'))
app.use('/api/customerauth',require('./routes/customerauth'))
app.use('/api/itemdetails',require('./routes/itemdetails'))
app.use('/api/bidding',require('./routes/bidding'))
app.use(express.static(path.join(__dirname, 'Frontend')));
app.get('*', (req, res) => {
  let fileName;


  if (req.path.includes('customersignup')) {
    fileName = 'customersignup.html';
  } else {
    fileName = 'VendorSignup.html';
  }

  console.log(`Request received for ${fileName}`);
  res.sendFile(path.join(__dirname, 'Frontend', fileName));
});

app.listen(port,'127.0.0.1', () => {
  console.log(`Bidnvent backend listening on http://127.0.0.1:${port}`)
})