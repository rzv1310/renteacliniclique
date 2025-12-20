import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Previne restaurarea automată a scroll-ului de către browser
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Scroll la top instant
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
