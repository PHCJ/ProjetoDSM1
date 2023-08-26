const database = require('./db');

const Operacoes = database.sequelize.define('operacoes',{
    saldo:{
        type: database.Sequelize.FLOAT
    },
    valor_compra:{
        type: database.Sequelize.FLOAT
    },
    valor_venda:{
        type: database.Sequelize.FLOAT
    }
});

//Operacoes.sync({force:true})

module.exports = Operacoes