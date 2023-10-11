const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _=require("lodash");
const app = express();


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blogsDB");

const blogSchema={
  title:String,
  post:String
};
const Blog=mongoose.model("Blog",blogSchema);
const blog1=new Blog({
  title:"Nitish  jha  ",
  post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur totam est sint, eligendi in eum ipsa ratione temporibus autem natus nemo doloremque, quas esse facere aut corrupti dicta incidunt quia exercitationem reiciendis quasi! Vel, a nulla eveniet velit laborum explicabo minima. Temporibus dolorem autem quae iure ad aperiam aspernatur accusantium."
  });
  const blog2=new Blog({
    title:"a tale of incredible",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur totam est sint, eligendi in eum ipsa ratione temporibus autem natus nemo doloremque, quas esse facere aut corrupti dicta incidunt quia exercitationem reiciendis quasi! Vel, a nulla eveniet velit laborum explicabo minima. Temporibus dolorem autem quae iure ad aperiam aspernatur accusantium."
  });

  const defaultblogs=[blog1,blog2];

app.get("/",function(req,res){
  Blog.find({},function(err,foundedblogs){
    if(foundedblogs.length===0){
     Blog.insertMany(defaultblogs,function(err){
       if(err) console.log("err");
       else console.log("successfully saved item to database");
     });
     res.redirect("/");
    }
       else{
        res.render("home",{startingcontent:homeStartingContent,blogs_array:foundedblogs});
       }
       });
   
});
app.get("/blogs/:blogId",function(req,res){
  let requestedId=req.params.blogId;
 Blog.findOne({_id:requestedId},function(err,foundblog){
 if(!err){
  res.render("blog",{blogTitle:foundblog.title,blogContent:foundblog.post});
 } 
 })

});

app.get("/about",function(req,res){
res.render("about",{startingcontent:aboutContent});
});

app.get("/contact",function(req,res){
res.render("contact",{startingcontent:contactContent});
});



app.post("/compose",function(req,res){
  const newblog=new Blog({
    title:req.body.postTitle,
    post:req.body.postBody
  });
  newblog.save();
  res.redirect("/compose");

});

app.get("/compose",function(req,res){
res.render("compose");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
