import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null
}

export const selectedTaskSlice = createSlice({
  name: 'selected task',
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
        state.value = action.payload
    },
  },
})

export const { setSelectedTask } = selectedTaskSlice.actions

export const selectSelectedTask = (state) => state.selectedTask.value

export default selectedTaskSlice.reducer