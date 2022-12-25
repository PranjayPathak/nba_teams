import { useEffect, useReducer, useState } from "react";
import axios from 'axios';

const initialState = {
    data: [],
    loading: true,
    error: false,
}

const ACTIONS = {
    API_REQUEST: 'api-request',
    FETCH_DATA: 'fetch-data',
    ERROR: 'error'
}

function reducer(state, { type, payload }) {
    // console.log(payload);
    switch (type) {
        case ACTIONS.API_REQUEST:
            return { ...state, data: [], loading: true }
        case ACTIONS.FETCH_DATA:
            return { ...state, data: payload.data, meta: payload.meta, loading: false }
        case ACTIONS.ERROR:
            return { ...state, data: [], error: true }
        default:
            return state
    }
}

function useFetch(url) {
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        dispatch({ type: ACTIONS.API_REQUEST });
        axios.get(url).then(res => {
            dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data })
        }).catch(err => {
            dispatch({ type: ACTIONS.ERROR, payload: err.error })
        })
    }, [url]);

    return state
}

export default useFetch;