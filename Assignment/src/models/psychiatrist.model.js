import mongoose, { Schema } from "mongoose";

const psychiatristSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
        },
        psycId:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
        },
        hospital:{
            type:Schema.Types.ObjectId,
            ref:"Hospital"
        },
        patient:[
            {
                type:Schema.Types.ObjectId,
                ref:"Patient"
            },
        ]
    },
    {
        timestamps:true
    }
)

export const Psychiatrist = mongoose.model("Psychiatrist",psychiatristSchema);