import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { EasyDoge } from '../lib'

import './style.css'

class Index extends Component {
    render() {
        const dataSource = new Array(6).fill(1)
        return (
            <EasyDoge width={200} height={200} col={4} onLayoutChange={this.onLayoutChange}>
                {
                    dataSource.map((item, index) => (
                        <div key={index} className="my-doge" fixed={index <= 1 ? "true" : undefined}>
                            hello world {index}
                        </div>
                    ))
                }
            </EasyDoge>
        )
    }

    onLayoutChange = (list) => {
        console.log('列表排序改变了', list)
    }
}

ReactDOM.render(<Index />, document.querySelector('#main'))
