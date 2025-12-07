"use client"

import { createContext } from "react";

// * ================ PROFILE ================
const profileContext = createContext<any>(null);

// * NAVBAR
const creatorContext = createContext<any>(null)

// * SIDEBAR
const categoryContext = createContext<any>(null);
const creatorsContext = createContext<any>(null);

export { profileContext, creatorContext, categoryContext, creatorsContext };
