'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 8081;
app.use(cors());

mongoose.connect(
  'mongodb://localhost:27017/books',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String
});
const ownerSchema = new mongoose.Schema({
    email: String,
    books: [bookSchema]
})

const myBookModel = mongoose.model('books', bookSchema);
const myOwnerModel = mongoose.model('owners', ownerSchema);

function seedBookCollection() {
  const book1 = new myBookModel({
      name: 'How to code part 1',
      description: 'watch youtube tutorial',
      status: 'unavailable'
  });
  const book2 = new myBookModel({
    name: 'How to code part 2',
    description: 'watch youtube tutorial',
    status: 'available'
});
  console.log(book1);
  console.log(book2);

  book1.save();
  book2.save();
}
// seedBookCollection();
function seedOwnerCollection() {

  const abed = new myOwnerModel({
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
  const mohammad = new myOwnerModel({
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

app.get('/', homePage);
app.get('/books', getbooksByOwner);

function homePage(req,res){
  res.send('hello');
}
function getbooksByOwner(req, res) {
  const { email } = req.query;
  console.log(email);
  myOwnerModel.find({ email: email }, function (err, ownerData) {
      if (err) res.send('didnt work');
      console.log(ownerData[0].books);
      res.send(ownerData[0].books);
  });
}




app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
