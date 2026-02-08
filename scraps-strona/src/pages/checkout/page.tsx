import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
// import { products } from '../data/products'; // nieużywane – można usunąć

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    zip: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    deliveryMethod: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cart = useCartStore((s) => s.cart);

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="min-w-[70%]">
            <h2 className="text-3xl font-header mb-8">Dane do wysyłki</h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Imię" className="form-input" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Nazwisko" className="form-input" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="E-mail" className="form-input" />
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="Nr telefonu" className="form-input" />

                <div className="grid grid-cols-2 gap-4">
                  <input name="city" value={formData.city} onChange={handleChange} required placeholder="Miasto" className="form-input" />
                  <input name="zip" value={formData.zip} onChange={handleChange} required placeholder="Kod pocztowy" className="form-input" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input name="street" value={formData.street} onChange={handleChange} required placeholder="Ulica" className="form-input" />
                  <input name="houseNumber" value={formData.houseNumber} onChange={handleChange} required placeholder="Numer domu" className="form-input" />
                </div>

                <input name="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange} placeholder="Numer mieszkania" className="form-input" />

                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required className="form-input">
                  <option value="">Wybierz metodę dostawy</option>
                  <option value="courier">Kurier</option>
                  <option value="parcel_locker">Paczkomat</option>
                  <option value="post">Poczta Polska</option>
                </select>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 font-body py-3 px-10 transition-all uppercase tracking-wider text-sm font-medium"
                  >
                    Przejdź do płatności
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
