import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { useState } from "react"
import type { Product } from "@/types/product"
import { useCartStore } from "@/store/cartStore"
import {  useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart?: (product: Product) => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)
  const navigate = useNavigate()


  return (
    <motion.div
      className="flex lg:flex-1 flex-col gap-4 justify-center rounded-lg mx-auto max-w-[300px] lg:min-w-[500px] bg-gray-900/40 backdrop-blur-sm p-3 border border-gray-800 transition-all"
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-lg group">
        <div className="w-full aspect-[4/3] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain rounded-lg shadow-lg"
                onClick={() =>
                  setCurrentImageIndex((currentImageIndex + 1) % product.images.length)
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image navigation circles */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {product.images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white shadow-glow"
                    : "bg-gray-500/70 hover:bg-gray-300"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-10">
          {currentImageIndex + 1} / {product.images.length}
        </div>
      </div>

      <div className="flex gap-3 flex-col pl-2">
        <Link
          to={`/products/${product.id}`}
          className="text-white text-2xl border-b border-gray-700 hover:border-white pb-1 w-fit font-header transition-colors"
        >
          {product.name}
        </Link>

        <p className="text-base text-gray-300 text-body">{product.description}</p>

        <div className="flex justify-between items-center mt-1">
          <p className="text-white text-3xl font-header">{product.price} zł</p>

          <div className="flex gap-2">
            <Link to={`/products/${product.id}`}>
              <motion.button
                type="button"
                className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 py-3 px-6 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium"
                whileTap={{ scale: 0.95 }}
              >
                Więcej
              </motion.button>
            </Link>

            <a href="/cart"
              onClick={() => {
                   setIsAddingToCart(true)
                  addToCart({ ...product, quantity: 1 })
              }}
              className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 disabled:opacity-50 py-3 px-6 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium"
            >
              {isAddingToCart ? "Dodano!" : "Do koszyka"}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
