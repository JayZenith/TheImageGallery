const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());

// Middleware 
app.use(express.json()); //parse json bodies in request object
app.use(express.static('public'));


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, 'public/images')
    },
    filename: (req,file,cb)=>{
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  })
  
  const upload = multer({
    storage: storage
  })

  const fs=require('fs')

  app.post("/upload", upload.single('image'), (req,res)=>{
    const image = req.file.filename;
    console.log("image uploaded!")

    /*
    if(result[0].ImageData != "avatar.jpg"){
        fs.unlink(`./public/images/${result[0].ImageData}`,(err)=>{
          if(err){
            console.error(`Error removing file: ${err}`);
            return;
          }
          //console.log(`File ${result[0].ImageData} has been successfully removed.`);
        })
    }
    */
    
   
      
  });


const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(`listening server.js on PORT ${PORT}`);
  });
  
  