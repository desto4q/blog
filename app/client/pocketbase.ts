import PocketBase from "pocketbase";

export let createClient = () => {
  let db = new PocketBase("http://localhost:8090");
  return db;
};


export let staticDb = new PocketBase("http://localhost:8090");
