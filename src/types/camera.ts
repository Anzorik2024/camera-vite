export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  previewImg: string;
  level: string;
  price: number;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  rating: number;
  reviewCount: number;
}

export type Cameras = Camera[];

export type Promo = Pick<Camera, 'id'| 'name'| 'previewImg'| 'previewImg2x'| 'previewImgWebp'| 'previewImgWebp2x'>;
