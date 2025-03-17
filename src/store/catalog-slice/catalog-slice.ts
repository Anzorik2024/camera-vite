import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAllCameraAction } from '../thunks/catalog-process/catalog-process';
import { Cameras, Camera } from '../../types/camera';


type InitialState = {
  cameras: Cameras | [];
  selectedCamera: Camera | null;
  isLoading: boolean;
};

const initialState : InitialState = {
  cameras: [],
  selectedCamera: null,
  isLoading: false,
};


const catalogSlice = createSlice({
  name: 'Catalog',
  initialState,
  reducers: {
    selectCamera: (state, action: PayloadAction<Camera|null>) => {
      state.selectedCamera = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCameraAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCameraAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCameraAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const catalogReducer = catalogSlice.reducer;

const catalogReducerAction = {
  fetchAllCameraAction,
};

const {selectCamera} = catalogSlice.actions;

export { catalogReducer, catalogReducerAction, selectCamera };

