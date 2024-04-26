import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();
  async function resetPassword(values) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );

    if (data.token) {
      navigate("/");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="w-75 my-5 mx-auto">
        <label htmlFor="email">Email:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          id="email"
          className="form-control"
          value={formik.values.email}
        />
        <label htmlFor="password">New password:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          id="newPassword"
          className="form-control"
          value={formik.values.newPassword}
        />
        <button type="submit" className="btn btn-success mt-2">
          submit
        </button>
      </form>
    </div>
  );
}
