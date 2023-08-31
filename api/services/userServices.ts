import axiosInstance from "../axiosConfig";
import { User, Login } from "../../types";

export const userService = {
  registerUser(data: User) {
    return axiosInstance.post("/users", data);
  },
  login(data: Login) {
    return axiosInstance.post("/users/login", data);
  },
};
