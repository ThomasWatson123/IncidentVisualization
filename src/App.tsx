
import { useState } from 'react'
import './App.css'
import GoogleMapReact from "google-map-react"
import MapMarker from './components/map-marker'

interface Address {
  address_line1: string,
  city: string,
  common_place_name: string
  cross_street1: string,
  cross_street2: string,
  first_due: string,
  geohash: string,
  latitude: number,
  longitude: number,
  name: string,
  number: string,
  postal_code: string,
  prefix_direction: string,
  response_zone: string,
  state: string,
  suffix_direction: string,
  type: string 
}

interface Apparatus {
  car_id: string,
  geohash: string,
  personnel: []
  shift: string,
  station: string,
  unit_id: string,
  unit_status: Object,
  unit_type: string
}

interface Description {
  comments: string,
  day_of_week: string,
  event_closed: string,
  event_id: string,
  event_opened: string,
  extended_data: Object,
  first_unit_arrived: string,
  first_unit_dispatched: string,
  first_unit_enroute: string,
  hour_of_day: number,
  incident_number: string,
  loi_search_complete: string,
  subtype: string,
  type: string
}

interface FireDepartment{
  fd_id: string,
  firecares_id: string,
  name: string,
  shift: string,
  state: string,
  timezone: string
}

interface IncidentJson {
  address: Address,
  apparatus: Apparatus[],
  description: Description,
  fire_department: FireDepartment,
  version: string
}

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
    <div className="card" style={{height: "90vh", width: "90vh"}}>
      <div className="card-header"><h4>911 Incident's</h4></div>
      <div className="card-body">
        <div className="custom-vstack" style={{alignItems: "baseline"}}>
          <h5 className="label">Upload Incident Json</h5>
          <input type="file" onChange={handleFileChange}/>
        </div>
        <hr />
        <div style={{height: '80%', width: '100%'}}>
          <GoogleMapReact center={incident ? {lat: incident.address.latitude, lng: incident.address.longitude } : richmond} defaultCenter={richmond} defaultZoom={8} zoom={incident ? 15 : 8}>
            {incident ? <MapMarker lat={ incident.address.latitude} lng={ incident.address.longitude } /> : <></>} 
          </GoogleMapReact>
        </div>
      </div>
    </div>
  )
}

export default App
