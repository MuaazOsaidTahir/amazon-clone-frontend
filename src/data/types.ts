export type Product = {
  createdAt: Date;
  category: string | null;
  title: string;
  price: number | null;
  description: string | null;
  image: string;
  rating: {
    rate: number | null;
    count: number | null;
  } | null;
  _id: string;
};

export type SearchedProducts = {
  products: Product[];
  category: string;
}

export type User = {
  id?: string,
  _id?: string,
  uuid?: string,
  name: string,
  email?: string,
}

export type Order = {
  _id: string;
  date: string;
  status: string;
  products: {
    quantity: number;
    productId: Product;
  }[];
}