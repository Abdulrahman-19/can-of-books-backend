const mongoose = require('mongoose');

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

function filterData(req, res) {
    
        const { email } = req.query;
        // console.log(email);
        myOwnerModel.find({ email: email }, function (err, ownerData) {
            if (err) res.send('didnt work');
            // console.log(ownerData[0].books);
            return res.send(ownerData[0].books);
        });
    
    // res.send(getbooksByOwner())
}
module.exports= {
    filterData,
    myOwnerModel,
    myBookModel,
};