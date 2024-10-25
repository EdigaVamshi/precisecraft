const mongoose=require('mongoose');

const ComponentSchema=new mongoose.Schema({
    name: String,
    model: String,
    company: String,
    price: Number
});

const PcBuildSchema=new mongoose.Schema({
    components:{
        cabinet: ComponentSchema,
        processor: ComponentSchema,
        motherboard: ComponentSchema,
        gpu: ComponentSchema,
        smps: ComponentSchema,
        storage: ComponentSchema,
        ram: ComponentSchema,
        cooler: ComponentSchema
    }
});

const PcBuild=mongoose.model('PcBuild', PcBuildSchema);
module.exports=PcBuild;