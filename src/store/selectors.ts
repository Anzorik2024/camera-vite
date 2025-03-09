import { State } from '../types/state/state';

const selectCameras = (state: State) => state.catalog.cameras;

export { selectCameras};
