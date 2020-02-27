import { Dispatch } from "react";
import MovieTable, { IMovieTableEvents } from '../../components/MovieTable'
import { connect, } from "react-redux"
import { IRootState } from "../../redux/reducers/RootReducer";
import MovieAction from "../../redux/actions/MovieAction";
import { IMovieState } from "../../redux/reducers/MovieReducer";

// class MovieList extends React.Component {
//    render(){
//        return(
//            <div>
//              列表页
//              <MovieTable {...this.props}/>
//            </div>
//        )
//    }
// }

// 1.数据界面相分离，是react 的一大特色，所有我们写页面的时候，要把关注点分离
// 1.逻辑在这里处理，MovieTable做展示
function mapStateToProps(state:IRootState):IMovieState {
  return state.movie
}

function mapDispatchToProps(dispatch:Dispatch<any>):IMovieTableEvents{
   return {
      onLoad(){
         dispatch(MovieAction.fetchMovies({
           page:1,
           limit:5,
           key:""
         }))
      },
      // 函数的匹配只能少，不能多，TS鸭子辩型法
      onSwitchChange(type, newStatus, id){
         dispatch(MovieAction.changeSwitch(type, newStatus, id))
      },
      async onDelete(id){
         dispatch(MovieAction.deleteMovie(id))
      },
      onChangePageNo(newPage){
         dispatch(MovieAction.fetchMovies({
            page:newPage
         }))
      },
      onKeyChange(key){
         dispatch(MovieAction.setConditionAction({
            key
         }))
      },
      onSearch(){
         dispatch(MovieAction.fetchMovies({
            page:1
         }))
      }
   }
}

// export default connect(mapStateToProps)(MovieList)

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)
