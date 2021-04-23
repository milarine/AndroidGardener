import Realm from 'realm';

import { uid } from 'utils';

import { Plant, PlantDto, Image, Garden, GardenDto } from './schema';

let db: Realm;

export const openDb = async (): Promise<boolean> => {
  const schema = [Garden, Plant, Image];
  const realmConfig: Realm.Configuration = {
    schema: schema,
    schemaVersion: 2,
  };
  const connection = await Realm.open(realmConfig);
  db = connection;
  return true;
};

export const closeDb = (): void => db.close();

// export const clearDb = (): void => {
//   db.write(db.deleteAll);
// };

export const updatePlant = (plantToSave: Plant): void => {
  const { id, created, lastWatered, images, name } = plantToSave;
  const values = { created, lastWatered, images, name };
  const plant = getDbObject<Plant>(id, 'Plant');
  db.write(() => {
    Object.assign(plant, values);
  });
};

export const updateGarden = (gardenToSave: Garden): void => {
  const { id, created, name, plants } = gardenToSave;
  const values = { created, name, plants };
  const garden = getDbObject<Garden>(id, 'Garden');
  console.log('values to save for garden: ', values);
  console.log('garden: ', garden?.name);

  db.write(() => {
    Object.assign(garden, values);
  });
};

export const createPlant = (
  values: PlantDto,
): (Plant & Realm.Object) | undefined => {
  let result;
  const plant = {
    ...values,
    created: new Date(),
    images: values.images.map((img) => ({
      ...img,
      id: uid(),
      date: new Date(),
    })),
    id: uid(),
  };
  const garden = getDbObject<Garden>(values.gardenId, 'Garden');
  if (!garden) {
    console.error(
      `Failed to add plant ${values.name} to garden ${values.gardenId}`,
    );
    return undefined;
  }
  const { plants } = garden;

  db.write(() => {
    garden.plants = [...plants, plant];
  });
  return result;
};

export const createGarden = (
  values: GardenDto,
): (Garden & Realm.Object) | undefined => {
  let result;

  db.write(() => {
    result = db.create<Garden>('Garden', {
      ...values,
      plants: values.plants.map((plant) => ({
        ...plant,
        images: plant.images.map((img) => ({
          ...img,
          id: uid(),
          date: new Date(),
        })),
        id: uid(),
        created: new Date(),
      })),
      created: new Date(),
      id: uid(),
    });
  });
  return result;
};

export const deletePlant = (id: string): void =>
  db.write(() => db.delete(getDbObject<Plant>(id, 'Plant')));

export const deleteImage = (id: string): void =>
  db.write(() => db.delete(getDbObject<Image>(id, 'Image')));

export const deleteGarden = (id: string): void =>
  db.write(() => db.delete(getDbObject<Garden>(id, 'Garden')));

export const getPlantsSortedBy = (prop: keyof Plant): Realm.Results<Plant> => {
  return db.objects<Plant>('Plant')?.sorted(prop, false);
};

export const getGardens = (): Realm.Results<Garden> => {
  return db.objects<Garden>('Garden');
};

export const getDbObject = <T>(
  id: string,
  table: string,
): (T & Realm.Object) | undefined => db.objectForPrimaryKey<T>(table, id);

export const addImage = (plant: Plant, uri: string) => {
  db.write(() => {
    Object.assign(plant, {
      images: [...plant.images, { uri, id: uid(), date: new Date() }],
    });
  });
};

export const waterPlant = (plantId: string, date?: Date) => {
  const plant = getDbObject<Plant>(plantId, 'Plant');
  db.write(() => {
    Object.assign(plant, {
      lastWatered: date ?? new Date(),
    });
  });
};
