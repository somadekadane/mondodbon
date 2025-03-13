const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
//vamos carregar os middwares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

//conexao com o servidor de banco de dados
const ulrdb = "mongodb+srv://senac:123senac@projetonode.d0d37.mongodb.net/banco?retryWrites=true&w=majority&appName=ProjetoNode"
// estabelecer a conexao co banco de dados
mongoose.connect(ulrdb,{useNewUrlParser:true, useUnifiedTopology:true});

//Definir a estrutura dos dados
const tabela = new mongoose.Schema({
    nomecliente:String,
    email:String,
    telefone:String,
    Usuario:{type:String, unique:true},
    senha:{type:String, required:true}
});

//criar este modelo de
//banco de dados mongo
const Cliente = mongoose.model("tbclientes",tabela);

app.get("/",(req,res)=>{
    Cliente.find().then((result)=>{
        res.status(200).send({dados:result})
    }); 
        .catch((error)=>.status(500).send({erro}))
    });

app.get("/projeto/teste",(req,res)=>{
    res.send("Voce está em outro servidor");
});

app.post("/inserir", (req,res)=>{
    const rs = new Cliente(req.body);

    rs.save().then((result,error)=>{
        if(error){
            return res.status(500).send({msg:"Erro ao cadastrar"});
        }
        else{
            res.status(201).send({msg:result})
        }
    })
    .catch((er)=>res.status(500).send({msg:er}));
});

// configurações do servidor
app.listen("5000",()=>console.log("Servidor online em http://127.0.0.1:5000"));