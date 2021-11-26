import { useEffect, useState } from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/auth";
import { getAllPosts } from "../../store/actions/posts";
import AddNewPost from "../addNewPost/AddNewPost";
import Post from "../post/Post";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleLogout = async () => {
    try{
        console.log("logout")
        await dispatch(logoutUser());
    }catch(error){
        console.log(error)
    }
  };

    useEffect(async ()=>{
        if(!localStorage.getItem("blog-token")) return
        console.log(localStorage.getItem("blog-token"))
        try{
            setLoading(true);
            await dispatch(getAllPosts());
        }catch(error){
            console.log(error)
        }
        setLoading(false)
    },[user])

  return (
    <Container className="px-3 py-5">
      <Row>
        <Col sm={12} md={6}>
          <h2> Hi {user?.username}!</h2>
        </Col>
        <Col sm={12} md={6} className="text-center text-md-end ">
          <Button variant="light" className="m-2" onClick={handleShow}>
            Add New Post
          </Button>
          <Button variant="light" className="m-2" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h2>These are your blog posts</h2>
        </Col>
      </Row>

      <Row>
          {posts.map((p) => <Post key={p._id} p={p} />)}
      </Row>
      <AddNewPost handleClose={handleClose} show={show} />
    </Container>
  );
};

export default Dashboard;
