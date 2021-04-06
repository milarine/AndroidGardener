import Realm from 'realm';
import { Plant, PlantInput, schema } from './schema';

const uid = (length: number = 15): string => {
  let str = '';
  for (let i = 1; i < length + 1; i = i + 8) {
    str += Math.random().toString(36).substr(2, 10);
  }
  return ('_' + str).substr(0, length);
};

let db: Realm;

export const openDb = async (): Promise<boolean> => {
  const realmConfig = {
    schema: schema,
    deleteRealmIfMigrationNeeded: true,
  };
  const connection = await Realm.open(realmConfig);
  db = connection;
  return true;
};

export const closeDb = (): void => db.close();

export const clearDb = (): void => {
  db.write(db.deleteAll);
};

export const savePlant = (plantToSave: Plant): void => {
  const { id, created, lastWatered, images, name } = plantToSave;
  const values = { created, lastWatered, images, name };
  let plant = id ? getPlant(id) : undefined;
  console.log('plant to save', plant);

  if (!plant) {
    plant = createPlant(values);
  }

  db.write(() => {
    Object.assign(plant, values, {
      created: new Date(values.created),
    });
  });
};

export const createPlant = (
  values: PlantInput,
): (Plant & Realm.Object) | undefined => {
  let result;
  db.write(() => {
    result = db.create<Plant>('Plant', {
      ...values,
      id: uid(),
    });
  });
  return result;
};

export const deletePlant = (id: string): void =>
  db.write(() => db.delete(getPlant(id)));

export const getPlant = (id: string): (Plant & Realm.Object) | undefined =>
  db.objectForPrimaryKey('Plant', id);

export const getPlantsSortedBy = (prop: keyof Plant): Realm.Results<Plant> => {
  return db.objects<Plant>('Plant')?.sorted(prop, true);
};
