
import './App.css';
import '../src/index.css'
import { useTranslation } from 'react-i18next';
import Header from './Components/Header/Header';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer/Footer';
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';

function App() {

  const { state } = useContext(AuthContext)

  const { i18n } = useTranslation()
  document.body.dir = i18n.dir();

  return (
    <div className="App">
      {state.userRole !== "admin" ? <Header /> : null}
      <Router />
      {state.userRole !== "admin" ? <Footer />: null}
      <ToastContainer
        position={i18n.dir() === "ltr" ? "top-right" : "top-left"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
