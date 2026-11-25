import Reveal from "./Reveal";

export default function PageHead({ kicker, title, sub }) {
  return (
    <Reveal className="section-head page-head">
      <p className="kicker">{kicker}</p>
      <h1 className="section-title">{title}</h1>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </Reveal>
  );
}
