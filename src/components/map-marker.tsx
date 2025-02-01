
import "./map-marker-styles.css"
import { FaInfoCircle } from "react-icons/fa"
import { useState } from "react"
import { IncidentJson } from "../interfaces"
import { Card, CardContent, Modal, Popper } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

interface MapMarkerProps {
    lat: number,
    lng: number,
    incident: IncidentJson
}

const MapMarker = ({lat, lng, incident}: MapMarkerProps) => {
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
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

    return (
        <>
        <div className="marker-icon" onClick={onMarkerClick} >
            <FaInfoCircle style={{width: "100%", height: "100%"}}/>
        </div>
        <Modal open={isPopupVisible} onClose={onModalClose} sx={{width: "50%", alignSelf: "center", justifySelf: "center", maxHeight: "90vh"}}>
                {/* <Box sx={{ border: 1, p: 1, bgcolor: "background.paper", width: "70%", alignSelf: "center"}}> */}
                    <div className="card">
                        <div className="card-header">
                            <div className="custom-vstack">
                            <p style={{fontSize: "1.5rem", marginBottom: 0}}>Common Place Name: {incident.address.common_place_name}</p>
                            <p style={{fontSize: "1rem", marginBottom: 0}}>Address: {incident.address.address_line1}</p>
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
                            <div className="custom-hstack">
                                <p className="data-p me-5"><span className="label">Event Opened</span>: {getDateFormat(incident.description.event_opened)}</p>
                                <p className="data-p"><span className="label">Event Closed</span>: {getDateFormat(incident.description.event_closed)}</p>
                            </div>
                            
                            <div className="custom-hstack">
                            <p className="data-p me-1"><span className="label">First Unit Dispatched</span>: {getDateFormat(incident.description.first_unit_dispatched)}</p>
                            <p className="data-p me-1"><span className="label">First Unit Enroute</span>: {getDateFormat(incident.description.first_unit_enroute)}</p>
                            <p className="data-p"><span className="label">First Unit Arrived</span>: {getDateFormat(incident.description.first_unit_arrived)}</p>
                            </div>
                            <p className="data-p"><span className="label">LOI Search Complete</span>: {getDateFormat(incident.description.loi_search_complete)}</p>
                            <div className="custom-hstack">
                                <p className="data-p me-5"><span className="label">Type</span>: {incident.description.type}</p>
                                <p className="data-p"><span className="label">Sub Type</span>: {incident.description.subtype}</p>
                            </div>
                            
                            <hr />
                            <h5>Apparatuses</h5>
                            <div className="wrappable-custom-hstack">
                                {incident.apparatus.map((item, i) => {
                                    return (
                                        <Card key={item.car_id} style={{ width: "50%"}}>
                                            <CardContent>
                                                <p className="data-p"><span className="label">Unit ID</span>: {item.unit_id}</p>
                                                <hr />
                                                <p className="data-p"><span className="label">Unit Type</span>: {item.unit_type}</p>
                                                <div className="custom-hstack">
                                                <p className="data-p me-1"><span className="label">Station</span>: {item.station}</p>
                                                <p className="data-p"><span className="label">Shift</span>: {item.shift}</p>
                                                </div>
                                                <hr />
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