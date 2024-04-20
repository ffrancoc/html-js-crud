
var taskList = [];

const btnNewTask = document.querySelector("[btn-new-task]");
const tableContainer = document.querySelector("[table-container]");
const btnClose = document.querySelector("[form-close]");
const textInput = document.querySelector("[form-text-input]");
const btnCancel = document.querySelector("[form-cancel]");
const btnSubmit = document.querySelector("[form-submit]");
const taskForm = document.querySelector("[task-form]");


document.addEventListener("DOMContentLoaded", (event) => {
    taskList = [];    
    todos = localStorage.getItem("todos");
    if (todos !== null){
        taskList = JSON.parse(localStorage.getItem("todos"));
        refreshTable(taskList);
    }    

});


btnNewTask.addEventListener("click", (event) => {
    taskForm.showModal();
});


btnClose.addEventListener("click", (event) => {
    event.preventDefault();
    textInput.value = "";
    taskForm.close();
});

btnCancel.addEventListener("click", (event)=> {
    event.preventDefault();
    textInput.value = "";
    taskForm.close();
});

btnSubmit.addEventListener("click", (event)=> {
    event.preventDefault();

    const task = textInput.value;    
    if (task.trim() !== ""){
        
        postTask(task);
        textInput.value = "";    
        taskForm.close();
    }
});


// Funciones 
function refreshTable(taskList){
    let table = '<table>';
    table += '<tr><th scope="col">#</th><th scope="col">Tarea</th><th scope="col">Acciones</th></tr>';
    let counter = 0;
    taskList.forEach(i => {
        counter +=1;
        table += `<tr><td>${counter}</td><td ${i.status === 1 ? "class='task-checked'" : null}>${i.text}</td><td><div class="table-actions"><input onclick="onUpdateTask(event, ${i.id}, ${i.status})" type="checkbox"/ ${i.status === 1 ? 'checked' : null}><button onclick="onDeleteTask(${i.id})"><i class="bi bi-trash3-fill"></i></button></div></td></tr>`;
    });
    table += '</table>'
    tableContainer.innerHTML = table        
}


function onDeleteTask(id){
    deleteTask(id);
}


function onUpdateTask(event, id, status){
    const row = event.target.parentElement.parentElement.parentElement;
    const textCell = row.children[1];
    if(event.target.checked === true){
        textCell.classList.add("task-checked");    
        updateTask(id, 1);
    }else{
        textCell.classList.remove("task-checked");            
        updateTask(id, 0);
    }
}

//  Funciones CRUD
function postTask(task){
    taskList.push({id: Date.now(), text: task, status: 0});
    localStorage.setItem("todos", JSON.stringify(taskList));    
    taskList = JSON.parse(localStorage.getItem("todos"));
    refreshTable(taskList);
}

function updateTask(id, status){
    taskList = JSON.parse(localStorage.getItem("todos"));
    taskList.forEach(i => {
        if (i.id === id){
            i.status = status;
        }
    });    
    refreshTable(taskList);
    localStorage.setItem("todos", JSON.stringify(taskList)); 
}

function deleteTask(id){        
    taskList = JSON.parse(localStorage.getItem("todos"));
    taskList = taskList.filter((i) => { return i.id !== id});    
    refreshTable(taskList);
    localStorage.setItem("todos", JSON.stringify(taskList)); 
}