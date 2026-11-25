import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { YOUR_NAME } from "../config";
import FloatingHearts from "./FloatingHearts";
import FlyingBalloons from "./FlyingBalloons";
import { HeartIcon } from "./Icons";
import SiteNav from "./SiteNav";

export default function CelebrationLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="experience">
      <FlyingBalloons />
      <FloatingHearts />
      <SiteNav />
      <main className="experience-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <HeartIcon className="footer-heart" />
        <span>By {YOUR_NAME}</span>
      </footer>
    </div>
  );
}
