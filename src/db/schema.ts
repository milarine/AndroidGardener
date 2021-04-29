export class Garden {
  static schema: Realm.ObjectSchema = {
    name: 'Garden',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      plants: 'Plant[]',
      created: 'date',
    },
  };

  public id: string;
  public name: string;
  public plants: Realm.List<Plant>;
  public created: Date;

  // constructor(id: string, name: string, created: Date, plants: Plant[]) {
  //   this.id = id;
  //   this.name = name;
  //   this.created = created;
  //   this.plants = plants;
  // }
}

export class Plant {
  static schema: Realm.ObjectSchema = {
    name: 'Plant',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      images: 'Image[]',
      lastWatered: 'date',
      created: 'date',
      garden: {
        type: 'linkingObjects',
        objectType: 'Garden',
        property: 'plants',
      },
    },
  };

  public id: string;
  public name: string;
  public images: Realm.List<Image>;
  public lastWatered: Date;
  public created: Date;
  public garden: Realm.Results<Garden>;

  // constructor(
  //   name: string,
  //   images: Image[],
  //   lastWatered: Date,
  //   created: Date,
  //   id: string,
  // ) {
  //   this.id = id;
  //   this.name = name;
  //   this.images = images;
  //   this.lastWatered = lastWatered;
  //   this.created = created;
  // }
}

export class Image {
  static schema: Realm.ObjectSchema = {
    name: 'Image',
    primaryKey: 'id',
    properties: {
      id: 'string',
      uri: 'string',
      date: 'date',
      plant: {
        type: 'linkingObjects',
        objectType: 'Plant',
        property: 'images',
      },
    },
  };

  public id: string;
  public uri: string;
  public date: Date;
  public plant: Realm.Results<Plant>;

  // constructor(id: string, uri: string, date: Date) {
  //   this.id = id;
  //   this.uri = uri;
  //   this.date = date;
  // }
}

export interface ImageDto {
  uri: string;
  id?: string;
}

export interface PlantDto {
  name: string;
  images: ImageDto[];
  lastWatered: Date;
  created: Date;
  gardenId?: string;
  id?: string;
}

export interface GardenDto {
  name: string;
  plants: PlantDto[];
}
