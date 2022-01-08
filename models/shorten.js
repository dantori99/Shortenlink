const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ShortenSchema = new mongoose.Schema({
    urlText: {
        type: 'String',
        required: true,
        lowercase: true,
    },
    generatedLink: {
        type: 'String',
        required: true,
        lowercase: true,
    }
})

ShortenSchema.plugin(mongooseDelete, { overrideMethods: "all" })

const Shorten = mongoose.model('Shorten', ShortenSchema);

module.exports = Shorten;