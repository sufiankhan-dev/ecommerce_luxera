export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
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
