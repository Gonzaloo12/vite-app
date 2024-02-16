import {Todo} from '../todos/models/todo.model';

export const Filters= {

    All:'all',
    Completed:'Completed',
    Pending:'Pending'
}


const state = {
    todos:[
        new Todo ('Piedra del alma'),
        new Todo ('Piedra del mundo'),
        new Todo ('Piedra del infinito'),
        new Todo ('Piedra del poder'),
        new Todo ('Piedra de realidad'),
    ],

    filter: Filters.All,

}

const initStore = () => {
    loadStore();
    console.log('InitStore ❤');

}

const loadStore = () => {
    if( !localStorage.getItem('state') ) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state) );
}

const getTodos =(filter=Filters.All) => {
    
    switch (filter){
        case Filters.All:
            return [...state.todos]; // para que me devuelva un array nuevo
        case Filters.Completed:
            return state.todos.filter(todo=>todo.done);//espera condicion boleana
        case Filters.Pending:
                return state.todos.filter(todo=>!todo.done);
        default: throw new Error('No esta implementado');

        
    }

}
const addTodo = (description)=> {

    if (!description ) throw new Error('No esta implementado');

    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

//cambiar estado de la tarea
const toggleTodo = (todoId) => {

    state.todos=state.todos.map(todo=>{ ; //barre todos los elementos y regresa nuevo arreglo
    if (todo.id===todoId){
        todo.done= !todo.done
    }
    return todo;
});  
saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos=state.todos.filter(todo=>todo.id!==todoId);
    saveStateToLocalStorage();
}

const deleteComplete = ()=> {
    state.todos=state.todos.filter(todo=>!todo.done);
    saveStateToLocalStorage();

}

const setFilter = (newFilter = Filters.All) => {

    state.filter=newFilter;
    saveStateToLocalStorage();

}

const getCurrentFilter= ()=>{
    return state.filter;

}



export default {
    deleteComplete,
    getTodos,
    deleteTodo,
    addTodo,
    loadStore,
    setFilter,
    getCurrentFilter,
    toggleTodo,
    initStore,
}