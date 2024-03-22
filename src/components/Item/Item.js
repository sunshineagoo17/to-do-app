import './Item.scss';

function Item({ text, completed, onToggle, onRemove }) {
  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
        <label>{text}</label>
        <button className="destroy" onClick={onRemove} />
      </div>
    </li>
  );
}

export default Item;
