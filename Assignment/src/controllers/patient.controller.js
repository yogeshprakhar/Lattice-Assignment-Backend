import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Patient } from "../models/patient.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uplaodOnCloudinary } from "../utils/cloudinary.js";
import { Hospital } from "../models/hospital.model.js";
import { Psychiatrist } from "../models/psychiatrist.model.js";

const isStrongPassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;

  const isLengthValid = password.length >= 8 && password.length <= 15;

  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasDigit = digitRegex.test(password);

  return isLengthValid && hasUppercase && hasLowercase && hasDigit;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNo) => {
  const phoneNumberRegex = /^\+?\d{10,}$/;
  return phoneNumberRegex.test(phoneNo);
};

const registerPatient = asyncHandler(async (req, res) => {
  const { name, email, password, address, phoneNo } = req.body;

  if ([name, email, password, address].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }
  // Password strength check
  if (isStrongPassword(password)) {
    throw new ApiError(400, "Password is not strong");
  }
  // Address length check
  if (address.trim().length < 10) {
    throw new ApiError(400, "enter the complete Address");
  }
  //Email valid check
  if (!isValidEmail(email)) {
    throw new ApiError(400, "Enter valid Email");
  }
  // Phone number check
  if (!isValidPhoneNumber(phoneNo)) {
    throw new ApiError(400, "Enter valid phone number");
  }
  // Patient already exist or not
  const existedUser = await Patient.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "Patient with email already exists");
  }

  const photoLocalPath = req.files?.photo[0]?.path;

  if (!photoLocalPath) {
    throw new ApiError(400, "Photo is required");
  }

  const photo = await uplaodOnCloudinary(photoLocalPath);
  // console.log(photo)
  if (!photo) {
    throw new ApiError(400, "Photo is Required");
  }

  const patient = await Patient.create({
    name,
    photo: photo.url,
    email,
    password,
    address,
    phoneNo,
  });

  const createdPatient = await Patient.findById(patient._id).select(
    "-password"
  );

  if (!createdPatient) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdPatient, "Patient register successfully")
    );
});

const psychiatristDetail = asyncHandler(async (req, res) => {
  const { hsptId } = req.body;

  const hospital = await Hospital.findOne({ hsptId });

  const hsptName = hospital.name;

  const psychiatristCount = hospital.psychiatrist.length;

  const patientCount = hospital.patient?.length;

  const psy = await Hospital.findOne({ hsptId }).populate("psychiatrist");

  const psyDetail = psy.psychiatrist.map((psyInfo) => {
    return {
      psyName: psyInfo.name,
      psyId: psyInfo.psycId,
      patientCount: psyInfo?.patient.length,
    };
  });

  const psyObj = {
    HospitalName: hsptName,
    PsychiatristCount: psychiatristCount,
    PatientCount: patientCount,
    PsychatiristDetails: psyDetail,
  };

  return res.status(201).json(new ApiResponse(200, psyObj, "Successfull"));
  // res.send(psyObj)
});

export { registerPatient, psychiatristDetail };
