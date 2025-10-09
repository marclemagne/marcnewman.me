export type Position = {
  companyName: string;
  title: string;
  description: string;
  location: string;
  startedOn: string;
  finishedOn: string;
};

export type Company = {
  companyName: string;
  finishedOn: string;
  location: string;
  positions: Position[];
  startedOn: string;
};
