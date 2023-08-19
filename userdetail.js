const { default: mongoose } = require("mongoose");

// const mongoose = require("mongoose");
const StudentinfoScehma=new mongoose.Schema(
    {
        Email:{type:String,unique:true},
        Name:String,
        RollNo:{type:Number,unique:true},
        FatherName:String,
        Batch:String,
        PhoneNo:{type:Number,unique:true},
        password:String,
    },
    {
        collection:"Studentinfo",
    }
)
mongoose.model("Studentinfo", StudentinfoScehma);