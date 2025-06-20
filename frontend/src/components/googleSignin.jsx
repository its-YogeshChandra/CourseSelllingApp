 import { useState, useEffect } from "react";
import authService from "../services/auth.js";
import { useNavigate } from "react-router";

export default function GoogleLogin() {

  const navigate = useNavigate();

  useEffect(() => {
    // Load the Google script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-button"),
          {
            theme: "outline",
            size: "large",
          }
        );

        // Optional: Show One Tap
        window.google.accounts.id.prompt();
      }
    };
  }, []);

  const handleCredentialResponse = async (response) => {
 
    // You can decode it or send it to your backend
    try {
      const val = await authService.googleAuth(response.credential);
      console.log(val)
      if (val) {
        navigate({
          pathname: "/app/home",
        });
      }
    } catch (error) {
      throw error;
    } 
    
  };

  return <div id="google-button"></div>;
}
