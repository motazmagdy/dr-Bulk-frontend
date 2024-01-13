
import './App.css';
import '../src/index.css'
import { useTranslation } from 'react-i18next';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';
import CartProvider from './Context/CartContext';
import MembershipsProvider from './Context/MembershipsContext';

function App() {

  const { state } = useContext(AuthContext)
  const { i18n } = useTranslation()
  document.body.dir = i18n.dir();

  return (
    <div className="App">
      <CartProvider>
        <MembershipsProvider>
          <Router />
        </MembershipsProvider>
      </CartProvider>

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
