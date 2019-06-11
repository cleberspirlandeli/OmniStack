const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://crspirlandeli:92novaSenha!@cluster0-6qsry.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use(require('./routes'));

app.listen(3000, () => {
    console.log('Rodando na porta 3000')
})