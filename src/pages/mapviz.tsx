import dynamic from "next/dynamic";
// import MapComponent from "@/components/MapComponent";
const LazyMap = dynamic(() => import("@/components/MapVizComponent"), {
  ssr: false,
});
/**
 *
 * @returns jsx page
 *
 * mapviz page jsx
 * module for identify gap location
 *
 * visualize store locations
 * search for locations with gaps & display it
 * Ai insights in popup - using gemini api - has 5 useful question templates
 */
export default function MapViz() {
  return (
    <main className="leaflet-container">
      <LazyMap />
    </main>
  );
}
