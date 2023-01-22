function useFleetTabs(): {
  icon: string
  title: string
  id: number
  tag: string
  to: string
}[] {
  return [
    {
      icon: 'Fleet-XTS-Continental',
      title: 'Cadillac XTS',
      id: 1,
      tag: 'VehicleCadillacXts',
      to: '/fleet/cadillac-xts',
    },
    {
      icon: 'Fleet-XTS-Continental',
      title: 'Lincoln Continental',
      id: 2,
      tag: 'VehicleLincolnContinental',
      to: '/fleet/lincoln-continental',
    },
    {
      icon: 'Fleet-Navigator-Escalade',
      title: 'Cadillac Escalade',
      id: 3,
      tag: 'VehicleCadillacEscalade',
      to: '/fleet/cadillac-escalade',
    },
    {
      icon: 'Fleet-Navigator-Escalade',
      title: 'Lincoln Navigator',
      id: 4,
      tag: 'VehicleLincolnNavigator',
      to: '/fleet/lincoln-navigator',
    },
    {
      icon: 'Fleet-Tesla',
      title: 'Tesla S',
      id: 5,
      tag: 'VehicleTeslaS',
      to: '/fleet/tesla-s',
    },
    {
      icon: 'Fleet-Other',
      title: 'Other',
      id: 6,
      tag: 'VehicleOther',
      to: '/fleet/other',
    },
  ]
}

// @ts-ignore
export { useFleetTabs }
