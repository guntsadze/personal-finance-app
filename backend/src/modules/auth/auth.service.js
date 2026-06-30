import { userModel } from "../users/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signUp = async ({ name, age, email, password, isSmoker }) => {
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return 'ALREADY_EXISTS';
  }

  const hashedPass = await bcrypt.hash(password, 10);
  await userModel.create({
    name,
    age,
    email,
    password: hashedPass,
  });

  return 'OK';
};

const signIn = async ({ email, password }) => {
  const existUser = await userModel.findOne({ email }).select('+password');
  if (!existUser) {
    return 'INVALID_CREDENTIALS';
  }

  const isPassEqual = await bcrypt.compare(password, existUser.password);
  if (!isPassEqual) {
    return 'INVALID_CREDENTIALS';
  }

  const payLoad = {
    userId: existUser._id
  };

  const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '1h' }); 

  return accessToken;
};

const currentUser = async (userId) => {
  const existsUser = await userModel.findById(userId);
  return existsUser;
};

export const AuthService = {
    signUp,
    signIn,
    currentUser
};