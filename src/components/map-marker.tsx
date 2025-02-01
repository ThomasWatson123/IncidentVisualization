
import "./map-marker-styles.css"
import { FaInfoCircle, FaTimes } from "react-icons/fa"
import { useEffect, useState } from "react"
import { IncidentJson, WeatherDataResponse, WeatherResponse } from "../interfaces"
import { Card, CardContent, Modal } from "@mui/material"
import {format} from "date-fns"

interface MapMarkerProps {
    lat: number,
    lng: number,
    incident: IncidentJson
}

interface IncidentWeather {
    event_open_weather: WeatherDataResponse | undefined
}

const MapMarker = ({lat, lng, incident}: MapMarkerProps) => {
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<IncidentWeather | null>(null);
    // const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const onMarkerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        // setAnchorEl(event.currentTarget)
        setPopupVisible(true);
    }

    const onModalClose = () => setPopupVisible(false);

    const getDateFormat = (val: string) => {
        const date = new Date(val);
        return date.toLocaleString();
    }

    useEffect(() => {
        if(import.meta.env.VITE_METEOSTAT_KEY === "[METEOSTAT_API_KEY]"){
            alert("You must configure the VITE_METEOSTAT_KEY environment variable in the .env file before retrieving weather data.")
        }
        else{
            fetch(`https://meteostat.p.rapidapi.com/point/hourly?lat=${incident.address.latitude}&lon=${incident.address.longitude}&start=${format(new Date(incident.description.event_opened), "yyyy-MM-dd")}&end=${format(new Date(incident.description.event_closed), "yyyy-MM-dd")}&units=imperial`, {
                method: "GET",
                headers: {
                    'x-rapidapi-host': 'meteostat.p.rapidapi.com',
                    'x-rapidapi-key': import.meta.env.VITE_METEOSTAT_KEY
                }
            })
                .then(async (response) => {
                    if(response.ok){
                        const result: WeatherResponse = await response.json()
                        const weatherData: IncidentWeather = {event_open_weather: result.data.find(ele => new Date(ele.time).getHours() === new Date(incident.description.event_opened).getHours())};
                        
                        
                        setWeatherData(weatherData);
                    }
                    
                })
        }
        
    }, [incident])

    return (
        <>
        <div className="marker-icon" onClick={onMarkerClick} >
            <FaInfoCircle style={{width: "100%", height: "100%"}}/>
        </div>
        <Modal open={isPopupVisible} onClose={onModalClose} sx={{width: "50%", alignSelf: "center", justifySelf: "center", maxHeight: "90vh"}}>
                {/* <Box sx={{ border: 1, p: 1, bgcolor: "background.paper", width: "70%", alignSelf: "center"}}> */}
                    <div className="card">
                        <div className="card-header">
                            <div className="custom-hstack">
                                <div className="custom-vstack">
                                <p style={{fontSize: "1.5rem", marginBottom: 0}}>Common Place Name: {incident.address.common_place_name}</p>
                                <p style={{fontSize: "1rem", marginBottom: 0}}>Address: {incident.address.address_line1}</p>
                                </div>
                                <FaTimes onClick={onModalClose} style={{cursor: "pointer", marginLeft: "auto"}} />
                            </div>
                        </div>
                        <div className="card-body" style={{ height: "70vh", overflow: "auto"}}>
                            <h5>Fire Department</h5>
                            <p className="data-p"><span className="label">Name</span>: {incident.fire_department.name}</p>
                            <div className="custom-hstack">
                                <p className="data-p me-3"><span className="label">Shift</span>: {incident.fire_department.shift}</p>
                                <p className="data-p me-3"><span className="label">State</span>: {incident.fire_department.state}</p>
                                <p className="data-p me-3"><span className="label">Time Zone</span>: {incident.fire_department.timezone}</p>
                            </div>
                            <hr />
                            <h5>Description</h5>
                            <p className="data-p"><span className="label">Comments</span>: {incident.description.comments}</p>
                                <p className="data-p"><span className="label">Event Opened</span>: {getDateFormat(incident.description.event_opened)}</p>
                                <p className="data-p"><span className="label">Event Closed</span>: {getDateFormat(incident.description.event_closed)}</p>
                            
                            <p className="data-p"><span className="label">First Unit Dispatched</span>: {getDateFormat(incident.description.first_unit_dispatched)}</p>
                            <p className="data-p"><span className="label">First Unit Enroute</span>: {getDateFormat(incident.description.first_unit_enroute)}</p>
                            <p className="data-p"><span className="label">First Unit Arrived</span>: {getDateFormat(incident.description.first_unit_arrived)}</p>
                            <p className="data-p"><span className="label">LOI Search Complete</span>: {getDateFormat(incident.description.loi_search_complete)}</p>
                                <p className="data-p"><span className="label">Type</span>: {incident.description.type}</p>
                                <p className="data-p"><span className="label">Sub Type</span>: {incident.description.subtype}</p>
                            {weatherData && weatherData.event_open_weather ? (<>
                                <hr />
                                <h5>Weather At Time Of Incident</h5>
                                <p className="data-p me-5"><span className="label">Temperature (Farenheit)</span>: {weatherData.event_open_weather.temp ? weatherData.event_open_weather.temp : "N/A"}</p>
                                <p className="data-p me-5"><span className="label">Dewpoint (Farenheit)</span>: {weatherData.event_open_weather.dwpt ? weatherData.event_open_weather.dwpt : "N/A"}</p>
                                <p className="data-p me-5"><span className="label">Relative Humidity</span>: {weatherData.event_open_weather.rhum ? `${weatherData.event_open_weather.rhum}%` : "N/A"}</p>
                                <p className="data-p me-5"><span className="label">Precipitation (Inches)</span>: {weatherData.event_open_weather.prcp ? weatherData.event_open_weather.prcp : "N/A"}</p>
                                <p className="data-p me-5"><span className="label">Snow (Inches)</span>: {weatherData.event_open_weather.snow ? weatherData.event_open_weather.snow : "N/A"}</p>
                                <p className="data-p me-5"><span className="label">Wind Direction (Degrees)</span>: {weatherData.event_open_weather.wdir ? weatherData.event_open_weather.wdir : "N/A"}</p>
                                <p className="data-p me-5"><span className="label">Wind Speed (Miles Per Hour)</span>: {weatherData.event_open_weather.wspd ? weatherData.event_open_weather.wspd : "N/A"}</p>
                                <p className="data-p me-5"><span className="label">Peak Wind Gust (Miles Per Hour)</span>: {weatherData.event_open_weather.wpgt ? weatherData.event_open_weather.wpgt : "N/A"}</p>
                                </>) : <></>}
                            
                            <hr />
                            <h5>Apparatus</h5>
                            <div className="wrappable-custom-hstack">
                                {incident.apparatus.map((item, i) => {
                                    return (
                                        <Card key={item.car_id} style={{ width: "50%", border: "solid", borderWidth: "thin", borderColor: "gray"}}>
                                            <CardContent>
                                                <p className="data-p"><span className="label">Unit ID</span>: {item.unit_id}</p>
                                                <p className="data-p"><span className="label">Unit Type</span>: {item.unit_type}</p>
                                                <div className="custom-hstack">
                                                <p className="data-p me-1"><span className="label">Station</span>: {item.station}</p>
                                                <p className="data-p"><span className="label">Shift</span>: {item.shift}</p>
                                                </div>
                                                {item.unit_status.dispatched ? (<p className="data-p"><span className="label">Dispatched</span>: {getDateFormat(item.unit_status.dispatched.timestamp)}</p>) : <></>}
                                                {item.unit_status.acknowledged ? (<p className="data-p"><span className="label">Acknowledged</span>: {getDateFormat(item.unit_status.acknowledged.timestamp)}</p>) : <></>}
                                                {item.unit_status.enroute ? (<p className="data-p"><span className="label">Enroute</span>: {getDateFormat(item.unit_status.enroute.timestamp)}</p>) : <></>}
                                                {item.unit_status.cleared ? (<p className="data-p"><span className="label">Cleared</span>: {getDateFormat(item.unit_status.cleared.timestamp)}</p>) : <></>}
                                                {item.unit_status.arrived ? (<p className="data-p"><span className="label">Arrived</span>: {getDateFormat(item.unit_status.arrived.timestamp)}</p>) : <></>}
                                                {item.unit_status.available ? (<p className="data-p"><span className="label">Available</span>: {getDateFormat(item.unit_status.available.timestamp)}</p>) : <></>}
                                                
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    
                {/* </Box> */}
        </Modal>
        </>

    )
}

export default MapMarker;