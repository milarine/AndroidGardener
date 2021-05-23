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

export const createPlant = (values: PlantDto): void => {
  const plant: Plant = {
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

  const garden = getDbObject<Garden>(values.gardenId, Garden.schema.name);
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
};

export const createGarden = (
  values: GardenDto,
): (Garden & Realm.Object) | undefined => {
  let result: (Garden & Realm.Object) | undefined;
  const newGardenId = uid();

  db.write(() => {
    result = db.create<Garden>(
      Garden.schema.name,
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

    result.plants.map((plant) =>
      plant.garden?.forEach((garden) => {
        if (garden && garden.id !== newGardenId) {
          garden.plants = garden.plants.filter((p) => p.id !== plant.id);
        }
      }),
    );
  });

  return result;
};

export const deletePlant = (id: string): void => {
  const plant = getDbObject<Plant>(id, Plant.schema.name);
  plant?.removeAllListeners();
  const imageIds = plant?.images?.map((image) => image.id);

  db.write(() => {
    db.delete(plant);
  });

  imageIds?.forEach((imageId) => deleteImage(imageId));
};

export const deleteImage = (id: string): void => {
  const image = getDbObject<Image>(id, Image.schema.name);
  image?.removeAllListeners();
  db.write(() => db.delete(image));
};

export const deleteGarden = (id: string): void => {
  const garden = getDbObject<Garden>(id, Garden.schema.name);
  garden?.removeAllListeners();
  garden?.plants.forEach((p) => deletePlant(p.id));
  db.write(() => {
    db.delete(garden);
  });
};

export const addImage = (plant: Plant, uri: string) => {
  db.write(() => {
    Object.assign(plant, {
      images: [...(plant.images || []), { uri, id: uid(), date: new Date() }],
    });
  });
};

export const waterPlant = (plantId: string, date?: Date) => {
  const plant = getDbObject<Plant>(plantId, Plant.schema.name);
  db.write(() => {
    Object.assign(plant, {
      lastWatered: date ?? new Date(),
    });
  });
};

export const movePlant = (plantId: string, gardenId: string) => {
  const plant = getDbObject<Plant>(plantId, Plant.schema.name);
  const gardenToAdd = getDbObject<Garden>(gardenId, Garden.schema.name);

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

  plant.garden?.forEach((garden) => {
    if (garden && garden.id !== gardenId) {
      db.write(() => {
        garden.plants = garden.plants.filter((p) => p.id !== plant.id);
      });
    }
  });
};

export const renamePlant = (plantId: string, value: string) => {
  const plant = getDbObject<Plant>(plantId, Plant.schema.name);
  if (plant !== undefined) {
    db.write(() => {
      plant.name = value;
    });
  }
};

export const renameGarden = (gardenId: string, value: string) => {
  const garden = getDbObject<Garden>(gardenId, Garden.schema.name);
  if (garden !== undefined) {
    db.write(() => {
      garden.name = value;
    });
  }
};

export const getPlantsSortedBy = (prop: keyof Plant): Realm.Results<Plant> => {
  return getPlants().sorted(prop, false);
};

export const getGardens = (): Realm.Results<Garden> => {
  return db.objects<Garden>(Garden.schema.name);
};

export const getPlants = (): Realm.Results<Plant> => {
  return db.objects<Plant>(Plant.schema.name);
};

export const getImages = (): Realm.Results<Image> => {
  return db.objects<Image>(Image.schema.name);
};

export const getPlant = (plantId: string): Plant | undefined => {
  return getDbObject<Plant>(plantId, Plant.schema.name);
};

export const getDbObject = <T>(
  id: string,
  table: string,
): (T & Realm.Object) | undefined => db.objectForPrimaryKey<T>(table, id);
