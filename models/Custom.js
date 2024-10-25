const mongoose = require('mongoose')

const customSchema = new mongoose.Schema(
    {
        cabinets: { cabinet_name: [String], img: String, cabinet_models: [{ model_name: String, belongs_to: String, price:Number }] },
        processors: { processor_name: [String], processor_models: [{ model_name: String, belongs_to: String, price:Number }] },
        motherboard: { motherboard_name: [String], motherboard_models: [{ model_name: String, belongs_to: String, price:Number }] },
        gpu: { gpu_name: [String], gpu_models: [{ model_name: String, belongs_to: String, price:Number }] },
        smps: { smps_name: [String], smps_models: [{ model_name: String, belongs_to: String, price:Number }] },
        storage: { storage_type: [String], storage_name: [String], storage_models: [{ model_name: String, belongs_to: String, price:Number }] },
        ram: { ram_name: [String], ram_models: [{ model_name: String, belongs_to: String, price:Number }] },
        cooler: { cooler_type: [String], cooler_name: [String], cooler_models: [{ model_name: String, belongs_to: String, price:Number }] },
    }
)

const customModel = mongoose.model("Custom", customSchema)
module.exports = customModel