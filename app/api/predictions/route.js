import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import Prediction from "@/models/predictionModel";

export async function POST(req) {
  try {
    await connectDB();
    const { patientName, data, prediction, user } = await req.json();
    await Prediction.create({ patientName, data, prediction, user });
    return NextResponse.json({ message: "Prediction saved." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error occured while saving prediction: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const predictions = await Prediction.find({ user }).sort({ createdAt: -1 });
    return NextResponse.json(predictions);
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error occured while getting prediction: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const prediction = await Prediction.findById(id);
    if (!prediction) {
      return NextResponse.json(
        {
          message: `Couldn't find prediction with given id: ${error.message}`,
        },
        { status: 404 }
      );
    }

    const { isPredictionAccepted, doctorPrediction } = await req.json();
    prediction.isChecked = true;
    prediction.isPredictionAccepted = isPredictionAccepted;
    if (!isPredictionAccepted) {
      prediction.doctorPrediction = doctorPrediction;
    }
    await prediction.save();
    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error occured while getting prediction: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
