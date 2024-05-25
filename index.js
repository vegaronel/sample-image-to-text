import { createWorker } from 'tesseract.js';
import fs from "fs";
import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
  res.render("index.ejs");
})

app.post("/submit", (req, res)=>{

  (async () => {
    const worker = await createWorker('eng');
    const ret = await worker.recognize('images/lorem.jpg');
    var result = ret.data.text
    
    fs.writeFile("result.txt", result , (err) => {
      if (err) throw err;
      console.log('The file has been saved');
      res.render("index.ejs", {output:result});
      
    }); 
  
    await worker.terminate();
  })();


})

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})

