const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const Education = Schema({
  certification_id: {
    type: String,
    required: true,
  },
  educational_state: {
    type: String,
    required: true,
  },
  date_of_certificate_concede: {
    type: String,
    required: true,
  },
  place_of_certificate_concede: {
    type: String,
    required: true,
  },
  educational_document: {
    type: String,
    required: true,
  },
});
const InstractorSchema = Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  place_of_birth: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  passport_number: {
    type: String,
    unique: true,
    required: true,
  },
  education: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  educations: {
    type: [Education],
  },
  coach_phone_one: String,
  coach_phone_two: String,
});


InstractorSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

const InstractorModel = model("Instractor", InstractorSchema);

module.exports = InstractorModel;
