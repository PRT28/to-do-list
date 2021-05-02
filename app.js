//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true});

itemSchema = {
  name: String
};

const Item = mongoose.model("Item",itemSchema);


app.get("/",function(req,res){
  var today= new Date();

  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  }

  var day = today.toLocaleDateString("en-US",options);

  Item.find({},function(err,items){
      res.render("list", {day:day,item:items});
  });


});

app.post("/",function(req,res){
  const iName = req.body.newItem;
  const item = new Item({
    name:iName
    });
  item.save();
  res.redirect("/");
})

app.post("/delete",function(req,res){
  const del = req.body.checkbox;
  Item.findByIdAndRemove(del,function(err){
    if(!err){
      console.log("Successfully deleted checked item")
    }
  });
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server started at port 3000")
});
