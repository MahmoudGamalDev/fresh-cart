import axios from "axios";
import { useQuery } from "react-query";

export function featuredProduct() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}

export function specificProduct(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

export function useProducts(key, func) {
  return useQuery(key, func, {
    select: (data) => data.data.data,
  });
}
