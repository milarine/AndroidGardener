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

  if (!values.gardenId) {
    console.error(
      `Failed to add plant ${values.name} to garden ${values.gardenId}`,
    );
    return undefined;
  }

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
  let result: Garden & Realm.Object;
  const newGardenId = uid();

  db.write(() => {
    result = db.create<Garden>(
      Garden.schema.name, // TODO: replace all db object strings with call to schema.name
      {
        ...values,
        plants: values.plants.map((plant) => ({
          name: plant.name,
          lastWatered: plant.lastWatered,
          images: plant.images.map((img) => ({
            uri: img.uri,
            id: img.id || uid(),
            date: new Date(),
          })),
          id: plant.id || uid(),
          created: new Date(),
        })),
        created: new Date(),
        id: newGardenId,
      },
      Realm.UpdateMode.Modified,
    );
  });
  result.plants.map((plant) =>
    plant.garden.forEach((garden) => {
      if (garden && garden.id !== newGardenId) {
        const updatedGarden = {
          id: garden.id,
          name: garden.name,
          created: garden.created,
          plants: garden.plants.filter((p) => p.id !== plant.id),
        };
        updateGarden(updatedGarden);
      }
    }),
  );
  return result;
};

export const deletePlant = (id: string): void => {
  const plant = getDbObject<Plant>(id, 'Plant');
  db.write(() => {
    db.delete(plant?.images);
    db.delete(plant);
  });
};

export const deleteImage = (id: string): void =>
  db.write(() => db.delete(getDbObject<Image>(id, 'Image')));

export const deleteGarden = (id: string): void => {
  const garden = getDbObject<Garden>(id, 'Garden');
  garden?.plants.forEach((p) => deletePlant(p.id));
  db.write(() => {
    db.delete(garden);
  });
};

export const getPlantsSortedBy = (prop: keyof Plant): Realm.Results<Plant> => {
  return db.objects<Plant>('Plant')?.sorted(prop, false);
};

export const getGardens = (): Realm.Results<Garden> => {
  return db.objects<Garden>('Garden');
};

export const getPlants = (): Realm.Results<Plant> => {
  return db.objects<Plant>('Plant');
};

export const getImages = (): Realm.Results<Image> => {
  return db.objects<Image>('Image');
};

export const getDbObject = <T>(
  id: string,
  table: string,
): (T & Realm.Object) | undefined => db.objectForPrimaryKey<T>(table, id);

export const addImage = (plant: Plant, uri: string) => {
  db.write(() => {
    Object.assign(plant, {
      images: [...(plant.images || []), { uri, id: uid(), date: new Date() }],
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

export const movePlant = (plantId: string, gardenId: string) => {
  const plant = getDbObject<Plant>(plantId, 'Plant');
  const gardenToAdd = getDbObject<Garden>(gardenId, 'Garden');

  if (!gardenToAdd) {
    throw new Error(
      `Cannot move plant ${plantId} to garden ${gardenId}. Garden does not exist.`,
    );
  }

  if (!plant) {
    throw new Error(
      `Cannot move plant ${plantId} to garden ${gardenId}. Plant does not exist.`,
    );
  }

  db.write(() => {
    gardenToAdd.plants = [...gardenToAdd?.plants, plant];
  });

  plant.garden.forEach((garden) => {
    if (garden && garden.id !== gardenId) {
      db.write(() => {
        garden.plants = garden.plants.filter((p) => p.id !== plant.id);
      });
    }
  });
};
