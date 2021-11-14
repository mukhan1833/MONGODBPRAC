import express from "express";
import morgan from "morgan";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

const port=process.env.PORT || 3000;
let users=[];

app.use((req,res,next)=>{
    console.log("req come",req.body);
    next();
})

app.get('/users',(req,res)=>{
    res.send(users);
})

app.get('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id])
    }
    else{
        res.send('user not found')
    }
})

//add record

app.post('/user',(req,res)=>{
    if(!req.body.stname || !req.body.stroll || !req.body.stdepart || !req.body.stsection)
    {
        res.status(400).send('invalid code')
    }
    else{
        users.push({
            stname:req.body.stname,
            stroll:req.body.stroll,
            stdepart:req.body.stdepart,
            stsection:req.body.stsection,
        })
    }
})

app.put('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        if(req.body.stname){
            users[req.params.id].stname=req.body.stname
        }
        if(req.body.stroll){
            users[req.params.id].stroll=req.body.stroll
        }
        if(req.body.stdepart){
            users[req.params.id].stdepart=req.body.stdepart
        }
        if(req.body.stsection){
            users[req.params.id].stsection=req.body.stsection
        }
        
        res.send(users[req.params.id])
        }
    else
        {
            res.send('user not found')
        }
    }

)

app.delete('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        users[req.params.id]={};
        res.send('user deleted');
    }
    else{
        res.send('user not found')
    }
})

app.listen(port,()=>{
    console.log('server is running')
})