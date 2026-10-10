"use client";
import React from "react";
import { ProjectPreview } from "@webprodigies/flute/preview";
import { sceneModules } from "./catalog";
// Host-owned development flag: no process, Vite or Electron globals in this adapter.
export function FluteProjectPreview({ children, enabled, active, ...props }) {
  if (!enabled) return children;
  return <ProjectPreview {...props} projectId="62545f77-51bd-458b-9253-93c8c3af6d05" enabled={enabled} active={active} sceneModules={sceneModules}>{children}</ProjectPreview>;
}
