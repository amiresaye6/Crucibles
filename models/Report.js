const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reportSchema = new schema({
    reporterId: {
        required: true,
        type: schema.Types.ObjectId,
        ref: "User"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    },
    priorityScore: {
        required: true,
        type: Number,
    },
    status: {
        required: true,
        type: String,
        enum: ["open", "in progress", "closed"],
        default: "open"
    },
    description: {
        required: true,
        type: String,
    },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    aiConfidence: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    department: {
        type: String,
        // enum: ["infrastructure", "electrical", "waste management", "health and safety"],
        enum: ["inf", "ele", "wm", "hs"],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
