import dynamic from "next/dynamic";
const LazyMap = dynamic(() => import("@/components/ForecastVizComponent"), {
  ssr: false,
});

/**
 *
 * @returns jsx page
 *
 * foreceast page jsx
 * module for demand analysis & forecast
 *
 * visualize store locations
 * search for store locations nearby selected branch
 * collects data of these nearby stores for data augmentation for demand analysis  & forecast
 * forecast using Ai (in marker popup)- using gemini api - Region X month X product X brand
 */
export default function Forecast() {
  return (
    <main className="leaflet-container">
      <LazyMap />
    </main>
  );
}
