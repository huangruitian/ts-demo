import { IAction } from "./ActionTypes"
import { IMovie, MovieService } from "../../services/MovieService"
import { ISearchCondition, SwitchType } from "../../services/CommonTypes"
import { ThunkAction } from "redux-thunk";
import { IRootState } from "../reducers/RootReducer";

export type SaveMoviesAction = IAction<"movie_save", {
    movies: IMovie[],
    total: number
}>

// saveMoviesAction 相当于这个，payload也可以做继续做一个类型
// type SaveMoviesAction = {
//     type:'movie_save',
//     payload: {
//         movies: IMove[],
//         total:number
//     }
// }

function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: 'movie_save',
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>
function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: "movie_setLoading",
        payload: isLoading,
    }
}

// 注意这里是可以缺失查询条件的 reducer 不可以
export type SetConditionAction = IAction<"movie_setCondition", ISearchCondition>
function setConditionAction(condition: ISearchCondition): SetConditionAction {
    return {
        type: "movie_setCondition",
        payload: condition
    }
}

export type DeleteAction = IAction<"movie_delete", string>
function deleteAction(id: string): DeleteAction {
    return {
        type: "movie_delete",
        payload: id
    }
}

export type MovieChangeSwitchAction = IAction<"movie_switch", {
    type: SwitchType,
    newStatus: boolean,
    id: string
}>
function changeSwitchAction(type: SwitchType, newStatus: boolean, id: string): MovieChangeSwitchAction {
    return {
        type: "movie_switch",
        payload: {
            type,
            newStatus,
            id
        }
    }
}

export type MovieActions = SaveMoviesAction | SetConditionAction | SetLoadingAction | DeleteAction | MovieChangeSwitchAction

/**
 * 根据条件从服务器获取电影的数据
 * 这里完全可以写不要类型的any，但是不推荐，使用thunk 定义的 ThunkAction
 * 使用了 ThunkAction，才能得到严格的类型检查
 * ThunkAction<R, S, E, A>，R是返回的函数里面返回的类型，S网站根state，E额外的参数，A请求的action类型
 * @param condition 搜索条件
 * 
 */
function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        //1.设置加载状态
        dispatch(setLoadingAction(true))
        //2.逻辑处理
        dispatch(setConditionAction(condition))
        //3.ajax
        const curCondition = getState().movie.condition
        const res = await MovieService.getMovies(curCondition)
        //4.修改仓库数据
        dispatch(saveMoviesAction(res.data, res.total))
        //5.设置加载状态
        dispatch(setLoadingAction(false))
    }
}

function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async dispatch => {
        //1.设置加载状态
        dispatch(setLoadingAction(true))
        //2.逻辑处理
        //3.ajax
        const res = await MovieService.delete(id)
        //4.修改仓库数据
        if (res.code === 200) {
            dispatch(deleteAction(id))
        }
        //5.设置加载状态
        dispatch(setLoadingAction(false))
    }
}

function changeSwitch(type: SwitchType, newStatus: boolean, id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async dispatch => {
        const res = await MovieService.edit(id, {
            [type]: newStatus
        })
        res.code === 200 && dispatch(changeSwitchAction(type, newStatus, id))
    }
}

export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovie,
    changeSwitchAction,
    changeSwitch,
}