const {Schema,model} = require('mongoose')

let Employeelists= new Schema({
    fullname:{
        type:String,
        required:[true,"Fullname is Mandatory"], 
        min:[3,"Fullname should beatleast 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is Mandatory"]  
    },
    mobile:{
        type:String,
        required:[true,"Mobile is Mandatory"]
    },
    image:{
        type:String,
    },
    gender:{
        type:String,
        required:[true,"Gender is Mandatory"],
        enum:["Male","Female","Others"]
    },
    designation:{
        type:String,
        required:[true,"Designation is Mandatory"]
    },
    course:{
        type:Array,
        required:[true,"Course is Mandatory"]
    }

},{timestamps:true})

module.exports=model("EmployeeList",Employeelists)