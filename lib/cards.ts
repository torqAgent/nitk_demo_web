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
  { id: "c1", kind: "book", title: "Introduction to Algorithms", byline: "Cormen, Leiserson, Rivest, Stein", tag: "First Floor · Stacks", top: 6, left: 4, rotate: -6, width: 200 },
  { id: "c3", kind: "book", title: "Linear Algebra and Its Applications", byline: "Gilbert Strang", tag: "First Floor · Stacks", top: 30, left: 20, rotate: -3, width: 200 },
  { id: "c8", kind: "book", title: "Organic Chemistry", byline: "Clayden, Greeves, Warren", tag: "First Floor · Stacks", top: 60, left: 4, rotate: 4, width: 200 },
  { id: "c11", kind: "book", title: "Mechanics of Materials", byline: "Beer, Johnston", tag: "First Floor · Stacks", top: 82, left: 20, rotate: -4, width: 190 },

  { id: "c5", kind: "book", title: "Probability and Statistics for Engineers", byline: "Miller, Freund", tag: "Miller, Freund", top: 6, left: 76, rotate: -4, width: 210 },
  { id: "p1", kind: "paper", title: "Graphene Oxide-Polysulfone Mixed Matrix Membrane", byline: "Ganesh, Isloor, Ismail — NITK Chemistry", tag: "Desalination, 2013", top: 28, left: 78, rotate: 5, width: 220 },
  { id: "p2", kind: "paper", title: "Polysulfone UF Membranes with CaCO3 Nanoparticles", byline: "Nair, Isloor, Kumar, Ismail — NITK Chemistry", tag: "Desalination, 2013", top: 52, left: 82, rotate: -3, width: 210 },
  { id: "p3", kind: "paper", title: "TiO2 Nanotube Incorporated PSf/CS Blend Membranes", byline: "Kumar, Isloor, Ismail — NITK Chemistry", tag: "Desalination, 2013", top: 76, left: 80, rotate: 4, width: 220 },
];