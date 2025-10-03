// Inisialisasi array untuk menyimpan todo
let todos = [];

// Tambah todo
function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    if (validateInput(todoInput.value, todoDate.value)) {
        let todo = { task: todoInput.value, date: todoDate.value };
        todos.push(todo);

        renderTodo();

        // Reset input
        todoInput.value = '';
        todoDate.value = '';
    }
}

// Render todo
function renderTodo() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = `<p class="text-center text-gray-400">No todos yet. Add one above!</p>`;
        return;
    }

    todos.forEach((todo, index) => {
        todoList.innerHTML += `
        <li class="border p-2 mb-2 flex justify-between items-center rounded-lg bg-slate-700">
            <div>
                <p class="font-bold">${todo.task}</p>
                <p class="text-sm text-gray-400">${todo.date}</p>
            </div>
            <button onclick="deleteTodo(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </li>`;
    });
}

// Hapus satu todo
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodo();
}

// Hapus semua todo
function deleteAllTodo() {
    todos = [];
    renderTodo();
}

// Filter todo hari ini
function filterTodo() {
    const today = new Date().toISOString().split('T')[0]; 
    const filtered = todos.filter(todo => todo.date === today);

    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = '';

    if (filtered.length === 0) {
        todoList.innerHTML = `<p class="text-center text-gray-400">No todos for today!</p>`;
        return;
    }

    filtered.forEach((todo, index) => {
        todoList.innerHTML += `
        <li class="border p-2 mb-2 flex justify-between items-center rounded-lg bg-slate-700">
            <div>
                <p class="font-bold">${todo.task}</p>
                <p class="text-sm text-gray-400">${todo.date}</p>
            </div>
            <button onclick="deleteTodo(${todos.indexOf(todo)})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </li>`;
    });
}

// Validasi input
function validateInput(todo, date) {
    if (todo === '' || date === '') {
        alert("Please fill in all fields");
        return false;
    }
    return true;
}
