import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Notifications.scss";

class Notification extends Component {
  toastId = null;
  customToastId = `${Math.random()} fetch`;

  notify() {
    if (toast.isActive(this.toastId)) {
      return;
    }
    toast.error("No Songs found!", {
      position: toast.POSITION.TOP_CENTER,
      toastId: this.customToastId
    });
  }

  render() {
    return (
      <div>
        {this.notify()}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default Notification;
