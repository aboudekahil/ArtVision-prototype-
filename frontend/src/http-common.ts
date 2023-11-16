import axios from "axios";
import { SERVER_URL } from "./utils/configs.ts";

const Requests = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Requests;
