import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";
import closeIcon from '../../assets/close-icon.svg'
import SelectedTask from "../SelectedTask/SelectedTask";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch()

  return ReactDOM.createPortal(
    <div className="modal">
      <img onClick={() => dispatch(toggleModal(false))} src={closeIcon} alt="close" />
      <SelectedTask />
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;