import { combineReducers, createStore } from "redux";
import toggleFavorite from "../Reducers/favoriteReducer";
import setAvatar from "../Reducers/avatarReducer";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCombineReducers } from "redux-persist";

const rootPersistConfig = {
    key: "root",
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}));