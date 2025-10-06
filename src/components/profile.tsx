import { linkedInData } from "../generated/linkedin-data";
import Position from "./position.tsx";
import { Shrink } from "lucide-react";
import LinkedIn from "./linkedin.tsx";

type ProfileProps = {
  onShrinkClick: () => void;
};

const { positions, profile: profiles } = linkedInData;
const [profile] = profiles;

export default function Profile({ onShrinkClick }: ProfileProps) {
  const { geoLocation, summary } = profile;

  return (
    <article className="text-primary relative">
      <button
        aria-label="Collapse About Me section"
        type="button"
        className="absolute group right-0 bg-button text-button-text hover:bg-button-hover border border-button-border rounded-sm p-2 shadow-md"
        onClick={onShrinkClick}
      >
        <Shrink className="group-hover:animate-pulse-scale" size={16} />
      </button>
      <h1 className="text-4xl font-bold mb-2 flex flex-col md:flex-row md:gap-[1ch]">
        <span>Marc</span>
        <span>Newman</span>
      </h1>
      <div className="text-2xl font-semibold text-secondary mb-2">
        Engineering Leader
      </div>
      <div className="text-primary/80">{geoLocation}</div>
      <h2 className="text-2xl font-bold mt-6 mb-4">About</h2>
      <p>{summary}</p>
      <h2 className="text-2xl font-bold my-6">Experience</h2>
      <section className="space-y-10">
        {positions.map((position, positionIdx) => (
          <Position key={positionIdx} position={position} />
        ))}
      </section>
      <footer className="mt-12 pt-6 border-t border-primary/20 text-sm">
        <a
          aria-label="Marc Newman's LinkedIn profile"
          className="inline-flex items-center gap-2 text-primary/80 hover:text-primary"
          href="https://www.linkedin.com/in/~marc-newman"
        >
          <LinkedIn /> See more on LinkedIn
        </a>
      </footer>
    </article>
  );
}
