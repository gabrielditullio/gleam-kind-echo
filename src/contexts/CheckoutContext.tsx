import { createContext, useContext, useState, ReactNode } from "react";

interface CheckoutContextType {
  isOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType>({
  isOpen: false,
  openCheckout: () => {},
  closeCheckout: () => {},
});

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CheckoutContext.Provider value={{ isOpen, openCheckout: () => setIsOpen(true), closeCheckout: () => setIsOpen(false) }}>
      {children}
    </CheckoutContext.Provider>
  );
};
