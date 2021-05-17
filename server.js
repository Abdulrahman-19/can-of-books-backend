'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const filterData=require('./models/user')

const app = express();
const port = process.env.PORT || 8081;
app.use(cors());

app.get('/', homePage);

function homePage(req,res){
  console.log('hello')
  res.send('hello');
}

app.get('/books', filterData);



app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
