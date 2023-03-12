import { createSlice } from '@reduxjs/toolkit'
import API from '../../utils/api'

const initialState = {
  data: []
}

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
        state.data = action.payload
    }
  },
})

export const getTasks = (endpoint) => async (dispatch) => {
  try {
    const response = await API.get(`${endpoint}`)
    dispatch(setTasks(response.data))
  } catch (error) {
    console.log(error);
  }
}

export const createTask = (endpoint, newTask) => async (dispatch) => {
  try {
    await API.post(`${endpoint}`, newTask)
    dispatch(getTasks('task'))
  } catch (error) {
    console.log(error);
  }
}

export const updateTask = (endpoint, id, modifiedTask) => async (dispatch) => {
  try {
    await API.put(`${endpoint}/${id}`, modifiedTask)
    dispatch(getTasks('task'))
  } catch (error) {
    console.log(error);
  }
}

export const deleteTask = (endpoint, id) => async (dispatch) => {
  try {
    await API.delete(`${endpoint}/${id}`)
    dispatch(getTasks('task'))
  } catch (error) {
    console.log(error);
  }
}

export const { setTasks } = TasksSlice.actions

export const selectTasks = (state) => state.tasks.data

export default TasksSlice.reducer