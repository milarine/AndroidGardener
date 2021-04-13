export class Plant {
  static schema = {
    name: 'Plant',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      images: 'Image[]',
      lastWatered: 'date',
      created: 'date',
    },
  };

  public id: string;
  public name: string;
  public images: Image[];
  public lastWatered: Date;
  public created: Date;

  constructor(
    name: string,
    images: Image[],
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

export class Image {
  static schema = {
    name: 'Image',
    primaryKey: 'id',
    properties: {
      id: 'string',
      uri: 'string',
      date: 'date',
    },
  };

  public id: string;
  public uri: string;
  public date: Date;

  constructor(id: string, uri: string, date: Date) {
    this.id = id;
    this.uri = uri;
    this.date = date;
  }
}

export const schema = [Plant, Image];

export interface ImageDto {
  uri: string;
}

export interface PlantDto {
  name: string;
  images: ImageDto[];
  lastWatered: Date;
  created: Date;
}
