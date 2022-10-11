import SuggestionInput from "./components/suggestion-input";

function App() {
  return (
    <div className="main">
      <div>French</div>
      <SuggestionInput lang="fr" eid="french" />
      <br />
      <br />
      <div>Italian</div>
      <SuggestionInput lang="it" eid="italian" />
      <br />
      <br />
      <div>English</div>
      <SuggestionInput lang="en" eid="english" />
    </div>
  );
}

export default App;
