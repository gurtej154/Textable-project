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
  //console.error('putDb not implemented');
  console.log("PUT to the database");

  // Created a connection to the database database and version we want to use.
  const textDB = await openDB("jate", 1);

  // Created a new transaction and specify the database and data privileges.
  const tx = textDB.transaction("jate", "readwrite");
  console.log("aaa");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  console.log("bb");
  const objects = await store.getAll();
  console.log("objects", objects);
  const contenttoWrite =
    objects.length > 0
      ? { content: content, id: objects[0].id }
      : { content: content };

  const request = await store.put(contenttoWrite);

  // Use the .put() method on the store and pass in the content.
  // const request = store.put({id: id, value:content});

  // Get confirmation of the request.
  const result = await request;
  console.log("Data has been saved to database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //console.error('getDb not implemented');
  console.log("GET from the database Test");
  console.log("before opendb");
  //creating connection to datav=base and version we want to use
  const textDB = await openDB("jate", 1);
  console.log("before transaction");
  //creating a new transaction and specify the db and data privileges
  const tx = textDB.transaction("jate", "readonly");
  console.log("after transaction");
  //open up the desired object store
  const store = tx.objectStore("jate");

  // Used the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
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
