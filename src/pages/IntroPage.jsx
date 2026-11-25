import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Intro from "../components/Intro";

export default function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Intro
      onEnter={() => navigate("/birthday", { state: { celebrate: Date.now() } })}
    />
  );
}
