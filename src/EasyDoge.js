import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Doge from "./Doge";
import { calcPosition, getClassNames, getCurrentIndex, sort } from "./utils";

const { number, string, bool, array, func } = PropTypes;

class EasyDoge extends Component {
    static propTypes = {
        col: number,
        fixed: array,  // 不可移动的Key数组
        width: number,
        height: number,
        margin: array,
        draggable: bool,
        useCSSTransforms: bool,
        onLayoutChange: func,
        children: function (props, propName) {
            const children = props[propName];
            const keys = {};
            React.Children.forEach(children, function (child) {
                if (keys[child.key]) {
                    throw new Error(
                        'Duplicate child key "' +
                        child.key +
                        '" found! This will cause problems in ReactGridLayout.'
                    );
                }
                keys[child.key] = true;
            });
        },
        className: string
    };

    static defaultProps = {
        col: 1,
        fixed: [],
        width: 100,
        height: 100,
        margin: [10, 10],
        draggable: true,
        useCSSTransforms: true
    };

    state = {
        index: -1,
        layout: [], // 布局的KEY顺序
        tmpArr: [], // 临时数组
    };

    componentWillMount() {
        this.initLayoutMap(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.initLayoutMap(nextProps);
    }

    initLayoutMap(props) {
        const layout = [];
        React.Children.map(props.children, child => {
            layout.push(child.key)
        });
        this.setState({ layout: layout })
        console.log('重新初始化布局', layout);
    }

    render() {
        const { className, style, height, margin, col } = this.props;
        const { layout } = this.state;

        const totalHeight = (height + margin[0]) * (Math.floor((layout.length - 1) / col) + 1);
        const classNames = getClassNames('easy-doge', className);
        const styleNames = {
            height: totalHeight,
            ...style
        };

        return (
            <div className={classNames} style={styleNames}>
                {
                    React.Children.map(this.props.children, child => this.getDoge(child))
                }
            </div>
        )
    }

    getDoge = (child) => {
        const { width, height, fixed, draggable, margin, col } = this.props;
        const { layout, tmpArr } = this.state;

        const list = this.state.index >= 0 ? tmpArr : layout;

        const index = list.indexOf(child.key);
        const { x, y } = calcPosition(index, col);
        const isFixed = fixed.indexOf(child.key) >= 0;
        const canDrag = draggable && !isFixed;

        return (
            <Doge width={width} height={height} draggable={canDrag} margin={margin}
                  x={x} y={y} index={index}
                  onDragStart={this.onDragStart}
                  onDragMove={this.onDragMove}
                  onDragStop={this.onDragStop}>
                {child}
            </Doge>
        )
    };

    onDragStart = ({ left, top }, index) => {
        this.setState({ index, tmpArr: this.state.layout });
    };
    onDragMove = ({ left, top }) => {
        const { fixed, margin, width, height, col } = this.props;
        const { index, layout } = this.state;
        const posLeft = left + width / 2;
        const posTop = top + height / 2;

        let newIndex = getCurrentIndex(posLeft, posTop, { layout, fixed, margin, width, height, col });
        if (newIndex < 0) {
            newIndex = index
        }
        this.setState({ tmpArr: sort(layout, fixed, index, newIndex) })
    };
    onDragStop = () => {
        const { tmpArr } = this.state;
        this.setState({ index: -1, layout: tmpArr, tmpArr: [] });

        if (this.props.onLayoutChange) {
            this.props.onLayoutChange(tmpArr)
        }
    };
}

export default EasyDoge
