import {createContext} from "react";
import {firebaseInitialState} from "./FirebaseState";

export const FirebaseContext = createContext(firebaseInitialState)
