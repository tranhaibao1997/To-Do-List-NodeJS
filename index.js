const fs = require("fs")
const yargs = require("yargs");
const chalk = require("chalk");



const loadToDo = () => {
    try {
        const data = fs.readFileSync("data.json")
        const dataJSON = data.toString()
        return JSON.parse(dataJSON)

    } catch (err) {
        console.log(err.message)
    }
}

const listToDo = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].complete) {

            console.log(chalk.greenBright(`id:${i},task:${arr[i].todo},complete:${arr[i].complete}`))
        }
        else {
            console.log(chalk.redBright(`id:${i},task:${arr[i].todo},complete:${arr[i].complete}`))
        }

    }
}
const saveToDo = (arr) => {
    const dataJSON = JSON.stringify(arr)
    fs.writeFileSync("data.json", dataJSON)
}




//customize yarg version
yargs.version("1.1.0")

//Add command
yargs.command({
    command: "add",
    describe: "Add a new todo",
    builder: {
        todo: {
            describe: "Todo content",
            demandOption: true,
            type: "string"
        },
        complete: {
            describe: "Todo status",
            demandOption: false,
            type: "boolean",
            default: false
        }
    },
    handler: function (task) {
        let newTask = {
            todo: task.todo,
            complete: task.complete
        }
        let taskList = loadToDo()
        saveToDo([...taskList, newTask])
        console.log(chalk.green("ADDED"))

    }
})

//Show list command
yargs.command({
    command: "list",
    describe: "Show todo list",
    handler: function () {
        let result = loadToDo()
        listToDo(result)
    }
})
// Show complete list command
yargs.command({
    command: "list_complete",
    describe: "Show complete list",
    handler: function () {
        let result = loadToDo()
        let completeTask=result.filter(task => task.complete)
        listToDo(completeTask)

    }
})
// Show incomplete list command
yargs.command({
    command: "list_incomplete",
    describe: "Show complete list",
    handler: function () {
        let result = loadToDo()
        let incompleteTask=result.filter(task => !task.complete)
        listToDo(incompleteTask)

    }
})

//Edit command
yargs.command({
    command: "edit",
    describe: "Edit a todo",
    builder: {
        todo: {
            describe: "Todo content",
            demandOption: true,
            type: "string"
        },
        complete: {
            describe: "Todo status",
            demandOption: false,
            type: "boolean",
            default: false
        }
    },
    handler: function (task) {
        console.log(task.todo, task.complete)
    }
})
//Remove command
yargs.command({
    command: "delete",
    describe: "Delete a todo by",
    builder: {
        id: {
            describe: "",
            demandOption: true,
            type: "number"
        },

    },
    handler: function (task) {
        let taskList = loadToDo()
        taskList.splice(task.id, 1)
        saveToDo(taskList)
        console.log(chalk.red("DELETED"))

    }
})
//Remove all command
yargs.command({
    command: "delete_all",
    describe: "Delete all todo ",
    handler: function () {

        saveToDo([])
        console.log(chalk.red("DELETED ALL"))

    }
})

//Remove completed
yargs.command({
    command: "delete_complete",
    describe: "Delete complete todo ",
    handler: function () {
        let result = loadToDo()
        let incompleteTask=result.filter(task => !task.complete)
        saveToDo(incompleteTask)
        console.log(chalk.red("DELETED COMPLETE"))

    }
})

//Toggle command
yargs.command({
    command: "toggle",
    describe: "Toggle a todo",
    builder: {
        id: {
            describe: "",
            demandOption: true,
            type: "number"
        },

    },
    handler: function (task) {
        let taskList = loadToDo()
        let newTaskList = taskList.map((elm, index) => {
            if (index == task.id) {
                return { ...elm, complete: !elm.complete }

            }
            else {
                return elm
            }

        })

        saveToDo(newTaskList)


    }
})

console.log(yargs.argv)