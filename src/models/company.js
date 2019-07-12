// Import mongoose and create a Schema
const mongoose = require("mongoose");
// Get the Schema object from mongoose
const Schema = mongoose.Schema;


// Schema of Launch document
const LaunchFileSchema = new Schema({
    mission_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    flight_number: {
        type: Number,
        required: true,
        min: 0
    },
    remark: String,
    raw_path: String,
    analysed_path: String,
    events_path: String
});


// Schema of Company document
const CompanySchema = new Schema({
    company_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    launches: [LaunchFileSchema]
}, { collection: "company"});


const Company = mongoose.model("company", CompanySchema);
module.exports = Company;
