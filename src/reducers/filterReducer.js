import * as types from "../store/types";

const initialState = {
    searchQuery: "",
    sortAlphabetically: false,
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case types.TOGGLE_SORT:
            return { ...state, sortAlphabetically: !state.sortAlphabetically };
        default:
            return state;
    }
};

export default filterReducer;
