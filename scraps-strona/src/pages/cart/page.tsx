import { useEffect, useState } from 'react';
import { ChevronLeft, Plus, Minus, ShoppingBag, X, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import type { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const navigate = useNavigate();
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const cart = useCartStore((s) => s.cart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const handleCheckout = () => {
    setCheckoutClicked(true);
    navigate('/checkout');
    window.scrollTo(0, 0); // scroll fix po nawigacji
  };

  return (
    <div className="min-h-[50dvh] bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-light tracking-wider text-center mb-6">
            TWÓJ KOSZYK
          </h1>

          <div className="flex justify-center">
            <Link 
              to="/" 
              className="flex items-center text-sm text-blue-200 hover:text-white transition-colors"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Kontynuuj zakupy
            </Link>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-16 w-16 mb-6 text-blue-300" />
            <h2 className="text-2xl mb-2">Twój koszyk jest pusty</h2>
            <p className="text-blue-200 mb-8">
              Wygląda na to, że nie dodałeś jeszcze żadnych produktów
            </p>
            <Link 
              to="/" 
              className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 py-3 px-10 transition-all uppercase text-sm"
            >
              Wróć do sklepu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border border-gray-800 rounded-lg bg-gray-900/40"
                >
                  <div className="flex gap-6">
                    <div className="w-32 h-24 bg-gray-800 flex items-center justify-center overflow-hidden">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <X className="h-6 w-6 text-gray-500" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl">
                        <a href={`/products/${item.id}`}>{item.name}</a>
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <button onClick={() => decreaseQty(item.id)}><Minus /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)}><Plus /></button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-2">
                        {(item.price * item.quantity).toFixed(2)} zł
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 p-6 border border-gray-800 bg-gray-900/40 rounded-lg h-fit">
              <h3 className="text-2xl mb-4">Podsumowanie</h3>
              <p>Łącznie: {totalPrice().toFixed(2)} zł</p>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full border-2 border-blue-400 py-3 hover:bg-blue-400 hover:text-blue-950 transition"
              >
                KUP TERAZ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
