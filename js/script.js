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
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
                ${task.content}
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        // dodawanie do HTML przy każdej iteracji kolejne li 
        //i na koniec jest to wpisane do listy innerHTML
    };

    const init = () => {
        render();
    };

    init();
}