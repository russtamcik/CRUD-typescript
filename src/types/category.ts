export interface CategoryTypes {
  id: string;
  name: string;
  image: string;
}

export interface CategoryResponseType extends CategoryTypes {
  createdAt: string;
}
