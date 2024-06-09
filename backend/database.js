const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.DATABASE_URL);

const userSchema = {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthDay: {
        type: String,
        required: true
    },
    birthMonth: {
        type: String,
        required: true
    },
    birthYear: {
        type: String,
        required: true
    },
    areaOfResidence: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
}

const adminSchema = {
    username: String,
    password: String,
}

const schemesSchema = {
    schemeName: {
        type: String,
        unique: true,
        required: true,
    },
    schemeId: {
        type: String,
        unique: true,
        required: true,
    },
    minAge: {
        type: Number,
        required: true,
    }, 
    gender: {
        type: String,
        required: true
    },
    areaOfResidence: {
        type: String,
        required: true
    },
    annualIncome: {
        type: Number,
        required: true
    }
}

const applicationSchema = {
    username : {
        type: String,
        ref: 'User',
        required: true,
    },
    schemeId : {
        type: String,
        ref: "Scheme",
        required: true
    },
    approved: {
        type: Boolean,
        default: false,
    }
}

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Scheme = mongoose.model("Scheme", schemesSchema);
const Application = mongoose.model("Application", applicationSchema);

module.exports = {
    User, Scheme, Application, Admin
};
