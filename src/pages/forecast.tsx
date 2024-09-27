import dynamic from "next/dynamic";
const LazyMap = dynamic(() => import("@/components/ForecastVizComponent"), {
  ssr: false,
});

export default function Forecast() {
  return (
    <main className="leaflet-container">
      <LazyMap />
    </main>
  );
}
