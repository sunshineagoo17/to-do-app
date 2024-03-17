import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './List.scss';

const List = ({ todos, onToggleTodo, onRemoveTodo }) => {
  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
          {todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`list-item ${todo.completed ? 'completed' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleTodo(todo.id)}
                    className="list-item-checkbox"
                  />
                  <span className="list-item-text">{todo.text}</span>
                  <button onClick={() => onRemoveTodo(todo.id)} className="list-item-remove">
                    DELETE
                  </button>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default List;
