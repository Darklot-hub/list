import * as types from "../store/types";

const API_URL = "http://localhost:3001/todos";

const fetchTodosRequest = () => ({ type: types.FETCH_TODOS_REQUEST });
const fetchTodosSuccess = (todos) => ({
    type: types.FETCH_TODOS_SUCCESS,
    payload: todos,
});
const fetchTodosFailure = (error) => ({
    type: types.FETCH_TODOS_FAILURE,
    payload: error,
});
const addTodoSuccess = (todo) => ({
    type: types.ADD_TODO_SUCCESS,
    payload: todo,
});
const updateTodoSuccess = (todo) => ({
    type: types.UPDATE_TODO_SUCCESS,
    payload: todo,
});
const deleteTodoSuccess = (id) => ({
    type: types.DELETE_TODO_SUCCESS,
    payload: id,
});

// thunk-actions
export const fetchTodos = () => async (dispatch) => {
    dispatch(fetchTodosRequest());
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = await res.json();
        dispatch(fetchTodosSuccess(data));
    } catch (err) {
        dispatch(fetchTodosFailure(err.message));
    }
};

export const addTodo = (title) => async (dispatch) => {
    try {
        const newTodo = { title, completed: false };
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
        });
        if (!res.ok) throw new Error("Ошибка добавления");
        const created = await res.json();
        dispatch(addTodoSuccess(created));
    } catch (err) {
        console.error(err);
    }
};

export const updateTodo = (id, updates) => async (dispatch) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error("Ошибка обновления");
        const updated = await res.json();
        dispatch(updateTodoSuccess(updated));
    } catch (err) {
        console.error(err);
    }
};

export const deleteTodo = (id) => async (dispatch) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Ошибка удаления");
        dispatch(deleteTodoSuccess(id));
    } catch (err) {
        console.error(err);
    }
};
