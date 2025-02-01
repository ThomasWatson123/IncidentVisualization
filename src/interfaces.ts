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
    unit_status: UnitStatus,
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

  interface UnitStatus {
    acknowledged: StatusItems,
    arrived: StatusItems,
    available: StatusItems,
    cleared: StatusItems,
    dispatched: StatusItems,
    enroute: StatusItems,

  }

  interface StatusItems {
    geohash: string,
    latitude: number,
    longitude: number,
    timestamp: string
  }

  interface WeatherResponse {
    meta: Object,
    data: WeatherDataResponse[]
  }

  interface WeatherDataResponse {
    time: string,
    temp: number | null,
    dwpt: number | null,
    rhum: number | null,
    prcp: number | null,
    snow: number | null,
    wdir: number | null,
    wspd: number | null,
    wpgt: number | null,
    pres: number | null,

  }
  
  export type {Address, Apparatus, Description, FireDepartment, IncidentJson, UnitStatus, WeatherResponse, WeatherDataResponse}