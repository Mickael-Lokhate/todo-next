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
