const express=require("express");
const fs=require("fs")
const app=express();
const PORT= process.env.PORT || 5500

const Database="./data/notes.json";

app.use(express.urlencoded({extended:true}))
app.use('/static',express.static("public"))
app.use(express.urlencoded({extended:true}))
app.set("view engine","pug")



app.listen(PORT,()=>{
    console.log("This app is running on the PORT "+ PORT);

})