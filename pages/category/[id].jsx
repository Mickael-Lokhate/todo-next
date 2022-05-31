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
  if (cat && cat.length === 1)
    cat = cat[0];

  const handleChecked = (id) => {
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
  const todos = [
    {
      id: 0,
      title: "Test 1",
      desc: "My first todo",
      checked: false,
      cat_id: 0,
    },
    {
      id: 1,
      title: "Test 2",
      desc: "My second todo",
      checked: false,
      cat_id: 1,
    },
    { id: 2, title: "Test 3", desc: "My third todo", checked: true, cat_id: 3 },
    {
      id: 3,
      title: "Test 4",
      desc: "My fourth todo",
      checked: false,
      cat_id: 2,
    },
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
