<template>
  <div class="mb-3">
    <label for="formFile" class="form-label mb-0"
      >Upload avatar (optional)</label
    >
    <input
      id="formFile"
      class="form-control form-control-sm"
      type="file"
      @change="handleFile"
    />
    <!-- uploading progress -->
    <progress-bar :value="uploadProgress" v-show="uploading" />
  </div>
</template>

<script>
import { storage, uploadAvatar } from "../../store/storage";
import ProgressBar from "../common/ProgressBar";

export default {
  name: "UploadAvatar",
  components: {
    ProgressBar,
  },
  data() {
    return {
      uploadProgress: 10,
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
        const avatarsRef = storage.ref().child(`avatar/${file.name}`);
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