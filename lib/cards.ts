export type CardKind = "book" | "paper";

export type CardItem = {
  id: string;
  kind: CardKind;
  title: string;
  byline: string;
  tag: string;
  // Desktop position, in percent of the board's width/height.
  top: number;
  left: number;
  rotate: number;
  width: number;
};

export const CARDS: CardItem[] = [
  { id: "c1", kind: "book", title: "Introduction to Algorithms", byline: "Cormen, Leiserson, Rivest, Stein", tag: "First Floor · Stacks", top: 6, left: 2, rotate: -6, width: 210 },
  { id: "c2", kind: "book", title: "Fundamentals of Heat and Mass Transfer", byline: "Incropera, DeWitt", tag: "First Floor · Stacks", top: 4, left: 20, rotate: 4, width: 210 },
  { id: "c3", kind: "book", title: "Linear Algebra and Its Applications", byline: "Gilbert Strang", tag: "First Floor · Stacks", top: 22, left: 34, rotate: -3, width: 210 },
  { id: "c4", kind: "paper", title: "Optimal Power Flow Using Metaheuristic Algorithms", byline: "ASCE Journal", tag: "ASCE Journal", top: 12, left: 50, rotate: 5, width: 230 },
  { id: "c5", kind: "book", title: "Probability and Statistics for Engineers", byline: "Miller, Freund", tag: "Miller, Freund", top: 6, left: 72, rotate: -4, width: 220 },
  { id: "c6", kind: "paper", title: "A Survey on Energy Harvesting in IoT Sensor Networks", byline: "IEEE Sensors Journal", tag: "IEEE Xplore", top: 18, left: 86, rotate: 6, width: 230 },

  { id: "c7", kind: "book", title: "Structural Analysis", byline: "R. C. Hibbeler", tag: "First Floor · Stacks", top: 60, left: 1, rotate: -5, width: 200 },
  { id: "c8", kind: "book", title: "Organic Chemistry", byline: "Clayden, Greeves, Warren", tag: "First Floor · Stacks", top: 66, left: 18, rotate: 4, width: 210 },
  { id: "c9", kind: "book", title: "Digital Signal Processing", byline: "Proakis, Manolakis", tag: "First Floor · Stacks", top: 78, left: 2, rotate: -3, width: 220 },
  { id: "c10", kind: "book", title: "Operating System Concepts", byline: "Silberschatz, Galvin, Gagne", tag: "First Floor · Stacks", top: 90, left: 1, rotate: 5, width: 220 },
  { id: "c11", kind: "book", title: "Mechanics of Materials", byline: "Beer, Johnston", tag: "First Floor · Stacks", top: 82, left: 26, rotate: -4, width: 200 },
  { id: "c12", kind: "paper", title: "Federated Learning for Privacy-Preserving Healthcare Analytics", byline: "RSC Advances", tag: "RSC Advances", top: 92, left: 40, rotate: 3, width: 230 },

  { id: "c13", kind: "paper", title: "Attention Is All You Need", byline: "NeurIPS 2017", tag: "NeurIPS 2017", top: 58, left: 76, rotate: -4, width: 210 },
  { id: "c14", kind: "paper", title: "Deep Residual Learning for Image Recognition", byline: "CVPR 2016", tag: "CVPR 2016", top: 62, left: 90, rotate: 5, width: 210 },
  { id: "c15", kind: "paper", title: "Machine Learning Approaches for Fault Diagnosis in Induction Motors", byline: "Springer Link", tag: "Springer Link", top: 80, left: 72, rotate: -3, width: 230 },
  { id: "c16", kind: "paper", title: "Graphene-Based Composites for Structural Applications", byline: "RSC Advances", tag: "RSC Advances", top: 90, left: 68, rotate: 4, width: 230 },
  { id: "c17", kind: "paper", title: "Behaviour of High Performance Concrete Under Elevated Temperatures", byline: "Construction & Building Materials", tag: "Construction & Building Materials", top: 78, left: 90, rotate: -5, width: 230 },
];
