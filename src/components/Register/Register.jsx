import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Register() {
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(2, "too short, min is 2")
      .max(20, "too long, max is 20"),
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^\d{6}$/, "enter a 6-digit password"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "must match password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?(01)[0-25][0-9]{8}$/, "invalid phone number"),
  });

  async function getRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: getRegister,
  });

  return (
    <div className="my-5 w-75 mx-auto">
      <h4>Register Now:</h4>
      {msg && <p className="alert alert-danger">{msg}</p>}
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">name:</label>
        <input
          type="text"
          className="form-control mb-3"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <p className="alert alert-danger">{formik.errors.name}</p>
        ) : (
          ""
        )}

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

        <label htmlFor="rePassword">rePassword:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <p className="alert alert-danger">{formik.errors.rePassword}</p>
        ) : (
          ""
        )}

        <label htmlFor="phone">phone:</label>
        <input
          type="tel"
          className="form-control mb-3"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <p className="alert alert-danger">{formik.errors.phone}</p>
        ) : (
          ""
        )}
        <Link to="/" className=" text-success fw-bold">
        have an account? sign in
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
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
