import TaskCard from './TaskCard.jsx';
import './TaskList.css';

function TaskList({ todos, onToggle, onEdit, onDelete }) {
return ( <div className="task-list">
{todos.map((todo) => (
<TaskCard
key={todo._id}
todo={todo}
onToggle={() => onToggle(todo._id)}
onEdit={() => onEdit(todo)}
onDelete={() => onDelete(todo._id)}
/>
))} </div>
);
}

export default TaskList;
