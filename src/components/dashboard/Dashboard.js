import { useEffect, useState } from "react";
import { Col, Row, Button, Container, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, searchPosts } from "../../store/actions/posts";
import MenuBar from "../menuBar/MenuBar";
import Post from "../post/Post";

const Dashboard = () => {
  const { filteredPosts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

    useEffect(async ()=>{
        if(!localStorage.getItem("blog-token")) return
        try{
            setLoading(true);
            await dispatch(getAllPosts());
        }catch(error){
            console.error(error)
        }
        setLoading(false)
    },[user])

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        await dispatch(searchPosts(input));
        setInput("");
      }catch(error){
          console.error(error)
      }
    }

  return (
    <>
    <MenuBar/>
    <Container className="px-3 py-5">
      <Form className="d-flex my-2" onSubmit={handleSubmit}>
            <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e)=>setInput(e.target.value)}
            />
            <Button type="submit" variant="outline-light">Search</Button>
        </Form>
      <Row>
        <Col className="text-center">
          <h2>These are your blog posts</h2>
        </Col>
      </Row>

      <Row>
          {filteredPosts.map((p) => <Post key={p._id} p={p} />)}
      </Row>
    </Container>
    </>
  );
};

export default Dashboard;
