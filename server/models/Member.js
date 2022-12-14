const mongoose = require('mongoose');

const  MemberSchema = new mongoose.Schema({
    firstName: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    },
    age: {
        type: 'number',
        required: true,
        min: 18,
        max: 65
    },
    batch: {
        type: 'string',
        required: true
    },
})


const Member = mongoose.model('Yoga_Member', MemberSchema)

module.exports = Member