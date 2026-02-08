import { useEffect, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useLoaderData } from "react-router-dom"
import ProductImageGallery from "./ProductImageGallery"
import type { Product } from "@/types/product"

export default function AnimatedProductDetails() {
  const product = useLoaderData() as Product
  const [isLoaded, setIsLoaded] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleAddToCart = (p: Product) => {
    console.log(`Added ${p.name} to cart.`)
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const specItemVariant: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const handleOpenFullscreen = (image: string) => {
    setFullscreenImage(image)
  }

  const handleCloseFullscreen = () => {
    setFullscreenImage(null)
  }

  return (
    <>
      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseFullscreen}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image"
            id="fullscreen-image-overlay"
          >
            <div
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()} // nie zamykaj po kliknieciu w obraz
            >
              <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                <img
                  src={fullscreenImage}
                  alt={`${product.name} fullscreen view`}
                  className="absolute inset-0 w-full h-full object-contain"
                  decoding="async"
                />
              </div>

              <motion.button
                type="button"
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseFullscreen}
                aria-label="Close fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              onImageClick={handleOpenFullscreen}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <h1 className="text-3xl md:text-5xl font-light text-white font-header">
                {product.name}
              </h1>
              <motion.div
                className="h-0.5 bg-blue-600 mt-2"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </motion.div>

            <motion.div className="text-3xl font-header text-white" variants={fadeIn}>
              {product.price} zł
            </motion.div>

            <motion.div className="text-gray-300" variants={fadeIn}>
              <p className="text-lg">{product.longDescription}</p>
            </motion.div>

            {/* Specifications */}
            <motion.div className="mt-4" variants={fadeIn}>
              <h2 className="text-xl md:text-2xl font-header mb-2 text-white">Specyfikacja</h2>

              <motion.div
                className="grid grid-cols-2 gap-y-2 border-t border-gray-800"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={staggerContainer}
              >
{product.specifications.map((spec) => (
  <motion.div
    key={spec.name}
    className="py-2 border-b border-gray-800 text-white"
    variants={specItemVariant}
  >
    <span className="text-gray-400">{spec.name}:</span> {spec.value}
  </motion.div>
))}
              </motion.div>
            </motion.div>

            {/* Add to Cart */}
            <motion.div className="mt-6" variants={fadeIn}>
              <motion.button
                type="button"
                onClick={() => handleAddToCart(product)}
                className={
                  "w-full bg-blue-600 text-white py-4 uppercase tracking-wider text-sm font-medium transition-all duration-300" +
                  (product.stock <= 0 ? " cursor-not-allowed opacity-50" : " hover:bg-blue-700")
                }
                whileTap={{ scale: 0.98 }}
                disabled={product.stock <= 0}
              >
                Dodaj do koszyka
              </motion.button>

              {product.stock <= 0 && (
                <p className="mt-4 text-red-400 uppercase font-body">Obecnie niedostępny</p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
