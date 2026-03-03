import { useState, useEffect, useCallback } from "react";

function useRouter() {
  const [path, setPath] = useState(window.location.hash || "#/");

  useEffect(() => {
    const handler = () => setPath(window.location.hash || "#/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback((to) => {
    window.location.hash = to;
    window.scrollTo({ top: 0 });
  }, []);

  const route = path.replace("#", "") || "/";
  return { route, navigate };
}


export default useRouter;