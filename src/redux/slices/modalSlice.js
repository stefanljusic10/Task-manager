import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

export const modalSlice = createSlice({
  name: 'selected task',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
        state.value = action.payload
    },
  },
})

export const { toggleModal } = modalSlice.actions

export const selectModal = (state) => state.modal.value

export default modalSlice.reducer