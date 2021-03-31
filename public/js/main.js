const deleteTasks = document.querySelectorAll('.delete')

Array.from(deleteTasks).forEach((element) => {
    console.log(deleteTasks)
    element.addEventListener('click', deleteTask)
})

async function deleteTask() {
    console.log("i've been clicked")
    const taskName = this.parentNode.childNodes[1].innerText.trim()
    console.log(taskName)
    try {
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'taskToDo': taskName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch (err) {
        console.error(err)
    }
}