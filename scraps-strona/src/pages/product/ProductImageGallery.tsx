import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants, TargetAndTransition } from "framer-motion"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  onImageClick?: (image: string) => void
}

export default function ProductImageGallery({
  images,
  productName,
  onImageClick,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageError, setImageError] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const switchImage = (newIndex: number) => {
    if (newIndex === selectedImageIndex) return
    setDirection(newIndex > selectedImageIndex ? 1 : -1)
    setSelectedImageIndex(newIndex)
  }

  const nextImage = () => {
    setDirection(1)
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleImageError = (index: number) => {
    console.error(`Error loading image at index ${index}:`, images[index])
    setImageError((prev) => ({ ...prev, [index]: true }))
  }

  const handleMainImageClick = () => {
    onImageClick?.(images[selectedImageIndex])
  }

  const thumbVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  const sliderVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main image */}
      <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden group">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selectedImageIndex}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={images[selectedImageIndex]}
              alt={`${productName} main view`}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              loading="eager"
              decoding="async"
              onError={() => handleImageError(selectedImageIndex)}
              onClick={handleMainImageClick}
            />
          </motion.div>
        </AnimatePresence>

        {/* Image counter */}
        <motion.div
          className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {selectedImageIndex + 1} / {images.length}
        </motion.div>

        {/* Fullscreen hint */}
        <motion.div
          className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full z-10
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Click to view fullscreen
        </motion.div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={prevImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={nextImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <motion.div
        className="grid grid-cols-4 gap-4"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {images.map((image, index) => (
          <motion.button
            key={index}
            type="button"
            custom={index}
            variants={thumbVariants}
            onClick={() => switchImage(index)}
            className={`relative h-20 rounded-md overflow-hidden transition-all ${
              index === selectedImageIndex
                ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900"
                : "opacity-70 hover:opacity-100"
            }`}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() => handleImageError(index)}
            />
          </motion.button>
        ))}
      </motion.div>

      {Object.keys(imageError).length > 0 && (
        <div className="bg-red-500/10 border border-red-500 p-3 rounded-md text-white text-sm">
          Some images failed to load. Please check image paths and ensure all files exist in the public directory.
        </div>
      )}
    </motion.div>
  )
}
