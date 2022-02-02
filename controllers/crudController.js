const  mongoose   = require('mongoose');
const esquema = require('../components/esquemas');

exports.GetData = (req, res) => {
    esquema.find({}, (err, docs) => {
        let element = [];
        for (let index = 0; index < docs.length; index++) {
            element[index] = docs[index]._id;
            
        }
        console.log(element);
        res.statusMessage = "Documentos encontrados correctamente"
        res.status(201).send({
            docs
        });
    });
}

exports.GetSingleData = (req, res) => {
    const { id } = req.params;
    esquema.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
            res.send({
                docs
            })
        }
    });
}



exports.InsertData = (req, res) => {

    const data = [{
        word: req.body.word,
        allowed: req.body.allowed,
    }]
    console.log(data);

    esquema.create(data, (err, docs) => {
        res.send({ data: docs})
    });
}

exports.UpdateSingleData = (req, res) => {
    const { id } = req.params
    const body = req.body
    esquema.findByIdAndUpdate(id, body, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
        res.send({
            docs
        });
    }
});
}

exports.DeleteData = (req, res) => {
    const { id } = req.params
    esquema.findByIdAndDelete(id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            res.send({
                docs
            })
        }
    });
}