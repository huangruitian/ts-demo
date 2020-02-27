import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface IParams {
    id:string
}

// RouteComponentProps 也是一个泛型
// type AllProps = IMyProps & RouteComponentProps<IParams> 效果也一样
interface IMyProps extends RouteComponentProps<IParams>{
    abc:string  
}

export default class extends React.Component<IMyProps> {
   render(){
       return(
           <div>
              修改电影的ID:{ this.props.match.params.id }
           </div>
       )
   }
}