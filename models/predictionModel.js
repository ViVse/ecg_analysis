import mongoose from "mongoose";

const predictionSchema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Must provide patient's name."],
    },
    data: {
      type: [Number],
      required: [true, "Must provide a password."],
    },
    prediction: {
      type: String,
      required: [true, "Must provide a prediction"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Prediction =
  mongoose.models.Prediction || mongoose.model("Prediction", predictionSchema);

export default Prediction;
