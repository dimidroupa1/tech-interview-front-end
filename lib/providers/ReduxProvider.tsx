import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

type ProviderProps = {
    children: React.ReactNode
}

export function ReduxProvider({ children }: ProviderProps) {
    return <Provider store={store}>{children}</Provider>
}