import * as types from "../store/types";

export const setSearchQuery = (query) => ({
    type: types.SET_SEARCH_QUERY,
    payload: query,
});

export const toggleSort = () => ({
    type: types.TOGGLE_SORT,
});
