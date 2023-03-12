export const goToSelectedEmployee = (employee, navigate) => {
    navigate(`/employee/form/id=${employee.id}`)
    localStorage.setItem('selectedEmployee', JSON.stringify(employee))
}  