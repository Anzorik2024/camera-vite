import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import BasketPage from '../../pages/basket-page/basket-page';
import { ToastContainer} from 'react-toastify'; // toast - add
import 'react-toastify/dist/ReactToastify.css';

import { AppRoute } from '../../const/app-route';


function App (): JSX.Element {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        >
        </Route>
        <Route
          path={`${AppRoute.Product}/:id`}
          element={<ProductPage/>}
        >
        </Route>
        <Route
          path={AppRoute.Basket}
          element={<BasketPage/>}
        >
        </Route>
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage/>}
        >
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
