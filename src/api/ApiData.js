import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEmployees } from "../redux/slices/employeesSlice";
import { getTasks } from "../redux/slices/tasksSlice";

const ApiData = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getEmployees("employees"));
    dispatch(getTasks("task"));
  }, []);

  return null;
};

export default ApiData;
