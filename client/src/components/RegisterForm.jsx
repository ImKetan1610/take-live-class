import React, { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerUser } from "../actions/authActions";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (values, actions) => {
    setIsSubmitting(true);
    dispatch(registerUser(values.username, values.email, values.password))
      .then(() => {
        actions.resetForm();
        setIsSubmitting(false);
      })
      .catch(() => setIsSubmitting(false));
  };
  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          <Form>
            <div className="form-group">
              <label htmlFor="username">User Name:</label>
              <Field type="text" name="username" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">User Name:</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">User Name:</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>;
        }}
      </Formik>
      
    </>
  );
};

export default RegisterForm;
