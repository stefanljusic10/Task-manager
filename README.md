# Task manager

## Setup guide
Steps:
1. npm i - install all necessary dependencies
2. npm start - run app

## Folder structure
<pre>
src\
|___assets\
|___components\
|  |___AssignedEmployee\
|  |___Button\
|  |___DropdownEmployee\
|  |___Header\
|  |___Modal\
|  |___SearchBar\
|  |___SelectedTask\
|___pages\
|  |___EmployeeForm\
|  |___Employees\
|  |___TaskForm\
|  |___Tasks\
|___redux\
|  |___slices\
|  |___store.js\
|___style\
|  |____base.scss\
|  |____mixins.scss\
|  |____utils.scss\
|  |____variables.scss\
|___utils\
|  |___api.js\
|  |___ApiData.js\
|  |___assignTaskToEmployee.js\
|  |___convertDateToMiliseconds.js\
|  |___filters.js\
|  |___goToSelectedEmployee.js\
|  |___openModal.js\
|  |___regexValidation.js\
|  |___removeAssigneeEmployee.js\
|___App.js\
|___app.scss\
|___index.js
</pre>

## Additional functionalities
1. Search bar - reusable component which helps in searching employees by name or tasks by title
2. Employee dropdown - sort employees by their salaries or age
3. One task can be assigned to more employees