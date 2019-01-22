import React, { PureComponent } from 'react';
// CSS
import classes from './DragList.module.css';
// JSX
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Data generator
export const setItems = items =>{
    if (!items) { return null };
    return Array.from( { length: items.length }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        item: items[k],
        content: (
            items[k]
        ),
    }));
}
class DragList extends PureComponent {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    getItemStyle = (isDragging, draggableStyle) => ({
        // Some basic styles to make the items look a bit nicer.
        userSelect: 'none',
        padding: '2px',
        margin: this.props.direction === 'vertical' ? '10px' : '5px 1px 0',
        width: this.props.direction === 'vertical' ? '100%' : `${100/this.props.items.length}%`,
        maxWidth: this.props.dimensions ? this.props.dimensions.width : '130px',
        height: this.props.dimensions ? this.props.dimensions.height : '100px',
        // Change background colour if dragging.
        background: isDragging ? 'lightgreen' : 'grey',
        // Styles we need to apply on draggables.
        ...draggableStyle,
    });

    // Function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    getListStyle = isDraggingOver => ({
        display: 'flex',
        position: this.props.direction === 'vertical' ? 'sticky' : null,
        top: this.props.direction === 'vertical' ? '48px' : null,
        flex: this.props.direction === 'vertical' ? 'auto' : null,
        flexFlow: this.props.direction === 'vertical' ? 'column' : 'row',
        order: this.props.direction === 'vertical' ? '-1' : null,
        alignItems: 'center',
        justifyContent: 'center',
        background: isDraggingOver ? 'lightblue' : 'transparent',
        margin: '0',
        padding: '0',
        width: this.props.direction === 'horizontal' ? '100%' : 'auto',
        minWidth: '125px',
        height: this.props.direction === 'vertical' ? '100%' : null
    });

    onDragEnd = (result) => {
        // Dropped outside the list.
        if (!result.destination) {
            return;
        }
        const items = this.reorder(
            [...this.props.items],
            result.source.index,
            result.destination.index
        );
        this.setState({
            items
        });
        if (!this.props.updateItems) { return; } // Pointer protection
        this.props.updateItems(items);
    }

    render() {
        return (
            <div className={classes.DragList}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="dnd_droppable_list" direction={this.props.direction}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
                                {this.props.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={this.props.className}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={this.getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

// Put the thing into the DOM!
export default DragList;
