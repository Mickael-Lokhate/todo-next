import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/fontawesome-free-solid";

function Todo(props) {
  const todo = props.todo;
  return (
    <>
      <div className="todo">
        <div className="todo-infos">
          <h3>{todo.title}</h3>
          <p>{todo.desc}</p>
        </div>

        {todo.checked ? <FontAwesomeIcon icon={faCheck} /> : false}
        <style jsx>{`
          .todo {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .todo:hover {
            cursor: pointer;
          }

          .todo-infos {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
      <hr />
    </>
  );
}

export default Todo;
