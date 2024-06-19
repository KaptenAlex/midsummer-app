export type SnapsRatingResponse = {
  snaps: string;
  ratings: SnapsRatingValues[];
};

export type SnapsRatingTransformedData = {
  snaps: string;
  smell: number | string;
  taste: number | string;
  votes: number;
}

type SnapsRatingValues = {
  smell: number;
  taste: number;
};
