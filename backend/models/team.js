// import mongoose module
const mongoose=require('mongoose');
const teamSchema=mongoose.Schema({
name:String,
owner:String,
foundation:Number,
players:[{
      // type:object id
    type:mongoose.Schema.Types.ObjectId,
      // ref:player:modele
    ref:"Player",}
]
});
// affect model name to schema
const team = mongoose.model("Team",teamSchema);
// make match importable
module.exports=team;