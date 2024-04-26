import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgotPassword() {
  // Forgot Password
  async function sendCode(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    );

    if (data.statusMsg === "success") {
      document.querySelector(".forgotPassword").classList.add("d-none");
      document.querySelector(".verifyCode").classList.remove("d-none");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });

  // Reset Code
  let navigate = useNavigate();
  async function verifyCode(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    );
    if (data.status === "Success") {
      navigate("/resetPassword");
    }
  }

  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Code is required"),
  });

  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema2,
    onSubmit: verifyCode,
  });
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="forgotPassword w-50 mx-auto my-5"
      >
        <label htmlFor="email" className="text-success fw-semibold mb-2">
          Enter Your Email:
        </label>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          name="email"
          id="email"
          className="form-control"
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger mt-2">{formik.errors.email}</p>
        ) : (
          ""
        )}
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn btn-success ms-auto d-block mt-2"
        >
          Send Code
        </button>
      </form>

      <form
        onSubmit={formik2.handleSubmit}
        className="verifyCode w-50 mx-auto my-5 d-none"
      >
        <label htmlFor="email" className="text-success fw-semibold mb-2">
          Enter Your Code:
        </label>
        <input
          value={formik2.values.resetCode}
          onChange={formik2.handleChange}
          onBlur={formik2.handleBlur}
          type="text"
          name="resetCode"
          id="resetCode"
          className="form-control"
        />
        {formik2.errors.resetCode && formik2.touched.resetCode ? (
          <p className="alert alert-danger mt-2">{formik2.errors.resetCode}</p>
        ) : (
          ""
        )}
        <button
          disabled={!(formik2.isValid && formik2.dirty)}
          type="submit"
          className="btn btn-success ms-auto d-block mt-2"
        >
          Verify Code
        </button>
      </form>
    </div>
  );
}
