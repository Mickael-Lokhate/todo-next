import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Todo from "../components/Todo";

function Todos({ todos }) {
  const [allTodos, setTodos] = useState(todos);

  const handleChecked = (id) => {
    console.log(`CLICK ${id}`);
    const newArray = [...allTodos];
    if (newArray.find((t) => t.id === id).checked)
      newArray.find((t) => t.id === id).checked = false;
    else newArray.find((t) => t.id === id).checked = true;

    newArray.sort((a, b) => {
      if (a.checked) return 1;
      else if (b.checked) return -1;
      else return 0;
    });

    setTodos(newArray);
  };

  useEffect(() => {}, [allTodos]);

  return (
    <Layout title="To-do List">
      <div className="todos-container">
        {allTodos.map((t, i) => (
          <Todo key={i} todo={t} handleChecked={handleChecked} />
        ))}

        <style jsx>{`
          .todos-container {
            width: 50%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            text-align: left;
          }
        `}</style>
      </div>
    </Layout>
  );
}

Todos.getInitialProps = async () => {
  const todos = [
    { id: 0, title: "Test 1", desc: "My first todo", checked: false },
    { id: 1, title: "Test 2", desc: "My second todo", checked: false },
    { id: 2, title: "Test 3", desc: "My third todo", checked: true },
    { id: 3, title: "Test 4", desc: "My fourth todo", checked: false },
  ];
  todos.sort((a, b) => {
    if (a.checked) return 1;
    else if (b.checked) return -1;
    return 0;
  });
  return {
    todos,
  };
};

export default Todos;
