import { configureStore} from '@reduxjs/toolkit';

import { createAPI } from '../services/api';
import { catalogReducer } from './catalog-slice/catalog-slice';
import { productDataReducer } from './product-slice/product-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    product: productDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }
    ),
});

export { store };
