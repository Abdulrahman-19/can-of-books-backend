const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL=process.env.MONGO_URL
const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String
});
const ownerSchema = new mongoose.Schema({
    email: String,
    books: [bookSchema]
})

function filterData(req, res) {
    mongoose.connect(
        `${MONGO_URL}/books`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    

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

        const { email } = req.query;
        // console.log(email);
        myOwnerModel.find({ email: email }, function (err, ownerData) {
            if (err) res.send('didnt work');
            // console.log(ownerData[0].books);
            return res.send(ownerData[0].books);
        });
    
    // res.send(getbooksByOwner())
}
module.exports= filterData;