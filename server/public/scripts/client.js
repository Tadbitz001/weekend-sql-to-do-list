$(document).ready(getReady);

function getReady () {
    console.log("Inside of getReady")

    $('#submitBtn').on('click', enterTask);
    getTasks();
    $('#displayResults').on('click', '#deleteBtn', deleteTasks);
    $('#displayResults').on('click', '#changeBtn', changeComplete);

}
let tasks = [];

function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get koalas
    $.ajax({
      type: 'GET',
      url: '/tasks',
    }).then((response) => {
        tasks = response;
      console.log(tasks);
      //will need to make a renderTasks function
      renderTasks();
    }).catch((error) => {
      console.log('error in GET', error);
    });
  
  } 


function enterTask () {
    //capture values of inputs:
    let tasks =
    {
        tasks: $('#taskInput').val(),
        notes: $('#noteInput').val()
    }
    //send values to server
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: tasks
    }).then((response) => {
        console.log("The ajax post worked.")
        getTasks();
    })


}


function renderTasks () {
    console.log("Inside renderTasks")
    //empty display before appending
    $('#displayResults').empty();

    for (let task of tasks) {
        const rowClass = task.completed ? "green-row" : "red-row";

    $('#displayResults').append(`
    <tr data-id=${task.id} class="${rowClass}">
      <td>${task.tasks} </td>
      <td>${task.completed} 
      <td><button id="changeBtn">Completed</button></td></td>
      <td>${task.notes}</td>
      <td><button id="deleteBtn">Delete</button></td>
      
    </td>
    `);
    }
}

function deleteTasks () {
    console.log("Inside of deleteTasks");

    const idToDelete = $(this).parent().parent().data().id;
    console.log("Id to delete: ", idToDelete);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
      }).then((response) => {
        console.log("Deletion completed for id :", idToDelete);
        getTasks();
      }).catch((error) => {
        console.log("Error making DB deletion for id: ", idToDelete, error)
      })

}

function changeComplete() {
    console.log('Inside changeComplete()', $(this));
    const idToUpdate = $(this).parent().parent().data().id; 
    console.log('Id to update:', idToUpdate);
    
    let bool;
     for (let task of tasks) {
        if (task.id === Number(idToUpdate)) {
            bool = task.completed;
        }
     }
        
    $.ajax({
      method: 'PUT',
      url: `/tasks/changeComplete/${idToUpdate}`,
      data: {thing: !bool}
    }).then((response) => {
      getTasks();
    }).catch((error) => {
      alert('error on changeComplete route', error);
    })
  }