'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuthRedirect = (redirectTo: string) => {
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="))
          ?.split("=")[1];

        if (token) {
          router.push(redirectTo);
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    validateToken();
  }, [router, redirectTo]);
};

export default useAuthRedirect;
