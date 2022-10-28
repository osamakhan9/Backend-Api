// Start here

const express = require("express")
const fs = require("fs")
const db = require("../person.json")

const app = express();


app.get('/', (req, res) => {
    res.send("Here is a Home page");
})

app.use(express.json())
 app.get("/person", (req, res)=>{
    //  console.log(req.method, req.url);
     let person = db
   
     res.send(person)
 })



 app.get("/person", (req, res)=>{
    let {birth} = req.query;
    let person = db;
    if(birth){
        person = person.filter((data)=> data.birth === birth)
    }
    if(messegeMatch){
        person = person.filter((data)=> data.current.includes(messegeMatch))
    }
    if(messegeMatch){
        person = person.filter((data)=> data.visited.includes(messegeMatch))
    }
        res.send(person)
    
   //  res.end()
})

app.get("/person/:id", (req, res)=>{
    let id = req.params.id
    let numId = Number(id)
    let post = db.person.find((post)=> post.id === numId)
    if(post){
        res.send(post)
    }else{
        
        res.status(404).send(`post with ID : ${id} not found`)
    }
})

app.post("/person",(req, res)=>{
  
    db.person.push({
        ...req.body,
        id: Date.now()
    })


     fs.writeFile("../person.json", JSON.stringify(db), "utf-8", ()=>{

         res.send(db.person)
     })
})

app.delete("/person/:id",(req, res)=>{

    let id = req.params.id
    let numId = Number(id)
    let person = db.person.filter((post)=> post.id !== numId)
    db.person= person;

    fs.writeFile("../person.json", JSON.stringify(db), "utf-8", ()=>{
    
             res.send("Deleted successfully")
   
         })
      

})

app.listen(8080, ()=>{
    console.log("Listening on http://localhost:8000/");
})