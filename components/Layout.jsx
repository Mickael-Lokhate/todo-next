function Layout({ title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      {children}

      <style jsx>{`
        h1 {
          text-align: center;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}

export default Layout;
