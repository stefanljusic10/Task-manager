# Task manager

## Setup guide
Steps:
1. npm i - install all necessary dependencies
2. npm start - run app

## Folder structure
src\
|_assets\
|_components\
|  |_AssignedEmployee\
|  |_Button\
|  |_DropdownEmployee\
|  |_Header\
|  |_Modal\
|  |_SearchBar\
|  |_SelectedTask\
|_pages\
|  |_EmployeeForm\
|  |_Employees\
|  |_TaskForm\
|  |_Tasks\
|_redux\
|  |_slices\
|  |_store.js\
|_style\
|  |_ _base.scss\
|  |_ _mixins.scss\
|  |_ _utils.scss\
|  |_ _variables.scss\
|_utils\
|  |_api.js\
|  |_ApiData.js\
|  |_assignTaskToEmployee.js\
|  |_convertDateToMiliseconds.js\
|  |_filters.js\
|  |_goToSelectedEmployee.js\
|  |_openModal.js\
|  |_regexValidation.js\
|  |_removeAssigneeEmployee.js\
|_App.js\
|_app.scss\
|_index.js

## Additional functionalities
1. Search bar - reusable component which helps in searching employees by name or tasks by title
2. Employee dropdown - sort employees by their salaries or age
3. One task can be assigned to more employees