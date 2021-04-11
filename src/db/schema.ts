export class Plant {
  static schema = {
    name: 'Plant',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      images: 'string[]', // the URI to the file
      lastWatered: 'date',
      created: 'date',
    },
  };

  public id: string;
  public name: string;
  public images: string[]; // the URI to the file
  public lastWatered: Date;
  public created: Date;

  constructor(
    name: string,
    images: string[],
    lastWatered: Date,
    created: Date,
    id: string,
  ) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.lastWatered = lastWatered;
    this.created = created;
  }
}

export const schema = [Plant];

export interface PlantInput {
  name: string;
  images: string[]; // the URI to the file
  lastWatered: Date;
  created: Date;
}
