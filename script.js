const taskList = document.querySelector(".task-list")
const addButton = document.querySelector("#add-task")
const task = document.querySelector("#task-name")
const nbrTask = document.querySelector("#number-task")
const currentTasks = document.querySelector(".current-tasks")
const clearAllButton = document.querySelector("#clear-all")
const localStorageKey = "toDoStorage"
loadToDos()
addButton.addEventListener("click", e => {
  e.preventDefault()
  if (!task.value) return
  renderTask(task.value)
  addTodoToLocalStorage(task.value)
})
taskList.addEventListener("change", () => {
  if (taskList.length === 0) currentTasks.classList.add("hide")
})
taskList.addEventListener("click", e => {
  if (e.target.matches("#delete-task")) {
    removeToDoFromLocalStorage(
      e.target.previousSibling.previousElementSibling.innerText
    )
    e.target.parentElement.parentElement.remove()
  } else if (e.target.matches(".icon")) {
    removeToDoFromLocalStorage(
      e.target.parentElement.previousSibling.previousElementSibling.innerText
    )
    e.target.parentElement.parentElement.parentElement.remove()
  }

  if (taskList.children.length === 0) currentTasks.classList.add("hide")
  nbrTask.innerText = taskList.children.length
})
clearAllButton.addEventListener("click", () => {
  clearAll()
  removeAllFromLocalStorage()
})
function renderTask(name) {
  const taskTemplate = document.querySelector("#task-template")
  const task = taskTemplate.content.cloneNode(true)
  const taskName = task.querySelector("span")
  taskName.innerText = name
  //select task list
  taskList.appendChild(task)
  currentTasks.classList.remove("hide")
  nbrTask.innerText = taskList.children.length
}
function clearAll() {
  taskList.innerHTML = ""
  currentTasks.classList.add("hide")
}
function loadToDos() {
  const toDos = JSON.parse(localStorage.getItem(localStorageKey)) || []
  toDos.forEach(toDo => renderTask(toDo))
}
function addTodoToLocalStorage(toDo) {
  const toDos = JSON.parse(localStorage.getItem(localStorageKey)) || []
  toDos.push(toDo)
  localStorage.setItem(localStorageKey, JSON.stringify(toDos))
  task.value = ""
}
function removeToDoFromLocalStorage(toDo) {
  let toDos = JSON.parse(localStorage.getItem(localStorageKey))
  toDos = toDos.filter(e => e !== toDo)
  localStorage.setItem(localStorageKey, JSON.stringify(toDos))
}
function removeAllFromLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify([]))
}
