import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    const clickOutside = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      callback();
    };

    window.addEventListener("mousedown", clickOutside);
    window.addEventListener("touchstart", clickOutside)
    
    return () => {
        window.removeEventListener("mousedown", clickOutside);
        window.removeEventListener("touchstart", clickOutside)
    };
  }, []);
}
