import dynamic from "next/dynamic";
// import MapComponent from "@/components/MapComponent";
const LazyMap = dynamic(() => import("@/components/MapVizComponent"), {
  ssr: false,
});

export default function MapViz() {
  return (
    <main className="leaflet-container">
      <LazyMap />
    </main>
  );
}
