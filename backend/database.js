const mongoose=require("mongoose");
const { Db_Url } = require("./config.js");

console.log("Database URL:", Db_Url);

mongoose.connect(Db_Url)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection failed:", error));


const userSchema= new mongoose.Schema({
   userName: String,
   password: String,
   firstName: String,
   lastName: String,
});
const User=mongoose.model('User',userSchema);
const accountSchema=new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   balance:{
      type:Number,
      required:true
   },
   transactions:[{type: String}]
})
const Account=mongoose.model('Account',accountSchema)
module.exports={
   User,
   Account
}
