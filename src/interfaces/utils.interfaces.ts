import { PrismaClient } from "@prisma/client";

// FilterNotStartingWith -> filtra todos os atributos que não comecem com uma certa string:
// Exemplo: "FilterNotStartingWith<keyof PrismaClient, "$">;"
// Nesse exemplo, ele irá filtrar por todas as propriedades que não comece com "$"
// Exemplo em JS do que o filtro abaixo está fazendo:
// const filter = (t: string, k: string) => {
//   if(t.startsWith(k) | t === symbol) {}
//   return t
// }
type FilterNotStartingWith<T, K extends string> = T extends
  | `${K}${infer _X}`
  | symbol
  ? never
  : T;

// UnionToIntersection -> converter os tipos de "união" (|) para "interseção" (&).
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I
) => void
  ? I
  : never;

type PrismaClientKeys = FilterNotStartingWith<keyof PrismaClient, "$">;
type PrismaClientGeneric = UnionToIntersection<PrismaClient[PrismaClientKeys]>;

type DynamicParamsIdFinder = {
  searchKey: string;
  error: string;
  model: PrismaClientKeys;
};

export { DynamicParamsIdFinder, PrismaClientGeneric };