import { Form, FloatingLabel } from "react-bootstrap";

const InputField = ({ id, type, label, value, textarea, handleChange, handleBlur, error}) => {
 
  return (
    <Form.Group className="mb-4 position-relative" controlId={id}>
      <FloatingLabel controlId={id} label={label}>
        <Form.Control
          required
          type={type}
          placeholder={label}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          isInvalid={!!error}
          as={textarea && "textarea"}
          style={{height: textarea && "100px"}}
        />
         <Form.Control.Feedback type="invalid" className="mb-3 ms-2 position-absolute">
          {error}
        </Form.Control.Feedback>
      </FloatingLabel>
     
    </Form.Group>
  );
};

export default InputField;
