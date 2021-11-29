import React from "react";
import Header from "./components/header/Header";
// import Modal from "./components/modal/Modal";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="container"></div>
      <footer className="footer"></footer>
      {/* <Modal /> */}
    </div>
  );
};

export default App;
