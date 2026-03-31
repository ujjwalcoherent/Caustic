'use client'

import { useState } from 'react'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'

interface Distributor {
  id: number
  companyName: string
  headquartersLocation: string
  coreProductPortfolio: string
  ownershipType: 'Private' | 'Public' | 'Subsidiary'
  decisionMaker: {
    name: string
    designation: string
    email: string
    phone: string
    linkedin: string
  }
}

const SAMPLE_DISTRIBUTORS: Distributor[] = [
  {
    id: 1,
    companyName: 'Brenntag South Africa',
    headquartersLocation: 'Johannesburg, South Africa',
    coreProductPortfolio: 'Caustic Soda, Flocculants, Coagulants, Lime Products',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'Pieter van der Merwe', designation: 'Regional Director', email: 'p.vandermerwe@brenntag.co.za', phone: '+27 11 494 4200', linkedin: 'linkedin.com/in/pietermerwe' }
  },
  {
    id: 2,
    companyName: 'AECI Mining Chemicals',
    headquartersLocation: 'Johannesburg, South Africa',
    coreProductPortfolio: 'Caustic Soda, Cyanide, Flotation Reagents, Flocculants',
    ownershipType: 'Public',
    decisionMaker: { name: 'Sipho Mabena', designation: 'GM - Mining Chemicals', email: 's.mabena@aeci.co.za', phone: '+27 11 806 8700', linkedin: 'linkedin.com/in/siphomabena' }
  },
  {
    id: 3,
    companyName: 'Chemimpo Ghana Ltd.',
    headquartersLocation: 'Accra, Ghana',
    coreProductPortfolio: 'Caustic Soda, Mining Reagents, Water Treatment Chemicals',
    ownershipType: 'Private',
    decisionMaker: { name: 'Emmanuel Owusu', designation: 'Managing Director', email: 'e.owusu@chemimpo.gh', phone: '+233 30 278 0400', linkedin: 'linkedin.com/in/emmanuelowusu' }
  },
  {
    id: 4,
    companyName: 'Univar Solutions Africa',
    headquartersLocation: 'Cape Town, South Africa',
    coreProductPortfolio: 'Caustic Soda, Specialty Chemicals, Water Treatment Solutions',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'Linda Naidoo', designation: 'Sales Director - Africa', email: 'l.naidoo@univar.co.za', phone: '+27 21 929 6500', linkedin: 'linkedin.com/in/lindanaidoo' }
  },
  {
    id: 5,
    companyName: 'Axis House (Pty) Ltd.',
    headquartersLocation: 'Johannesburg, South Africa',
    coreProductPortfolio: 'Caustic Soda Flakes & Pearls, Gold Elution Chemicals',
    ownershipType: 'Private',
    decisionMaker: { name: 'Craig Williams', designation: 'Technical Sales Manager', email: 'c.williams@axishouse.co.za', phone: '+27 11 463 4888', linkedin: 'linkedin.com/in/craigwilliams' }
  },
  {
    id: 6,
    companyName: 'Protea Chemicals (Omnia)',
    headquartersLocation: 'Johannesburg, South Africa',
    coreProductPortfolio: 'Caustic Soda, Mining Chemicals, Agricultural Chemicals',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'Ravi Patel', designation: 'Head of Mining Division', email: 'r.patel@omnia.co.za', phone: '+27 11 709 8888', linkedin: 'linkedin.com/in/ravipatel' }
  },
  {
    id: 7,
    companyName: 'Mintek Chemical Services',
    headquartersLocation: 'Randburg, South Africa',
    coreProductPortfolio: 'Caustic Soda Testing & Supply, Mineral Processing Chemicals',
    ownershipType: 'Public',
    decisionMaker: { name: 'Dr. Nomsa Dlamini', designation: 'Chief Scientist', email: 'n.dlamini@mintek.co.za', phone: '+27 11 709 4111', linkedin: 'linkedin.com/in/nomsadlamini' }
  },
  {
    id: 8,
    companyName: 'Carbon Activated Corporation (Russia)',
    headquartersLocation: 'Moscow, Russia',
    coreProductPortfolio: 'Caustic Soda Flakes, Industrial Grade, Water Treatment Chemicals',
    ownershipType: 'Private',
    decisionMaker: { name: 'Dmitri Volkov', designation: 'Director of Sales', email: 'd.volkov@carbonactivated.ru', phone: '+7 495 258 6300', linkedin: 'linkedin.com/in/dmitrivolkov' }
  },
  {
    id: 9,
    companyName: 'Caustic Soda Technologies (CST)',
    headquartersLocation: 'Melbourne, Australia',
    coreProductPortfolio: 'Caustic Soda Pearls, High Purity Grade, Alkali Solutions',
    ownershipType: 'Private',
    decisionMaker: { name: 'Mark Thompson', designation: 'CEO', email: 'm.thompson@act.com.au', phone: '+61 3 9874 5200', linkedin: 'linkedin.com/in/markthompson' }
  },
  {
    id: 10,
    companyName: 'West African Chemical Industries',
    headquartersLocation: 'Abidjan, Côte d\'Ivoire',
    coreProductPortfolio: 'Caustic Soda, Mining Reagents, Industrial Chemicals',
    ownershipType: 'Private',
    decisionMaker: { name: 'Ousmane Traoré', designation: 'General Manager', email: 'o.traore@waci.ci', phone: '+225 27 20 3200', linkedin: 'linkedin.com/in/ousmanetraore' }
  },
  {
    id: 11,
    companyName: 'DRA Global (Mining Services)',
    headquartersLocation: 'Johannesburg, South Africa',
    coreProductPortfolio: 'Caustic Soda Solutions, Gold Processing, EPC Services',
    ownershipType: 'Public',
    decisionMaker: { name: 'Michael O\'Brien', designation: 'VP Chemical Supply', email: 'm.obrien@draglobal.com', phone: '+27 11 202 8600', linkedin: 'linkedin.com/in/michaelobrien' }
  },
  {
    id: 12,
    companyName: 'Sahel Mining Chemicals SARL',
    headquartersLocation: 'Bamako, Mali',
    coreProductPortfolio: 'Caustic Soda, Cyanide, Lime, Flotation Chemicals',
    ownershipType: 'Private',
    decisionMaker: { name: 'Moussa Keita', designation: 'Operations Director', email: 'm.keita@sahelchem.ml', phone: '+223 20 22 6700', linkedin: 'linkedin.com/in/moussakeita' }
  },
]

type SortKey = 'companyName' | 'headquartersLocation' | 'ownershipType'

export default function DistributorIntelTable({ title, height }: { title?: string; height?: number }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('companyName')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronUp className="w-3 h-3 opacity-30" />
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
  }

  const filtered = SAMPLE_DISTRIBUTORS.filter(d =>
    d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.headquartersLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.coreProductPortfolio.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const valA = a[sortKey]
    const valB = b[sortKey]
    const cmp = valA.localeCompare(valB)
    return sortDir === 'asc' ? cmp : -cmp
  })

  return (
    <div>
      {title && <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filtered.length}</span> of {SAMPLE_DISTRIBUTORS.length} distributors
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search distributors..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg" style={{ maxHeight: height || 600 }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-8">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('companyName')}>
                <div className="flex items-center gap-1">Company Name <SortIcon column="companyName" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('headquartersLocation')}>
                <div className="flex items-center gap-1">Headquarters Location <SortIcon column="headquartersLocation" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Core Product Portfolio (Mining Chemicals)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('ownershipType')}>
                <div className="flex items-center gap-1">Ownership Type <SortIcon column="ownershipType" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={5}>
                Decision-Maker Contact Details
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th colSpan={5}></th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase">Name</th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase">Designation</th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase">Email</th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase">LinkedIn</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((dist, idx) => (
              <tr key={dist.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{dist.companyName}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{dist.headquartersLocation}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{dist.coreProductPortfolio}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    dist.ownershipType === 'Public' ? 'bg-blue-100 text-blue-800' :
                    dist.ownershipType === 'Private' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {dist.ownershipType}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-gray-700">{dist.decisionMaker.name}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{dist.decisionMaker.designation}</td>
                <td className="px-3 py-3 text-sm text-blue-600">{dist.decisionMaker.email}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{dist.decisionMaker.phone}</td>
                <td className="px-3 py-3 text-sm text-blue-600">{dist.decisionMaker.linkedin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
