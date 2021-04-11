import store from "../firebase";

// fun[0] uploading tasks
export const uploadAvatar = (file, meta) => {
  const avatarsRef = store.storage.ref().child(`avatar/${file.name}`);
  const metadata = {
    contentType: file.type
  };
  // Upload the file and metadata
  return avatarsRef.put(file, { ...metadata, ...meta });
};

export default {
  storage: store.storage,
  storageRef: store.storage.ref()
};
