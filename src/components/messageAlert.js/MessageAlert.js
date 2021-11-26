import React, { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/actions/message";

export const MessageAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.message);

  return (
    <ToastContainer position="bottom-center" className="my-3">
        <Toast onClose={() => dispatch(clearMessage())} delay={5000} bg={alert.variant} show={!!alert.show} autohide>
        <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
    </ToastContainer>
  );
}
