import Layout from "../components/Layout";
import Category from "../components/Category";

function Home({ categories }) {
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
    </Layout>
  );
}

Home.getInitialProps = async () => {
  const categories = [
    { id: 0, name: "Work", color: "#E7AD99" },
    { id: 1, name: "Home", color: "#CE796B" },
    { id: 2, name: "Projects", color: "#C18C5D" },
    { id: 3, name: "Perso", color: "#495867" },
  ];

  return {
    categories,
  };
};

export default Home;
