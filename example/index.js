import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { EasyDoge } from '../src'

import './style.css'

class Index extends Component {
    state = {
        dataSource: [0, 1, 2, 3, 4, 5, 6]
    };

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({
    //             dataSource: [0, 1, 2, 3, 7, 4, 5, 6]
    //         });
    //     }, 3000)
    //     setTimeout(() => {
    //     }, 10000)
    // }

    render() {
        const { dataSource } = this.state;
        const fixedKeys = ['0', '1']
        return (
            <div>
                <EasyDoge className="1322" width={200} height={200} col={4} fixedKeys={fixedKeys}
                          onLayoutChange={this.onLayoutChange}>
                    {
                        dataSource.map((item, index) => (
                            <div key={index} className="my-doge">
                                hello world {item}
                            </div>
                        ))
                    }
                </EasyDoge>
                <div onClick={this.handleDelete}>新增一个</div>
                <div onClick={this.handleDelete}>随机删除一个</div>
            </div>
        )
    }

    handleDelete = () => {
        const { dataSource } = this.state
        this.setState({
            dataSource: dataSource.splice(3)
        });
    };

    onLayoutChange = (list) => {
        console.log('列表排序改变了', list)
        const { dataSource } = this.state
        console.log('现在的列表', list.map(({ key }) => dataSource[key]))
    }
}

ReactDOM.render(<Index />, document.querySelector('#main'))
