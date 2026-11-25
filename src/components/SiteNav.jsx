import { NavLink } from "react-router-dom";
import {
  BookIcon,
  CakeIcon,
  CardsIcon,
  HeartIcon,
  MailIcon,
  SparkIcon,
} from "./Icons";

const LINKS = [
  { to: "/birthday", label: "Shuruaat", Icon: HeartIcon },
  { to: "/story", label: "Kahani", Icon: BookIcon },
  { to: "/letter", label: "Chitthi", Icon: MailIcon },
  { to: "/wish", label: "Cake", Icon: CakeIcon },
  { to: "/cards", label: "Wishes", Icon: CardsIcon },
  { to: "/finale", label: "Akhir", Icon: SparkIcon },
];

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      {LINKS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          title={label}
          aria-label={label}
          className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
        >
          <Icon className="nav-icon" />
          <span className="nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
