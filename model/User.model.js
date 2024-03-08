const {Schema,model} = require('mongoose')

let userInformation= new Schema({
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
    password:{
        type:String,
        required:[true,"Password is Mandatory"]
    },
    gender:{
        type:String,
        required:[true,"Gender is Mandatory"],
       enum:["Male","Female","Others"]
    },
    role:{
        type:String,
        required:[true,"Role is Mandatory"],
        enum:["admin","user"]
    }
},{timestamps:true})

module.exports=model("UserDetails",userInformation)