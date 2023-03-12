import React from 'react'
import './taskForm.scss'
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { convertDateToMiliseconds } from '../../utils/convertDateToMiliseconds';
import moment from 'moment'
import { selectEmployees } from '../../redux/slices/employeesSlice';
import AssignedEmployee from '../../components/AssignedEmployee/AssignedEmployee';
import { removeAssignedEmployee } from '../../utils/removeAssignedEmployee'
import { assignTaskToEmployee } from '../../utils/assignTaskToEmployee';
import { createTask, updateTask } from '../../redux/slices/tasksSlice';

const TaskForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const employeesList = useSelector(selectEmployees)
    const dispatch = useDispatch()
    const taskToUpdate = id ? JSON.parse(localStorage.getItem('selectedTask')) : null
    
    const dueDateValue = taskToUpdate ? 
        moment(taskToUpdate?.dateOfBirth).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')

    const formValidation = Yup.object().shape({
        title: Yup.string().required("This field is required"),
        description: Yup.string().required("This field is required").min(15),
        assignee: Yup.array().min(1).required('Minimum one emloyee must be assigned to task'),
        dueDate: Yup.number().required("This field is required")
    });

  return (
    <div className='employeeForm'>
        <Formik
        initialValues={{
          title: taskToUpdate?.title || '',
          description: taskToUpdate?.description || '',
          assignee: taskToUpdate?.assignee || [],
          dueDate: taskToUpdate?.dueDate || '',
        }}
        validationSchema={formValidation}
        onSubmit={(val) => {
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
            <Form className='employeeForm__form'>
                <h2 className='margin-bottom-small'>{taskToUpdate ? 'Update task' : 'Create new task'}</h2>
                <div>
                    <Field name="title" placeholder="title" value={values.title} />
                    {errors.title && touched.title ? <div>{errors.title}</div> : <div></div>}
                </div>
                <div>
                    <input 
                        type="date" 
                        value={dueDateValue}
                        onChange={(e) => setFieldValue("dueDate", convertDateToMiliseconds(e.target.value))} 
                    />
                    {errors.dueDate && touched.dueDate ? <div>{errors.dueDate}</div> : <div></div>}
                </div>
                <div>
                    <Field name="description" placeholder="description" value={values.description} component="textarea" rows="5" />
                    {errors.description && touched.description ? <div>{errors.description}</div> : <div></div>}
                </div>
                <div>
                    <label>
                        Employees assigned to task:
                        {errors.assignee && touched.assignee ? <div>{errors.assignee}</div> : <div></div>}
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
                    <div className='employeeForm__dropdown' type='button'>
                        Assign to &darr;
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
                    </div>
                    {errors.phone && touched.phone ? <div>{errors.phone}</div> : <div></div>}
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