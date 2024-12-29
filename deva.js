const express = require("express")
const user = require("./models/user")
const app =express()
const userModel= require("./models/user")
app.use(express.static("public"))


app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",function (req,res){
    res.render("index")
})
app.get("/profile",async function (req,res){
    let user = await userModel.find();
    res.render("index1",{user})
    console.log(user)
})
  app.get("/edit/:id",async function (req,res){
     console.log(req.params.id)
      userModel.findByIdAndUpdate({_id:req.params.id}).then(d=>{
          res.render("index2",{
              updatedata : d
          })
      
    })  
})
app.get("/delete/:id",async function (req,res){
    userModel.findByIdAndDelete({_id:req.params.id}).then(d=>{
        res.redirect("/profile")
    })

    
})



app.post("/create",async function (req,res){
    let{email,name,age,password } =req.body
            let user = await userModel.create({
                name,
                email,
                age,
                password,
            })
             
             res.redirect("/")

        })
    

   app.post("/update/:id",async function (req,res){
       userModel.findByIdAndUpdate({_id:req.params.id},req.body).then(d=>{
           res.redirect("/profile")
       })

       
   })



 

app.listen(8000)