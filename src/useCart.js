import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

let token = localStorage.getItem("userToken");

// Get cart
export function getCart() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token,
    },
  });
}

// Add to cart
export function addToCart(productId) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId,
    },
    {
      headers: {
        token,
      },
    }
  );
}

// Remove from cart
export function deleteCartItem(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    headers: {
      token,
    },
  });
}

// Update cart
export function updateCartItem({ id, count }) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    {
      headers: {
        token,
      },
    }
  );
}

// checkout
export function checkout({ id, shippingAddress }) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    { shippingAddress },
    {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    }
  );
}

// get
export function useGetCart(key, func) {
  return useQuery(key, func);
}

// Add or remove from cart
export function useCartCrud(func) {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Done");
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });
}
