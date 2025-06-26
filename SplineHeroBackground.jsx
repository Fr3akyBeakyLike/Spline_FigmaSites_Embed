import React, { useEffect, useState } from 'react';
import { defineProperties } from "figma:react";

export default function SplineHeroBackground({
  // 👉 Replace this with your own Spline scene URL if needed
  splineUrl = "https://prod.spline.design/hb4oQuWlK0OqvQic/scene.splinecode",
  children,
}) {
  // 🔽 Load the Spline viewer script dynamically when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';

    // 👉 This loads the Spline viewer script – you can update the version if needed
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.13/build/spline-viewer.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative w-full h-full">
      {/* 🧊 Spline viewer renders the 3D scene as a transparent fullscreen background */}
      <spline-viewer
        // 👉 You can override this URL via props or inside Figma Sites
        url={splineUrl}
        background="transparent"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* ✨ Optional: add any foreground content here */}
      {children && (
        <div className="relative z-10 pointer-events-auto w-full h-full">
          {children}
        </div>
      )}
    </section>
  );
}

// 🔧 Enable customization of the Spline URL inside Figma Sites properties panel
defineProperties(SplineHeroBackground, {
  splineUrl: {
    label: 'Spline URL',
    type: 'string',

    // 👉 Default Spline scene – replace this with your own if desired
    defaultValue: 'https://prod.spline.design/hb4oQuWlK0OqvQic/scene.splinecode',
  },
});
