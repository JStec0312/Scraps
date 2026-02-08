import { motion } from "framer-motion"

const S3 = () => {
  return (
    <section
      className="w-full bg-[rgb(0,0,210)] text-white py-24 overflow-hidden"
      id="about"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left image column */}
          <motion.div
            className="w-full lg:w-1/2 h-[500px] relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-full">
              <img
                src="/images/s3-i1.webp"
                alt="Stylish product showcase"
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center rounded-md"
              />

              <div className="absolute -bottom-8 -right-4 w-2/3 h-1/2 relative">
                <img
                  src="/images/s3-i2.webp"
                  alt="Detail view of product"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-md"
                />
              </div>
            </div>
          </motion.div>

          {/* Text content column */}
          <motion.div
            className="w-full lg:w-1/2 p-4 lg:p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-header mb-6">
              Nasza historia
            </h2>

            <p className="text-lg md:text-xl text-blue-100 font-body mb-8 leading-relaxed max-w-2xl">
              Tworzymy oryginalne produkty z pasją i dbałością o każdy detal.
              Nasze projekty łączą nowoczesny design z najwyższą jakością wykonania,
              tworząc wyjątkowe akcesoria, które podkreślą Twój styl.
            </p>

            <p className="text-lg md:text-xl text-blue-100 font-body mb-10 leading-relaxed max-w-2xl">
              Każdy produkt jest starannie wykonany z wyselekcjonowanych materiałów,
              co zapewnia nie tylko niepowtarzalny wygląd, ale również trwałość
              i komfort użytkowania przez wiele lat.
            </p>

            <motion.button
              type="button"
              className="border-2 border-white text-white hover:bg-white hover:text-[rgb(0,0,210)] py-3 px-10 uppercase tracking-wider text-sm font-medium transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("oferta")?.offsetTop ?? 0,
                  behavior: "smooth",
                })
              }
            >
              Zobacz naszą ofertę
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default S3
