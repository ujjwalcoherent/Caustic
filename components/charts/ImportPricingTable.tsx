'use client'

import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react'

interface CountryPricingData {
  country: string
  prices: { year: number; price: number }[]
}

interface GeographyPricing {
  geography: string
  suppliers: CountryPricingData[]
  variationNote: string
  trends: string[]
}

const YEARS = [2022, 2023, 2024, 2025]

const ALL_PRICING_DATA: GeographyPricing[] = [
  {
    geography: 'South Africa',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3055 }, { year: 2023, price: 3105 }, { year: 2024, price: 3155 }, { year: 2025, price: 3215 }] },
      { country: 'India', prices: [{ year: 2022, price: 3220 }, { year: 2023, price: 3340 }, { year: 2024, price: 3430 }, { year: 2025, price: 3465 }] },
      { country: 'United States', prices: [{ year: 2022, price: 3630 }, { year: 2023, price: 3680 }, { year: 2024, price: 3690 }, { year: 2025, price: 3670 }] },
      { country: 'Netherlands', prices: [{ year: 2022, price: 3155 }, { year: 2023, price: 3205 }, { year: 2024, price: 3250 }, { year: 2025, price: 3305 }] },
      { country: 'Japan', prices: [{ year: 2022, price: 3660 }, { year: 2023, price: 3660 }, { year: 2024, price: 3660 }, { year: 2025, price: 3675 }] },
    ],
    variationNote: 'South Africa benefits from competitive freight rates from Asia. Chinese coal-based AC lands at the lowest cost, while US and Japanese premium-grade AC commands a 14-15% price premium for specialized gold recovery applications.',
    trends: [
      'Average import prices have risen moderately at ~1.2% annually, below global inflation, reflecting competitive supplier dynamics and Rand depreciation buffering USD-denominated contracts.',
      'Chinese suppliers maintain price leadership through economies of scale in coal-based GAC, offering CIF Durban terms that include freight, keeping landed costs predictable.',
      'US and Japanese suppliers command premium pricing for high-activity coconut shell-based AC used in CIL/CIP circuits at AngloGold and Gold Fields operations.',
      'Local reactivation services (at ~60% of virgin AC cost) are creating price pressure on imported virgin carbon, particularly for lower-specification water treatment applications.',
    ],
  },
  {
    geography: 'Ghana',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3050 }, { year: 2023, price: 3100 }, { year: 2024, price: 3160 }, { year: 2025, price: 3230 }] },
      { country: 'India', prices: [{ year: 2022, price: 3210 }, { year: 2023, price: 3290 }, { year: 2024, price: 3380 }, { year: 2025, price: 3450 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3330 }, { year: 2023, price: 3400 }, { year: 2024, price: 3470 }, { year: 2025, price: 3540 }] },
      { country: 'United States', prices: [{ year: 2022, price: 3720 }, { year: 2023, price: 3760 }, { year: 2024, price: 3800 }, { year: 2025, price: 3810 }] },
      { country: 'Netherlands', prices: [{ year: 2022, price: 3220 }, { year: 2023, price: 3280 }, { year: 2024, price: 3340 }, { year: 2025, price: 3400 }] },
    ],
    variationNote: 'Ghana\'s Tema and Takoradi ports offer direct Asian shipping lanes, keeping Chinese AC competitively priced. South African reactivated carbon adds a mid-tier pricing option between Asian bulk and US premium grades.',
    trends: [
      'Import pricing has been stable with ~2% annual increases, aided by Ghana Cedi depreciation making USD-priced imports relatively more expensive but offset by bulk procurement contracts.',
      'Newmont and Gold Fields negotiate annual frame agreements with Chinese suppliers, locking in prices 6-12 months ahead to mitigate volatility.',
      'South African suppliers offer reactivated carbon at $3,400-3,540/Ton, positioning between virgin Chinese AC and premium US/Japanese products.',
      'Netherlands-sourced AC benefits from competitive Rotterdam-Tema shipping rates, keeping European product within 6% of Chinese pricing.',
    ],
  },
  {
    geography: 'Mali',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3180 }, { year: 2023, price: 3240 }, { year: 2024, price: 3310 }, { year: 2025, price: 3380 }] },
      { country: 'India', prices: [{ year: 2022, price: 3350 }, { year: 2023, price: 3420 }, { year: 2024, price: 3500 }, { year: 2025, price: 3580 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3480 }, { year: 2023, price: 3550 }, { year: 2024, price: 3620 }, { year: 2025, price: 3700 }] },
      { country: 'France', prices: [{ year: 2022, price: 3550 }, { year: 2023, price: 3610 }, { year: 2024, price: 3670 }, { year: 2025, price: 3740 }] },
      { country: 'Netherlands', prices: [{ year: 2022, price: 3400 }, { year: 2023, price: 3460 }, { year: 2024, price: 3530 }, { year: 2025, price: 3600 }] },
    ],
    variationNote: 'Landlocked Mali faces 15-20% higher landed costs versus coastal nations due to inland freight from Dakar/Abidjan ports. This narrows the China-Europe price gap as logistics costs equalize.',
    trends: [
      'Pricing is structurally higher than coastal West African nations due to ~$400-500/Ton additional overland transport costs from Dakar or Abidjan.',
      'Chinese suppliers offer DDP (Delivered Duty Paid) terms to Bamako, absorbing logistics complexity and maintaining competitive positioning.',
      'French suppliers leverage established Franco-Malian logistics corridors, though pricing remains at a 10% premium versus Chinese alternatives.',
      'Security-related supply disruptions in 2024 created temporary spot price spikes of 8-12% above contracted rates.',
    ],
  },
  {
    geography: 'Burkina Faso',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3200 }, { year: 2023, price: 3260 }, { year: 2024, price: 3330 }, { year: 2025, price: 3400 }] },
      { country: 'India', prices: [{ year: 2022, price: 3370 }, { year: 2023, price: 3440 }, { year: 2024, price: 3520 }, { year: 2025, price: 3600 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3500 }, { year: 2023, price: 3570 }, { year: 2024, price: 3650 }, { year: 2025, price: 3730 }] },
      { country: 'France', prices: [{ year: 2022, price: 3580 }, { year: 2023, price: 3640 }, { year: 2024, price: 3710 }, { year: 2025, price: 3780 }] },
      { country: 'Netherlands', prices: [{ year: 2022, price: 3420 }, { year: 2023, price: 3480 }, { year: 2024, price: 3550 }, { year: 2025, price: 3620 }] },
    ],
    variationNote: 'Similar to Mali, Burkina Faso\'s landlocked position inflates landed costs. Transit via Abidjan or Lomé ports adds $350-450/Ton, compressing supplier price differentials.',
    trends: [
      'Pricing trends mirror Mali with ~6% premium over coastal markets. Endeavour Mining and IAMGOLD absorb higher logistics costs given robust gold margins.',
      'Chinese suppliers dominate on price but Indian coconut shell-based AC is gaining share due to superior gold adsorption properties.',
      'Sahel security situation has increased insurance and escort costs for overland transport, adding ~$50-80/Ton to delivered prices since 2023.',
      'Mining operators are exploring air freight for urgent AC resupply at $5,000+/Ton, highlighting the supply chain vulnerability premium.',
    ],
  },
  {
    geography: 'Tanzania',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3060 }, { year: 2023, price: 3110 }, { year: 2024, price: 3170 }, { year: 2025, price: 3230 }] },
      { country: 'India', prices: [{ year: 2022, price: 3150 }, { year: 2023, price: 3220 }, { year: 2024, price: 3300 }, { year: 2025, price: 3370 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3340 }, { year: 2023, price: 3410 }, { year: 2024, price: 3480 }, { year: 2025, price: 3550 }] },
      { country: 'Japan', prices: [{ year: 2022, price: 3600 }, { year: 2023, price: 3620 }, { year: 2024, price: 3640 }, { year: 2025, price: 3660 }] },
      { country: 'United States', prices: [{ year: 2022, price: 3650 }, { year: 2023, price: 3690 }, { year: 2024, price: 3710 }, { year: 2025, price: 3720 }] },
    ],
    variationNote: 'Tanzania benefits from Indian Ocean proximity to Asian suppliers, with Dar es Salaam port offering competitive CIF rates. India-Tanzania shipping costs are among the lowest in the African AC trade.',
    trends: [
      'Indian suppliers have the strongest pricing advantage due to short Mumbai-Dar es Salaam shipping routes (~12 days transit vs 35+ days from China).',
      'Barrick Gold\'s North Mara and Bulyanhulu operations negotiate multi-year contracts, achieving 3-5% volume discounts below spot prices.',
      'Government-mandated local content policies may introduce import levies, potentially adding $100-200/Ton to landed costs from 2026.',
      'Japanese premium AC pricing remains stable at ~$3,660/Ton, justified by higher gold recovery rates in Geita mine CIL circuits.',
    ],
  },
  {
    geography: "Côte d'Ivoire",
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3040 }, { year: 2023, price: 3090 }, { year: 2024, price: 3150 }, { year: 2025, price: 3210 }] },
      { country: 'India', prices: [{ year: 2022, price: 3200 }, { year: 2023, price: 3270 }, { year: 2024, price: 3350 }, { year: 2025, price: 3420 }] },
      { country: 'France', prices: [{ year: 2022, price: 3380 }, { year: 2023, price: 3440 }, { year: 2024, price: 3500 }, { year: 2025, price: 3560 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3350 }, { year: 2023, price: 3420 }, { year: 2024, price: 3490 }, { year: 2025, price: 3560 }] },
      { country: 'Netherlands', prices: [{ year: 2022, price: 3180 }, { year: 2023, price: 3240 }, { year: 2024, price: 3300 }, { year: 2025, price: 3370 }] },
    ],
    variationNote: 'Abidjan\'s deep-water port provides excellent access to global shipping lanes, keeping import prices competitive. Netherlands-sourced AC benefits from direct Rotterdam-Abidjan container services.',
    trends: [
      'Côte d\'Ivoire enjoys some of the lowest landed AC costs in West Africa due to Abidjan\'s efficient port infrastructure and direct shipping lanes.',
      'French suppliers leverage CFA Franc zone trade advantages, offering euro-denominated pricing with favorable payment terms.',
      'The country\'s role as a regional AC distribution hub for landlocked neighbors adds re-export margins of 8-12% to transit volumes.',
      'Emerging water treatment demand is creating price segmentation, with PAC for potable water commanding 15-20% premium over mining-grade GAC.',
    ],
  },
  {
    geography: 'Zimbabwe',
    suppliers: [
      { country: 'South Africa', prices: [{ year: 2022, price: 3230 }, { year: 2023, price: 3300 }, { year: 2024, price: 3370 }, { year: 2025, price: 3440 }] },
      { country: 'China', prices: [{ year: 2022, price: 3100 }, { year: 2023, price: 3160 }, { year: 2024, price: 3220 }, { year: 2025, price: 3290 }] },
      { country: 'India', prices: [{ year: 2022, price: 3280 }, { year: 2023, price: 3360 }, { year: 2024, price: 3440 }, { year: 2025, price: 3520 }] },
      { country: 'United States', prices: [{ year: 2022, price: 3700 }, { year: 2023, price: 3740 }, { year: 2024, price: 3770 }, { year: 2025, price: 3790 }] },
      { country: 'Netherlands', prices: [{ year: 2022, price: 3350 }, { year: 2023, price: 3410 }, { year: 2024, price: 3470 }, { year: 2025, price: 3540 }] },
    ],
    variationNote: 'Zimbabwe sources heavily from South Africa via road freight (Beitbridge corridor), adding ~$150-200/Ton vs Durban port prices. Chinese AC transiting through Beira (Mozambique) offers a competitive alternative.',
    trends: [
      'South African suppliers command a proximity premium but offer faster delivery (3-5 days road freight vs 6-8 weeks sea freight from Asia).',
      'USD-denominated pricing is standard due to ZWL instability, with most contracts settled in hard currency through offshore accounts.',
      'Caledonia Mining has shifted toward longer-term Chinese supply contracts to lock in lower base prices despite longer lead times.',
      'US-sourced premium AC is limited to specialized applications, with pricing at ~$3,790/Ton reflecting both product quality and sanctions-era supply chain complexity.',
    ],
  },
  {
    geography: 'Democratic Republic of the Congo',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3180 }, { year: 2023, price: 3240 }, { year: 2024, price: 3310 }, { year: 2025, price: 3380 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3350 }, { year: 2023, price: 3420 }, { year: 2024, price: 3500 }, { year: 2025, price: 3580 }] },
      { country: 'India', prices: [{ year: 2022, price: 3300 }, { year: 2023, price: 3380 }, { year: 2024, price: 3460 }, { year: 2025, price: 3540 }] },
      { country: 'Belgium', prices: [{ year: 2022, price: 3520 }, { year: 2023, price: 3580 }, { year: 2024, price: 3640 }, { year: 2025, price: 3710 }] },
      { country: 'Tanzania', prices: [{ year: 2022, price: 3280 }, { year: 2023, price: 3340 }, { year: 2024, price: 3400 }, { year: 2025, price: 3470 }] },
    ],
    variationNote: 'DRC faces the highest logistics premiums in the region. Eastern provinces add 25-35% to landed costs versus Kinshasa-accessible sites due to poor road infrastructure and security requirements.',
    trends: [
      'Pricing is structurally elevated due to complex multi-modal logistics (sea + river + road), adding $300-500/Ton above FOB prices.',
      'Belgian suppliers maintain presence through historical trade links, commanding premium pricing but offering reliable delivery to Lubumbashi via established corridors.',
      'Tanzania-sourced AC (via Dar es Salaam to eastern DRC) is emerging as a cost-effective alternative for Kibali and other eastern operations.',
      'Security escort costs for overland AC transport in eastern provinces add $80-120/Ton, a unique cost factor not present in other African markets.',
    ],
  },
  {
    geography: 'Guinea',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3070 }, { year: 2023, price: 3130 }, { year: 2024, price: 3190 }, { year: 2025, price: 3260 }] },
      { country: 'India', prices: [{ year: 2022, price: 3240 }, { year: 2023, price: 3310 }, { year: 2024, price: 3390 }, { year: 2025, price: 3470 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3400 }, { year: 2023, price: 3470 }, { year: 2024, price: 3540 }, { year: 2025, price: 3620 }] },
      { country: 'France', prices: [{ year: 2022, price: 3450 }, { year: 2023, price: 3510 }, { year: 2024, price: 3580 }, { year: 2025, price: 3650 }] },
      { country: 'Netherlands', prices: [{ year: 2022, price: 3300 }, { year: 2023, price: 3360 }, { year: 2024, price: 3430 }, { year: 2025, price: 3500 }] },
    ],
    variationNote: 'Conakry port provides direct Atlantic access, keeping Asian import costs competitive. French suppliers maintain premium positioning through established trade finance and CFA zone advantages.',
    trends: [
      'Chinese CIF Conakry pricing is among the lowest in West Africa at ~$3,260/Ton, reflecting direct container shipping from Shenzhen/Shanghai.',
      'Political instability has not materially impacted pricing, though payment guarantee requirements have increased, adding ~2-3% to effective costs.',
      'Indian coconut shell-based AC commands a ~6% premium over Chinese coal-based AC, justified by superior gold adsorption characteristics.',
      'Small market size limits bulk discount negotiation power, with Guinea-based miners paying 3-5% above Ghana benchmark prices.',
    ],
  },
  {
    geography: 'Sudan',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3150 }, { year: 2023, price: 3220 }, { year: 2024, price: 3350 }, { year: 2025, price: 3300 }] },
      { country: 'India', prices: [{ year: 2022, price: 3310 }, { year: 2023, price: 3380 }, { year: 2024, price: 3520 }, { year: 2025, price: 3460 }] },
      { country: 'United Arab Emirates', prices: [{ year: 2022, price: 3400 }, { year: 2023, price: 3460 }, { year: 2024, price: 3600 }, { year: 2025, price: 3550 }] },
      { country: 'Saudi Arabia', prices: [{ year: 2022, price: 3450 }, { year: 2023, price: 3510 }, { year: 2024, price: 3650 }, { year: 2025, price: 3600 }] },
      { country: 'South Africa', prices: [{ year: 2022, price: 3380 }, { year: 2023, price: 3450 }, { year: 2024, price: 3580 }, { year: 2025, price: 3530 }] },
    ],
    variationNote: 'Sudan pricing is highly volatile due to civil conflict, with 2024 seeing 5-8% price spikes across all suppliers before partial normalization in 2025. Port Sudan access disruptions drive pricing uncertainty.',
    trends: [
      'Conflict-driven supply disruptions caused 2024 price spikes of 5-8% across all supplier countries, with partial normalization in 2025.',
      'UAE-based re-exporters charge 8-10% premiums over direct sourcing, reflecting risk pricing for conflict-zone delivery.',
      'Artisanal gold mining sector is less price-sensitive, absorbing higher costs due to favorable gold prices and limited supplier alternatives.',
      'Payment mechanisms have shifted to cash-in-advance or letter of credit terms, increasing effective procurement costs by 3-5%.',
    ],
  },
  {
    geography: 'Russia',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 2950 }, { year: 2023, price: 2890 }, { year: 2024, price: 2920 }, { year: 2025, price: 2960 }] },
      { country: 'India', prices: [{ year: 2022, price: 3180 }, { year: 2023, price: 3100 }, { year: 2024, price: 3140 }, { year: 2025, price: 3190 }] },
      { country: 'Kazakhstan', prices: [{ year: 2022, price: 3100 }, { year: 2023, price: 3050 }, { year: 2024, price: 3080 }, { year: 2025, price: 3120 }] },
      { country: 'Belarus', prices: [{ year: 2022, price: 3200 }, { year: 2023, price: 3150 }, { year: 2024, price: 3170 }, { year: 2025, price: 3210 }] },
      { country: 'Turkey', prices: [{ year: 2022, price: 3350 }, { year: 2023, price: 3280 }, { year: 2024, price: 3310 }, { year: 2025, price: 3360 }] },
    ],
    variationNote: 'Russia benefits from the lowest global AC import prices due to Chinese overland rail delivery (avoiding sea freight) and ruble-denominated bilateral trade agreements that reduce currency conversion costs.',
    trends: [
      'Post-sanctions supplier restructuring actually reduced import prices by 2-3% as Western premium suppliers were replaced by competitively-priced Chinese and CIS alternatives.',
      'China-Russia rail freight via the Trans-Siberian corridor offers $2,960/Ton delivered pricing — among the lowest globally for AC imports.',
      'Kazakhstan and Belarus offer CIS free-trade zone benefits, with zero import duties keeping landed costs competitive despite smaller production scale.',
      'Ruble payment acceptance by Chinese and Indian suppliers eliminates FX conversion costs, providing an effective 2-4% discount versus USD-denominated markets.',
    ],
  },
  {
    geography: 'Australia',
    suppliers: [
      { country: 'China', prices: [{ year: 2022, price: 3080 }, { year: 2023, price: 3130 }, { year: 2024, price: 3180 }, { year: 2025, price: 3240 }] },
      { country: 'India', prices: [{ year: 2022, price: 3220 }, { year: 2023, price: 3280 }, { year: 2024, price: 3340 }, { year: 2025, price: 3400 }] },
      { country: 'Japan', prices: [{ year: 2022, price: 3650 }, { year: 2023, price: 3670 }, { year: 2024, price: 3690 }, { year: 2025, price: 3710 }] },
      { country: 'United States', prices: [{ year: 2022, price: 3620 }, { year: 2023, price: 3660 }, { year: 2024, price: 3700 }, { year: 2025, price: 3740 }] },
      { country: 'Philippines', prices: [{ year: 2022, price: 2880 }, { year: 2023, price: 2940 }, { year: 2024, price: 3000 }, { year: 2025, price: 3060 }] },
    ],
    variationNote: 'Australia\'s proximity to Asia-Pacific suppliers results in competitive freight costs. Philippines coconut shell-based AC is the lowest-cost option, while Japan and US premium products serve specialized gold recovery needs.',
    trends: [
      'Philippines-sourced coconut shell AC offers the best value at ~$3,060/Ton, benefiting from short Manila-Sydney shipping routes (~14 days).',
      'Australian importers face minimal logistics premiums due to efficient port infrastructure and proximity to Asia-Pacific production centers.',
      'Domestic caustic soda production (Caustic Soda Technologies) offers local product at competitive pricing, creating pressure on imported caustic soda.',
      'Japan and US premium pricing ($3,710-3,740/Ton) is justified for Newcrest and Northern Star\'s high-grade CIL circuits requiring consistent carbon activity levels.',
    ],
  },
]

const GEOGRAPHIES = ALL_PRICING_DATA.map(g => g.geography)

function calcCAGR(start: number, end: number, years: number): number {
  if (start <= 0 || end <= 0 || years <= 0) return 0
  return (Math.pow(end / start, 1 / years) - 1) * 100
}

function getTrend(vals: number[]): 'up' | 'down' | 'flat' {
  if (vals.length < 2) return 'flat'
  const pctChange = ((vals[vals.length - 1] - vals[0]) / vals[0]) * 100
  if (pctChange > 2) return 'up'
  if (pctChange < -2) return 'down'
  return 'flat'
}

export default function ImportPricingTable({ title, height }: { title?: string; height?: number }) {
  const [selectedGeo, setSelectedGeo] = useState(GEOGRAPHIES[0])

  const geoData = ALL_PRICING_DATA.find(g => g.geography === selectedGeo)!
  const pricingData = geoData.suppliers
  const latestYear = YEARS[YEARS.length - 1]

  const avgByYear = YEARS.map(year => {
    const prices = pricingData.map(c => c.prices.find(p => p.year === year)?.price || 0)
    return { year, avg: prices.reduce((a, b) => a + b, 0) / prices.length }
  })

  const latestPrices = pricingData.map(c => ({
    country: c.country,
    price: c.prices.find(p => p.year === latestYear)?.price || 0,
  }))
  const minPrice = latestPrices.reduce((min, c) => c.price < min.price ? c : min, latestPrices[0])
  const maxPrice = latestPrices.reduce((max, c) => c.price > max.price ? c : max, latestPrices[0])

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
            {pricingData.length} supplying countries
          </span>
        </div>
      </div>

      {/* Main Pricing Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Supplying Country</th>
              {YEARS.map(year => (
                <th key={year} className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">{year} (US$/Ton)</th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Change (%)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pricingData.map((country, idx) => {
              const prices = country.prices.map(p => p.price)
              const change = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100
              const trend = getTrend(prices)
              const isMin = country.country === minPrice.country
              const isMax = country.country === maxPrice.country

              return (
                <tr key={idx} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {country.country}
                    {isMin && <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Lowest</span>}
                    {isMax && <span className="ml-2 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-medium">Highest</span>}
                  </td>
                  {YEARS.map(year => {
                    const p = country.prices.find(p => p.year === year)
                    return (
                      <td key={year} className="px-4 py-3 text-sm text-gray-700 text-center">${p?.price.toLocaleString()}</td>
                    )
                  })}
                  <td className={`px-4 py-3 text-sm text-center font-medium ${change > 0 ? 'text-green-700' : change < 0 ? 'text-red-700' : 'text-gray-600'}`}>
                    {change > 0 ? '+' : ''}{change.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600 mx-auto" />}
                    {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600 mx-auto" />}
                    {trend === 'flat' && <Minus className="w-4 h-4 text-gray-400 mx-auto" />}
                  </td>
                </tr>
              )
            })}
            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-3 text-sm text-gray-900">Average</td>
              {avgByYear.map(a => (
                <td key={a.year} className="px-4 py-3 text-sm text-gray-900 text-center">${Math.round(a.avg).toLocaleString()}</td>
              ))}
              <td className="px-4 py-3 text-sm text-center text-gray-900">
                {((avgByYear[avgByYear.length - 1].avg - avgByYear[0].avg) / avgByYear[0].avg * 100) > 0 ? '+' : ''}
                {((avgByYear[avgByYear.length - 1].avg - avgByYear[0].avg) / avgByYear[0].avg * 100).toFixed(1)}%
              </td>
              <td className="px-4 py-3 text-center"><TrendingUp className="w-4 h-4 text-green-600 mx-auto" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Price Variation Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">
          Price Variation Across Supplier Countries — {selectedGeo}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border border-blue-100 text-center">
            <p className="text-xs text-gray-500 mb-1">Lowest Price ({latestYear})</p>
            <p className="text-xl font-bold text-green-700">${minPrice.price.toLocaleString()}/Ton</p>
            <p className="text-sm text-gray-600">{minPrice.country}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100 text-center">
            <p className="text-xs text-gray-500 mb-1">Highest Price ({latestYear})</p>
            <p className="text-xl font-bold text-red-700">${maxPrice.price.toLocaleString()}/Ton</p>
            <p className="text-sm text-gray-600">{maxPrice.country}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100 text-center">
            <p className="text-xs text-gray-500 mb-1">Price Spread ({latestYear})</p>
            <p className="text-xl font-bold text-gray-900">${(maxPrice.price - minPrice.price).toLocaleString()}/Ton</p>
            <p className="text-sm text-gray-600">{((maxPrice.price - minPrice.price) / minPrice.price * 100).toFixed(1)}% differential</p>
          </div>
        </div>
        <p className="text-sm text-gray-700">{geoData.variationNote}</p>
      </div>

      {/* Key Pricing Trends */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
        <h3 className="text-base font-bold text-gray-900 mb-3">
          Key Pricing Trends and Observations — {selectedGeo}
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
