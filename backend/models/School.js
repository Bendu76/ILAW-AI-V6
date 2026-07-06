
const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
{
    division: {
        type: String,
        default: ""
    },

    district: {
        type: String,
        default: ""
    },

    schoolName: {
        type: String,
        default: ""
    },

    schoolId: {
        type: String,
        default: ""
    },

    schoolHead: {
        type: String,
        default: ""
    },

    schoolHeadPosition: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("School", SchoolSchema);