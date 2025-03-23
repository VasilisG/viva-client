export type EventInfo = {
  title: string;
  message: string;
}

export type VivaResponse = {
  eventId: string;
  eci: string;
  t?: string;
  s: string;
  lang: string;
};