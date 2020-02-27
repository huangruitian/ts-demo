import { createStore, applyMiddleware } from "redux"
import { rootReducer, IRootState } from "./reducers/RootReducer"
import logger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";

export const store = createStore(
    rootReducer, 
    // applyMiddleware(thunk, logger) 不类型断言，dispatch thunk 返回的是个函数
    applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger)
);