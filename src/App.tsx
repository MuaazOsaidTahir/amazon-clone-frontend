import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import EachCategoryProducts from './components/EachCategoryProducts';
import CheckoutPage from './components/CheckoutPage';
import AppLayout from './components/AppLayout';
import ToastComponent from './components/ToastComponent';
import { useStore } from './context/StoreContext';
import UserProfile from './components/UserProfile';

function App() {
  const { toastRef } = useStore()

  return (
    <div className="min-h-screen bg-[#eaeded] text-[#0f1111]">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/category/:category' element={<EachCategoryProducts />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/:id' element={<ProductDetail />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <ToastComponent ref={toastRef} />
    </div>
  );
}

export default App;
