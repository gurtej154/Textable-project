import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");

  const textDB = await openDB("jate", 1);

  const tx = textDB.transaction("jate", "readwrite");
  console.log("aaa");
  const store = tx.objectStore("jate");
  console.log("bb");
  const objects = await store.getAll();
  console.log("objects", objects);
  const contenttoWrite =
    objects.length > 0
      ? { content: content, id: objects[0].id }
      : { content: content };

  const request = await store.put(contenttoWrite);

  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database Test");
  console.log("before opendb");
  const textDB = await openDB("jate", 1);
  console.log("before transaction");
  const tx = textDB.transaction("jate", "readonly");
  console.log("after transaction");
  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  if (result.length > 0) {
    console.log("result.value", result);
    console.log(result[0].content);
    return result[0].content;
  } else {
    return null;
  }
};

initdb();
