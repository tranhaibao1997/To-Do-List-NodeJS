const fs = require("fs")



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
        console.log({ "id": i, ...arr[i] })
    }
}
const saveToDo = (arr) => {
    const dataJSON = JSON.stringify(arr)
    fs.writeFileSync("data.json", dataJSON)
}

console.log(process.argv)

if (process.argv[2] === "add") {
    let data = loadToDo()

    saveToDo([...data, process.argv[3]])
} else if (process.argv[2] === "list") {
    console.log("LIST-TO-DO");
    let result = loadToDo()
    listToDo(result)
}