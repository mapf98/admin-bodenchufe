<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-card-text class="headline text-center">{{
          userPhotoTextTitle
        }}</v-card-text>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col class="text-center">
        <v-avatar size="170" color="white" class="flex-wrap">
          <v-icon size="200" v-if="!agregado">mdi-account</v-icon>
          <v-img :src="image" v-if="agregado" contain></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-file-input
        :placeholder="userPhotoTextInput"
        prepend-icon="mdi-camera"
        accept="image/*"
        class="mx-5"
        @change="previewImage"
      ></v-file-input>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class SignUpPhoto extends Vue {
  loading = false;
  userPhotoTextTitle = "Choose your profile picture";
  userPhotoTextInput = "Pick a image";
  image = "";
  userPhoto: any;
  agregado = false;

  previewImage(event: any) {
    if (event) {
      const files = event || event.dataTransfer.files;
      this.userPhoto = files;
      this.createImg(files);
      this.$emit("imageFiles", files);
    } else {
      this.agregado = false;
    }
  }

  createImg(file: any) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
    this.agregado = true;
  }
}
</script>
