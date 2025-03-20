import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Camera } from '../../types/camera';


type InitialState = {
  selectedCamera: Camera | null;
  tel: string | null;
  isOpen: boolean;
  isLoading: boolean;
};

const initialState : InitialState = {
  selectedCamera: null,
  tel: null,
  isOpen: false,
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
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
});


const orderReducer = orderSlice.reducer;
const {selectCamera, selectPhone } = orderSlice.actions;

export { orderReducer, selectCamera, selectPhone };
