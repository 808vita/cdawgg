import dynamic from "next/dynamic";
// import MapComponent from "@/components/MapComponent";
const LazyMap = dynamic(() => import("@/components/MapComponentSimulator"), {
  ssr: false,
});

export default function Routing() {
  return (
    <main className="leaflet-container">
      {/* { <MapComponent />} */}
      <LazyMap />
    </main>
  );
}
