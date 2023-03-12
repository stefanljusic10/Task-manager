import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './slices/employeesSlice'
import tasksReducer from './slices/tasksSlice'
import modalReducer from './slices/modalSlice'
import selectedTaskReducer from './slices/selectedTaskSlice'

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    tasks: tasksReducer,
    modal: modalReducer,
    selectedTask: selectedTaskReducer
  },
})