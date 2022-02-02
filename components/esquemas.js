const mongoose = require('mongoose');

const esquema = mongoose.Schema;

const Palabras = new esquema({
    	word: String,
        allowed: Boolean, 
        staus: String,
        dateCreated: Date,
        lastDateUpdate: Date,
        dateDeleted: Date
},
{
    versionKey: false
}
);

module.exports = mongoose.model("Palabras", Palabras);