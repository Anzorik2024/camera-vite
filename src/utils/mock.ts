import { datatype, commerce, image, internet, lorem } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { Camera } from '../types/camera';
import { State } from '../types/state/state';
import { createAPI } from '../services/api';


const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: commerce.product(),
  category: datatype.string(),
  description: lorem.paragraph(),
  level: datatype.string(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(),
});


export const api = createAPI();
export const mockApi = new MockAdapter(api);
export const fakeCamera = makeFakeCamera();
export const fakeCameras = Array.from({length: 20}, makeFakeCamera);
export const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<
State,
Action<string>,
ThunkDispatch<State, typeof api, Action>
>(middlewares);

export const fakeId = '5';

