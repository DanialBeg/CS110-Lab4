const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChatSchema = new Schema ({
    room: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        default: 'username'
    },
    dateOfEntry: {
        type: Date,
        default: Date.now(),
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
module.exports = Item = mongoose.model('chat', ChatSchema);