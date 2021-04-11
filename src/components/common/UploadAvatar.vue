<template>
  <div class="mb-3">
    <label for="formFile" class="form-label">Upload avatar (optional)</label>
    <input
      class="form-control form-control-sm"
      type="file"
      @change="handleFile"
    />
    <!-- uploading progress -->
    <progress-bar :value="uploadProgress" v-show="uploading" />
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
      uploading: false,
    };
  },
  methods: {
    async handleFile(e) {
      const file = e.target.files[0];
      try {
        this.uploading = true;
        const uploadTask = await uploadAvatar(file);
        this.uploadProgress = uploadTask.bytesTransferred;
        const avatarsRef = appStorage.storageRef.child(`avatar/${file.name}`);
        avatarsRef.getDownloadURL().then((downloadURL) => {
          this.$emit("uploaded", downloadURL);
        });
      } catch (err) {
        this.uploading = false;
        this.$emit("err", err);
      }
    },
  },
};
</script>

<style>
</style>