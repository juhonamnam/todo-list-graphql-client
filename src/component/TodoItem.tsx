import { ITodoItem } from 'src/interfaces'

export const TodoItem = ({
  todoItem,
  onDelete,
}: {
  todoItem: ITodoItem
  onDelete: () => void
}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <label style={{ width: 150, fontWeight: 'bold' }}>
          {todoItem.createdBy}
        </label>
        <span>{todoItem.content}</span>
      </div>
      <button
        type="button"
        className="btn btn-sm btn-danger img-circle"
        onClick={onDelete}
      >
        &#xff38;
      </button>
    </li>
  )
}
