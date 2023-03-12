# Task manager

## Setup guide
Steps:
1. npm i - install all necessary dependencies
2. npm start - run app

## Folder structure
<pre>
src
|___api
|   |___api.js
|   |___ApiData.js
|
|___assets
|
|___components
|   |___AssignedEmployee
|   |___Button
|   |___DropdownEmployee
|   |___Header
|   |___Modal
|   |___SearchBar
|   |___SelectedTask
|
|___pages
|   |___EmployeeForm
|   |___Employees
|   |___Error
|   |___TaskForm
|   |___Tasks
|
|___redux
|   |___slices
|   |   |___employeesSlice.js
|   |   |___modalSlice.js
|   |   |___tasksSlice.js
|   |
|   |___store.js
|
|___style
|   |___ _base.scss
|   |___ _errorMsg.scss
|   |___ _mixins.scss
|   |___ _utils.scss
|   |___ _variables.scss
|
|___utils
|   |___assignTaskToEmployee.js
|   |___convertDateToMiliseconds.js
|   |___filters.js
|   |___goToSelectedEmployee.js
|   |___goToSelectedTask.js
|   |___openModal.js
|   |___parseDate.js
|   |___regexValidation.js
|   |___removeAssigneeEmployee.js
|
|___App.js
|___app.scss
|___index.js
</pre>

## Additional functionalities
1. Search bar - reusable component which helps searching employees by name or tasks by title
2. Employee dropdown - sort employees by their salaries or age in ascending or descending order
3. One task can be assigned to multiple employees. Task assignee property is an array of employees id-s