import { combineReducers } from "redux"
import movie, { IMovieState } from "./MovieReducer"

// 定义一个网站的根状态 state，方便thunk使用
export interface IRootState {
   movie:IMovieState,
}

export const rootReducer = combineReducers({
    movie,
})