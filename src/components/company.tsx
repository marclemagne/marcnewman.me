import type { Company } from "../types/data.ts";
import CompanyPosition from "./company-position.tsx";

type CompanyProps = {
  company: Company;
};

export default function Company({ company }: CompanyProps) {
  const { companyName, location, startedOn, finishedOn } = company;

  return (
    <section>
      <h3 className="text-xl font-bold mb-1">{companyName}</h3>
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
      <div className="border-l border-primary/20 md:ml-2 pl-4 md:pl-6 space-y-10">
        {company.positions.map((position, positionIdx) => (
          <CompanyPosition key={positionIdx} position={position} />
        ))}
      </div>
    </section>
  );
}
