import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { EasyDoge } from '../src'

import './style.less'


function str4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (str4() + str4() + "-" + str4() + "-" + str4() + "-" + str4() + "-" + str4() + str4() + str4());
}

class Index extends Component {
    state = {
        dataSource: [],
        fixed: []
    };

    componentDidMount() {
        this.setState({
            dataSource: [1, 2, 3].map((value, index) => {
                return {
                    key: guid(),
                    text: index
                }
            })
        })
    }

    render() {
        const { dataSource, fixed } = this.state;
        return (
            <div>
                <EasyDoge className="1322" width={200} height={200} col={4} fixed={fixed}
                          onLayoutChange={this.onLayoutChange}>
                    {
                        dataSource.map((item, index) => (
                            <div key={item.key} className="my-doge">
                                hello world {item.text}
                            </div>
                        ))
                    }
                </EasyDoge>
                <div className="btn" onClick={this.handleCreateNormal}>新增一个正常</div>
                <div className="btn" onClick={this.handleCreateFixed}>新增一个固定</div>
                <div className="btn" onClick={this.handleDelete}>随机删除一个</div>
            </div>
        )
    }

    handleCreateNormal = () => {
        const { dataSource } = this.state;
        this.setState({
            dataSource: [...dataSource, {
                key: guid(),
                text: Math.floor(Math.random() * 10000)
            }]
        })
    };

    handleCreateFixed = () => {
        const { dataSource, fixed } = this.state;
        const key = guid();
        this.setState({
            dataSource: [...dataSource, {
                key: key,
                text: Math.floor(Math.random() * 10000)
            }],
            fixed: [...fixed, key]
        })
    };
    handleDelete = () => {
        const { dataSource } = this.state;
        const index = Math.floor(Math.random() * dataSource.length)
        dataSource.splice(index, 1);
        this.setState({ dataSource })
    };

    onLayoutChange = (list) => {
        console.log('列表排序改变了', list)
        const { dataSource } = this.state
        const currSource = list.map(key => {
            return dataSource.find(value => {
                return value.key === key
            })
        })
        console.log('现在的列表', currSource);
        this.setState({ dataSource: currSource })
    }
}

ReactDOM.render(<Index />, document.querySelector('#main'))
