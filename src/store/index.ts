import { configureStore} from '@reduxjs/toolkit';

import { createAPI } from '../services/api';
import { catalogReducer } from './catalog-slice/catalog-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
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
