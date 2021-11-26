import { useState } from "react"
import { Card, Col, Row, Button, Badge } from "react-bootstrap"
import { RiDeleteBinLine, RiEditFill } from 'react-icons/ri'
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/actions/posts";
import AddNewPost from "../addNewPost/AddNewPost";

const Post = ({p}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
      try{
          await dispatch(deletePost(p._id));
      }catch(error){
          console.log(error)
      }
    };

    return(
        <>
        <Col sm={6} md={3} className="my-2">
            <Card style={{minHeight:"200px"}}>
                <Badge bg="secondary" className="m-2">{p.category}</Badge>
                <Card.Body className="justify-content-between">
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>
                        {p.description}
                    </Card.Text>
                </Card.Body>
                <Row className="text-center mb-3">
                    <Col>
                        <Button variant="primary" onClick={handleShow}><RiEditFill/></Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={handleDelete}><RiDeleteBinLine/></Button>
                    </Col>
                </Row>
            </Card>
        </Col>
      <AddNewPost handleClose={handleClose} show={show} post={p} />
    </>
    )
}

export default Post