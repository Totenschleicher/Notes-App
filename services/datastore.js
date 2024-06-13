import Datastore from "@seald-io/nedb";

// eslint-disable-next-line import/prefer-default-export
export const db = new Datastore({ filename: "./datafile", autoload: true });
