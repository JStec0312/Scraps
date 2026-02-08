import { motion } from "framer-motion"

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const S1 = () => {
  return (
    <motion.section
      className="bg-blue-950 text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Subtle diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
            backgroundSize: "10px 10px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* Main headline */}
        <motion.div
          className="flex justify-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-4xl md:text-7xl font-light font-header tracking-wider text-center"
            variants={itemVariants}
          >
            WITAJ!
          </motion.h1>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left image */}
          <motion.div
            className="lg:col-span-4 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-2xl"
              variants={itemVariants}
            >
              <img
                src="/images/s1-i1.webp"
                alt="Designer denim bag display"
                width={600}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/40" />
            </motion.div>
          </motion.div>

          {/* Center text */}
          <motion.div
            className="lg:col-span-4 lg:order-2 text-center px-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p
              className="text-lg sm:text-xl font-body text-blue-200 mb-8"
              variants={itemVariants}
            >
              Witaj na naszej stronie
            </motion.p>
            <motion.p
              className="text-lg sm:text-xl mb-10 font-body"
              variants={itemVariants}
            >
              Odkryj unikalne torebki denimowe tworzone z pasją przez naszych projektantów
            </motion.p>
            <motion.a
              href="#oferta"
              className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 font-body py-3 px-10 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium inline-block"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Zobacz Ofertę
            </motion.a>
          </motion.div>

          {/* Right image column - stacked images */}
          <motion.div
            className="lg:col-span-4 lg:order-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="space-y-6">
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-2xl"
                variants={itemVariants}
              >
                <img
                  src="/images/s1-i2.webp"
                  alt="Artistic denim bag showcase"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/40" />
              </motion.div>

              <motion.div
                className="relative rounded-lg overflow-hidden shadow-2xl"
                variants={itemVariants}
              >
                <img
                  src="/images/s1-i3.webp"
                  alt="Fashionable denim bag design"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/40" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default S1
