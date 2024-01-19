import 'draft-js/dist/Draft.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';

function App() {
  return (
<>
<ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
</>
  );
}

export default App;
