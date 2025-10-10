//making a class constructor for all the methods
//bringing endpoints urls from config

import axios from "axios";
import { conf } from "../conf.js";
const {
  signupUrl,
  loginUrl,
  googleAuth,
  authMe,
  findUser,
  updatePassword,
  updateProfile,
} = conf;

export class AuthServices {
  async signup(data) {
    const newVal = Object.fromEntries(
      Object.entries(data).filter((e) => {
        return e[0] !== "firstPassword" && e[0] !== "confirmPassword";
      })
    );

    newVal.password = data.firstPassword;

    //signup function call
    try {
      const response = await axios.post(signupUrl, newVal);
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }

  //login function call inside signup
  async login(data) {
    try {
      const response = await axios.post(loginUrl, data);
      if (response) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  async googleAuth(data) {
    try {
      const response = await axios.post(googleAuth, {
        data: data,
      });

      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  //for auth me service
  async authMehandler() {
    try {
      const response = await axios.post(authMe, {
        withCredentials: true,
        credentials: "include",
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  // For finding the user
  async findUserHandler(userId) {
    try {
      const response = await axios.post(findUser, { userId });
      if (response) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  //for updating Profile information
  async updateProfileInfo(data) {
    try {
      const response = await axios.post(updateProfile, data);
      if (response) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  //for updating Profile information
  async updatePassword(data) {
    try {
      const response = await axios.post(updatePassword, data);
      if (response) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  }
}

const authService = new AuthServices();
export default authService;
