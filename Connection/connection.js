const mongoose = require('mongoose')

let ConnectomongoDb=(url)=>{

    return mongoose.connect(url)

}
module.exports=ConnectomongoDb