'use client'

import { useState } from 'react'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'

interface Customer {
  id: number
  companyName: string
  headquartersLocation: string
  keyChemicalsProcured: string
  ownershipType: 'Private' | 'Public' | 'Subsidiary'
  decisionMaker: {
    name: string
    designation: string
    email: string
    phone: string
    linkedin: string
  }
}

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 1,
    companyName: 'AngloGold Ashanti',
    headquartersLocation: 'Johannesburg, South Africa',
    keyChemicalsProcured: 'Caustic Soda Flakes, Standard Industrial Grade',
    ownershipType: 'Public',
    decisionMaker: { name: 'John Smith', designation: 'Head of Procurement', email: 'j.smith@anglogold.com', phone: '+27 11 637 6000', linkedin: 'linkedin.com/in/johnsmith' }
  },
  {
    id: 2,
    companyName: 'Gold Fields Ltd.',
    headquartersLocation: 'Johannesburg, South Africa',
    keyChemicalsProcured: 'Caustic Soda Pearls, High Purity Grade',
    ownershipType: 'Public',
    decisionMaker: { name: 'Sarah Johnson', designation: 'VP Supply Chain', email: 's.johnson@goldfields.com', phone: '+27 11 562 9700', linkedin: 'linkedin.com/in/sarahjohnson' }
  },
  {
    id: 3,
    companyName: 'Newmont Ghana',
    headquartersLocation: 'Accra, Ghana',
    keyChemicalsProcured: 'Caustic Soda Flakes, Technical / Mining Grade',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'Kwame Mensah', designation: 'Procurement Manager', email: 'k.mensah@newmont.com', phone: '+233 30 221 5400', linkedin: 'linkedin.com/in/kwamemensah' }
  },
  {
    id: 4,
    companyName: 'Barrick Gold (Tanzania)',
    headquartersLocation: 'Dar es Salaam, Tanzania',
    keyChemicalsProcured: 'Caustic Soda Flakes, Standard Industrial Grade',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'James Mwanga', designation: 'Chief Procurement Officer', email: 'j.mwanga@barrick.com', phone: '+255 22 260 1100', linkedin: 'linkedin.com/in/jamesmwanga' }
  },
  {
    id: 5,
    companyName: 'Rand Water',
    headquartersLocation: 'Johannesburg, South Africa',
    keyChemicalsProcured: 'Caustic Soda Pearls, Standard Industrial Grade',
    ownershipType: 'Public',
    decisionMaker: { name: 'Thandi Nkosi', designation: 'Director of Operations', email: 't.nkosi@randwater.co.za', phone: '+27 11 682 0911', linkedin: 'linkedin.com/in/thandinko' }
  },
  {
    id: 6,
    companyName: 'SEMAFO (Burkina Faso)',
    headquartersLocation: 'Ouagadougou, Burkina Faso',
    keyChemicalsProcured: 'Caustic Soda Flakes, Technical / Mining Grade',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'Amadou Diallo', designation: 'Supply Chain Director', email: 'a.diallo@semafo.com', phone: '+226 25 37 5200', linkedin: 'linkedin.com/in/amadoudiallo' }
  },
  {
    id: 7,
    companyName: 'Resolute Mining (Mali)',
    headquartersLocation: 'Bamako, Mali',
    keyChemicalsProcured: 'Caustic Soda Pearls, High Purity Grade',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'Ibrahim Touré', designation: 'Procurement Lead', email: 'i.toure@resolute.com', phone: '+223 20 22 5000', linkedin: 'linkedin.com/in/ibrahimtoure' }
  },
  {
    id: 8,
    companyName: 'Polyus Gold',
    headquartersLocation: 'Moscow, Russia',
    keyChemicalsProcured: 'Caustic Soda Flakes, Standard Industrial Grade',
    ownershipType: 'Public',
    decisionMaker: { name: 'Alexei Petrov', designation: 'Head of Procurement', email: 'a.petrov@polyus.com', phone: '+7 495 641 3377', linkedin: 'linkedin.com/in/alexeipetrov' }
  },
  {
    id: 9,
    companyName: 'Newcrest Mining',
    headquartersLocation: 'Melbourne, Australia',
    keyChemicalsProcured: 'Caustic Soda Pearls, Technical / Mining Grade',
    ownershipType: 'Public',
    decisionMaker: { name: 'David Clarke', designation: 'VP Operations', email: 'd.clarke@newcrest.com', phone: '+61 3 9522 5333', linkedin: 'linkedin.com/in/davidclarke' }
  },
  {
    id: 10,
    companyName: 'Société des Mines de Tongon',
    headquartersLocation: 'Abidjan, Côte d\'Ivoire',
    keyChemicalsProcured: 'Caustic Soda Flakes, High Purity Grade',
    ownershipType: 'Subsidiary',
    decisionMaker: { name: 'Yao Kouadio', designation: 'Operations Manager', email: 'y.kouadio@tongon.ci', phone: '+225 27 20 3100', linkedin: 'linkedin.com/in/yaokouadio' }
  },
  {
    id: 11,
    companyName: 'Caledonia Mining (Zimbabwe)',
    headquartersLocation: 'Harare, Zimbabwe',
    keyChemicalsProcured: 'Caustic Soda Pearls, Standard Industrial Grade',
    ownershipType: 'Public',
    decisionMaker: { name: 'Tendai Moyo', designation: 'Procurement Director', email: 't.moyo@caledoniamining.com', phone: '+263 24 275 2368', linkedin: 'linkedin.com/in/tendaimoyo' }
  },
  {
    id: 12,
    companyName: 'Société Minière de Dinguiraye',
    headquartersLocation: 'Conakry, Guinea',
    keyChemicalsProcured: 'Caustic Soda Flakes, Technical / Mining Grade',
    ownershipType: 'Private',
    decisionMaker: { name: 'Mamadou Barry', designation: 'Chief Buyer', email: 'm.barry@smd-guinea.com', phone: '+224 30 45 1200', linkedin: 'linkedin.com/in/mamadoubarry' }
  },
]

type SortKey = 'companyName' | 'headquartersLocation' | 'ownershipType'

export default function CustomerIntelTable({ title, height }: { title?: string; height?: number }) {
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

  const filtered = SAMPLE_CUSTOMERS.filter(c =>
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.headquartersLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.keyChemicalsProcured.toLowerCase().includes(searchTerm.toLowerCase())
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
          Showing <span className="font-semibold">{filtered.length}</span> of {SAMPLE_CUSTOMERS.length} customers
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Key Chemicals Procured</th>
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
            {filtered.map((customer, idx) => (
              <tr key={customer.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{customer.companyName}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{customer.headquartersLocation}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{customer.keyChemicalsProcured}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    customer.ownershipType === 'Public' ? 'bg-blue-100 text-blue-800' :
                    customer.ownershipType === 'Private' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {customer.ownershipType}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-gray-700">{customer.decisionMaker.name}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{customer.decisionMaker.designation}</td>
                <td className="px-3 py-3 text-sm text-blue-600">{customer.decisionMaker.email}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{customer.decisionMaker.phone}</td>
                <td className="px-3 py-3 text-sm text-blue-600">{customer.decisionMaker.linkedin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
