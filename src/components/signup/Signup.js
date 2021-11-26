import React, { useState } from "react";
import { Image, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { signup } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/actions/auth";
// import { useDispatch } from "react-redux";
// import { setToken, setUser } from "../userProfile/userSlice";
// // import { hideAlert, showAlert } from "../alertMessage/alertMessageSlice";
// import GoogleLoginBtn from "../googleLogin/GoogleLoginBtn";

const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(6).required("Password is required")
  });

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try{
        setLoading(true);
        await dispatch(signupUser(values.name , values.email, values.password));
        navigate("/login");
    }catch(error){
        console.log(error)
        setLoading(false)
    }
  };

  return (
    <Row className="justify-content-center align-items-center p-3" style = {{height:"100vh"}}>
    <Col md={5} className="p-5" style={{backgroundColor:"white", borderRadius:"15px"}}>
          <h1 className="text-start">Sign up</h1>
      <Formik
        initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
            <InputField
              id="name"
              type="text"
              label="Name"
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.name && errors.name}
            />
            <InputField
              id="email"
              type="email"
              label="Email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <InputField
              id="password"
              type="password"
              label="Password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <Button variant="primary" type="submit" disabled={loading} className="w-100 mb-3">
                Submit
            </Button>
            </Form>
        )}
      </Formik>

      <p className="m-0 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Col>
    </Row>
  );
};

export default Signup;
