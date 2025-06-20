//making a class constructor for all the methods
//bringing endpoints urls from config

import axios from "axios";
import { conf } from "../conf.js";

const { signupUrl, loginUrl, googleAuth } = conf;

export class AuthServices {
  async signup(data) {
    console.log(data);

    const newVal = Object.fromEntries(
      Object.entries(data).filter((e) => {
        return e[0] !== "firstPassword" && e[0] !== "confirmPassword";
      })
    );

    newVal.password = data.firstPassword;

    try {
      const response = await axios.post(signupUrl, {
        data: newVal,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await axios.post(loginUrl, {
        data: data,
      });
      console.log(response);
      return response.data;
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
}

const authService = new AuthServices();

export default authService;
