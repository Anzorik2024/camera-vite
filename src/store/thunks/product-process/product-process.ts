import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute } from '../../../const/api-route';
import { Camera } from '../../../types/camera';


// export const fetchCameraByIdAction = createAsyncThunk<Camera, string,
// {extra: AxiosInstance}
// >('product/fetchCameraById', async (offerID, {extra: api}) => {
//   const response = await api.get<Camera>(`${ApiRoute.Cameras}/${offerID}`);
//   return response.data;
// });

export const fetchCameraByIdAction = createAsyncThunk<
Camera,
string,
{
  extra: AxiosInstance;
}
>('product/fetchCameraById',
  async (id, { extra: api}) => {
    const { data } = await api.get<Camera>(`${ApiRoute.Cameras}/${id}`);

    return data;
  }
);
