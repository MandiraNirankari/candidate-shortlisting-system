import "./index.css";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import ComplaintAnalysis from "./components/ComplaintAnalysis";

function App() {

  return (

    <div className="container">

      <h1>AI Smart Complaint Management System</h1>

      <div className="card">
        <ComplaintForm />
      </div>

      <div className="card">
        <ComplaintList />
      </div>

      <div className="card">
        <ComplaintAnalysis />
      </div>

    </div>

  );

}

export default App;