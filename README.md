# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Formulario de contacto con Formspree

El formulario envia los datos directamente a Formspree desde frontend.

Pasos:

1. Crea un formulario en Formspree.
2. Copia tu endpoint (por ejemplo `https://formspree.io/f/xxxxabcd`).
3. En `src/config/localAdminPanel.json`, asigna ese valor en `contactPage.formspreeEndpoint`.
4. Vuelve a desplegar.

Si `contactPage.formspreeEndpoint` esta vacio, el formulario mostrara un error de configuracion al enviar.
