import { createSlice } from '@reduxjs/toolkit'
import API from '../../api/api'
import { FILTERS } from '../../utils/filters'
import { getTasks } from './tasksSlice'
import moment from 'moment'

const initialState = {
  data: [],
  dataClone: []
  // dataClone saves list of all employees for the case when top 5 slices data
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.data = action.payload
      state.dataClone = action.payload
    },
    sortEmployees: (state, action) => {
      // show all employees
      if(action.payload.filterEmployees === FILTERS[0]){
        state.data = state.dataClone
      }
      // top 5 with most tasks
      else if(action.payload.filterEmployees === FILTERS[1]){
        // get prev month of current month
        // get year of prev month
        const prevMonth = moment().subtract(1, 'months').format('MM')
        const prevMonthYear = moment().subtract(1, 'months').format('YYYY')

        const allAssignedTasks = action.payload.tasksList.map(task => {
          const taskDueDateMonth = moment(task.dueDate).format('MM')
          const taskDueDateYear = moment(task.dueDate).format('YYYY')

          // checking if task date month is prev month and check years 
          if(prevMonth === taskDueDateMonth && prevMonthYear === taskDueDateYear){
            return task.assignee
          }
        }).flat()
    
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
        const uniqueIndexes = allAssignedTasks.reduce((acc, val) => {
          if (!acc.includes(val) && val !== undefined) {
            acc.push(val)
          }
          return acc
        }, []).slice(0, 5)

        const topFive = uniqueIndexes.map(uniqueID => {
          return state.data.find(emp => emp.id == uniqueID)
        })
        state.data = topFive
      }
      // by salary desc
      else if(action.payload.filterEmployees === FILTERS[2]){
        state.data.sort((a, b) => {
          const aSalary = Number(a.salary.replace(/\D/g,''))
          const bSalary = Number(b.salary.replace(/\D/g,''))

          return bSalary - aSalary
        })
      }
      // by salary asc
      else if(action.payload.filterEmployees === FILTERS[3]){
        state.data.sort((a, b) => {
          const aSalary = Number(a.salary.replace(/\D/g,''))
          const bSalary = Number(b.salary.replace(/\D/g,''))

          return aSalary - bSalary
        })
      }
      // by age desc
      else if(action.payload.filterEmployees === FILTERS[4]){
        state.data.sort((a, b) => b.dateOfBirth - a.dateOfBirth)
      }
      // by age asc
      else if(action.payload.filterEmployees === FILTERS[5]){
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
    // POST new employee into api and GET new data
    await API.post(`${endpoint}`, newEmployee)
    dispatch(getEmployees('employees'))
  } catch (error) {
      console.log(error);
  }
}

export const updateEmployee = (endpoint, id, modifiedEmployee) => async (dispatch) => {
  try {
    // UPDATE selected employee and GET new data
    await API.put(`${endpoint}/${id}`, modifiedEmployee)
    dispatch(getEmployees('employees'))
  } catch (error) {
    console.log(error);
  }
}

export const deleteEmployee = (endpoint, id, tasks) => async (dispatch) => {
  try {
    // deep tasks list clone
    const tasksClone = JSON.parse(JSON.stringify(tasks))

    // DELETE employee and GET tasks
    await API.delete(`${endpoint}/${id}`)
    dispatch(getEmployees('employees'))
    
    // looping through assigned tasks to deleted employee
    for (let i = 0; i < tasksClone.length; i++) {
      if(tasksClone[i].assignee.includes(Number(id))){
        // removing deleted employee from task and UPDATE task
        const modifiedTask = { ...tasksClone[i], assignee: tasksClone[i].assignee.filter(elem => elem !== Number(id)) }
        await API.put(`task/${tasksClone[i].id}`, modifiedTask)
      }
    }
    // after tasks are updated, GET new data
    dispatch(getTasks('tasks'))
    
  } catch (error) {
      console.log(error);
  }
}

export const { setEmployees, sortEmployees } = employeesSlice.actions

export const selectEmployees = (state) => state.employees.data
export const selectEmployeesClone = (state) => state.employees.dataClone

export default employeesSlice.reducer