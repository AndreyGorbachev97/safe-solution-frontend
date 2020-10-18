<template>
  <div>
    <input id="fileInput" type="file" style="display: none" @change="processFiles()" />
    <v-btn outlined rounded class="ml-2" depressed color="primary" @click="showFileInput()">
      Загрузить документ
      <v-icon right dark>mdi-file-find</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ImportFileTxt",
  props: {
    addFile: Function,
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    ...mapActions(["uploadFile"]),
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    showFileInput() {
      let fileInput = document.getElementById("fileInput");
      fileInput.click();
    },
    async processFiles() {
      const dataFile = new FormData();
      const fileName =
        Math.floor(Date.now() / 1000) +
        "_" +
        document.getElementById("fileInput").files[0].name;
      dataFile.append(
        "file",
        document.getElementById("fileInput").files[0],
        fileName
      );
      this.addFile(dataFile);
    },
  },
};
</script>