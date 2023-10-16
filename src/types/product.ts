export interface ProductCardProps {
  name: string;
  image: string;
  id: string;
  description: string;
  discount: number;
  price: string;
  editProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
}

export interface ProductResponseType extends ProductCardProps {
  createdAt: string;
}
