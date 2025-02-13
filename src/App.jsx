import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
