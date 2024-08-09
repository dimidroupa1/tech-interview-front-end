import { createContext } from "react";

type STATE_PROPS = {
    search: string
    setSearch: ((value: string) => void) | null
}

const INITIAL_STATE = {
    search: "",
    setSearch: null

}

export const Context = createContext<STATE_PROPS>(INITIAL_STATE)