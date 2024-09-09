const mongoURI = process.env.MONGO_URI
const mongoose = require('mongoose');
mongoose.connect(mongoURI)

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true 
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);


module.exports = { User, Account };
