import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    token:{
        type : String,
       
    },
    string:{
        type : String,
        
    },
    about:{
        type : String,
        
    },
    firstName:{
        type : String,
        
    },
    lastName:{
        type : String,
        
    },
    Country:{
        type : String,
        
    },
    Address:{
        type : String,
        
    },
    
    city:{
        type : String,
        
    },
    region:{
        type : String,
        
    },
    
    postalCode:{
        type : String,
        
    },
    
    profileImage: {
        type: String,
      
    },
    
    colordata: [
        {
            date: {
                type: String,
                
            },
            color: {
                type: String,
              
            },
           
        },
    ],


})  
const User = mongoose.model('User',userSchema)
export default User;