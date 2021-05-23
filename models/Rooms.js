const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoomsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    dateOfEntry: {
        type: Date,
        default: Date.now()
    },
    comments: {
        type: Array,
        required: true
    },
    userComments: {
        type: Array,
        required: true
    },
    dateArr: {
        type: Array,
        required: true
    }
});
module.exports = Item = mongoose.model('user', RoomsSchema);