
import { useState } from 'react'
import './App.css'
import GoogleMapReact from "google-map-react"
import MapMarker from './components/map-marker'
import { IncidentJson } from './interfaces';

function App() {
  const richmond = { lat: 37.5407, lng: -77.4360 };
  const [incident, setIncident] = useState<IncidentJson | null>(null)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if(event.target.files != null){
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if(e.target != null){
          if(typeof(e.target.result) === "string")
            setIncident(JSON.parse(e.target.result));
        }
      }
    }
  
  }
  console.log(incident);
  return (
    <div className="card" style={{height: "90vh", width: "70vw"}}>
      <div className="card-header"><h4>911 Incident's</h4></div>
      <div className="card-body">
        <div className="custom-vstack" style={{alignItems: "baseline"}}>
          <h5>Upload Incident Json</h5>
          <input type="file" onChange={handleFileChange}/>
        </div>
        <hr />
        <div style={{height: '80%', width: '100%'}}>
          <GoogleMapReact center={incident ? {lat: incident.address.latitude, lng: incident.address.longitude } : richmond} defaultCenter={richmond} defaultZoom={8} zoom={incident ? 15 : 8}>
            {incident ? <MapMarker lat={ incident.address.latitude} lng={ incident.address.longitude } incident={incident} /> : <></>} 
          </GoogleMapReact>
        </div>
      </div>
    </div>
  )
}

export default App
