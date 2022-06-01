import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import Todo from "../../components/Todo";

const categories = [
  { id: 0, name: "Work", color: "#E7AD99" },
  { id: 1, name: "Home", color: "#CE796B" },
  { id: 2, name: "Projects", color: "#C18C5D" },
  { id: 3, name: "Perso", color: "#495867" },
];

function Todos({ todos }) {
  const router = useRouter();
  const { id: idCat } = router.query;
  const [allTodos, setTodos] = useState(todos.filter((t) => t.cat_id == idCat));
  let cat = categories.filter((c) => c.id == idCat);
  if (cat && cat.length === 1) cat = cat[0];

  const handleChecked = async (id) => {
    const query = `mutation CheckTodo($id: Int!) {
      checkTodo(id: $id) {
        id,
        title,
        checked,
        desc,
        cat_id
      }
    }`;
    const res = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
    });
    const data = (await res.json()).data.checkTodo;
    const newTodos = allTodos.filter((t) => t.id != data.id);
    setTodos([...newTodos, data]);
  };

  return (
    <Layout title="To-do List">
      <div className="blur-bg"></div>
      <div className="todos-container">
        {allTodos.map((t, i) => (
          <Todo key={i} todo={t} handleChecked={handleChecked} />
        ))}
      </div>
      <style jsx>{`
        .todos-container {
          width: 50%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .blur-bg {
          position: absolute;
          top: 0;
          z-index: -1;
          width: 100%;
          height: 40% !important;
          background: ${cat.color};
          filter: blur(200px);
        }
      `}</style>
    </Layout>
  );
}

Todos.getInitialProps = async () => {
  const query = `query {
    todos {
      id,
      title,
      desc,
      cat_id,
      checked
    }
  }`;

  const res = await fetch("http://localhost:3001/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = (await res.json()).data;
  return {
    todos: data.todos,
  };
};

export default Todos;
