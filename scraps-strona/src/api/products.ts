import type  { Product } from "../types/product";
export const products: Product[] =[
    {
    id: 1,
    name: 'Product 1',
    price: 10.99,
    images: ['/images/products/p0_1.webp', '/images/products/p0_2.webp'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    specifications: [
      { name: 'Material', value: 'Premium quality' },
      { name: 'Dimensions', value: '10 x 15 x 5 cm' },
      { name: 'Weight', value: '250g' }
    ],
    category: 'Featured',
    stock: 10,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20.99,
    images: ['/images/products/p1_0.webp', '/images/products/p1_1.webp'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    specifications: [
      { name: 'Material', value: 'High quality' },
      { name: 'Dimensions', value: '15 x 20 x 8 cm' },
      { name: 'Weight', value: '300g' }
    ],
    category: 'Popular',
    stock: 5,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30.99,
    images: ['/images/products/p3_0.webp', '/images/products/p3_1.webp'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    specifications: [
      { name: 'Material', value: 'Exclusive material' },
      { name: 'Dimensions', value: '12 x 18 x 7 cm' },
      { name: 'Weight', value: '350g' }
    ],
    category: 'New',
    stock: 0,
  },
]

export async function getProductById(id: number): Promise<Product | undefined> {
  return products.find((product) => product.id === id);
}

export async function listProducts(): Promise<Product[]> {
    return products;
}   