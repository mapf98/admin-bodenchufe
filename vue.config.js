module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "BODEnchufe",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW"
    //workboxPluginMode: "InjectManifest",
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: "dev/sw.js"
    //   // ...other Workbox options...
    // }

    //Si se quiere hacer el uso de PWA tienes que seguir los siguientes pasos:
    // 1) Primero hay que hacer npm run build
    // 2) Nos movemos al dist con => cd dist
    // 3) Servimos el proyecto con => npx serve
    // $) Abrimos en la url proporcionada y probamos

    //IMPORTANTE, EN ESTOS CASOS REVISAR SE GUARDA EL CACHE, SI HAY PROBLEMAS SE DEBE BORRAR EL CACHE DEL NAVEGADOR!
  }
};
