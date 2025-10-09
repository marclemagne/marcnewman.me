import { linkedInData } from "../generated/linkedin-data";
import type { Company } from "../types/data.ts";

const { positions } = linkedInData;

const companies: Company[] = [];

for (const position of positions) {
  const found = companies.find(
    (company) => company.companyName === position.companyName,
  );

  if (found) {
    found.positions.push(position);
    // Updates company `startedOn` with older started on dates as we loop
    // through the positions.
    found.startedOn = position.startedOn;
  } else {
    companies.push({
      companyName: position.companyName,
      finishedOn: position.finishedOn,
      location: position.location,
      positions: [position],
      startedOn: position.startedOn,
    });
  }
}

export { companies };
