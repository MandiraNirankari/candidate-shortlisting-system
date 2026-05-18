import "./index.css";

import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import MatchCandidates from "./components/MatchCandidates";

function App() {

  return (

    <div className="container">

      <h1>Candidate Shortlisting System</h1>

      <div className="card">
        <CandidateForm />
      </div>

      <div className="card">
        <CandidateList />
      </div>

      <div className="card">
        <MatchCandidates />
      </div>

    </div>

  );

}

export default App;