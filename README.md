# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# SBA_320H


The intention of the web aplication is to allow users to lookup definition to word as they come across them, they will be able to save and favorite them, so they can find it later so they can practice using the words and expand their vocab. 

import React from 'react';
import { UserProvider, useUser } from './auth/UserContext';
import CreateAccount from './auth/CreateAccount';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Profile from './auth/Profile';
import definition from "./components/definition";
import './App.css';
import axios from "axios";

Hook for User Information: get information about the current user 

Render Tab Content: render content of active tab

