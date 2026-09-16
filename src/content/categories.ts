export type CategoryId = "retratos" | "street" | "deportiva" | "comercial";

export interface Category {
  id: CategoryId;
  /** Nav/filter label. */
  label: string;
  /** Short tagline shown under the category name in the gallery. */
  tagline: string;
}

export const categories: Category[] = [
  {
    id: "retratos",
    label: "Retratos",
    tagline: "Retratos naturales, sin poses forzadas.",
  },
  {
    id: "street",
    label: "Street / Documental",
    tagline: "Fotografia documental en Bogota y en el mundo.",
  },
  {
    id: "deportiva",
    label: "Deportiva",
    tagline: "Accion y movimiento en el momento justo.",
  },
  {
    id: "comercial",
    label: "Comercial",
    tagline: "Fotografia de producto y espacios para restaurantes y negocios.",
  },
];
