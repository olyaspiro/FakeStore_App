import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";


const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // clean up
  }, []);

  return { user, loading };
};

export default useAuth;
