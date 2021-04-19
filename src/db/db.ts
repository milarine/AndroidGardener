import Realm from 'realm';

import { Plant, PlantDto, Image, schema, Garden, GardenDto } from './schema';

export const uid = (length: number = 15): string => {
  let str = '';
  for (let i = 1; i < length + 1; i = i + 8) {
    str += Math.random().toString(36).substr(2, 10);
  }
  return ('_' + str).substr(0, length);
};

let db: Realm;

export const openDb = async (): Promise<boolean> => {
  const realmConfig: Realm.Configuration = {
    schema: schema,
    schemaVersion: 2,
  };
  const connection = await Realm.open(realmConfig);
  db = connection;
  return true;
};

export const closeDb = (): void => db.close();

export const clearDb = (): void => {
  db.write(db.deleteAll);
};

export const updatePlant = (plantToSave: Plant): void => {
  const { id, created, lastWatered, images, name } = plantToSave;
  const values = { created, lastWatered, images, name };
  const plant = getPlant(id);
  console.log('plant to update', plant);

  db.write(() => {
    Object.assign(plant, values);
  });
};

export const createPlant = (
  values: PlantDto,
): (Plant & Realm.Object) | undefined => {
  let result;
  db.write(() => {
    result = db.create<Plant>('Plant', {
      ...values,
      created: new Date(),
      images: values.images.map((img) => ({
        ...img,
        id: uid(),
        date: new Date(),
      })),
      id: uid(),
    });
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
  db.write(() => db.delete(getPlant(id)));

export const deleteImage = (id: string): void =>
  db.write(() => db.delete(getImage(id)));

export const getImage = (id: string): (Image & Realm.Object) | undefined =>
  db.objectForPrimaryKey<Image>('Image', id);

export const getPlant = (id: string): (Plant & Realm.Object) | undefined =>
  db.objectForPrimaryKey<Plant>('Plant', id);

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

// export const getPlantsOfGardenSortedBy = (
//   gardenId: string | undefined,
//   prop: keyof Plant,
// ): Plant[] => {
//   return gardenId
//     ? db
//         .objectForPrimaryKey<Garden>('Garden', gardenId)
//         ?.plants?.sort((plant1, plant2) => {
//           return 1;
//         }) || []
//     : [];
// };

// export const getDefaultGarden = (): (Garden & Realm.Object) | undefined => {
//   const gardens = db.objects<Garden>('Garden');
//   if (gardens && gardens.length > 0) {
//     return gardens[0];
//   }
//   let newGarden;
//   const plants = getPlantsSortedBy('id');
//   db.write(() => {
//     newGarden = db.create<Garden>('Garden', {
//       created: new Date(),
//       id: uid(),
//       name: 'Your first garden',
//       plants: plants.map((plant) => plant),
//     });
//   });
//   return newGarden;
// };

export const addImage = (plant: Plant, uri: string) => {
  db.write(() => {
    Object.assign(plant, {
      images: [...plant.images, { uri, id: uid(), date: new Date() }],
    });
  });
};

export const waterPlant = (plantId: string, date?: Date) => {
  const plant = getPlant(plantId);
  db.write(() => {
    Object.assign(plant, {
      lastWatered: date ?? new Date(),
    });
  });
};
