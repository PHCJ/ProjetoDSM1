const express = require("express");
const bodyParser = require('body-parser')
const operacao = require('./models/operacao')
const handlebars = require("express-handlebars").engine

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.get("/", function(req, res){
    res.render("inicio")
})

app.get("/negociar", function(req, res){
    res.render("negociar")
})

saldol = 1000

app.post("/comprar", function(req, res){
    saldol -= req.body.valor_compra
    operacao.create({
        saldo: saldol,
        valor_compra: req.body.valor_compra,
        valor_venda: 0
    }).then(function(){
        res.send({
            status: 200,
            message: "Operação realizada com sucesso!"
        })
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

app.post("/vender", function(req, res){
    saldol -= req.body.valor_venda
    operacao.create({
        saldo: saldol,
        valor_compra: 0,
        valor_venda: req.body.valor_venda
    }).then(function(){
        res.send({
            status: 200,
            message: "Operação realizada com sucesso!"
        })
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

app.get("/historico", function(req, res){
    operacao.findAll().then(function(operacao){
        res.render("historico", {operacao})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.listen(8082, function(){
    console.log("Servidor ativo!")
})