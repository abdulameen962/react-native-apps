import {createStore,applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import { addContact } from './actions'
import {persistStore,persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import contacts from './contacts';
import thunk from 'redux-thunk'
import { PURGE } from 'redux-persist';

// const thunk = store => next => action => {
//     if (typeof action === 'function') {
//         action(store.dispatch)
//     }
//     else{
//         next(action)
//     }
// }


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig,reducer)
export const store = createStore(persistedReducer,applyMiddleware(thunk))
// export const store = configureStore({
//     // Automatically calls `combineReducers`
//     reducer: persistedReducer
// })
export const persistor = persistStore(store)
// store.dispatch({ 
//     type: PURGE,
//     key: "root",    // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
//    result: () => null              // Func expected on the submitted action. 
// });   
// store.dispatch(updateUser({foo: 'foo'}))
// store.dispatch(updateUser({bar: 'bar'}))
// store.dispatch(updateUser({foo: 'baz'}))

for (let i = 0; i < contacts.length; i++) {
    store.dispatch(addContact(contacts[i]))
}