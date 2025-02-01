import { useEffect } from "react"
import "./map-marker-styles.css"
import { FaInfoCircle } from "react-icons/fa"

interface MapMarkerProps {
    lat: number,
    lng: number
}

const MapMarker = ({lat, lng}: MapMarkerProps) => {

    // const onMarkerClick = (event: React.MouseEvent<HTMLDivElement>) => {

    // }

    return (
        
        <div className="marker-icon" >
            <FaInfoCircle style={{width: "100%", height: "100%"}}/>
        </div>
    )
}

export default MapMarker;