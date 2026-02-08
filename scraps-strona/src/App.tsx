import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/home/page"
import AnimatedProductDetails from "./pages/product/AnimatedProductDetails"
import { getProductById } from "./api/products"
import CartPage from "./pages/cart/page"
import CheckoutPage from "./pages/checkout/page"



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/products/:id",
        element: <AnimatedProductDetails />,
        loader: async ({ params }) => {
          const id = Number(params.id)
          const product = await getProductById(id)
          if (!product) throw new Response("Not Found", { status: 404 })
          return product
        },

      },
      { path: "/cart", element: <CartPage /> },
      {path: "/checkout", element: <CheckoutPage />},
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
