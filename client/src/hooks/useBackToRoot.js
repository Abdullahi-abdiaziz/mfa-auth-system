import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

const useBackToRoot = (rootPath = "/") => {
  const navigate = useNavigate();
  const location = useLocation();

  // This function navigates back to the defined root path
  const goBackToRoot = useCallback(() => {
    if (location.pathname !== rootPath) {
      navigate(rootPath);
    }
  }, [navigate, location, rootPath]);

  return goBackToRoot;
};

export default useBackToRoot;
