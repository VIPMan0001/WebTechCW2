const express=require("express");
const fs=require("fs")
const app=express();
const PORT= process.env.PORT || 5500

const Database="./data/notes.json";

app.use(express.urlencoded({extended:true}))
app.use('/static',express.static("public"))
app.use(express.urlencoded({extended:true}))
app.set("view engine","pug")


 
app.get("/",(req,res)=>{
    fs.readFile(Database,(err,data)=>{
        if(err) throw err;


        const notes=JSON.parse(data)
        
        res.render("home",{notes:notes, create:true})
     
        
    
    })



})


app.post("/add",(req,res)=>{
    const AddData=req.body;


    if(AddData.desc.length===0) {
        fs.readFile(Database,(err,data)=>{
            if(err) throw err;
    
            const notes=JSON.parse(data);

        res.render("home",{ notes:notes, error:true})
        })
    }
    else {
        fs.readFile(Database,(err,data)=>{
            if(err) throw err;
    
            const notes=JSON.parse(data);
    
            const note={
                id:id(),
                desc:AddData.desc,
                draft:false,
                crossed:false
            }
    
            notes.push(note);
    
            fs.writeFile(Database,JSON.stringify(notes),err=>{
                if(err) throw err;
                
                fs.readFile(Database,(err,data)=>{
                    if(err) throw err;

                    const dataa=JSON.parse(data)
                    
                    res.render("home",{ success:true , notes:dataa,create:true })
                })
             
              
            })
            
    
        })
            
    }
})
    


app.listen(PORT,()=>{
    console.log("This app is running on the PORT "+ PORT);

})