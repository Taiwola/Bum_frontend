import { useNavigate, useLocation } from 'react-router-dom';

type props = {
    to?: any,
    options?: any
}

export function useSafeNavigate() {
    const location = useLocation();
    
    const safeNavigate = ({to, options}: props) => {
        if (location) {
        const navigate = useNavigate();
        navigate(to, options);
    } else {
      // Fallback logic, e.g., redirect using window.location or show an error
      window.location.href = to;
    }
  };

  return safeNavigate;
}
