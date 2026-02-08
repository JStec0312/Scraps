import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
  Instagram,
  X
} from "lucide-react";
import SvgLogo from "../UI/SvgLogo.tsx";
import { useState } from "react";

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');


  return (
    <footer className="bg-[rgb(0,0,128)] text-white py-16">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Top section with logo and nav */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-40 h-20"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <SvgLogo />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <a
              href="/"
              className="hover:text-blue-200 transition-colors uppercase tracking-wider text-sm"
            >
              Strona główna
            </a>
            <a
              href="#oferta"
              className="hover:text-blue-200 transition-colors uppercase tracking-wider text-sm"
            >
              Kolekcja
            </a>
            <a
              href="#about"
              className="hover:text-blue-200 transition-colors uppercase tracking-wider text-sm"
            >
              O nas
            </a>
            <a
              href="/cart"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors uppercase tracking-wider text-sm"
            >
              <ShoppingCart size={16} />
              Koszyk
            </a>
          </motion.div>
        </motion.div>

        {/* Contact information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-t border-b border-blue-900/30 py-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Phone & Email */}
          <div className="flex flex-col gap-3 items-center md:items-start">
            <a
              href="tel:+48123456789"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <Phone size={16} />
              <span>+48 123-456-789</span>
            </a>
            <a
              href="mailto:info@scraps.com"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <Mail size={16} />
              <span>info@scraps.com</span>
            </a>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-3 items-center">
            <a
              href="https://instagram.com/scraps123"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <Instagram size={16} />
              <span>@scraps123</span>
            </a>
            <a
              href="https://tiktok.com/@scrapsTikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <TikTokIcon />
              <span>@scrapsTikTok</span>
            </a>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 items-center md:items-end">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>ul. Zielona 5</span>
            </div>
            <div className="pl-6 md:pl-0">
              <span>78-345 Warszafka</span>
            </div>
          </div>
        </motion.div>

        {/* Newsletter section */}
        <motion.div
          className="max-w-md mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-header text-xl md:text-2xl mb-4 text-center">
            Newsletter
          </h3>
          <p className="text-sm text-center mb-6">
            Zapisz się, aby otrzymywać informacje o nowościach i promocjach
          </p>
          <form  className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Twój adres email"
              className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none text-white text-sm"
              required
            />
            <motion.button
              type="submit"
              className="absolute right-0  top-0 h-full px-4 bg-transparent text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {!isSubmitted && <ArrowRight size={20} />}

              {isSubmitted && submissionMessage === '' && null}

              {isSubmitted && submissionMessage === 'Gratulacje! Twój e-mail został zapisany.' && (
                <Check size={20} />
              )}

              {isSubmitted && submissionMessage !== '' && submissionMessage !== 'Gratulacje! Twój e-mail został zapisany.' && (
                <X size={20} />
              )}
            </motion.button>
          </form>
          {isSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-center mt-4"
            >
              {submissionMessage}
            </motion.p>
          )}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center border-t border-blue-900/50 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Scraps. Wszystkie prawa
            zastrzeżone.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
