import { createSlice } from '@reduxjs/toolkit'
import API from '../../api/api'

const initialState = {
  data: [],
  selectedTask: null
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
        state.data = action.payload
    },
    setSelectedTask: (state, action) => {
      state.value = action.payload
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
    // POST new task into api and GET new data
    await API.post(`${endpoint}`, newTask)
    dispatch(getTasks('task'))
  } catch (error) {
    console.log(error);
  }
}

export const updateTask = (endpoint, id, modifiedTask) => async (dispatch) => {
  try {
    // UPDATE selected task and GET new data
    await API.put(`${endpoint}/${id}`, modifiedTask)
    dispatch(getTasks('task'))
  } catch (error) {
    console.log(error);
  }
}

export const deleteTask = (endpoint, id) => async (dispatch) => {
  try {
    // DELETE selected task and GET new data
    await API.delete(`${endpoint}/${id}`)
    dispatch(getTasks('task'))
  } catch (error) {
    console.log(error);
  }
}

export const { setTasks, setSelectedTask } = tasksSlice.actions

export const selectTasks = (state) => state.tasks.data
export const selectSelectedTask = (state) => state.selectedTask.value

export default tasksSlice.reducer