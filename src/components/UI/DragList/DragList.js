import React, { PureComponent } from 'react';
// JSX
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
export const getItems = items =>{
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
        this.state = {
            items: this.props.items,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: '2px',
        margin: this.props.direction === 'vertical' ? '10px' : '5px 1px 0',
        width: this.props.direction === 'vertical' ? '100%' : `${100/this.state.items.length}%`,
        maxWidth: this.props.dimensions ? this.props.dimensions.width : '130px',
        height: this.props.dimensions ? this.props.dimensions.height : '100px',
        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',
        // styles we need to apply on draggables
        ...draggableStyle,
    });

    // a little function to help us with reordering the result
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
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = this.reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        this.setState({
            items
        });
    }

    componentDidUpdate () {
        if (this.state.items !== this.props.items) {
            this.props.updateItems(this.state.items);
        }
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction={this.props.direction}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div  
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
        );
    }
}

// Put the thing into the DOM!
export default DragList;
