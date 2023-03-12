import React from 'react'
import './employeeForm.scss'
import { Formik, Form, Field } from "formik";
import { useDispatch } from 'react-redux';
import { createEmployee, updateEmployee } from '../../redux/slices/employeesSlice';
import * as Yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { convertDateToMiliseconds } from '../../utils/convertDateToMiliseconds';
import moment from 'moment'
import { nameLatinLettersRegex, fullNameRegex, phoneRegex, salaryRegex } from '../../utils/regexValidation';

const EmployeeForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const employeeToUpdate = id ? JSON.parse(localStorage.getItem('selectedEmployee')) : null
    const dateOfBirthValue = employeeToUpdate ? 
        moment(employeeToUpdate?.dateOfBirth).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')

    const formValidation = Yup.object().shape({
        name: Yup.string().required("This field is required")
            .matches(nameLatinLettersRegex, 'Name can only contain Latin letters.')
            .matches(fullNameRegex, 'Enter full name.'),
        email: Yup.string().required("This field is required").email(),
        phone: Yup.string().matches(phoneRegex, 'Phone number is not valid'),
        dateOfBirth: Yup.number().required("This field is required"),
        salary: Yup.string().required('This field is required').matches(salaryRegex, 'Salary must start with digit bigger than 1 and must end with $')
    });

  return (
    <div className='employeeForm'>
        <Formik
        initialValues={{
          name: employeeToUpdate?.name || '',
          email: employeeToUpdate?.email || '',
          phone: employeeToUpdate?.phone || '',
          dateOfBirth: employeeToUpdate?.dateOfBirth || '',
          salary: employeeToUpdate?.salary || ''
        }}
        validationSchema={formValidation}
        onSubmit={(val) => {
            if(employeeToUpdate){
                navigate('/')
                dispatch(updateEmployee('employees', employeeToUpdate.id, val))
            }
            else {
                navigate('/')
                dispatch(createEmployee('employees', val))
            }
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
            <Form className='employeeForm__form'>
                <h2 className='margin-bottom-small'>{employeeToUpdate ? 'Update employee' : 'Create new employee'}</h2>
                <div>
                    <Field name="name" placeholder="full name" value={values.name} />
                    {errors.name && touched.name ? <div>{errors.name}</div> : <div></div>}
                </div>
                <div>
                    <Field name="email" placeholder="email" value={values.email} />
                    {errors.email && touched.email ? <div>{errors.email}</div> : <div></div>}
                </div>
                <div>
                    <Field name="phone" placeholder="phone" value={values.phone} />
                    {errors.phone && touched.phone ? <div>{errors.phone}</div> : <div></div>}
                </div>
                <div>
                    <input 
                        type="date" 
                        value={dateOfBirthValue}
                        onChange={(e) => setFieldValue("dateOfBirth", convertDateToMiliseconds(e.target.value))} 
                    />
                    {errors.dateOfBirth && touched.dateOfBirth ? <div>{errors.dateOfBirth}</div> : <div></div>}
                </div>
                <div>
                    <Field name="salary" placeholder="salary" value={values.salary} />
                    {errors.salary && touched.salary ? <div>{errors.salary}</div> : <div></div>}
                </div>
                <Button 
                    value={employeeToUpdate ? 'Update' : 'Create'}
                    btnClass={employeeToUpdate ? 'btnBlue' : 'btnGreen'}
                    clickHandler={() => void 0}
                />
            </Form>
        )}
      </Formik>
    </div>
  )
}

export default EmployeeForm