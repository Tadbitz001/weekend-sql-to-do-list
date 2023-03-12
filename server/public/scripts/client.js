$(document).ready(getReady);

function getReady () {
    console.log("Inside of getReady")

    $('#submitBtn').on('click', enterTask);
    getTasks();
    $('#displayResults').on('click', '#deleteBtn', deleteTasks);
}

function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get koalas
    $.ajax({
      type: 'GET',
      url: '/tasks',
    }).then((response) => {
      console.log(response);
      //will need to make a renderTasks function
      renderTasks(response);
    }).catch((error) => {
      console.log('error in GET', error);
    });
  
  } 


function enterTask () {
    //capture values of inputs:
    let tasks =
    {
        tasks: $('#taskInput').val(),
        completed: $('#completedInput').val(),
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


function renderTasks (input) {
    console.log("Inside renderTasks", input)
    //empty display before appending
    $('#displayResults').empty();

    for (let task of input)
    $('#displayResults').append(`
    <tr data-id=${task.id}>
      <td>${task.tasks} </td>
      <td>${task.completed} </td>
      <td>${task.notes}</td>
      <td><button id="deleteBtn">Delete</button></td>
      <td><button id="transferBtn">completed</button></td>
    </td>
    `);

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