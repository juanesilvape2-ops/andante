export interface Shot {
  file: string;
  note: string;
  /** Native width / height. Drives the justified row so nothing is cropped. */
  ratio: number;
  w: number;
  h: number;
}

/** Rows are laid out justified: each frame grows in proportion to its own
 *  aspect ratio, so portraits stay portrait and landscapes stay landscape. */
export const modaRows: Shot[][] = [
  [
    {
      file: "moda_01.jpg",
      h: 1350,
      note: "Retrato en exteriores, luz de tarde",
      ratio: 0.8,
      w: 1080,
    },
    { file: "moda_02.jpg", h: 1350, note: "Editorial, luz disponible", ratio: 0.8, w: 1080 },
    { file: "moda_03.jpg", h: 1350, note: "Retrato, direccion sencilla", ratio: 0.8, w: 1080 },
  ],
  [
    { file: "moda_04.jpg", h: 1350, note: "Editorial, campo abierto", ratio: 0.8, w: 1080 },
    { file: "moda_05.jpg", h: 1350, note: "Retrato, luz de tarde", ratio: 0.8, w: 1080 },
  ],
];

export const calleRows: Shot[][] = [
  [
    { file: "casual_01.jpg", h: 2000, note: "Bogota, escaleras", ratio: 0.75, w: 1500 },
    { file: "casual_02.jpg", h: 1125, note: "Costa del Mar del Norte", ratio: 1.778, w: 2000 },
  ],
  [
    { file: "casual_03.jpg", h: 1125, note: "Contraluz, playa", ratio: 1.778, w: 2000 },
    { file: "casual_05.jpg", h: 2000, note: "Serie Margenes", ratio: 0.75, w: 1500 },
  ],
  [{ file: "casual_04.jpg", h: 1125, note: "Serie Margenes", ratio: 1.778, w: 2000 }],
];
