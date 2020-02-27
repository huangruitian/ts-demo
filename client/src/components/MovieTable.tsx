import React from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Table, Switch, Button, message, Popconfirm, Icon, Input } from "antd";
import { ColumnProps, PaginationConfig } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import defaultImg from "../assets/111.png";
import { SwitchType } from "../services/CommonTypes";
import { NavLink } from "react-router-dom";

export interface IMovieTableEvents {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void
    onSwitchChange: (type: SwitchType, newStatus: boolean, id: string) => void
    onDelete: (id: string) => Promise<void>
    onChangePageNo:(newPage:number) => void
    onKeyChange:(key:string) => void
    onSearch:() => void
}

export default class extends React.Component<IMovieState & IMovieTableEvents>{

    componentDidMount() {
        this.props.onLoad()
    }

    private handleSearch = () => {
        this.props.onSearch()
    }

    private getFilterDropDown = (p:Object) => {
      return(
        <div style={{ padding: 8 }}>
        <Input
          value={this.props.condition.key}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          onChange={e => this.props.onKeyChange(e.target.value)}
          onPressEnter={this.props.onSearch}
          onClick={this.props.onSearch}
        />
        <Button
          type="primary"
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
          onClick={this.props.onSearch}
        >
          搜索
        </Button>
        <Button 
        size="small" 
        style={{ width: 90 }}
        onClick={() => {
            this.props.onKeyChange("")
            this.props.onSearch()
        }}
        >
          重置
        </Button>
      </div>
      )
    }

    private getColumns(): ColumnProps<IMovie>[] {
        return [
            {
                title: "地区",
                dataIndex: "poster",
                render: (poster) => {
                    if (poster) {
                        return <img className="tablePoster" src={poster} alt="111" />
                    } else {
                        return <img className="tablePoster" src={defaultImg} alt="111" />
                    }
                }
            },
            {
                title: "名称",
                dataIndex: "name",
                filterDropdown: this.getFilterDropDown,
                filterIcon:<Icon type="search" />
            },
            {
                title: "地区",
                dataIndex: "areas",
                render: (text: string[]) => {
                    return text.join(",")
                }
            },
            {
                title: "类型",
                dataIndex: "types",
                render: (text: string[]) => {
                    return text.join(",")
                }
            },
            {
                title: "时长",
                dataIndex: "timeLong",
                render: (text) => {
                    return text + "分钟"
                }
            },
            {
                title: "是否热映",
                dataIndex: "isHot",
                render: (isHot, { _id }) => {
                    return (
                        <Switch
                            checked={isHot}
                            onChange={(newVal) => this.props.onSwitchChange(SwitchType.isHot, newVal, _id!)} // 小技巧，感叹号去掉undefined
                        ></Switch>
                    )
                }
            },
            {
                title: "即将上映",
                dataIndex: "isComing",
                render: (isHot, { _id }) => {
                    return (
                        <Switch
                            checked={isHot}
                            onChange={(newVal) => this.props.onSwitchChange(SwitchType.isComing, newVal, _id!)} // 小技巧，感叹号去掉undefined
                        ></Switch>
                    )
                }
            },
            {
                title: "即将上映",
                dataIndex: "isClassic",
                render: (isHot, { _id }) => {
                    return (
                        <Switch
                            checked={isHot}
                            onChange={(newVal) => this.props.onSwitchChange(SwitchType.isClassic, newVal, _id!)} // 小技巧，感叹号去掉undefined
                        ></Switch>
                    )
                }
            },
            {
                title: "操作",
                dataIndex: "_id",
                render: (id: string, row) => {
                    return (
                        <div>
                            <NavLink to={`/movie/edit/${id}`}>
                                <Button type="primary" size="small">编辑</Button>
                            </NavLink>
                            <Popconfirm
                                title="却迪昂要删除吗?"
                                onConfirm={async () => {
                                    await this.props.onDelete(id)
                                    message.success("删除成功！")
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button type="danger" size="small">删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            },
        ]
    }

    getPageConfig(): PaginationConfig | false {
        const { total, condition } = this.props
        if (this.props.total === 0) {
            return false
        }
        return {
            current: condition.page,
            pageSize: condition.limit,
            total
        }
    }

    handleChange = (pagination: PaginationConfig) => {
        this.props.onChangePageNo(pagination.current!)
    }

    render() {
        return (
            <h1>
                <Table
                    rowKey="_id"
                    dataSource={this.props.data}
                    columns={this.getColumns()}
                    pagination={this.getPageConfig()}
                    onChange={this.handleChange}
                    loading={this.props.isLoading}
                />
            </h1>
        )
    }
}