import { IMovie } from "../../services/MovieService";
import { ISearchCondition } from "../../services/CommonTypes";
import { MovieActions, SaveMoviesAction, SetConditionAction, SetLoadingAction, DeleteAction, MovieChangeSwitchAction } from "../actions/MovieAction";
import { Reducer } from "react";

// 利用TS内置的 Required 类型把可选变全选
export type IMovieCondition = Required<ISearchCondition>

/**
 * 这样注释可以显示出来
 * condition 查询条件
 */
export interface IMovieState {
    data: IMovie[],
    condition: IMovieCondition, //这里不能缺失查询条件
    total: number,
    isLoading: boolean,
    totalPage: number
}

const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false,
    totalPage: 0  //总页数
}

// Reducer<S, A> => S 官方定义的type 类型别名，也可以像action那样自己写，自定义
type MovieReducer<A> = Reducer<IMovieState, A>


const saveMovie: MovieReducer<SaveMoviesAction> = function (state, action) {
    return {
        ...state,
        data: action.payload.movies,
        total: action.payload.total,
        totalPage: Math.ceil(action.payload.total / state.condition.limit)
    }
}

const setCondition: MovieReducer<SetConditionAction> = function (state, action) {
    const newState = {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit)
    return newState;
}

const setLoading: MovieReducer<SetLoadingAction> = function (state, action) {
    return {
        ...state,
        isLoading: action.payload
    }
}

const deleteMovie: MovieReducer<DeleteAction> = function (state, action) {
    return {
        ...state,
        data: state.data.filter(m => m._id !== action.payload),
        total: state.total - 1,
        totalPage: Math.ceil(state.total - 1 / state.condition.limit)
    }
}

const changeSwitch: MovieReducer<MovieChangeSwitchAction> = function (state, action) {
    // 现格局id找到对象
    const { id, type, newStatus } = action.payload
    const movie = state.data.find(d => d._id === id)
    if (!movie) {
        return state
    }
    const newMovie = { ...movie };
    newMovie[type] = newStatus
    // 3.将对象重新放入数组
    const newData = state.data.map(d => {
        if (d._id === id) {
            return newMovie
        }
        return d
    })
    return {
        ...state,
        data:newData
    }
}

// 使用 MovieActions 联合类型，这样就可以推断出 action 的具体类型，这种叫可辩识联合
export default function (state: IMovieState = defaultState, action: MovieActions) {
    switch (action.type) {
        case "movie_delete":
            // 这里依然可以辩出payload的类型，真香
            return deleteMovie(state, action)
        case "movie_save":
            return saveMovie(state, action)
        case "movie_setCondition":
            return setCondition(state, action)
        case "movie_setLoading":
            return setLoading(state, action)
        case "movie_switch":
            return changeSwitch(state, action)
        default:
            return state
    }
}