'use client';

import { Suspense } from 'react';
import Spline from '@splinetool/react-spline/next';

export default function SplineScene() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Spline
        scene="/robot/scene.splinecode"
      />
    </Suspense>
  );
} 