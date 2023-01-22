export type Geocoded_waypoints = {
  geocoder_status: string
  place_id: string
  types: string[]
}

export type Northeast = {
  lat: number
  lng: number
}

export type Southwest = {
  lat: number
  lng: number
}

export type Bounds = {
  northeast: Northeast
  southwest: Southwest
}

export type Distance = {
  text: string
  value: number
}

export type Duration = {
  text: string
  value: number
}

export type End_location = {
  lat: number
  lng: number
}

export type Start_location = {
  lat: number
  lng: number
}

export type Polyline = {
  points: string
}

export type Step = {
  distance: Distance
  duration: Duration
  end_location: End_location
  html_instructions: string
  polyline: Polyline
  start_location: Start_location
  travel_mode: string
}

export type Legs = {
  distance: Distance
  duration: Duration
  end_address: string
  end_location: End_location
  start_address: string
  start_location: Start_location
  steps: Step[]
  traffic_speed_entry: any[]
  via_waypoint: any[]
}

export type Overview_polyline = {
  points: string
}

export type Routes = {
  bounds: Bounds
  copyrights: string
  legs: Legs[]
  overview_polyline: Overview_polyline
  summary: string
  warnings: any[]
  waypoint_order: any[]
}

export type Directions = {
  geocoded_waypoints: Geocoded_waypoints[]
  routes: Routes[]
  status: string
}
