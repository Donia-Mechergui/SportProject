// import mongoose module
const mongoose=require('mongoose');
const playerSchema=mongoose.Schema({
name:String,
number:Number,
age:Number,
position:String,
tId:{
     // type:object id
     type:mongoose.Schema.Types.ObjectId,
    // model name
    ref:"Team" 
}
});
// affect model name to schema
const player = mongoose.model("Player",playerSchema);
// make match importable
module.exports=player;