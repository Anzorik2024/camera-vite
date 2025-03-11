import { State } from '../types/state/state';

const selectCameras = (state: State) => state.catalog.cameras;
const selectIsLoading = (state: State) => state.catalog.isLoading;
const selectProductCamera = (state: State) => state.product.camera;
const selectProductStatus = (state: State) => state.product.status;

export { selectCameras, selectIsLoading,selectProductStatus, selectProductCamera};
