'use client'

import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react'

interface CountryImportData {
  country: string
  data: { year: number; value: number; volume: number }[]
}

interface GeographyImports {
  geography: string
  suppliers: CountryImportData[]
  trends: string[]
}

const YEARS = [2022, 2023, 2024, 2025]

// Import data per geography - each geography imports from different supplying countries
const ALL_IMPORT_DATA: GeographyImports[] = [
  {
    geography: 'South Africa',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 18.7, volume: 6120 }, { year: 2023, value: 20.3, volume: 6540 }, { year: 2024, value: 22.1, volume: 7010 }, { year: 2025, value: 24.5, volume: 7620 }] },
      { country: 'India', data: [{ year: 2022, value: 12.4, volume: 3850 }, { year: 2023, value: 14.1, volume: 4220 }, { year: 2024, value: 15.8, volume: 4610 }, { year: 2025, value: 17.6, volume: 5080 }] },
      { country: 'United States', data: [{ year: 2022, value: 8.9, volume: 2450 }, { year: 2023, value: 9.6, volume: 2610 }, { year: 2024, value: 10.4, volume: 2820 }, { year: 2025, value: 11.2, volume: 3050 }] },
      { country: 'Netherlands', data: [{ year: 2022, value: 5.3, volume: 1680 }, { year: 2023, value: 5.8, volume: 1810 }, { year: 2024, value: 6.4, volume: 1970 }, { year: 2025, value: 7.1, volume: 2150 }] },
      { country: 'Japan', data: [{ year: 2022, value: 4.1, volume: 1120 }, { year: 2023, value: 4.5, volume: 1230 }, { year: 2024, value: 4.9, volume: 1340 }, { year: 2025, value: 5.4, volume: 1470 }] },
    ],
    trends: [
      'South Africa is the largest activated carbon importer in the region, driven by extensive gold mining operations (AngloGold Ashanti, Gold Fields) and growing municipal water treatment requirements.',
      'China dominates supply at ~37% of import value, providing cost-effective coal-based activated carbon. India is the fastest-growing source, gaining share through coconut shell-based AC.',
      'Local reactivation capacity is expanding, potentially reducing virgin AC import dependency by 10-15% over the forecast period.',
      'Water treatment sector imports are growing faster than gold mining, reflecting stricter effluent discharge regulations under the National Water Act.',
    ],
  },
  {
    geography: 'Ghana',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 14.2, volume: 4650 }, { year: 2023, value: 15.8, volume: 5100 }, { year: 2024, value: 17.5, volume: 5580 }, { year: 2025, value: 19.4, volume: 6100 }] },
      { country: 'India', data: [{ year: 2022, value: 8.6, volume: 2680 }, { year: 2023, value: 9.8, volume: 3010 }, { year: 2024, value: 11.1, volume: 3370 }, { year: 2025, value: 12.5, volume: 3750 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 3.5, volume: 1050 }, { year: 2023, value: 3.9, volume: 1150 }, { year: 2024, value: 4.3, volume: 1260 }, { year: 2025, value: 4.8, volume: 1380 }] },
      { country: 'United States', data: [{ year: 2022, value: 2.8, volume: 780 }, { year: 2023, value: 3.1, volume: 850 }, { year: 2024, value: 3.4, volume: 930 }, { year: 2025, value: 3.7, volume: 1010 }] },
      { country: 'Netherlands', data: [{ year: 2022, value: 1.9, volume: 590 }, { year: 2023, value: 2.1, volume: 640 }, { year: 2024, value: 2.3, volume: 700 }, { year: 2025, value: 2.6, volume: 770 }] },
    ],
    trends: [
      'Ghana is West Africa\'s largest gold producer and second-largest AC importer. Newmont Ahafo and Gold Fields Tarkwa operations drive bulk import demand.',
      'China and India together account for over 75% of Ghana\'s AC imports, with Chinese coal-based AC preferred for CIL circuits.',
      'South Africa serves as a regional re-export hub, supplying reactivated carbon from Johannesburg-based processors.',
      'Import volumes are growing at ~9.5% CAGR, outpacing value growth, indicating price negotiations driving per-unit costs down.',
    ],
  },
  {
    geography: 'Mali',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 5.8, volume: 1900 }, { year: 2023, value: 6.5, volume: 2100 }, { year: 2024, value: 7.2, volume: 2310 }, { year: 2025, value: 8.1, volume: 2560 }] },
      { country: 'India', data: [{ year: 2022, value: 3.2, volume: 990 }, { year: 2023, value: 3.6, volume: 1100 }, { year: 2024, value: 4.1, volume: 1230 }, { year: 2025, value: 4.6, volume: 1370 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 1.8, volume: 540 }, { year: 2023, value: 2.0, volume: 590 }, { year: 2024, value: 2.2, volume: 650 }, { year: 2025, value: 2.5, volume: 720 }] },
      { country: 'France', data: [{ year: 2022, value: 1.1, volume: 320 }, { year: 2023, value: 1.2, volume: 350 }, { year: 2024, value: 1.3, volume: 380 }, { year: 2025, value: 1.5, volume: 420 }] },
      { country: 'Netherlands', data: [{ year: 2022, value: 0.8, volume: 240 }, { year: 2023, value: 0.9, volume: 260 }, { year: 2024, value: 1.0, volume: 290 }, { year: 2025, value: 1.1, volume: 320 }] },
    ],
    trends: [
      'Mali\'s AC imports are driven by Resolute Mining (Syama) and B2Gold (Fekola) operations, with CIL gold processing as the primary application.',
      'Landlocked geography increases logistics costs, making Chinese and Indian suppliers competitive despite longer shipping routes via Dakar/Abidjan ports.',
      'France maintains a supply presence due to historical trade links and established logistics corridors from Marseille.',
      'Political instability has not significantly impacted mining chemical imports, though payment terms have tightened.',
    ],
  },
  {
    geography: 'Burkina Faso',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 4.9, volume: 1610 }, { year: 2023, value: 5.5, volume: 1780 }, { year: 2024, value: 6.1, volume: 1960 }, { year: 2025, value: 6.9, volume: 2170 }] },
      { country: 'India', data: [{ year: 2022, value: 2.7, volume: 840 }, { year: 2023, value: 3.1, volume: 950 }, { year: 2024, value: 3.5, volume: 1060 }, { year: 2025, value: 3.9, volume: 1180 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 1.5, volume: 450 }, { year: 2023, value: 1.7, volume: 500 }, { year: 2024, value: 1.9, volume: 550 }, { year: 2025, value: 2.1, volume: 610 }] },
      { country: 'France', data: [{ year: 2022, value: 0.9, volume: 270 }, { year: 2023, value: 1.0, volume: 300 }, { year: 2024, value: 1.1, volume: 330 }, { year: 2025, value: 1.2, volume: 360 }] },
      { country: 'Netherlands', data: [{ year: 2022, value: 0.7, volume: 210 }, { year: 2023, value: 0.8, volume: 230 }, { year: 2024, value: 0.9, volume: 250 }, { year: 2025, value: 1.0, volume: 280 }] },
    ],
    trends: [
      'Burkina Faso\'s gold mining boom (Endeavour Mining, IAMGOLD) has driven rapid AC import growth at ~12% CAGR.',
      'China is the dominant supplier, leveraging competitive pricing for coal-based granular activated carbon used in CIL/CIP circuits.',
      'Import routes primarily via Abidjan (Cote d\'Ivoire) and Lomé (Togo), adding significant transit costs to landed prices.',
      'Growing security concerns in the Sahel have prompted some mining operators to increase inventory buffers, boosting near-term import volumes.',
    ],
  },
  {
    geography: 'Tanzania',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 7.4, volume: 2420 }, { year: 2023, value: 8.3, volume: 2680 }, { year: 2024, value: 9.2, volume: 2950 }, { year: 2025, value: 10.3, volume: 3260 }] },
      { country: 'India', data: [{ year: 2022, value: 5.1, volume: 1580 }, { year: 2023, value: 5.8, volume: 1770 }, { year: 2024, value: 6.5, volume: 1970 }, { year: 2025, value: 7.3, volume: 2190 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 2.3, volume: 690 }, { year: 2023, value: 2.6, volume: 760 }, { year: 2024, value: 2.9, volume: 840 }, { year: 2025, value: 3.2, volume: 930 }] },
      { country: 'Japan', data: [{ year: 2022, value: 1.4, volume: 390 }, { year: 2023, value: 1.5, volume: 420 }, { year: 2024, value: 1.7, volume: 460 }, { year: 2025, value: 1.9, volume: 500 }] },
      { country: 'United States', data: [{ year: 2022, value: 1.1, volume: 300 }, { year: 2023, value: 1.2, volume: 330 }, { year: 2024, value: 1.3, volume: 360 }, { year: 2025, value: 1.5, volume: 400 }] },
    ],
    trends: [
      'Tanzania\'s AC demand is anchored by Barrick Gold (North Mara, Bulyanhulu) and AngloGold Ashanti (Geita) operations.',
      'India\'s proximity via Indian Ocean shipping routes gives it a cost advantage, growing its share to ~27% of imports.',
      'Government localization policies (Mining Act amendments) may encourage development of domestic reactivation facilities.',
      'Dar es Salaam port improvements have reduced import lead times by ~15%, benefiting just-in-time procurement strategies.',
    ],
  },
  {
    geography: "Côte d'Ivoire",
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 6.1, volume: 2000 }, { year: 2023, value: 6.9, volume: 2230 }, { year: 2024, value: 7.7, volume: 2470 }, { year: 2025, value: 8.6, volume: 2730 }] },
      { country: 'India', data: [{ year: 2022, value: 3.5, volume: 1080 }, { year: 2023, value: 4.0, volume: 1210 }, { year: 2024, value: 4.5, volume: 1350 }, { year: 2025, value: 5.1, volume: 1510 }] },
      { country: 'France', data: [{ year: 2022, value: 1.4, volume: 420 }, { year: 2023, value: 1.5, volume: 450 }, { year: 2024, value: 1.7, volume: 490 }, { year: 2025, value: 1.9, volume: 540 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 1.2, volume: 360 }, { year: 2023, value: 1.3, volume: 390 }, { year: 2024, value: 1.5, volume: 430 }, { year: 2025, value: 1.7, volume: 480 }] },
      { country: 'Netherlands', data: [{ year: 2022, value: 0.9, volume: 270 }, { year: 2023, value: 1.0, volume: 300 }, { year: 2024, value: 1.1, volume: 330 }, { year: 2025, value: 1.3, volume: 370 }] },
    ],
    trends: [
      'Côte d\'Ivoire\'s gold sector is expanding rapidly with Tongon (Barrick) and Ity (Endeavour) mines driving AC demand.',
      'Abidjan port serves as a key logistics hub for West African AC distribution, enabling regional re-exports to Mali and Burkina Faso.',
      'France retains ~12% import share through historical trade relationships and competitive euro-denominated financing terms.',
      'Water treatment AC demand is emerging as a growth driver, with Abidjan municipal water expansion projects requiring PAC supplies.',
    ],
  },
  {
    geography: 'Zimbabwe',
    suppliers: [
      { country: 'South Africa', data: [{ year: 2022, value: 4.2, volume: 1300 }, { year: 2023, value: 4.7, volume: 1430 }, { year: 2024, value: 5.2, volume: 1570 }, { year: 2025, value: 5.8, volume: 1730 }] },
      { country: 'China', data: [{ year: 2022, value: 3.6, volume: 1180 }, { year: 2023, value: 4.0, volume: 1300 }, { year: 2024, value: 4.5, volume: 1440 }, { year: 2025, value: 5.0, volume: 1590 }] },
      { country: 'India', data: [{ year: 2022, value: 1.8, volume: 560 }, { year: 2023, value: 2.1, volume: 640 }, { year: 2024, value: 2.4, volume: 720 }, { year: 2025, value: 2.7, volume: 810 }] },
      { country: 'United States', data: [{ year: 2022, value: 0.7, volume: 190 }, { year: 2023, value: 0.8, volume: 210 }, { year: 2024, value: 0.9, volume: 240 }, { year: 2025, value: 1.0, volume: 260 }] },
      { country: 'Netherlands', data: [{ year: 2022, value: 0.5, volume: 150 }, { year: 2023, value: 0.6, volume: 170 }, { year: 2024, value: 0.7, volume: 190 }, { year: 2025, value: 0.8, volume: 210 }] },
    ],
    trends: [
      'Zimbabwe sources primarily from neighbouring South Africa (~40% share) due to proximity and established road freight corridors.',
      'Caledonia Mining (Blanket mine) and RioZim are the primary end-users, with CIP gold processing circuits consuming bulk GAC.',
      'Currency instability (ZWL) complicates procurement planning, with most contracts now denominated in USD.',
      'Sanctions history limits direct sourcing from some Western suppliers, strengthening China and South Africa\'s market positions.',
    ],
  },
  {
    geography: 'Democratic Republic of the Congo',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 5.5, volume: 1800 }, { year: 2023, value: 6.2, volume: 2010 }, { year: 2024, value: 7.0, volume: 2240 }, { year: 2025, value: 7.9, volume: 2500 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 3.8, volume: 1180 }, { year: 2023, value: 4.2, volume: 1290 }, { year: 2024, value: 4.7, volume: 1420 }, { year: 2025, value: 5.3, volume: 1570 }] },
      { country: 'India', data: [{ year: 2022, value: 2.1, volume: 650 }, { year: 2023, value: 2.4, volume: 740 }, { year: 2024, value: 2.8, volume: 840 }, { year: 2025, value: 3.2, volume: 950 }] },
      { country: 'Belgium', data: [{ year: 2022, value: 1.3, volume: 390 }, { year: 2023, value: 1.4, volume: 420 }, { year: 2024, value: 1.6, volume: 460 }, { year: 2025, value: 1.8, volume: 510 }] },
      { country: 'Tanzania', data: [{ year: 2022, value: 0.6, volume: 180 }, { year: 2023, value: 0.7, volume: 200 }, { year: 2024, value: 0.8, volume: 220 }, { year: 2025, value: 0.9, volume: 250 }] },
    ],
    trends: [
      'DRC\'s AC imports serve both artisanal and industrial gold mining, with Kibali (Barrick/AngloGold) as the largest single consumer.',
      'South Africa and China together supply ~70% of imports, with Dar es Salaam and Durban as primary entry ports.',
      'Belgium maintains a supply presence through historical colonial trade links and Antwerp-based chemical distributors.',
      'Security and logistics challenges in eastern provinces increase landed costs by 20-30% compared to coastal African nations.',
    ],
  },
  {
    geography: 'Guinea',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 3.6, volume: 1180 }, { year: 2023, value: 4.1, volume: 1330 }, { year: 2024, value: 4.6, volume: 1480 }, { year: 2025, value: 5.2, volume: 1650 }] },
      { country: 'India', data: [{ year: 2022, value: 2.0, volume: 620 }, { year: 2023, value: 2.3, volume: 710 }, { year: 2024, value: 2.6, volume: 800 }, { year: 2025, value: 3.0, volume: 900 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 0.9, volume: 270 }, { year: 2023, value: 1.0, volume: 300 }, { year: 2024, value: 1.2, volume: 340 }, { year: 2025, value: 1.3, volume: 380 }] },
      { country: 'France', data: [{ year: 2022, value: 0.7, volume: 210 }, { year: 2023, value: 0.8, volume: 230 }, { year: 2024, value: 0.9, volume: 260 }, { year: 2025, value: 1.0, volume: 290 }] },
      { country: 'Netherlands', data: [{ year: 2022, value: 0.4, volume: 120 }, { year: 2023, value: 0.5, volume: 140 }, { year: 2024, value: 0.5, volume: 150 }, { year: 2025, value: 0.6, volume: 170 }] },
    ],
    trends: [
      'Guinea\'s gold mining sector (Société Minière de Dinguiraye, Nordgold Lefa) is the sole driver of AC imports.',
      'Conakry port handles all AC imports, with Chinese suppliers offering CIF delivery terms as a competitive advantage.',
      'Political transitions have created procurement uncertainty, but mining operations continue largely unaffected.',
      'India is the fastest-growing supplier at ~14% CAGR, offering competitive coconut shell-based AC for gold CIL circuits.',
    ],
  },
  {
    geography: 'Sudan',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 3.1, volume: 1020 }, { year: 2023, value: 3.5, volume: 1140 }, { year: 2024, value: 3.2, volume: 1030 }, { year: 2025, value: 3.6, volume: 1160 }] },
      { country: 'India', data: [{ year: 2022, value: 1.7, volume: 530 }, { year: 2023, value: 1.9, volume: 590 }, { year: 2024, value: 1.8, volume: 560 }, { year: 2025, value: 2.0, volume: 630 }] },
      { country: 'United Arab Emirates', data: [{ year: 2022, value: 1.2, volume: 370 }, { year: 2023, value: 1.3, volume: 400 }, { year: 2024, value: 1.2, volume: 380 }, { year: 2025, value: 1.4, volume: 430 }] },
      { country: 'Saudi Arabia', data: [{ year: 2022, value: 0.6, volume: 180 }, { year: 2023, value: 0.7, volume: 200 }, { year: 2024, value: 0.6, volume: 190 }, { year: 2025, value: 0.7, volume: 210 }] },
      { country: 'South Africa', data: [{ year: 2022, value: 0.4, volume: 120 }, { year: 2023, value: 0.5, volume: 140 }, { year: 2024, value: 0.4, volume: 130 }, { year: 2025, value: 0.5, volume: 150 }] },
    ],
    trends: [
      'Sudan\'s AC imports are disrupted by the ongoing civil conflict, with 2024 volumes declining before partial recovery in 2025.',
      'Artisanal gold mining in River Nile and Red Sea states continues to drive some demand despite conflict conditions.',
      'UAE-based re-exporters have gained share as traditional direct shipping routes face disruption.',
      'Import volumes are volatile and highly dependent on security conditions around Port Sudan, the primary entry point.',
    ],
  },
  {
    geography: 'Russia',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 15.3, volume: 5010 }, { year: 2023, value: 17.8, volume: 5750 }, { year: 2024, value: 20.1, volume: 6420 }, { year: 2025, value: 22.6, volume: 7150 }] },
      { country: 'India', data: [{ year: 2022, value: 4.2, volume: 1300 }, { year: 2023, value: 5.1, volume: 1560 }, { year: 2024, value: 6.0, volume: 1820 }, { year: 2025, value: 7.0, volume: 2100 }] },
      { country: 'Kazakhstan', data: [{ year: 2022, value: 2.1, volume: 650 }, { year: 2023, value: 2.4, volume: 740 }, { year: 2024, value: 2.7, volume: 830 }, { year: 2025, value: 3.1, volume: 940 }] },
      { country: 'Belarus', data: [{ year: 2022, value: 1.3, volume: 400 }, { year: 2023, value: 1.5, volume: 460 }, { year: 2024, value: 1.7, volume: 520 }, { year: 2025, value: 1.9, volume: 580 }] },
      { country: 'Turkey', data: [{ year: 2022, value: 0.9, volume: 280 }, { year: 2023, value: 1.1, volume: 340 }, { year: 2024, value: 1.3, volume: 400 }, { year: 2025, value: 1.5, volume: 460 }] },
    ],
    trends: [
      'Russia\'s AC import landscape shifted dramatically post-2022, with Western suppliers largely replaced by Chinese, Indian, and CIS-country sources.',
      'China now accounts for ~65% of Russia\'s AC imports, up from ~40% pre-sanctions, supplying both gold mining and water treatment sectors.',
      'Polyus Gold and Polymetal are the primary industrial consumers, with water treatment demand from municipal utilities as the secondary driver.',
      'India has emerged as the fastest-growing supplier at ~18% CAGR, filling gaps left by European suppliers and offering coconut shell-based AC alternatives.',
    ],
  },
  {
    geography: 'Australia',
    suppliers: [
      { country: 'China', data: [{ year: 2022, value: 11.8, volume: 3860 }, { year: 2023, value: 12.7, volume: 4100 }, { year: 2024, value: 13.8, volume: 4400 }, { year: 2025, value: 15.0, volume: 4730 }] },
      { country: 'India', data: [{ year: 2022, value: 6.5, volume: 2020 }, { year: 2023, value: 7.2, volume: 2210 }, { year: 2024, value: 7.9, volume: 2410 }, { year: 2025, value: 8.7, volume: 2630 }] },
      { country: 'Japan', data: [{ year: 2022, value: 3.8, volume: 1040 }, { year: 2023, value: 4.1, volume: 1120 }, { year: 2024, value: 4.5, volume: 1210 }, { year: 2025, value: 4.9, volume: 1310 }] },
      { country: 'United States', data: [{ year: 2022, value: 2.9, volume: 800 }, { year: 2023, value: 3.1, volume: 850 }, { year: 2024, value: 3.4, volume: 920 }, { year: 2025, value: 3.7, volume: 1000 }] },
      { country: 'Philippines', data: [{ year: 2022, value: 2.1, volume: 730 }, { year: 2023, value: 2.4, volume: 830 }, { year: 2024, value: 2.7, volume: 930 }, { year: 2025, value: 3.1, volume: 1050 }] },
    ],
    trends: [
      'Australia\'s AC imports are driven by Newcrest Mining, Northern Star, and Evolution Mining gold operations, plus extensive municipal water treatment.',
      'Proximity to Asia-Pacific suppliers gives China and India freight cost advantages, with combined import share exceeding 60%.',
      'Philippines-sourced coconut shell AC is gaining traction due to quality consistency and competitive pricing for gold recovery applications.',
      'Australia has domestic caustic soda production capacity (Caustic Soda Technologies), partially offsetting import requirements by ~20%.',
    ],
  },
]

type DataMode = 'value' | 'volume' | 'both'

function getTrend(vals: number[]): 'up' | 'down' | 'flat' {
  if (vals.length < 2) return 'flat'
  const pctChange = ((vals[vals.length - 1] - vals[0]) / vals[0]) * 100
  if (pctChange > 5) return 'up'
  if (pctChange < -5) return 'down'
  return 'flat'
}

function calcCAGR(start: number, end: number, years: number): number {
  if (start <= 0 || end <= 0 || years <= 0) return 0
  return (Math.pow(end / start, 1 / years) - 1) * 100
}

const GEOGRAPHIES = ALL_IMPORT_DATA.map(g => g.geography)

export default function ImportAnalysisTable({ title, height }: { title?: string; height?: number }) {
  const [selectedGeo, setSelectedGeo] = useState(GEOGRAPHIES[0])
  const [dataMode, setDataMode] = useState<DataMode>('both')

  const geoData = ALL_IMPORT_DATA.find(g => g.geography === selectedGeo)!
  const importData = geoData.suppliers

  const totalsByYear = YEARS.map(year => {
    const totalValue = importData.reduce((sum, c) => sum + (c.data.find(d => d.year === year)?.value || 0), 0)
    const totalVolume = importData.reduce((sum, c) => sum + (c.data.find(d => d.year === year)?.volume || 0), 0)
    return { year, value: totalValue, volume: totalVolume }
  })

  const latestYear = YEARS[YEARS.length - 1]
  const latestTotal = totalsByYear.find(t => t.year === latestYear)

  return (
    <div>
      {title && <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>}

      {/* Geography Filter */}
      <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-black" />
              <label className="text-sm font-bold text-black">Importing Country</label>
            </div>
            <select
              value={selectedGeo}
              onChange={e => setSelectedGeo(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#52B69A] focus:border-[#52B69A] min-w-[260px] cursor-pointer"
            >
              {GEOGRAPHIES.map(geo => (
                <option key={geo} value={geo}>{geo}</option>
              ))}
            </select>
          </div>
          <span className="text-xs text-black font-medium bg-white px-3 py-1.5 rounded-full border border-gray-200">
            {importData.length} supplying countries
          </span>
        </div>
      </div>

      {/* Data mode toggle */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Show:</span>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          {(['both', 'value', 'volume'] as DataMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setDataMode(mode)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                dataMode === mode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {mode === 'both' ? 'Value & Volume' : mode === 'value' ? 'Value (US$ Mn)' : 'Volume (Tons)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" rowSpan={dataMode === 'both' ? 2 : 1}>
                Supplying Country
              </th>
              {YEARS.map(year => (
                <th key={year} className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={dataMode === 'both' ? 2 : 1}>
                  {year}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" rowSpan={dataMode === 'both' ? 2 : 1}>CAGR (%)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" rowSpan={dataMode === 'both' ? 2 : 1}>Trend</th>
            </tr>
            {dataMode === 'both' && (
              <tr className="bg-gray-50">
                {YEARS.map(year => (
                  <React.Fragment key={year}>
                    <th className="px-3 py-2 text-center text-[10px] font-medium text-gray-500 uppercase">US$ Mn</th>
                    <th className="px-3 py-2 text-center text-[10px] font-medium text-gray-500 uppercase">Tons</th>
                  </React.Fragment>
                ))}
              </tr>
            )}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {importData.map((country, idx) => {
              const values = country.data.map(d => d.value)
              const volumes = country.data.map(d => d.volume)
              const valueCagr = calcCAGR(values[0], values[values.length - 1], YEARS.length - 1)
              const volumeCagr = calcCAGR(volumes[0], volumes[volumes.length - 1], YEARS.length - 1)
              const trend = dataMode === 'volume' ? getTrend(volumes) : getTrend(values)

              return (
                <tr key={idx} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{country.country}</td>
                  {YEARS.map(year => {
                    const d = country.data.find(d => d.year === year)
                    return dataMode === 'both' ? (
                      <React.Fragment key={year}>
                        <td className="px-3 py-3 text-sm text-gray-700 text-center">{d?.value.toFixed(1)}</td>
                        <td className="px-3 py-3 text-sm text-gray-700 text-center">{d?.volume.toLocaleString()}</td>
                      </React.Fragment>
                    ) : dataMode === 'value' ? (
                      <td key={year} className="px-4 py-3 text-sm text-gray-700 text-center">{d?.value.toFixed(1)}</td>
                    ) : (
                      <td key={year} className="px-4 py-3 text-sm text-gray-700 text-center">{d?.volume.toLocaleString()}</td>
                    )
                  })}
                  <td className="px-4 py-3 text-sm text-center font-medium text-gray-900">
                    {dataMode === 'volume' ? volumeCagr.toFixed(1) : valueCagr.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600 mx-auto" />}
                    {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600 mx-auto" />}
                    {trend === 'flat' && <Minus className="w-4 h-4 text-gray-400 mx-auto" />}
                  </td>
                </tr>
              )
            })}
            {/* Total row */}
            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-3 text-sm text-gray-900">Total</td>
              {YEARS.map(year => {
                const t = totalsByYear.find(t => t.year === year)
                return dataMode === 'both' ? (
                  <React.Fragment key={year}>
                    <td className="px-3 py-3 text-sm text-gray-900 text-center">{t?.value.toFixed(1)}</td>
                    <td className="px-3 py-3 text-sm text-gray-900 text-center">{t?.volume.toLocaleString()}</td>
                  </React.Fragment>
                ) : dataMode === 'value' ? (
                  <td key={year} className="px-4 py-3 text-sm text-gray-900 text-center">{t?.value.toFixed(1)}</td>
                ) : (
                  <td key={year} className="px-4 py-3 text-sm text-gray-900 text-center">{t?.volume.toLocaleString()}</td>
                )
              })}
              <td className="px-4 py-3 text-sm text-center text-gray-900">
                {calcCAGR(totalsByYear[0].value, totalsByYear[totalsByYear.length - 1].value, YEARS.length - 1).toFixed(1)}%
              </td>
              <td className="px-4 py-3 text-center"><TrendingUp className="w-4 h-4 text-green-600 mx-auto" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Share of Imports */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">
          Share of Imports by Key / Top 5 Supplying Countries ({selectedGeo})
        </h3>
        <div className="space-y-2">
          {importData.map((country, idx) => {
            const latestData = country.data.find(d => d.year === latestYear)
            const shareValue = latestTotal && latestData ? ((latestData.value / latestTotal.value) * 100) : 0
            return (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-800 w-36">{country.country}</span>
                <div className="flex-1 bg-blue-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#52B69A] to-[#34A0A4] h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${Math.max(shareValue, 8)}%` }}
                  >
                    <span className="text-[10px] font-bold text-white">{shareValue.toFixed(1)}%</span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 w-24 text-right">US$ {latestData?.value.toFixed(1)} Mn</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Import Dependency and Sourcing Trends */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
        <h3 className="text-base font-bold text-gray-900 mb-3">
          Import Dependency and Sourcing Trends — {selectedGeo}
        </h3>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          {geoData.trends.map((trend, idx) => (
            <p key={idx}>{trend}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
