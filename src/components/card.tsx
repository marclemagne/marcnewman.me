import { Expand } from "lucide-react";

type CardProps = {
  onExpandClick: () => void;
};

export default function Card({ onExpandClick }: CardProps) {
  return (
    <article className="flex flex-col items-center">
      <img
        alt="Marc Newman"
        className="rounded-full size-20 mb-2 shadow-md border-button-border border-2"
        src="/marc-small.jpg"
      />
      <div className="text-xl font-bold mb-1 text-primary">Marc Newman</div>
      <p className="text-sm mb-4 text-secondary font-normal">
        Engineering Leader
      </p>
      <button
        aria-label="Expand About Me section"
        type="button"
        className="group bg-button text-button-text hover:bg-button-hover border border-button-border rounded-sm px-4 py-1 shadow-md flex items-center gap-2"
        onClick={onExpandClick}
      >
        About me
        <Expand className="ml-1 group-hover:animate-pulse-scale" size={16} />
      </button>
    </article>
  );
}
