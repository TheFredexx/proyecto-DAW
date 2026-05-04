# 📚 Biblioteca de Libros - React (2º DAW)

Aplicación web desarrollada con React + Vite que consume una API REST de WordPress para mostrar un catálogo dinámico de libros.

La aplicación permite explorar, filtrar y visualizar información detallada de libros de forma interactiva y eficiente.

## Funcionalidades

### - Funcionalidades básicas

- Consumo de API REST (WordPress)
- Listado de libros en formato tarjetas
- Visualización de categorías
- Filtrado por categoría
- Manejo de estados (loading y errores)

### - Mejoras implementadas

- Buscador por título
- Página de detalle con React Router
- Paginación mediante navegación entre páginas
- Ordenación por fecha (más recientes / más antiguos)
- Diseño responsive

## Características técnicas destacadas

- Uso de hooks personalizados (useBooks, useCategories) para separar la lógica de negocio
- Implementación de debounce en la búsqueda para optimizar peticiones
- Sistema de priorización de resultados (scoring) en búsquedas
- Uso de AbortController para evitar problemas en peticiones asíncronas
- Componentes reutilizables y arquitectura modular

## Estructura del proyecto

```bash
  src/
    components/ # Componentes reutilizables
    pages/ # Páginas principales
    hooks/ # Lógica personalizada (custom hooks)
    services/ # Comunicación con la API
    utils/ # Funciones auxiliares
```
## Tecnologías utilizadas

- React
- React Router
- Vite
- Fetch API
- CSS (Flexbox y Grid)
- lucide-react (iconos)

## Cómo ejecutar el proyecto

1. Instalar dependencias:
   npm install

2. Instalar librería de iconos:
   npm install lucide-react

3. Ejecutar el proyecto:
   npm run dev

4. Abrir en el navegador:
   http://localhost:5173

## Notas

Este proyecto ha sido desarrollado como práctica para la asignatura Desarrollo Web en Entorno Cliente (DWEC), aplicando conceptos de React, consumo de APIs y gestión de estado.

Se ha puesto especial énfasis en la optimización de peticiones, la separación de responsabilidades y la construcción de una interfaz dinámica basada en datos externos.
