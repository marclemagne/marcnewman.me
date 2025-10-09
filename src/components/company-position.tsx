import { useMemo } from "react";
import type { Position } from "../types/data.ts";

type CompanyPositionProps = {
  position: Position;
};

export default function CompanyPosition({ position }: CompanyPositionProps) {
  const { title, description, startedOn, finishedOn } = position;

  /**
   * Parses the position description into intro text and bullet points. Removes
   * the "Key Accomplishments:" label since the visual separation of paragraph
   * to list makes the distinction clear.
   */
  const { intro, bullets } = useMemo(() => {
    const cleaned = description.replace(/\s*Key Accomplishments:\s*/i, "");

    const parts = cleaned
      .split("•")
      .map((s) => s.trim())
      .filter(Boolean);

    const [intro, ...bullets] = parts;

    return { intro, bullets };
  }, [description]);

  return (
    <article>
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-sm text-primary/80 mb-4">
        {startedOn} — {finishedOn ? finishedOn : "Present"}
      </p>
      <p>{intro}</p>
      {bullets.length > 0 ? (
        <div className="md:px-10">
          <p className="font-semibold mb-2 mt-4">Key Accomplishments:</p>
          <ul className="list-disc pl-5 space-y-2">
            {bullets.map((bullet, bulletIdx) => (
              <li key={bulletIdx}>{bullet}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
