import React, { useState } from 'react'
import '../EmployeeForm/form.scss'
import './taskForm.scss'
import '../../style/_errorMsg.scss'
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { convertDateToMiliseconds } from '../../utils/convertDateToMiliseconds';
import { selectEmployees } from '../../redux/slices/employeesSlice';
import AssignedEmployee from '../../components/AssignedEmployee/AssignedEmployee';
import { removeAssignedEmployee } from '../../utils/removeAssignedEmployee'
import { assignTaskToEmployee } from '../../utils/assignTaskToEmployee';
import { createTask, updateTask } from '../../redux/slices/tasksSlice';
import { parseDate } from '../../utils/parseDate'

const TaskForm = () => {
    const [toggleTaskDropdown, setToggleTaskDropdown] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const employeesList = useSelector(selectEmployees)
    const dispatch = useDispatch()

    // check if there is task to update or new task should be created
    const taskToUpdate = id ? JSON.parse(localStorage.getItem('selectedTask')) : null

    const formValidation = Yup.object().shape({
        title: Yup.string().required("This field is required"),
        description: Yup.string().required("This field is required").min(15),
        assignee: Yup.array(),
        dueDate: Yup.number().required("This field is required")
    });

  return (
    <div className='form'>
        <Formik
        initialValues={{
          // setting init values of selected task or to empty strings if it is create page
          title: taskToUpdate?.title || '',
          description: taskToUpdate?.description || '',
          assignee: taskToUpdate?.assignee || [],
          dueDate: taskToUpdate?.dueDate || '',
        }}
        validationSchema={formValidation}
        onSubmit={(val) => {
            // update selected task if there is task to update or create new task
            if(taskToUpdate){
                navigate('/tasks')
                dispatch(updateTask('task', taskToUpdate.id, val))
            }
            else {
                navigate('/tasks')
                dispatch(createTask('task', val))
            }
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
            <Form className='form__box'>
                <h2 className='margin-bottom-small'>{taskToUpdate ? 'Update task' : 'Create new task'}</h2>
                <div>
                    <Field name="title" placeholder="title" value={values.title} />
                    {errors.title && touched.title ? <div className='errorMsg'>{errors.title}</div> : <div></div>}
                </div>
                <div>
                    <input 
                        type="date" 
                        value={taskToUpdate ? parseDate(values.dueDate) : undefined}
                        onChange={(e) => setFieldValue("dueDate", convertDateToMiliseconds(e.target.value))} 
                    />
                    {errors.dueDate && touched.dueDate ? <div className='errorMsg'>{errors.dueDate}</div> : <div></div>}
                </div>
                <div>
                    <Field name="description" placeholder="description" value={values.description} component="textarea" rows="5" />
                    {errors.description && touched.description ? <div className='errorMsg'>{errors.description}</div> : <div></div>}
                </div>
                <div>
                    <label className='form__assignedEmp'>
                        Employees assigned to task:
                        <ul>
                            {values?.assignee.map(assigneeID => {
                                const assignedEmployee = employeesList.find(emp => emp.id == assigneeID)
                                if(assignedEmployee){
                                    return <AssignedEmployee key={assignedEmployee.id} name={assignedEmployee.name} 
                                                clickHandler={() => removeAssignedEmployee(values.assignee, assignedEmployee.id, setFieldValue)}
                                            />
                                }
                            })}
                        </ul>
                    </label>
                    <div onClick={() => setToggleTaskDropdown(!toggleTaskDropdown)} className='form__dropdown' type='button'>
                        {/* Dropdown woth unassigned employees to a current task */}
                        Assign to &darr;
                        {toggleTaskDropdown &&
                            <div>
                                {employeesList.map(assignee => {
                                    let unassigned = null
                                    const assigneeID = Number(assignee.id)
                                    if(values?.assignee.indexOf(assigneeID) === -1)
                                        unassigned = assignee
                                    if(unassigned){
                                        return (
                                            <div 
                                                key={unassigned.id}
                                                onClick={() => assignTaskToEmployee(values.assignee, unassigned.id, setFieldValue)}
                                            >
                                                {unassigned.name}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        }
                    </div>
                    {errors.phone && touched.phone ? <div className='errorMsg'>{errors.phone}</div> : <div></div>}
                </div>
                <Button 
                    value={taskToUpdate ? 'Update' : 'Create'}
                    btnClass={taskToUpdate ? 'btnBlue' : 'btnGreen'}
                    clickHandler={() => void 0}
                />
            </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskForm