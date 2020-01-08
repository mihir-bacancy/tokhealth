import axios from "axios";

export default axios.create({
  baseURL: "https://aw078d3c17.execute-api.us-east-1.amazonaws.com/dev",
  responseType: "json"
});
