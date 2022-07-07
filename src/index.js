import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import thunkMiddleware from 'redux-thunk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Loader } from 'rsuite';
import './index.css';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import cartReducer from './store/Cart/reducers';
import authReducerSlice from './store/Auth/reducers';
import productsReducerSlice from './store/Products/reducers';

import 'rsuite/dist/rsuite.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));

const RegistrationForm = lazy(() =>
  import('./components/RegistrationForm/RegistrationForm'),
);

const ProductDetails = lazy(() =>
  import('./components/ProductDetails/ProductDetails'),
);

const ProductsList = lazy(() =>
  import('./components/ProductsList/ProductsList'),
);

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducerSlice,
    products: productsReducerSlice,
  },
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute isOnlyForNotAuthenticated={true} />}
          >
            <Route path="registration" element={<RegistrationForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Homepage</div>} />

              <Route path="products">
                <Route index element={<ProductsList />} />
                <Route path=":productId" element={<ProductDetails />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>,
);
