const deleteTasks = document.querySelectorAll('.delete')
const completeTasks = document.querySelectorAll('.complete')
const removeCompleted = document.querySelectorAll('.removeCompleted')

Array.from(removeCompleted).forEach((element) => {
    element.addEventListener('click', removeCompletedTask)
})

Array.from(completeTasks).forEach((element) => {
    element.addEventListener('click', completeTask)
})

Array.from(deleteTasks).forEach((element) => {
    console.log(deleteTasks)
    element.addEventListener('click', deleteTask)
})

async function removeCompletedTask() {
    const removeTask = this.parentNode.childNodes[1].innerText.trim()
    try {
        const response = await fetch('removeCompletedtask', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'completedTask': removeTask
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

async function completeTask() {
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
        // location.reload()
    }
    catch (err) {
        console.error(err)
    }
    finally {
        const response = await fetch('addCompleted', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'completedTask': taskName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }

}