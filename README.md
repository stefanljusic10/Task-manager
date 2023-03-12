# Task manager

## Setup guide
Steps:
1. npm i - install all necessary dependencies
2. npm start - run app

## Folder structure
src\
|---assets\
|---components\
|  |---AssignedEmployee\
|  |---Button\
|  |---DropdownEmployee\
|  |---Header\
|  |---Modal\
|  |---SearchBar\
|  |---SelectedTask\
|---pages\
|  |---EmployeeForm\
|  |---Employees\
|  |---TaskForm\
|  |---Tasks\
|---redux\
|  |---slices\
|  |---store.js\
|---style\
|  |---_base.scss\
|  |---_mixins.scss\
|  |---_utils.scss\
|  |---_variables.scss\
|---utils\
|  |---api.js\
|  |---ApiData.js\
|  |---assignTaskToEmployee.js\
|  |---convertDateToMiliseconds.js\
|  |---filters.js\
|  |---goToSelectedEmployee.js\
|  |---openModal.js\
|  |---regexValidation.js\
|  |---removeAssigneeEmployee.js\
|---App.js\
|---app.scss\
|---index.js

## Additional functionalities
1. Search bar - reusable component which helps in searching employees by name or tasks by title
2. Employee dropdown - sort employees by their salaries or age
3. One task can be assigned to more employees