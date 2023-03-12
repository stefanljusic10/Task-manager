import { createSlice } from '@reduxjs/toolkit'
import API from '../../utils/api'
import { filters } from '../../utils/filters'

const initialState = {
  data: [],
  dataCopy: []
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.data = action.payload
      state.dataCopy = action.payload
    },
    sortEmployees: (state, action) => {
      // show all employees
      if(action.payload.filterEmployees === filters[0]){
        state.data = state.dataCopy
      }
      // top 5 with most tasks
      else if(action.payload.filterEmployees === filters[1]){
        const allAssignedTasks = action.payload.tasksList.map(task => task.assignee).flat()
    
        // count how many tasks each employee have finished
        const count = {};
        for (let i = 0; i < allAssignedTasks.length; i++) {
          const num = allAssignedTasks[i]
          count[num] = count[num] ? count[num] + 1 : 1
        }
    
        // sort employees with most finished tasks in descending order
        allAssignedTasks.sort((a, b) => {
          if (count[a] !== count[b]) {
            return count[b] - count[a]
          }
          return a - b
        });
    
        // reduce employees
        const uniqueEmployees = allAssignedTasks.reduce((acc, val) => {
          if (!acc.includes(val)) {
            acc.push(val)
          }
          return acc
        }, []);

        const topFive = uniqueEmployees.map(uniqueID => state.data.find(emp => emp.id == uniqueID)).slice(0, 5)
        state.data = topFive
      }
      // by salary desc
      else if(action.payload.filterEmployees === filters[2]){
        state.data.sort((a, b) => {
          const aSalary = Number(a.salary.replace(/\D/g,''))
          const bSalary = Number(b.salary.replace(/\D/g,''))

          return bSalary - aSalary
        })
      }
      // by salary asc
      else if(action.payload.filterEmployees === filters[3]){
        state.data.sort((a, b) => {
          const aSalary = Number(a.salary.replace(/\D/g,''))
          const bSalary = Number(b.salary.replace(/\D/g,''))

          return aSalary - bSalary
        })
      }
      // by age desc
      else if(action.payload.filterEmployees === filters[4]){
        state.data.sort((a, b) => b.dateOfBirth - a.dateOfBirth)
      }
      // by age asc
      else if(action.payload.filterEmployees === filters[5]){
        state.data.sort((a, b) => a.dateOfBirth - b.dateOfBirth)
      }
    }
  },
})

export const getEmployees = (endpoint) => async (dispatch) => {
    try {
        const response = await API.get(`${endpoint}`)
        dispatch(setEmployees(response.data))
    } catch (error) {
        console.log(error);
    }
}

export const createEmployee = (endpoint, newEmployee) => async (dispatch) => {
  try {
      await API.post(`${endpoint}`, newEmployee)
      dispatch(getEmployees('employees'))
  } catch (error) {
      console.log(error);
  }
}

export const updateEmployee = (endpoint, id, modifiedEmployee) => async (dispatch) => {
  try {
    await API.put(`${endpoint}/${id}`, modifiedEmployee)
    dispatch(getEmployees('employees'))
  } catch (error) {
    console.log(error);
  }
}

export const deleteEmployee = (endpoint, id) => async (dispatch) => {
  try {
      await API.delete(`${endpoint}/${id}`)
      dispatch(getEmployees('employees'))
  } catch (error) {
      console.log(error);
  }
}

export const { setEmployees, sortEmployees } = employeesSlice.actions

export const selectEmployees = (state) => state.employees.data
export const selectEmployeesTopFive = (state) => state.employees.topFive

export default employeesSlice.reducer