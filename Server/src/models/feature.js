import mongoose from 'mongoose';


const FeatureSchema= new  mongoose.Schema({
    imageUrl:String,

},{timestamps:true})

const FeatureModel =mongoose.model("Feature",FeatureSchema);

export default FeatureModel;