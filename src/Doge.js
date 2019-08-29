import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DraggableCore from 'react-draggable';
import { getClassNames } from "./utils";

const { number, bool, array, func } = PropTypes;

class Doge extends Component {
    static propTypes = {
        x: number,
        y: number,
        index: number,
        width: number,
        height: number,
        margin: array,
        draggable: bool,
        onDragStart: func,
        onDragMove: func,
        onDragStop: func,
    };

    state = {
        x: 0,
        y: 0,
        position: {},
        margin: [0, 0, 0, 0],
        dragging: null
    };

    render() {
        const { draggable } = this.props;
        const position = this.calcPosition();
        const child = React.Children.only(this.props.children);

        let el = React.cloneElement(child, {
            className: getClassNames('doge', child.props.className, {
                'doge': true,
            }),
        });
        return this.mixinDraggable(el, position, !draggable)
    }

    mixinDraggable(child, pos, disabled) {
        const position = { x: pos.left, y: pos.top };
        return (
            <DraggableCore
                position={position}
                disabled={disabled}
                onStart={this.onDragStart}
                onDrag={this.onDragMove}
                onStop={this.onDragStop}
                handle={this.props.handle}
                cancel={
                    ".react-resizable-handle" +
                    (this.props.cancel ? "," + this.props.cancel : "")
                }>
                {child}
            </DraggableCore>
        );
    }

    onDragStart = (e, { node, deltaX, deltaY }) => {
        const { offsetParent } = node;
        if (!offsetParent) return;

        const position = { left: 0, top: 0 };
        const parentRect = offsetParent.getBoundingClientRect();
        const clientRect = node.getBoundingClientRect();
        position.left = clientRect.left - parentRect.left + offsetParent.scrollLeft;
        position.top = clientRect.top - parentRect.top + offsetParent.scrollTop;
        this.setState({ dragging: position });

        if (this.props.onDragStart) {
            this.props.onDragStart(position, this.props.index)
        }
    };
    onDragMove = (e, { node, deltaX, deltaY }) => {
        if (!this.state.dragging) {
            return
        }
        const position = { left: 0, top: 0 };
        position.left = this.state.dragging.left + deltaX;
        position.top = this.state.dragging.top + deltaY;
        this.setState({ dragging: position });

        if (this.props.onDragMove) {
            this.props.onDragMove(position, this.props.index)
        }
    };
    onDragStop = (e, { node, deltaX, deltaY }) => {
        if (!this.state.dragging) {
            return
        }
        const position = { left: 0, top: 0 };
        position.left = this.state.dragging.left;
        position.top = this.state.dragging.top;
        this.setState({ dragging: null });

        if (this.props.onDragStop) {
            this.props.onDragStop(position, this.props.index)
        }
    };

    calcPosition = () => {
        const { margin = [], x, y, width, height } = this.props;
        const left = Math.round((width + (margin[0] || 0)) * x);
        const top = Math.round((height + (margin[1] || 0)) * y);

        return {
            left: left || 0,
            top: top || 0,
            width: width,
            height: height
        };
    }
}

export default Doge
