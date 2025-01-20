window.onload = () => {
    let cylinderCreated = false;

    const camera = document.querySelector("[gps-new-camera]");

    camera.addEventListener("gps-camera-update-position", (e) => {
        if (!cylinderCreated) {
            const { latitude, longitude } = e.detail.position;

            // Calcular la posición 1 metro al norte
            const northLatitude = latitude + 0.000009; // ~1 metro en coordenadas de latitud

            // Crear el cilindro
            const cylinderEntity = document.createElement("a-entity");
            cylinderEntity.setAttribute("gps-new-entity-place", {
                latitude: northLatitude,
                longitude: longitude
            });
            cylinderEntity.setAttribute("geometry", {
                primitive: "cylinder",
                height: 2,
                radius: 0.5
            });
            cylinderEntity.setAttribute("material", { color: "blue" });
            cylinderEntity.setAttribute("scale", "1 1 1");

            // Añadir el cilindro a la escena
            document.querySelector("a-scene").appendChild(cylinderEntity);

            // Marcar como creado para evitar duplicados
            cylinderCreated = true;
        }
    });
};
