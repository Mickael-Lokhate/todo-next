import { useRouter } from "next/router";
import { useState } from "react";
import FloatButton from "../../components/FloatButton";
import Layout from "../../components/Layout";
import Todo from "../../components/Todo";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/fontawesome-free-solid";

function AddTodoForm({ modal, cat_id, setTodos }) {
  const [formValues, setFormValues] = useState({
    title: "",
    desc: "",
  });

  const handleChange = (e, name) => {
    const val = e.target.value;
    setFormValues({ ...formValues, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = `mutation AddTodo($title: String!, $cat_id: Int!, $desc: String) {
      addTodo(title: $title, cat_id: $cat_id, desc: $desc) {
        id,
        title,
        checked,
        desc
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
        variables: { title: formValues.title, cat_id, desc: formValues.desc },
      }),
    });
    const data = (await res.json()).data;
    if (data) {
      setTodos(data.addTodo);
      modal(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="todoTitle">
        <Form.Label>To-Do Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Buy bread, Call boss, ..."
          value={formValues.title}
          onChange={(e) => handleChange(e, "title")}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="todoDesc">
        <Form.Label>To-Do Description</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="More details..."
          value={formValues.desc}
          onChange={(e) => handleChange(e, "desc")}
        ></Form.Control>
      </Form.Group>
      <Button type="submit" variant="secondary">
        Save
      </Button>
    </Form>
  );
}

function Todos({ todos, category }) {
  const router = useRouter();
  const [allTodos, setTodos] = useState(todos);
  const [modalOpen, setModalOpen] = useState(false);
  const [numberTodosChecked, setTodosChecked] = useState(
    todos.filter((t) => t.checked).length
  );
  const [percent, setPercent] = useState(
    todos.length ? Math.floor((numberTodosChecked * 100) / todos.length) : 0
  );

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
    const finalTodos = [...newTodos, data];
    const todosChecked = finalTodos.filter((t) => t.checked).length;
    setTodosChecked(todosChecked);
    setPercent(
      finalTodos.length
        ? Math.floor((todosChecked * 100) / finalTodos.length)
        : 0
    );
    setTodos(finalTodos);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      <div className="blur-bg"></div>

      <div className="todos-container">
        <div className="top">
          <div className="title">
            <Link href="/">
              <a className="link" title="Go back">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" color="#343a40" />
              </a>
            </Link>
            <h1>{category.name}</h1>
            <div></div>
          </div>

          <ProgressBar
            now={percent}
            label={`${percent}%`}
            variant="success"
            animated
          />
        </div>

        {allTodos.map((t, i) => (
          <Todo key={i} todo={t} handleChecked={handleChecked} />
        ))}
      </div>
      <FloatButton
        color={"#563d7c"}
        title="Add a new to-do"
        CustomOnClick={openModal}
      />
      <style jsx>{`
        .todos-container {
          width: 50%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .top {
          margin-bottom: 1em;
        }
        h1 {
          margin: 0;
        }

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5em;
        }

        .link {
          text-decoration: none;
        }

        .link:hover {
          cursor: pointer;
          opacity: 0.9;
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

      <Modal centered show={modalOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Add a To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTodoForm
            modal={setModalOpen}
            cat_id={category.id}
            setTodos={setTodos}
          />
        </Modal.Body>
      </Modal>
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
