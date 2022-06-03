import Layout from "../components/Layout";
import Category from "../components/Category";
import FloatButton from "../components/FloatButton";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddCategoryForm({ modal, setCategories }) {
  const [formValues, setFormValues] = useState({
    name: "",
    color: "#563d7c",
  });

  const handleChange = (e, name) => {
    const val = e.target.value;
    setFormValues({ ...formValues, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = `mutation AddCategory($name: String!, $color: String!) {
        addCategory(name: $name, color: $color) {
          id,
          name,
          color
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
        variables: { name: formValues.name, color: formValues.color },
      }),
    });
    const data = (await res.json()).data;
    setCategories(data.addCategory);
    modal(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="catName">
        <Form.Label>Category name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Work, Home, Project, ..."
          value={formValues.name}
          onChange={(e) => handleChange(e, "name")}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="catColor">
        <Form.Label>Choose a color</Form.Label>
        <Form.Control
          required
          type="color"
          title="Choose a background color"
          value={formValues.color}
          onChange={(e) => handleChange(e, "color")}
        ></Form.Control>
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
}

function Home({ categories }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cat, setCategories] = useState(categories);

  const handleClickCategory = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout title={"Home"}>
      <div className="categories">
        <h2>My Categories</h2>
        {cat.map((c, i) => (
          <Category category={c} key={i} />
        ))}
      </div>

      <style jsx>{`
        .categories {
          width: 60%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1em;
        }
      `}</style>

      <Modal show={isModalOpen} onHide={onCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCategoryForm modal={setModalOpen} setCategories={setCategories} />
        </Modal.Body>
      </Modal>
      <FloatButton
        color={"#12aadd"}
        size={100}
        title="Add a category"
        CustomOnClick={handleClickCategory}
      />
    </Layout>
  );
}

Home.getInitialProps = async () => {
  const query = `query {
    categories {
      id,
      name,
      color
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
    categories: data.categories,
  };
};

export default Home;
