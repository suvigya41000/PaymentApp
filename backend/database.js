const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://suvigyakum:suvigya123@cluster0.kd8av.mongodb.net/paytm")

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
   }
})
const Account=mongoose.model('Account',accountSchema)
module.exports={
   User,
   Account
}
