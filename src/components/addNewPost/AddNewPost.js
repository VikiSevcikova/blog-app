import { Formik } from "formik";
import { Form, Modal, Button } from "react-bootstrap";
import InputField from "../inputField/InputField";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost, updatePost } from "../../store/actions/posts";

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});

const options = [
  { value: "", label: "Select category" },
  { value: "movies", label: "Movies" },
  { value: "sport", label: "Sport" },
  { value: "music", label: "Music" },
  { value: "health", label: "Health" },
]

const AddNewPost = ({ handleClose, show, post }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddNewPost = async (values) => {
    try{
        if(post){
            setLoading(true);
            await dispatch(updatePost(post._id, values));
        }else{
            setLoading(true);
            await dispatch(addNewPost(values));
        }
    }catch(error){
        console.log(error)
    }
    setLoading(false)
    handleClose();
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{post ? "Edit Your Post" : "Add New Post"}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          title: post ? post.title : "",
          description: post ? post.description : "",
          category: post ? post.category : "",
        }}
        validationSchema={PostSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form onSubmit={e=>{ e.preventDefault(); handleAddNewPost(values); }}>
            <Modal.Body>
              <InputField
                id="title"
                type="text"
                label="Title"
                value={values.title}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.title && errors.title}
              />
              <InputField
                id="description"
                type="text"
                label="Description"
                textarea={true}
                value={values.description}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.description && errors.description}
              />
              <Form.Group className="mb-4 position-relative" controlId="category">
                  <Form.Control
                    required
                    as="select"
                    value={values.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={!!(touched.category && errors.category)}
                  >
                    {options.map((option, index) => {
                        return (<option key={index} value={option.value}>{option.label}</option>)
                    })}
                    </Form.Control>
                  <Form.Control.Feedback type="invalid" className="mb-3 ms-2 position-absolute">
                    {touched.category && errors.category}
                  </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type="submit" disabled={loading}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNewPost;
