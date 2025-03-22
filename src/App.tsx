import CreativesDashboard from "./pages/CreativesDashboard";

/**
 * App is the root component that renders the CreativesDashboard.
 * It simply wraps the CreativesDashboard with a div element
 * that adds some basic styling.
 */
function App() {
  return (
    <div className="App p-4">
      <CreativesDashboard />
    </div>
  );
}

export default App;
