import Layout from "../components/Layout";
import Category from "../components/Category";
import FloatButton from "../components/FloatButton";
import React from "react";
import Modal from "react-modal";

function Home({ categories }) {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleClickCategory = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout title={"Home"}>
      <div className="categories">
        {categories.map((c, i) => (
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

      <Modal
        onRequestClose={onCloseModal}
        isOpen={isModalOpen}
        contentLabel="test"
      >
        <h2>Add a Category</h2>
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
