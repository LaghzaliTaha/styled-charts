export const chartsRegions = ['AM', 'EU', 'AS', 'AF', 'ML']

export const families = {
  fertilizers: 'fertilizers',
  rock: 'rock',
  acids: 'acids'
}

export const chartsConfig = {
  [families.fertilizers]: {
    background: 'linear-gradient(203.06deg, #79E4D3 0%, #33B296 100%)',
    boxShadow: '4px 8px 12px 0 rgba(74,195,170,0.55)',
    reportedFamilies: 'Fertilizers',
    stroke: '#66d7C2',
    label: '#66D7C2'
  },
  [families.acids]: {
    background: 'linear-gradient(180deg, #7BC7E8 0%, #4595CD 100%)',
    boxShadow: '4px 8px 12px 0 rgba(72,150,202,0.34)',
    reportedFamilies: 'Acids',
    stroke: '#77C3E6',
    label: '#77C3E6'
  },
  [families.rock]: {
    background: 'linear-gradient(180deg, #F4CB42 0%, #E69B1F 100%)',
    boxShadow: '4px 8px 12px 0 rgba(219,151,33,0.23)',
    reportedFamilies: 'Rock',
    stroke: '#F4CA41',
    label: '#F4CA41'
  }
}

export const activeChartConfig = {
  [families.fertilizers]: {
    reportTable: { colorStart: '#79E4D3', colorStop: '#33B296' },
    regionCoverage: { colorStart: '#EDFFD2', colorStop: '#5DA702' },
    labelReportsTable: '#49c2a9',
    labelRegionCoverage: '#95c954'
  },
  [families.acids]: {
    reportTable: { colorStart: '#7bc7e8', colorStop: '#4595cd' },
    regionCoverage: { colorStart: '#75a3ea', colorStop: '#354f6e' },
    labelReportsTable: '#58a7d7',
    labelRegionCoverage: '#6a94d4'
  },
  [families.rock]: {
    reportTable: { colorStart: '#f4cb42', colorStop: '#e69b1f' },
    regionCoverage: { colorStart: '#f7b661', colorStop: '#db8222' },
    labelReportsTable: '#e79f22',
    labelRegionCoverage: '#f8b661'
  },
  feeds: {
    reportTable: { colorStart: '#f4cb42', colorStop: '#e69b1f' },
    regionCoverage: { colorStart: '#f7b661', colorStop: '#db8222' },
    labelReportsTable: '#49c2a9',
    labelRegionCoverage: '#95c954'
  }
}
