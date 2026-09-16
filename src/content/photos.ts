import type { CategoryId } from "@/content/categories";

export interface Photo {
  id: string;
  /** Path relative to /assets/work/, e.g. "retratos/retrato_01.jpg". */
  file: string;
  category: CategoryId;
  note: string;
  /** Native width / height — drives justified layout so nothing is cropped. */
  w: number;
  h: number;
}

const w = (file: string, category: CategoryId, note: string, w: number, h: number): Photo => ({
  category,
  file,
  h,
  id: file.replace(/[./]/g, "-"),
  note,
  w,
});

/**
 * Full photo catalog, flat and tagged by category — the Gallery page filters
 * and lays this out (justified rows) per category; the Home page teaser pulls
 * a curated subset. Add new photos here as they're organized into
 * public/assets/work/<category>/.
 */
export const photos: Photo[] = [
  w("street/casual_01.jpg", "street", "Bogota, escaleras", 1500, 2000),
  w("street/casual_02.jpg", "street", "Costa del Mar del Norte", 2000, 1125),
  w("street/casual_03.jpg", "street", "Contraluz, playa", 2000, 1125),
  w("street/casual_04.jpg", "street", "Serie Margenes", 2000, 1125),
  w("street/casual_05.jpg", "street", "Serie Margenes", 1500, 2000),
  w("street/casual_06.jpg", "street", "Tren urbano, contraluz en la ventana", 2000, 1125),
  w("street/casual_07.jpg", "street", "Manos de anciano, blanco y negro", 2000, 1125),
  w("street/casual_08.jpg", "street", "Detalle de manos, luz calida", 2000, 1125),
  w("street/casual_09.jpg", "street", "Puerta del vagon, contraluz", 1125, 2000),
  w("street/casual_10.jpg", "street", "Vagon del tren, blanco y negro", 1500, 2000),
  w("street/casual_11.jpg", "street", "Plaza europea, arquitectura de fondo", 1500, 2000),
  w("street/casual_12.jpg", "street", "Anden de estacion, siluetas enfrentadas", 2000, 1125),
  w("street/casual_13.jpg", "street", "Playa del Mar del Norte, marea baja", 2000, 1125),
  w("street/casual_14.jpg", "street", "Caminata en la playa, blanco y negro", 2000, 1125),
  w("street/casual_15.jpg", "street", "Terraza de cafe, retrato candido", 2000, 1125),
  w("street/casual_16.jpg", "street", "Escaleras con grafiti, blanco y negro", 1500, 2000),
  w("street/casual_17.jpg", "street", "Arco de piedra, ciudad de fondo", 1500, 2000),

  w("deportiva/deportiva_01.jpg", "deportiva", "BMX sobre el muro, salto en el aire", 1080, 1080),

  w("comercial/comercial_01.jpg", "comercial", "Hamburguesa bajo letrero de neon", 1125, 2000),
  w("comercial/comercial_02.jpg", "comercial", "Malteadas sobre tabla de madera", 1125, 2000),
  w("comercial/comercial_03.jpg", "comercial", "Hamburguesa con tocineta, luz de estudio", 1125, 2000),
  w("comercial/comercial_04.jpg", "comercial", "Hamburguesa con cebolla crocante", 1333, 2000),
  w("comercial/comercial_05.jpg", "comercial", "Combo de hamburguesa, papas y gaseosa", 1125, 2000),
  w("comercial/comercial_06.jpg", "comercial", "Hamburguesa de pan negro, aros de cebolla", 1125, 2000),

  w("retratos/retrato_01.jpg", "retratos", "Retrato entre el follaje, camisa a cuadros", 1080, 1350),
  w("retratos/retrato_02.jpg", "retratos", "Retrato al aire libre, cielo despejado", 1080, 1350),
  w("retratos/retrato_03.jpg", "retratos", "Retrato urbano, pila de llantas", 1080, 1350),
  w("retratos/retrato_04.jpg", "retratos", "Retrato en la loma, luz dorada", 1080, 1350),
  w("retratos/retrato_05.jpg", "retratos", "Retrato al atardecer, viento en el cabello", 1080, 1350),
  w("retratos/retrato_06.jpg", "retratos", "Retrato en blanco y negro, chaqueta de cuero", 1080, 1350),
  w("retratos/retrato_07.jpg", "retratos", "Retrato frontal, callejon de ladrillo", 1080, 1350),
  w("retratos/retrato_08.jpg", "retratos", "Retrato entre pastizales, hora dorada", 1080, 1350),
  w("retratos/retrato_09.jpg", "retratos", "Retrato en la carretera, mirada de lado", 1080, 1350),
  w("retratos/retrato_10.jpg", "retratos", "Retrato apoyada en el arbol", 1080, 1350),
  w("retratos/retrato_11.jpg", "retratos", "Retrato con paleta, mirada de lado", 1080, 1350),
  w("retratos/retrato_12.jpg", "retratos", "Retrato con el cabello al viento", 1080, 1350),
  w("retratos/retrato_13.jpg", "retratos", "Retrato frontal, blanco y negro", 1080, 1350),
];

export function photosByCategory(category: CategoryId): Photo[] {
  return photos.filter((photo) => photo.category === category);
}
