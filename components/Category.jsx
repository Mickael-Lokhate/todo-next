import Link from "next/link";

function Category({ category }) {
  return (
    <Link href={`/category/${category.id}`}>
      <div className="cat-container">
        <h2>{category.name}</h2>
        <div className="icon-container">
          <i className="bi bi-arrow-right"></i>
        </div>

        <style jsx>{`
          .cat-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: ${category.color};
            padding: 20px;
            filter: drop-shadow(2px 2px 5px ${category.color});
            transition: all 0.5s;
            border-radius: 5px;
          }

          .icon-container {
            background-color: ${category.color};
            filter: brightness(90%);
            color: white;
            padding: 0 15px;
            border-radius: 10px;
          }

          .bi {
            font-size: 2em;
          }

          .cat-container:hover {
            cursor: pointer;
            transform: scale(0.99);
          }

          h2 {
            margin: 0;
          }
        `}</style>
      </div>
    </Link>
  );
}

export default Category;
