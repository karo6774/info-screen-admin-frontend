import {createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const Reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return Object.assign({}, state, {token: action.token, username: action.username});
        case "logout":
            return Object.assign({}, state, {token: undefined, username: undefined});
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["cache"]
};

const persistedReducer = persistReducer(persistConfig, Reducer);

export default () => {
    let store = createStore(persistedReducer, undefined);
    let persistor = persistStore(store);
    return {store, persistor};
}
