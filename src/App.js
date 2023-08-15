
import './App.css';
import '../src/index.css'
import { useTranslation } from 'react-i18next';
import Header from './Components/Header/Header';
import Router from './Router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { t , i18n } = useTranslation()
  document.body.dir = i18n.dir();

  return (
    <div className="App">
      <Header />
      <Router />
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
