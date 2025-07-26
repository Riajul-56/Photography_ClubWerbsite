import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPanel from "./components/AdminPanel";
import UserDashboard from "./components/UserDashboard";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Photography Club</h1>
      <div className="row">
        <div className="col-md-6">
          <AdminPanel />
        </div>
        <div className="col-md-6">
          <UserDashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
