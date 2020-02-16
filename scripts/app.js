var app = new Vue({
    el: '#app',
    data: {
        newTodo: null,
        todos: []
    },
    mounted() {
        this.todos = localStorage.todos ? JSON.parse(localStorage.todos) : [];
    },
    methods: {
        store(e, description) {
            if (e.which == 13) {
                this.todos.push({
                    description: description,
                    finished: false,
                    edit: false
                });
                this.saveLocalStorage();
                this.newTodo = null;
            }
        },

        edit(todo) {
            todo.edit = true;
        },

        update(e, todo) {
            if (e.which == 13) {
                const index = this.todos.indexOf(todo);
                todo.edit = false;
                this.todos[index] = todo;
                this.saveLocalStorage();
            }
        },

        finish(todo) {
            const index = this.todos.indexOf(todo);
            todo.finished = !todo.finished;
            this.todos[index] = todo;
            this.saveLocalStorage();
        },

        cancelUpdate(todo) {
            todo.edit = false;
        },

        remove(todo) {

            if (confirm('Deseja excluir nota ?')) {
                const index = this.todos.indexOf(todo);
                this.todos.splice(index, 1);
                this.saveLocalStorage();
            }
        },

        saveLocalStorage() {
            localStorage.todos = JSON.stringify(this.todos);
        }
    }
});