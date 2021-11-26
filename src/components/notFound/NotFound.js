import * as React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
    console.log("notfound")
  return (
    <Row className="justify-content-center align-items-center p-3" style = {{height:"100vh"}}>
        <Col md={6} className="justify-content-center">
            <Card>
                <Card.Body className="text-center">
                    <Card.Text>
                        Sorry, page was not found.
                    </Card.Text>
                    <Link to="/login">Go to the main page</Link>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  );
};

export default NotFound;
