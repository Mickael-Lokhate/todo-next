import Layout from "../components/Layout";
import Todo from "../components/Todo";

function Todos({ todos }) {
  return (
    <Layout title="To-do List">
      <div className="todos-container">
        {todos.map((t, i) => (
          <Todo key={i} todo={t} />
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
    { id: 2, title: "Test 3", desc: "My third todo", checked: false },
    { id: 3, title: "Test 4", desc: "My fourth todo", checked: false },
  ];

  return {
    todos,
  };
};

export default Todos;
