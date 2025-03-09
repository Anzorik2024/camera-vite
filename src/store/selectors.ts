import { State } from '../types/state/state';

const selectCameras = (state: State) => state.catalog.cameras;
const selectIsLoading = (state: State) => state.catalog.isLoading;

export { selectCameras, selectIsLoading};
