import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/fontawesome-free-solid";

function Todo({ todo, handleChecked }) {
  return (
    <>
      <div
        className={`todo checked-${todo.checked}`}
        onClick={() => handleChecked(todo.id)}
      >
        {todo.checked ? <div className="div-checked"></div> : false}
        <div className="todo-infos">
          <h3>{todo.title}</h3>
          <p>{todo.desc}</p>
        </div>

        {todo.checked ? <FontAwesomeIcon icon={faCheck} size={"lg"} /> : false}

        <style jsx>{`
          .todo {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
            box-shadow: 2px 2px 5px #a1a1a1;
            margin-bottom: 10px;
            padding: 10px;
            min-height: 100px;
            background-color: #a1a1a1;
          }

          .checked-false {
            transition: all 1s;
          }

          .checked-false:hover {
            opacity: 0.8;
            box-shadow: none;
          }

          .div-checked {
            position: absolute;
            top: 50%;
            height: 2px;
            width: 90%;
            background-color: #565656;
            display: flex;
            justify-content: center;
            margin: 0 auto;
            align-items: center;
            left: 5%;
          }

          .todo:hover {
            cursor: pointer;
          }

          .todo-infos {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0;
          }

          .todo-infos p,
          .todo-infos h3 {
            margin: 0;
          }

          .checked-true {
            opacity: 0.5;
            box-shadow: none;
          }
        `}</style>
      </div>
    </>
  );
}

export default Todo;
