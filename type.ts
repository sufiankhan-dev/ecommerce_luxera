export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  salePercent: number;
  colors: any;
}

export interface fullProductData {
  _id: string;
  image: any;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
  compositionAndCare: string[];
  colors: any;
  sizes: any;
  salePercent: number;
  fit: string;
}

export interface DeliveryAndReturnData {
  deliveries: string[];
  returns: string[];
}

export interface HeroImages {
  image1: any;
  image2: any;
  image3: any;
}

export interface CategoriesItems {
  Mensdata: any;
  Womensdata: any;
}

export interface CollectionsData {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  collectionName: string;
  salePercent: number;
  colors: any;
}
