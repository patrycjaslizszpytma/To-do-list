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

  const render = () => {
    let htmlString = ""; // na poczatku to jest pusty łańcuch znaków

    for (const task of tasks) {
      //iterujemy i dodajemy, for of bo nie interesują nas indexy
      htmlString += `
            
                <li 
                    ${task.done ? "style=\"text-decoration: line-through\"" : ""}
                    >
                    ${task.content}
                </li>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString; // string wpisany do listy

  };

  const addNewTask = (newTaskContent) => {

    tasks.push({ //tworzymy obiekt, który jest nowym dodawanym zadaniem
      content: newTaskContent,
    });

    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim(); //manupulacja trescia zadania
    // trimem usuwamy białe znaki po bokach

    if (newTaskContent === " ") {
      return; //wychodzę z funkcji jeśli mamy pusty łańcuch znaków
    }

    addNewTask(newTaskContent); //wywołanie funkcji addNewTask
  }

  const init = () => {
    render();

    const form = document.querySelector(".js-form"); //formularz do dodawania nowych zadań

    form.addEventListener("submit", onFormSubmit); //wywołanie fukncji onFormSubmit na "submit"  

  };

  init();
}