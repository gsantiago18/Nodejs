const {Client} = require ('pg');
const express = require('express');
const app = express();

app.use(express.json());


const con = new Client({
    hsot : 'localhost',
    user : 'postgres',
    port : 5432,
    password : '',
    database: 'salidasdemo'
})

con.connect().then(()=> console.log ('connected'));

app.post('/postData',  (req, res) =>{
 
 const {codsal, description, fecha } = req.body;
 
 const insert_query = 'INSERT INTO salida (codsal,description, fecha) VALUES ($1 ,$2, $3)'
 con.query(insert_query,[codsal,description,fecha], (err, result)=>{
    if(err){
        res.status(400).send(err);
    }else{
        res.status(200).send('Data inserted successfully');
    }
 })

})

app.get('/getData', (req,res)=>{
    con.query('SELECT * FROM salida', (err, result)=>{
        if (err){
            res.status(400).send(err);
        }else{
            res.status(200).send(result.rows);

        }
    })
})

app.listen (4000,()=>{
    console.log('Server is running on port 4000');
})