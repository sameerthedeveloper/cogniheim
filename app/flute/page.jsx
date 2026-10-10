import React from "react";
import { notFound } from "next/navigation";
import FluteStudio from "../../src/flute/Studio";
export default function FlutePage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <><meta name="flute-project" content="62545f77-51bd-458b-9253-93c8c3af6d05" /><FluteStudio /></>;
}
