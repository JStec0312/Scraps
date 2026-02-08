export type Product = {
    id: number;
    images: string[];
    name: string;
    description: string;
    price: number;
    longDescription: string;
    specifications: ProductSpecification[];
    category: string;
    stock: number;
}

export type ProductSpecification = {
  name: string
  value: string
}