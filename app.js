var express = require("express");
var mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://usuario:senha@cluster0.gcljv.mongodb.net/escola?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, ()=>{
    console.log("servidor na porta "+port)
});
app.get("/", (req, res) => {
    res.send("pagina inicial")
});

app.get("/cadastrarAluno", (req, res)=>{
    res.render("formalunos");
})

const Alunos = mongoose.model("alunos", {
    nomealuno: String,
    nomeresp: String,
    contato_: Number,
    endereco: String,
    matricula: Number,
});

app.set("view engine", "ejs");
// use como o motor de visualização o ejs
app.set("views", __dirname, "/views");
// app.set("views", __dirname+"/views"); é qual vai ser a visualização
app.use(express.urlencoded());
// dizer que os dados podem passar de uma pag para outra
app.use(express.json());


app.post("/cadastrarAluno", (req, res)=>{
    let alunos = new Alunos();

    alunos.nomealuno = req.body.nome_aluno;
    alunos.nomeresp = req.body.nome_resp;
    alunos.contato_ = req.body.contato;
    alunos.endereco = req.body.end;
    alunos.matricula = req.body.ra;

    alunos.save((err)=>{
        if (err)
            return res.status(500).send("Erro ao cadastrar aluno")
      
        return res.redirect("/alunos");
    });
});

app.get("/alunos", (req, res)=>{
    let consulta = Alunos.find({}, (err, aluno) => {
        if(err)
        return res.status(500).send("Erro ao consultar alunos")
        res.render("alunos", {lista_alunos:aluno})
    });

});



