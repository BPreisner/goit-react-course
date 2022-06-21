import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Loader } from 'rsuite';
import './index.css';
import { AuthneticationContextProvider } from './components/AuthenticationProvider/AuthenticationProvider';
import Layout from './components/Layout/Layout';
import { cartReducer } from './store/Cart/reducers';

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

const composedEnhancer = composeWithDevTools();

const store = createStore(cartReducer, composedEnhancer);

root.render(
  <Provider store={store}>
    <AuthneticationContextProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Homepage</div>} />
              <Route path="registration" element={<RegistrationForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="products">
                <Route index element={<ProductsList />} />
                <Route path=":productId" element={<ProductDetails />} />
              </Route>
              <Route path="*" element={<div>Page not found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthneticationContextProvider>
  </Provider>,
);
