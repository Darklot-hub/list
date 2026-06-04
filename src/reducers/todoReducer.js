import * as types from "../store/types";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TODOS_REQUEST:
            return { ...state, loading: true, error: null };
        case types.FETCH_TODOS_SUCCESS:
            return { ...state, loading: false, items: action.payload };
        case types.FETCH_TODOS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case types.ADD_TODO_SUCCESS:
            return { ...state, items: [...state.items, action.payload] };
        case types.UPDATE_TODO_SUCCESS:
            return {
                ...state,
                items: state.items.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo,
                ),
            };
        case types.DELETE_TODO_SUCCESS:
            return {
                ...state,
                items: state.items.filter((todo) => todo.id !== action.payload),
            };
        default:
            return state;
    }
};

export default todoReducer;
