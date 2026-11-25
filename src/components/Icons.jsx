import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Cake,
  Coffee,
  GraduationCap,
  Heart,
  Home,
  Layers,
  Mail,
  Music,
  Notebook,
  Smile,
  Sparkles,
  Sticker,
} from "lucide-react";

const STROKE = 1.5;

export function HeartIcon({ className = "", style }) {
  return (
    <Heart
      className={className}
      style={style}
      strokeWidth={STROKE}
      fill="currentColor"
      aria-hidden="true"
    />
  );
}

export function NoteIcon({ className = "" }) {
  return <Music className={className} strokeWidth={STROKE} aria-hidden="true" />;
}

export function ArrowDownIcon({ className = "" }) {
  return (
    <ArrowDown className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function SparkIcon({ className = "" }) {
  return (
    <Sparkles className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function HomeIcon({ className = "" }) {
  return <Home className={className} strokeWidth={STROKE} aria-hidden="true" />;
}

export function BookIcon({ className = "" }) {
  return (
    <BookOpen className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function MailIcon({ className = "" }) {
  return <Mail className={className} strokeWidth={STROKE} aria-hidden="true" />;
}

export function CakeIcon({ className = "" }) {
  return <Cake className={className} strokeWidth={STROKE} aria-hidden="true" />;
}

export function CardsIcon({ className = "" }) {
  return (
    <Layers className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function ArrowRightIcon({ className = "" }) {
  return (
    <ArrowRight className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function ArrowLeftIcon({ className = "" }) {
  return (
    <ArrowLeft className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function GraduationIcon({ className = "" }) {
  return (
    <GraduationCap
      className={className}
      strokeWidth={STROKE}
      aria-hidden="true"
    />
  );
}

export function CoffeeIcon({ className = "" }) {
  return (
    <Coffee className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function SmileIcon({ className = "" }) {
  return <Smile className={className} strokeWidth={STROKE} aria-hidden="true" />;
}

export function StickerIcon({ className = "" }) {
  return (
    <Sticker className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}

export function NotebookIcon({ className = "" }) {
  return (
    <Notebook className={className} strokeWidth={STROKE} aria-hidden="true" />
  );
}
