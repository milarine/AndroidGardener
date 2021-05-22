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

  public id!: string;
  public name!: string;
  public plants!: Realm.List<Plant>;
  public created!: Date;
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

  public id!: string;
  public name!: string;
  public images!: Realm.List<Image>;
  public lastWatered!: Date;
  public created!: Date;
  public garden!: Realm.Results<Garden>;
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

  public id!: string;
  public uri!: string;
  public date!: Date;
  public plant!: Realm.Results<Plant>;
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
