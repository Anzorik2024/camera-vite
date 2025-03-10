import { createSlice } from '@reduxjs/toolkit';
import { Camera } from '../../types/camera';
import { fetchCameraByIdAction } from '../thunks/product-process/product-process';

import { RequestStatus } from '../../const/request-status';


type initialStateProduct = {
  camera: Camera | null ;
  status: RequestStatus;
};

const initialState: initialStateProduct = {
  camera: null,
  status: RequestStatus.Idle
};


export const productData = createSlice({
  initialState,
  name: 'product-data',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
      state.camera = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchCameraByIdAction.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(fetchCameraByIdAction.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
});

const productDataActions = {
  fetchCameraByIdAction
};

const productDataReducer = productData.reducer;

export {
  productDataActions,
  productDataReducer
};

