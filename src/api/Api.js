import axios from "axios";

export default axios.create({
  baseURL: "https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?",
});
