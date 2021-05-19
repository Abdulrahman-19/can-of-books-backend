'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const getData=require('./models/user')
const MONGO_URL=process.env.MONGO_URL
const app = express();
const port = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());
app.get('/', homePage);

function homePage(req,res){
  console.log('hello')
  res.send('hello');
}

app.get('/books', getData.filterData);

mongoose.connect(
  `${MONGO_URL}/books`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);


function seedOwnerCollection() {

  const abed = new getData.myOwnerModel({
      email: 'abedabogneem@gmail.com',
      books: [
          {
              name: 'How to code part 1',
              description: 'watch youtube tutorial',
              status: 'unavailable'
          },
          {
              name: 'How to code part 2',
              description: 'watch youtube tutorial',
              status: 'available'
          }
      ]
  });
  const mohammad = new getData.myOwnerModel({
      email: 'morjaradat66@gmail.com',
      books: [
          {
              name: 'How to code part 3',
              description: 'watch youtube tutorial',
              status: 'unavailable'
          },
          {
              name: 'How to code part 4',
              description: 'watch youtube tutorial',
              status: 'available'
          }
      ]
  });
  abed.save();
  mohammad.save();
}
// seedOwnerCollection();

app.post('/books', addNewBook);

function addNewBook(req, res) {
  const { email , bookName, description , status } = req.body;
  getData.myOwnerModel.find({ email: email }, (error, ownerData) => {
    if (error) res.send('didnt work creat');
      ownerData[0].books.push({
          name: bookName,
          description : description ,
          status: status
      })
      ownerData[0].save();
      res.send(ownerData[0].books);
  });
}

app.delete('/books/:index', deleteBook);

function deleteBook (req, res){
const index = Number(req.params.index)
const { email } = req.query;
getData.myOwnerModel.find({ email: email }, (error, ownerData) => {
  if (error) res.send('didnt work delete');
  const newBookArr = ownerData[0].books.filter((books, idx) => {
      return idx !== index
  });
  ownerData[0].books = newBookArr;
  ownerData[0].save();
  res.send(' Book deleted!')
});
}
app.put('/books/:index', updateBook);

function updateBook (req, res){
  const index = Number(req.params.index)
  const { email , bookName ,description , status } = req.body;
  getData.myOwnerModel.find({ email: email }, (error, ownerData) => {
    if (error) res.send('didnt work Update');
    ownerData[0].books.splice(index , 1 , {
      name: bookName,
      description : description ,
      status: status
    }) 
    ownerData[0].save();
    res.send(ownerData[0].books)
  });
}

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
