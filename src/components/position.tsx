import { useMemo } from "react";

export type Position = {
  companyName: string;
  title: string;
  description: string;
  location: string;
  startedOn: string;
  finishedOn: string;
};

type PositionProps = {
  position: Position;
};

export default function Position({ position }: PositionProps) {
  const { companyName, title, description, location, startedOn, finishedOn } =
    position;

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
      <h3 className="text-lg font-bold">{companyName}</h3>
      <p className="text-secondary mb-1">{title}</p>
      <p className="text-sm text-primary/80 mb-4 space-y-1.5 md:space-y-0">
        {location ? (
          <>
            <span className="block md:inline">{location}</span>
            <span className="hidden md:inline"> • </span>
          </>
        ) : null}
        <span className="block md:inline">
          {startedOn} — {finishedOn ? finishedOn : "Present"}
        </span>
      </p>
      <p>{intro}</p>
      {bullets.length > 0 ? (
        <>
          <p className="font-semibold mb-2 mt-4">Key Accomplishments:</p>
          <ul className="list-disc pl-5 space-y-2">
            {bullets.map((bullet, bulletIdx) => (
              <li key={bulletIdx}>{bullet}</li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
}
