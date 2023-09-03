import { deleteTask, getTask, onGetTasks, saveTask, updateTask } from './firebase.js';
const tasksContainer = document.getElementById('tasks-container')
const taskFrom = document.getElementById('task-form')
let id = null;

window.addEventListener('DOMContentLoaded', () => {
    onGetTasks((querySnapshot) => {
        tasksContainer.innerHTML = '';

        querySnapshot.forEach(doc => {
            const task = doc.data();
            tasksContainer.innerHTML += `
                <div class='card card-body mt-2 border-primary'>
                    <h3 class='h5'>${task.title}</h3>
                    <p>${task.description}</p>
                    <div>
                        <button class='btn btn-primary btn-delete' data-id='${doc.id}'>Delete</button>
                        <button class='btn btn-secondary btn-edit' data-id='${doc.id}'>Edit</button>
                    </div>
                </div>
            `
        })

        const btnsDelte = tasksContainer.querySelectorAll('.btn-delete')
        btnsDelte.forEach(btn =>
            btn.addEventListener('click', ({ target: { dataset } }) => deleteTask(dataset.id)))

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn => btn.addEventListener('click', async ({ target: { dataset } }) => {
            const doc = await getTask(dataset.id)
            const task = doc.data();

            taskFrom['task-title'].value = task.title
            taskFrom['task-description'].value = task.description
            id = dataset.id
            taskFrom['btn-task-save'].innerText = 'Update'
        }))
    })
})

taskFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = {
        title: taskFrom['task-title'].value,
        description: taskFrom['task-description'].value
    }

    if (id) updateTask(id, task)
    else saveTask(task)

    id = null
    taskFrom.reset()
})
