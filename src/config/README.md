Panel local de contenido

Edita unicamente localAdminPanel.json para cambiar textos, imagenes, entrenadores, programas, tarifas y horarios.

Reglas rapidas:
- Mantener nombres de claves tal cual.
- Rutas de imagenes deben apuntar a /imagenes/... (archivos en public/imagenes).
- pricingPlans, schedule, trainers, trainingPrograms y carouselImages deben ser arrays.
- brand.headerLogoSrc controla el logo de la cabecera.
- brand.heroLogoSrc controla el logo grande de la pagina de inicio.
- contactPage.mapEmbedUrl define el mapa de Google embebido para la pagina /contacto.
- contactPage.phones, contactPage.email y contactPage.address se muestran en la pagina /contacto.
- pricingPlans[].imageSrc controla la imagen individual de cada tarifa.
- trainingPrograms[].href permite que cada tarjeta de entrenamiento enlace a una tarifa concreta.
- legalItems[] controla los textos legales del footer (id, title y text).
