import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Doge from "./Doge";
import { getClassNames, getCurrentIndex } from "./utils";

const { number, string, bool, array, func } = PropTypes;

class EasyDoge extends Component {
    static propTypes = {
        col: number,
        width: number,
        height: number,
        margin: array,
        fixedKeys: array,
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
        width: 100,
        height: 100,
        margin: [10, 10],
        fixedKeys: [],
        draggable: true,
        useCSSTransforms: true
    };

    state = {
        dragging: -1,
        position: {}
    };

    componentWillMount() {
        this.initLayoutMap();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.initLayoutMap();
    }

    initLayoutMap() {
        const { col, fixedKeys } = this.props;
        this.layoutMap = {};

        React.Children.map(this.props.children, (child, index) => {
            const fixed = fixedKeys.indexOf(child.key) >= 0;
            this.layoutMap[child.key] = ({
                x: index % col,
                y: Math.floor(index / col),
                fixed,
                index,
            })
        });
    }

    render() {
        const { className, style, height, margin, col } = this.props;
        const totalHeight = (height + margin[0]) * (Math.floor((Object.keys(this.layoutMap).length - 1) / col) + 1);
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
        const { width, height, draggable, margin } = this.props;
        const { x, y, index, fixed } = this.state.dragging >= 0 ? this.newLayout[child.key] : this.layoutMap[child.key];
        const allowDraggable = draggable && !fixed;
        return (
            <Doge width={width} height={height} draggable={allowDraggable} margin={margin} x={x} y={y}
                  index={index}
                  onDragStart={this.onDragStart}
                  onDragMove={this.onDragMove}
                  onDragStop={this.onDragStop}>
                {child}
            </Doge>
        )
    };

    onDragStart = ({ left, top }, dragging) => {
        this.newLayout = Object.keys(this.layoutMap).map(key => ({ ...this.layoutMap[key] }));
        this.setState({ dragging });
    };
    onDragMove = ({ left, top }) => {
        const { margin = [], width, height, col } = this.props;
        const { dragging } = this.state;
        const posLeft = left + width / 2;
        const posTop = top + height / 2;

        let newIndex = getCurrentIndex(this.layoutMap, posLeft, posTop, { margin, width, height });
        if (newIndex < 0) {
            newIndex = dragging
        }

        const min = Math.min(dragging, newIndex);
        const max = Math.max(dragging, newIndex);
        Object.keys(this.newLayout).forEach(key => {
            const { index } = this.layoutMap[key];
            if (index === dragging) {
                this.newLayout[key].index = newIndex;
                return;
            }
            if (index < min || index > max) {
                this.newLayout[key].index = this.layoutMap[key].index;
            } else {
                this.newLayout[key].index = dragging < newIndex ? index - 1 : index + 1;
            }
            this.newLayout[key].x = this.newLayout[key].index % col;
            this.newLayout[key].y = Math.floor(this.newLayout[key].index / col);
        });

        this.setState({ position: {} })
    };
    onDragStop = () => {
        const { col } = this.props;
        this.layoutMap = Object.keys(this.layoutMap).map(key => {
            let item = this.newLayout[key];
            let index = item.index;
            let x = index % col;
            let y = Math.floor(index / col);
            return {
                ...this.layoutMap[key],
                index,
                x,
                y
            }
        });
        this.newLayout = undefined;

        if (this.props.onLayoutChange) {
            const layoutKeys = Object.keys(this.layoutMap);
            const layoutList = new Array(layoutKeys.length);
            layoutKeys.forEach(key => {
                const item = this.layoutMap[key];
                layoutList[item.index] = {
                    key,
                    ...item
                }
            });

            this.props.onLayoutChange(layoutList)
        }

        this.setState({ dragging: -1 });
    };
}

export default EasyDoge
