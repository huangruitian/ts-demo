import React from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "./movie/Home";
import MovieList from "./movie/MovieList";
import AddMovie from "./movie/AddMovie";
import EditMovie from "./movie/EditMovie";
import { Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;
// const { SubMenu } = Menu;

const _Layout: React.FC = function () {
    return (
        <div className="container">
            <Layout>
                <Header className="header">
                    小电影管理系统
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            theme="dark"
                        >
                            <Menu.Item key="1">
                                <NavLink to="/movie">电影列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to="/movie/add">添加电影</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <div className="main">
                            {/* 注意不会精准匹配 */}
                            <Route path="/" component={Home} exact={true}></Route>
                            <Route path="/movie" component={MovieList} exact={true}></Route>
                            <Route path="/movie/add" component={AddMovie} exact={true}></Route>
                            <Route path="/movie/edit/:id" component={EditMovie}></Route>
                        </div>
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    )
}
export default _Layout