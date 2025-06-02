//making a class constructor for all the methods
//bringing enpoints urls from .env
//
import axios from "axios";
import { conf } from "../conf.js";

const { signupUrl, loginUrl, googleAuth } = conf;
export class AuthServices {
  constructor(data = "", token = " ") {
    this.data = data;
    this.token = token;
  }

  async signup() {
    await axios
      .post(signupUrl, {
        data: this.data,
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  async login() {
    await axios
      .post(loginUrl, {
        data: this.data,
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  async googleAuth() {
    await axios
      .post(googleAuth, {
        data: this.data,
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }
}

const authService = new AuthServices();

export default authService;
