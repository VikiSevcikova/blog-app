import { useState } from "react";
import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/auth";
import AddNewPost from "../addNewPost/AddNewPost";

const MenuBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
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
  return (
      <>
    <Navbar bg="light" expand="lg">
    <Container >
        <Navbar.Brand>Hi {user?.username}!</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto">
        </Nav>
        <Nav>
        <Button variant="primary" className="m-2" onClick={handleShow}>
            Add New Post
          </Button>
          <Button variant="primary" className="m-2" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    <AddNewPost handleClose={handleClose} show={show} />
    </>
    )
}

export default MenuBar;