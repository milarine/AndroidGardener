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

export const savePlant = ({ id, ...values }: Plant): void => {
  let plant = id ? getPlant(id) : undefined;
  if (!plant) {
    plant = createPlant(values);
  }

  db.write(() => {
    Object.assign(plant, values, {
      created: new Date(values.created),
    });
  });
};

export const createPlant = (values: PlantInput): Plant | undefined => {
  db.write(() => {
    return db.create('Plant', {
      ...values,
      id: uid(),
      created: new Date(values.created),
    });
  });
  return undefined;
};

export const deletePlant = (id: string): void =>
  db.write(() => db.delete(getPlant(id)));

export const getPlant = (id: string): Plant | undefined =>
  db.objectForPrimaryKey('Plant', id);
