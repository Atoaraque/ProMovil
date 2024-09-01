# 4N'4

**4N'4** es una aplicación móvil desarrollada con **Angular**, **Ionic**, y **Firebase**, diseñada para proporcionar una experiencia de compra de ropa rápida, fácil e intuitiva. Los usuarios pueden navegar por diferentes categorías de ropa, ver detalles de productos, agregar artículos al carrito y realizar compras de manera segura.

## Características

- **Navegación Intuitiva**: Fácil acceso a diversas categorías de ropa.
- **Búsqueda de Productos**: Encuentra rápidamente los productos que deseas.
- **Carrito de Compras**: Agrega y administra los productos en tu carrito de manera sencilla.
- **Pagos Seguros**: Integración con pasarelas de pago para una experiencia de compra segura.
- **Autenticación**: Registro y inicio de sesión con cuentas de Google o correo electrónico utilizando Firebase Authentication.
- **Gestión de Base de Datos**: Los productos y pedidos se manejan en tiempo real usando Firebase Firestore.

## Tecnologías Utilizadas

- **Angular**: Framework de frontend para la creación de interfaces de usuario dinámicas.
- **Ionic**: Framework de desarrollo híbrido para aplicaciones móviles.
- **Firebase**: Plataforma backend para autenticación, base de datos en tiempo real, y notificaciones push.

## Requisitos Previos

- Node.js v14 o superior
- Angular CLI
- Ionic CLI
- Cuenta de Firebase

## Instalación

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/tuusuario/clothes-shop.git
   cd clothes-shop
   ```

4. **Ejecutar la Aplicación**

   Para ejecutar la aplicación en el navegador:

   ```bash
   ionic serve
   ```

   Para compilar y ejecutar en un dispositivo:

   ```bash
   ionic build
   ionic cap add android
   ionic cap open android
   ```

## Despliegue

La aplicación se puede desplegar en Firebase Hosting o en cualquier servidor que soporte aplicaciones web modernas. Para desplegar en Firebase Hosting:

```bash
npm run build
firebase deploy
```
