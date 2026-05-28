"use client"


import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginView = () => {
  return (
    <div
      style={{
        width: "350px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Login Form
      </h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          // Email Validation
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          // Password Validation
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log(values);
            alert("Login Successful!");

            resetForm();
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Email */}
            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>

              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", marginTop: "5px" }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "15px" }}>
              <label>Password</label>

              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", marginTop: "5px" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginView;