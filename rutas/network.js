const express = require("express");
const router = express.Router();
const crudController = require('../controllers/crudController');


const path = 'user';
//Obtener la lista de palabras activas
router.get('/', (req, res) => {
    crudController.GetData(req, res);
});

//crear palabra o frase
router.post('/', (req, res) => {
    crudController.InsertData(req, res);
});
//Obtener una palabra o frase mediante un id
router.get('/:id', (req, res) => {
    crudController.GetSingleData(req, res);
});
//Modificar una palabra o frase mediante su id
router.put('/:id', (req, res) => {
        crudController.UpdateSingleData(req, res);
    })
//Eliminar de manera lógica una palabra
router.delete('/:id', (req, res) => {
        crudController.DeleteData(req, res);
});



module.exports = router;