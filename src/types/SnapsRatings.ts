export type SnapsRatingResponse = {
  snaps: string;
  ratings: SnapsRatingValues[];
};

export type SnapsRatingTransformedData = {
  snaps: string;
  smell: number;
  taste: number;
  votes: number;
}

type SnapsRatingValues = {
  smell: number;
  taste: number;
};
