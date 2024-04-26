import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";

export default function Login() {
  let { setUser, setLogin } = useContext(userContext);
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^\d{6}$/, "enter a 6-digit password"),
  });

  async function login(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        setUser(data.token);
        setLogin(data.user.name);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user.name);
        navigate("/home");
        setMsg("");
        setLoading(false);
      }
    } catch (err) {
      setMsg(err.response.data.message);
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <div className="my-5 w-75 mx-auto">
      <h4>Login Now:</h4>
      {msg && <p className="alert alert-danger">{msg}</p>}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="password">password:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ""
        )}
        <Link to="/forgotPassword" className=" text-success fw-bold d-block mb-1">
          forgot password?
        </Link>
        <Link to="/register" className=" text-success fw-bold">
          do not have an account? sign up
        </Link>
        <button
          type="submit"
          className="btn bg-green text-white d-block ms-auto"
          disabled={!(formik.isValid && formik.dirty)}
        >
          {loading ? (
            <Bars
              height="30"
              width="40"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
