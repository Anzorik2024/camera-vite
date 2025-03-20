import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Camera } from '../../types/camera';


type InitialState = {
  selectedCamera: Camera | null;
  tel: string | null;
  isLoading: boolean;
};

const initialState : InitialState = {
  selectedCamera: null,
  tel: null,
  isLoading: false,
};

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    selectCamera: (state, action: PayloadAction<Camera|null>) => {
      state.selectedCamera = action.payload;
    },
    selectPhone: (state, action: PayloadAction<string|null>) => {
      state.tel = action.payload;
    },
  },
});


const orderReducer = orderSlice.reducer;
const {selectCamera, selectPhone } = orderSlice.actions;

export { orderReducer, selectCamera, selectPhone, toggleModal };
