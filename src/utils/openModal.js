import { toggleModal } from "../redux/slices/modalSlice";
import { setSelectedTask } from "../redux/slices/selectedTaskSlice";

const openModal = (e, dispatch, task) => {
  if (e.target.tagName !== "IMG"){
    dispatch(toggleModal(true))
    dispatch(setSelectedTask(task))
  }
};

export default openModal;
