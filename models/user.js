"use strict";

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        zipCode: {
            type: Number,
            min: [1000, "Zip code too short"],
            max: 99999
        },
        password: {
            type: String,
            required: true
        },
        subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
        courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
    },
    {
        timestamps: true
    }
);

userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});


userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);