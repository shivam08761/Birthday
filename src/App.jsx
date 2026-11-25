import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CelebrationLayout from "./components/CelebrationLayout";
import MusicPlayer from "./components/MusicPlayer";
import CardsPage from "./pages/CardsPage";
import FinalePage from "./pages/FinalePage";
import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import LetterPage from "./pages/LetterPage";
import StoryPage from "./pages/StoryPage";
import WishPage from "./pages/WishPage";

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route element={<CelebrationLayout />}>
          <Route path="/birthday" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/wish" element={<WishPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/finale" element={<FinalePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <MusicPlayer hidden={pathname === "/"} />
    </>
  );
}
