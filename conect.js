var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://camila_chang:camila_chang@cluster0.gcljv.mongodb.net/escola?retryWrites=true&w=majority").then(()=>{
    console.log("banco de dados conectado");
}).catch(()=>{
    console.log("erro banco de dados " +err)
})