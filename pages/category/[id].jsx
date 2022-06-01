import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import Todo from "../../components/Todo";

function Todos({ todos, category }) {
  const router = useRouter();
  const [allTodos, setTodos] = useState(todos);

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
          background: ${category.color};
          filter: blur(200px);
        }
      `}</style>
    </Layout>
  );
}

Todos.getInitialProps = async ({ query }) => {
  const cat_id = parseInt(query.id);
  const queryAPI = `query TodosByCat($cat_id: Int!) {
    todosByCat(cat_id: $cat_id) {
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
      query: queryAPI,
      variables: { cat_id },
    }),
  });
  const data = (await res.json()).data;

  const queryCatAPI = `query Category($id: Int!) {
    category(id: $id) {
      id,
      name,
      color
    }
  }`;
  const resCat = await fetch("http://localhost:3001/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: queryCatAPI,
      variables: { id: cat_id },
    }),
  });
  const dataCat = (await resCat.json()).data;
  return {
    todos: data.todosByCat,
    category: dataCat.category,
  };
};

export default Todos;
