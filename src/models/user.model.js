import mongoose from "mongoose";
//Aqui creamos el esquema el cual nos dice como se van a guardar los datos
const userSchema =  new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }, 
    contraseña: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})
// y esto nos ayuda a interactuar con la bd 
export default mongoose.model('User',userSchema);