export const schema = [
  {
    name: 'Plant',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      images: 'string[]', // the URI to the file
      lastWatered: 'date',
      created: 'date',
    },
  },
];

export interface PlantInput {
  name: string;
  images: string[]; // the URI to the file
  lastWatered: Date;
  created: Date;
}

export interface Plant extends PlantInput {
  id: string;
}
