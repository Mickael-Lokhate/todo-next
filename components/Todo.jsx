function Todo(props) {
  const todo = props.todo;
  return (
    <div className="todo">
      <h3>{todo.title}</h3>
      <p>{todo.desc}</p>

      <style jsx>{`
        todo {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-item: left;
        }
      `}</style>
      <hr />
    </div>
  );
}

export default Todo;
