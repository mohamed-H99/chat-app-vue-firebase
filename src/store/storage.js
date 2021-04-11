import store from "../firebase";

const { storage } = store;

// fun[0] uploading tasks
export const uploadAvatar = (file, meta) => {
  const avatarsRef = storage.ref().child(`avatar/${file.name}`);
  const metadata = {
    contentType: file.type,
  };
  // Upload the file and metadata
  return avatarsRef.put(file, { ...metadata, ...meta });
};

export { storage };
