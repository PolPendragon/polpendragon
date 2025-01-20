window.onload = () => {
    let downloaded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", async (e) => {
        if (!downloaded) {
            const west = e.detail.position.longitude - 0.05,
                  east = e.detail.position.longitude + 0.05,
                  south = e.detail.position.latitude - 0.05;
                  north = e.detail.position.latitude + 0.05;
            console.log(`${west} ${south} ${east} ${north}`);

            const response = await fetch(`https://hikar.org/webapp/map?bbox=${west},${south},${east},${north}&layers=poi&outProj=4326`);
            const pois = await response.json();

            pois.features.forEach(feature => {
                const compoundEntity = document.createElement("a-entity");
                compoundEntity.setAttribute("gps-new-entity-place", {
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0]
                });

                // Crear el cilindro
                const cylinder = document.createElement("a-cylinder");
                cylinder.setAttribute("geometry", {
                    radius: 10, // Radio del cilindro
                    height: 50  // Altura del cilindro
                });
                cylinder.setAttribute("material", { color: "blue" }); // Color del cilindro
                cylinder.setAttribute("position", {
                    x: 0,
                    y: 25, // Altura inicial para centrar el cilindro
                    z: 0
                });

                // Crear el texto
                const text = document.createElement("a-text");
                const textScale = 100;
                text.setAttribute("look-at", "[gps-new-camera]");
                text.setAttribute("scale", {
                    x: textScale,
                    y: textScale,
                    z: textScale
                });
                text.setAttribute("value", feature.properties.name);
                text.setAttribute("align", "center");

                // Añadir el cilindro y el texto a la entidad compuesta
                compoundEntity.appendChild(cylinder);
                compoundEntity.appendChild(text);

                // Añadir la entidad compuesta a la escena
                document.querySelector("a-scene").appendChild(compoundEntity);
            });
        }
        downloaded = true;
    });
};
