import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try{
        setLoading(true);
        await dispatch(loginUser(values.email, values.password))
        navigate("/");
    }catch(error){
        console.log(error)
        setLoading(false)
    }
  };


  return (
    <Row className="justify-content-center align-items-center m-0 p-2" style = {{height:"100vh"}}>
    <Col md={5} className="p-5" style={{backgroundColor:"white", borderRadius:"15px"}}>
          <h1 className="text-start">Login to the app</h1>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          handleSubmit(values)
        }}
        >
        {( {values,
          errors,
          touched,
          handleChange,
          handleBlur
        }) => (
          <Form>
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
        Don't have account? <Link to="/signup">Sign up</Link>
      </p>
      </Col>
      </Row>
  );
};

export default Login;
