const  mongoose   = require('mongoose');
const esquema = require('../components/esquemas');
const errores = require('../components/errores');
const status = {
                stat400: 400,
                name400: "Bad Request",
                message400: "The server could not understand the request due to invalid syntax",
                CusMess400: "El servidor no pudo entender la petición debido a la sintaxis inválida",
                stat404: 404,
                name404: "Not Found",
                message404: "The server can not find the requested resource",
                CusMess404: "El servidor no puede encontrar el recurso solicitado"};

//Obtener la lista de palabras activas
exports.GetData = (req, res) => {
    esquema.find({staus: 'active'}, (err, docs) => {
        if(err){
            res.status(status.stat404).send(errores.Errores(status.stat404, status.name404, status.message404, status.CusMess404));
        }else{
            let array = [];
            let arrayAux = [];
            for (let index = 0; index < docs.length; index++) {
                array[index] = {id: docs[index]._id,
                    word: docs[index].word,
                    allowed: docs[index].allowed,
                    dateCreated: docs[index].dateCreated,
                    lastDateUpdate: docs[index].lastDateUpdate};
                    arrayAux[index] = array[index];
                
            }
            res.status(200).send(arrayAux);
        }

    });
}

//Obtener una palabra o frase mediante un id
exports.GetSingleData = (req, res) => {
    const { id } = req.params;
    esquema.findById(id, function (err, docs) {
        
        if (err){
            res.status(status.stat400).send(errores.Errores(status.stat400, status.name400, status.message400, status.CusMess400));
        }
        else{
            
        let Document = {id: docs._id,
            word: docs.word,
            allowed: docs.allowed,
            dateCreated: docs.dateCreated,
            lastDateUpdate: docs.lastDateUpdate};

            res.status(200).send(Document);
        }
    });
}

//crear palabra o frase
exports.InsertData = (req, res) => {
    let date = new Date();
    const data = {
        word: req.body.word,
        allowed: req.body.allowed,
        staus: 'active',
        dateCreated: date,
        lastDateUpdate: date
    };

    esquema.create(data, (err, docs) => {
        if(err || !req.body.word || !req.body.allowed){
            res.status(status.stat400).send(errores.Errores(status.stat400, status.name400, status.message400, status.CusMess400));
        }else{
            res.status(201).send({ id: docs._id,
            word: docs.word,
            allowed: docs.allowed,
            dateCreated: docs.dateCreated,
            lastDateUpdate: docs.lastDateUpdate})
        }
    });
}

//Modificar una palabra o frase mediante su id
exports.UpdateSingleData = (req, res) => {
    let date = new Date();
    const { id } = req.params
    const body = {word: req.body.word,
        allowed: req.body.allowed,
        lastDateUpdate: date}

    esquema.findByIdAndUpdate(id, body, function (err, docs) {
    if (err || !req.body.word || !req.body.allowed){
        res.status(status.stat400).send(errores.Errores(status.stat400, status.name400, status.message400, status.CusMess400));
    }
    else{
        res.status(200).send({id: docs._id,
        word: docs.word,
        allowed: docs.allowed,
        lastDateUpdate: docs.lastDateUpdate
        });
    }
});
}

//haciendo una eliminacion fisica de un documento 
exports.DeleteData = (req, res) => {
    const { id } = req.params
    esquema.findByIdAndDelete(id, function (err, docs) {
        if (err){
            res.status(status.stat400).send(errores.Errores(status.stat400, status.name400, status.message400, status.CusMess400));
        }
        else{
            res.status(200).send({docs});
        }
    });
}

//haciendo una eliminacion lógica de un documento 
exports.DeleteDataLogic = (req, res) => {
    let date = new Date();

    const { id } = req.params;
    const body = {staus: "deleted",
        dateDeleted: date}

    
    esquema.findByIdAndUpdate(id, body, function (err, docs) {
    if (err){
        res.status(status.stat400).send(errores.Errores(status.stat400, status.name400, status.message400, status.CusMess400));
    }
    else{
        let word = docs.word;
        res.status(200).send({status: 200,
            message: 'word ' + word +' deleted',
            customMessage: 'la palabra o frase ' + word +' fue eliminada'
        });
    }
});
    
}