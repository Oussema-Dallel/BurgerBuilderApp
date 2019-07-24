import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-bf6fb.firebaseio.com"
});

export default instance;
