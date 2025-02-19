import React, { createContext, useReducer } from 'react';
import AppReducer, { initAppState } from './reducers/AppReducer';
import AuthReducer, { initAuthState } from './reducers/AuthReducer';
import ListReducer, { initListState } from './reducers/ListReducer';

export const StateContext = createContext();
export const DispatchContext = createContext();

export default function MainContext(props) {
    const [auth, authDispatch] = useReducer(AuthReducer, initAuthState);//for ao auth
    const [app, appDispatch] = useReducer(AppReducer, initAppState);//for app state
    const [ticket_list, ticket_listDispatch] = useReducer(ListReducer, initListState);//for any kind of list
    const [chats, chatsDispatch] = useReducer(ListReducer, initListState);//for any kind of chat


    const global_state = {
        auth, app, ticket_list, chats
    }
    const global_dispatch = {
        authDispatch, appDispatch, ticket_listDispatch, chatsDispatch
    }

    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
