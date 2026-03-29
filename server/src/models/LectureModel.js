const mongoose=require('mongoose')

const LectureSchema=new mongoose.Schema({
    lectureTitle:{
        type:String,
        require:true,
    },

    videoUrl:{type:String},
    publicId:{type:String},
    isPreviewFree:{type:Boolean},
},{timestamps:true})

module.exports=mongoose.model("Lecture",LectureSchema);