import axios from "axios";
import { OrderInfo } from "./types";

const API_BASE = "http://localhost:5000/api";



const createNewOrder = (info: OrderInfo) => {
  const endpoint = `${ API_BASE }/new_order`;

  return axios.post(endpoint, info).then((rs)=>{
    console.log({ rs });
  });
};

export { createNewOrder };