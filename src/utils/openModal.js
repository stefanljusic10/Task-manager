import { toggleModal } from "../redux/slices/modalSlice";
import { setSelectedTask } from "../redux/slices/tasksSlice";

// display selected task modal if it's not clicked on update or delete icon
const openModal = (e, dispatch, task) => {
  if (e.target.tagName !== "IMG"){
    dispatch(toggleModal(true))
    dispatch(setSelectedTask(task))
  }
};

export default openModal;
