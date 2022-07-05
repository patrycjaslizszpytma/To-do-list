{

  const tasks = [
    {
      content: "nagrać lekcję",
      done: false,
    },
    {
      content: "zjeść pierogi",
      done: true,
    },
  ];



  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    //every delete button will be deleting other task thanks to the index value
    render();
  };



  const addNewTask = (newTaskContent) => {
    tasks.push({ //creating and pushing an object which is a new task
      content: newTaskContent,
    });

    render();
  };



  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done; //catching the task index and creating opposite property
    render();
  };



  const render = () => {
    let htmlString = ""; //at the beginning is a empty string chain

    for (const task of tasks) {
      //using for of loop we do an iteration on every task of tasks and an adding, here the indexes does not matter
      htmlString += `
            
                <li 
                  ${task.done ? "style=\"text-decoration: line-through\"" : ""}
                >

                  ${task.content}

                  <button class="js-done"> Done </button>

                  <button class="js-remove"> Delete </button>
                   
                </li>
            `; //creating a line through decoration for done tasks and sticking a delete button to each task
    };
    document.querySelector(".js-tasks").innerHTML = htmlString; // string is putted do the task list
    //the js-tasks is replaced by the htmlString values which was iterated



    const removeButtons = document.querySelectorAll(".js-remove"); //creating the delete button, catching all button with js-remove class

    //console.log(removeButtons); //NodeList, similar to table, for checking

    removeButtons.forEach((removeButton, index) => { //removeButton is a button and index is it loc that is  transferred to remove task function

      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });



    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });


  };


  


  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim(); //manupulation the task content, triming the white symbols outside the task

    if (newTaskContent === " ") {
      return; //do nothing is the string chain is empty
    }

    addNewTask(newTaskContent); //function call addNewTask
  }



  const init = () => {
    render();

    const form = document.querySelector(".js-form"); //form for adding new tasks

    form.addEventListener("submit", onFormSubmit); //function call onFormSubmit on "submit"  

  };

  init();
}