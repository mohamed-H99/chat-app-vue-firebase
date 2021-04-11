<template>
  <div class="mb-3">
    <label for="formFile" class="form-label">Upload avatar (optional)</label>
    <input
      class="form-control form-control-sm"
      type="file"
      @change="handleFile"
    />
    <!-- uploading progress -->
    <progress-bar :value="uploadProgress" />
  </div>
</template>

<script>
import appStorage, { uploadAvatar } from "../../store/storage";
import ProgressBar from "../common/ProgressBar";

export default {
  name: "UploadAvatar",
  components: {
    ProgressBar,
  },
  data() {
    return {
      uploadProgress: 0,
    };
  },
  methods: {
    async handleFile(e) {
      const file = e.target.files[0];
      try {
        const uploadTask = await uploadAvatar(file);
        const avatarsRef = appStorage.storageRef.child(`avatar/${file.name}`);
        avatarsRef.getDownloadURL().then((downloadURL) => {
          this.$emit("uploaded", downloadURL);
        });
        this.uploadProgress = uploadTask.bytesTransferred;
      } catch (err) {
        this.$emit("err", err);
      }
    },
  },
};
</script>

<style>
</style>