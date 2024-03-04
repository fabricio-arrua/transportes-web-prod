import React from "react";
import { createRoot } from "react-dom/client";
import Rutas from './routes/Rutas';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <Rutas />
);