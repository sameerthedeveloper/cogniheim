"use client";
import { Surface } from "@webprodigies/flute";
import Home from "../../../app/page";

// The whole live homepage as one surface; the camera does the travelling.
// The surface carries the site's own paper background — the stage is black.
export default function CogniheimTour() {
  return (
    <Surface id="page" style={{ width: 1440, background: "var(--color-surface-3)" }}>
      {/* The project modal is position:fixed; inside the 3D surface that
                resolves against the whole (very tall) page, so pin it to the Work
                section's screenful instead. */}
            <style>{`div:has(> [role="dialog"]){position:absolute!important;inset:auto 0 auto 0!important;top:1010px!important;height:1080px!important;bottom:auto!important}`}</style>
      <Home />
    </Surface>
  );
}
