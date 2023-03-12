# Task manager

## Setup guide
Steps:
1. npm i - install all necessary dependencies
2. npm start - run app

## Folder structure
src__
|_assets__
|_components__
|  |_AssignedEmployee__
|  |_Button__
|  |_DropdownEmployee__
|  |_Header__
|  |_Modal__
|  |_SearchBar__
|  |_SelectedTask__
|_pages__
|  |_EmployeeForm__
|  |_Employees__
|  |_TaskForm__
|  |_Tasks__
|_redux__
|  |_slices__
|  |_store.js__
|_style__
|  |_ _base.scss__
|  |_ _mixins.scss__
|  |_ _utils.scss__
|  |_ _variables.scss__
|_utils__
|  |_api.js__
|  |_ApiData.js__
|  |_assignTaskToEmployee.js__
|  |_convertDateToMiliseconds.js__
|  |_filters.js__
|  |_goToSelectedEmployee.js__
|  |_openModal.js__
|  |_regexValidation.js__
|  |_removeAssigneeEmployee.js__
|_App.js__
|_app.scss__
|_index.js

## Additional functionalities
1. Search bar - reusable component which helps in searching employees by name or tasks by title
2. Employee dropdown - sort employees by their salaries or age
3. One task can be assigned to more employees