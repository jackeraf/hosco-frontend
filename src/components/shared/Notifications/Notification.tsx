import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';

const Notification: React.FC = ()=>{
  const toastId = '';
  const customToastId = `${Math.random()} fetch`;

  const notify = ()=> {
    if (toast.isActive(toastId)) {
      return;
    }
    toast.error("No Songs found!", {
      position: toast.POSITION.TOP_CENTER,
      toastId: customToastId
    });
  }
  return (
    <div>
      {notify()}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

const StyledNotification = styled(Notification)`
.Toastify__toast--error {
  background-color: #1db954 !important;
  color: white;
}
`;

export default StyledNotification;
