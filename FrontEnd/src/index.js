import React from 'react';
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './layouts/home';
import ToDoList from './layouts/ToDo';
 
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/toDoList" element={<ToDoList />} />
      <Route path="/logout" element={<Home />} />
    </Routes>
  </BrowserRouter>
);