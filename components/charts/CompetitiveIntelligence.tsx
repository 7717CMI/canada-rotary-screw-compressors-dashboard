'use client'

import { useState } from 'react'

interface OEMData {
  // OEM Information
  oemManufacturerName: string
  hqCountry: string
  primaryProductFocus: string
  technologyFocus: string
  marketShareCanada: string
  keyEndUseFocus: string
  // Channel & Support
  goToMarketChannels: string
  serviceAftermarketStrength: string
  typicalPositioning: string
  keyDistributorIntegratorApproach: string
  // CMI Insights
  keyInsights: string
}

interface DistributorData {
  // Partner Profile
  distributorName: string
  parentGroupHoldingCompany: string
  hqCountry: string
  provincesCovered: string
  keyOEMBrandsCarried: string
  channelType: string
  keyCompressorTypesCovered: string
  serviceCapability: string
  endUseFocus: string
  // Contact Details
  keyContactPerson: string
  designation: string
  email: string
  phoneWhatsApp: string
  linkedIn: string
  website: string
  // Fit & Opportunity
  competitiveStrengths: string
  gapsWeaknesses: string
}

// Rotary screw compressor OEM manufacturers in Canada market
const oemData: OEMData[] = [
  {
    oemManufacturerName: 'Atlas Copco AB',
    hqCountry: 'Sweden',
    primaryProductFocus: 'Oil-injected Rotary Screw, Oil-free Rotary Screw, Centrifugal',
    technologyFocus: 'VSD Technology, IoT Smart Monitoring (SMARTLINK), Energy Recovery',
    marketShareCanada: '~25%',
    keyEndUseFocus: 'Automotive, Pharma, Food & Beverage, General Industry',
    goToMarketChannels: 'Direct OEM Sales, Authorized Dealer Network, Digital',
    serviceAftermarketStrength: 'Very Strong – SMARTLINK remote monitoring, pan-Canada network',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'Exclusive authorized dealers, direct key accounts',
    keyInsights: 'Market leader in Canada; strong VSD and oil-free penetration; digital service platform'
  },
  {
    oemManufacturerName: 'Ingersoll Rand Inc.',
    hqCountry: 'Ireland (USA Operations)',
    primaryProductFocus: 'Oil-injected Rotary Screw, Oil-free, Reciprocating',
    technologyFocus: 'Intellisys VSD Control, Predictive Maintenance, Multi-Stage Systems',
    marketShareCanada: '~20%',
    keyEndUseFocus: 'Manufacturing, Oil & Gas, Energy, General Industry',
    goToMarketChannels: 'Direct Sales, Authorized Distributor Network',
    serviceAftermarketStrength: 'Strong – 24/7 service contracts, coast-to-coast coverage',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Authorized service dealers, M&A-backed distribution expansion',
    keyInsights: "Strong brand legacy; expanding VSD and connected systems across Canada's industrial sector"
  },
  {
    oemManufacturerName: 'Kaeser Kompressoren SE',
    hqCountry: 'Germany',
    primaryProductFocus: 'Oil-injected Rotary Screw, Oil-free, Blowers',
    technologyFocus: 'Sigma Control Smart Systems, Heat Recovery, Compressed Air Auditing',
    marketShareCanada: '~14%',
    keyEndUseFocus: 'Food & Beverage, Automotive, Pharma, Energy',
    goToMarketChannels: 'Direct Sales, Kaeser Dealer Network, Energy Audit Programs',
    serviceAftermarketStrength: 'Strong – Sigma Air Manager remote monitoring, national service teams',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'Certified system partners, direct key account sales',
    keyInsights: 'Differentiated by compressed air auditing and system optimization; strong in energy-intensive industries'
  },
  {
    oemManufacturerName: 'ELGi Equipments Limited',
    hqCountry: 'India',
    primaryProductFocus: 'Oil-injected Rotary Screw, Reciprocating',
    technologyFocus: 'Cost-competitive VSD, Rapid Deployment Solutions',
    marketShareCanada: '~8%',
    keyEndUseFocus: 'General Manufacturing, Food Processing, Automotive',
    goToMarketChannels: 'Authorized Distributors, Regional Dealer Network',
    serviceAftermarketStrength: 'Growing – expanding Canadian dealer network',
    typicalPositioning: 'Value to Mid',
    keyDistributorIntegratorApproach: 'Independent distributors, regional dealers',
    keyInsights: 'Fast-growing challenger; competitive TCO positioning; building Canadian after-sales capability'
  },
  {
    oemManufacturerName: 'Hitachi Industrial Equipment Systems Co., Ltd.',
    hqCountry: 'Japan',
    primaryProductFocus: 'Oil-free Rotary Screw, Oil-injected Rotary Screw',
    technologyFocus: 'Oil-Free High-Purity Air Systems, Industrial-Grade Reliability',
    marketShareCanada: '~6%',
    keyEndUseFocus: 'Pharmaceuticals, Food & Beverage, Electronics',
    goToMarketChannels: 'Authorized Distributors, OEM Partners',
    serviceAftermarketStrength: 'Moderate – partner-dependent service network',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'OEM partnerships, authorized regional distributors',
    keyInsights: 'Strong oil-free reputation; pharma and food-grade air focus; growing Canadian presence'
  },
  {
    oemManufacturerName: 'Kobelco Compressors Corporation',
    hqCountry: 'Japan',
    primaryProductFocus: 'Large Oil-free Rotary Screw, Centrifugal, Custom Systems',
    technologyFocus: 'Custom Engineering Solutions, CO2 Reduction Programs',
    marketShareCanada: '~5%',
    keyEndUseFocus: 'Oil & Gas, Large Industrial, Energy & Utilities',
    goToMarketChannels: 'Direct Sales, EPC Contractors, Project Basis',
    serviceAftermarketStrength: 'Moderate – project and OEM service basis',
    typicalPositioning: 'Premium (large systems)',
    keyDistributorIntegratorApproach: 'EPC contractors, direct project sales',
    keyInsights: 'Niche heavy-industry player; strong in large-scale and custom compression projects'
  },
  {
    oemManufacturerName: 'Anest Iwata Corporation',
    hqCountry: 'Japan',
    primaryProductFocus: 'Compact Oil-free Rotary Screw, Medical Grade, Scroll',
    technologyFocus: 'Oil-Free Compact Systems, Medical/Pharma Grade Air',
    marketShareCanada: '~4%',
    keyEndUseFocus: 'Medical, Pharmaceuticals, Electronics, General Industrial',
    goToMarketChannels: 'Authorized Dealer Network, Medical Equipment Channels',
    serviceAftermarketStrength: 'Moderate – dealer-dependent service',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Specialized dealers, medical equipment distributors',
    keyInsights: 'Strong in compact oil-free; growing medical and pharma-grade segment in Canada'
  },
  {
    oemManufacturerName: 'Mattei Compressors Inc.',
    hqCountry: 'Italy',
    primaryProductFocus: 'Rotary Vane Compressors, Oil-injected',
    technologyFocus: 'Rotary Vane Technology, Low-Noise Operation, Long Service Life',
    marketShareCanada: '~3%',
    keyEndUseFocus: 'Automotive, General Manufacturing, Service Industries',
    goToMarketChannels: 'Authorized Dealers, Service Partners',
    serviceAftermarketStrength: 'Moderate – specialized dealer network',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Authorized service dealer network',
    keyInsights: 'Unique rotary vane technology; long product life positioning; niche player in Canada'
  }
]

// Canada compressor distributors
const distributorData: DistributorData[] = [
  {
    distributorName: 'Atlas Copco Canada Inc.',
    parentGroupHoldingCompany: 'Atlas Copco AB',
    hqCountry: 'Canada (Sweden)',
    provincesCovered: 'Ontario, Quebec, BC, Alberta, National',
    keyOEMBrandsCarried: 'Atlas Copco (exclusive)',
    channelType: 'OEM Direct / Authorized Dealer',
    keyCompressorTypesCovered: 'Oil-injected Rotary Screw, Oil-free, Centrifugal',
    serviceCapability: 'SMARTLINK remote monitoring, 24/7 emergency service',
    endUseFocus: 'Automotive, Pharma, Food & Beverage, General Industry',
    keyContactPerson: 'David Tremblay',
    designation: 'National Sales Manager - Compressors',
    email: 'd.tremblay@atlascopco.com',
    phoneWhatsApp: '+1 800 561 1516',
    linkedIn: 'linkedin.com/in/davidtremblay-atlascopco',
    website: 'www.atlascopco.com/ca',
    competitiveStrengths: 'Market leader, comprehensive product range, strong remote monitoring platform',
    gapsWeaknesses: 'Premium pricing; limited appeal in value segment'
  },
  {
    distributorName: 'Ingersoll Rand Canada',
    parentGroupHoldingCompany: 'Ingersoll Rand Inc.',
    hqCountry: 'Canada (USA)',
    provincesCovered: 'Ontario, Quebec, Alberta, BC, National',
    keyOEMBrandsCarried: 'Ingersoll Rand, Gardner Denver',
    channelType: 'OEM Direct / Authorized Distributor',
    keyCompressorTypesCovered: 'Oil-injected Rotary Screw, Oil-free, Reciprocating',
    serviceCapability: 'Intellisys monitoring, national service network, 24/7 coverage',
    endUseFocus: 'Manufacturing, Oil & Gas, Energy, General Industry',
    keyContactPerson: 'Karen Bouchard',
    designation: 'Regional Sales Director - Eastern Canada',
    email: 'k.bouchard@irco.com',
    phoneWhatsApp: '+1 866 888 3115',
    linkedIn: 'linkedin.com/in/karenbouchard-ir',
    website: 'www.ingersollrand.com',
    competitiveStrengths: 'Strong brand, broad product range, coast-to-coast service',
    gapsWeaknesses: 'Complex distribution structure post-merger; premium pricing'
  },
  {
    distributorName: 'Mainland Machinery Ltd.',
    parentGroupHoldingCompany: 'Independent',
    hqCountry: 'Canada',
    provincesCovered: 'British Columbia, Alberta',
    keyOEMBrandsCarried: 'Kaeser, ELGi, Mattei',
    channelType: 'Authorized Multi-Brand Distributor',
    keyCompressorTypesCovered: 'Oil-injected Rotary Screw, Oil-free',
    serviceCapability: 'On-site service, compressed air audits, preventive maintenance',
    endUseFocus: 'Food Processing, Automotive, General Manufacturing',
    keyContactPerson: 'James Hornsby',
    designation: 'President',
    email: 'j.hornsby@mainlandmachinery.ca',
    phoneWhatsApp: '+1 604 291 9181',
    linkedIn: 'linkedin.com/in/jameshornsby-mainland',
    website: 'www.mainlandmachinery.ca',
    competitiveStrengths: 'Western Canada expertise, competitive pricing, fast delivery',
    gapsWeaknesses: 'Limited coverage east of Alberta; single service depot'
  },
  {
    distributorName: 'Quebec Pneumatique Inc.',
    parentGroupHoldingCompany: 'Independent',
    hqCountry: 'Canada',
    provincesCovered: 'Quebec, New Brunswick, Maritime Provinces',
    keyOEMBrandsCarried: 'Atlas Copco, Kaeser, ELGi',
    channelType: 'Authorized Regional Distributor',
    keyCompressorTypesCovered: 'Oil-injected Rotary Screw, Reciprocating, Oil-free',
    serviceCapability: 'Bilingual service team, on-site maintenance, emergency 24/7',
    endUseFocus: 'Food & Beverage, Pharma, Aerospace, General Manufacturing',
    keyContactPerson: 'Pierre Lavallee',
    designation: 'Directeur des ventes',
    email: 'p.lavallee@quebecpneu.com',
    phoneWhatsApp: '+1 514 382 3444',
    linkedIn: 'linkedin.com/in/pierrelavallee-qp',
    website: 'www.quebecpneu.com',
    competitiveStrengths: 'Bilingual capability, deep Quebec roots, food-grade air expertise',
    gapsWeaknesses: 'Limited national reach; smaller service team'
  },
  {
    distributorName: 'Prairie Air Systems Inc.',
    parentGroupHoldingCompany: 'Independent',
    hqCountry: 'Canada',
    provincesCovered: 'Alberta, Saskatchewan, Manitoba',
    keyOEMBrandsCarried: 'Ingersoll Rand, Hitachi, ELGi',
    channelType: 'Authorized Multi-Brand Distributor',
    keyCompressorTypesCovered: 'Oil-injected Rotary Screw, Gas Compressors, Large Industrial',
    serviceCapability: 'Remote site servicing, oil & gas certified technicians, emergency response',
    endUseFocus: 'Oil & Gas, Mining, Energy & Utilities, General Manufacturing',
    keyContactPerson: 'Brad Nicholson',
    designation: 'General Manager',
    email: 'b.nicholson@prairieair.ca',
    phoneWhatsApp: '+1 403 208 9876',
    linkedIn: 'linkedin.com/in/bradnicholson-prairie',
    website: 'www.prairieair.ca',
    competitiveStrengths: 'Oil & gas expertise, remote site capability, ATEX-rated solutions',
    gapsWeaknesses: 'Limited presence outside prairies; higher travel costs for remote sites'
  },
  {
    distributorName: 'Ontario Compressed Air Ltd.',
    parentGroupHoldingCompany: 'Independent',
    hqCountry: 'Canada',
    provincesCovered: 'Ontario, Manitoba',
    keyOEMBrandsCarried: 'Kaeser, Atlas Copco, Anest Iwata',
    channelType: 'Authorized Regional Distributor',
    keyCompressorTypesCovered: 'Oil-free Rotary Screw, Oil-injected, Medical Grade',
    serviceCapability: 'Compressed air audits, ISO 8573 testing, predictive maintenance',
    endUseFocus: 'Pharmaceuticals, Electronics, Automotive, Food Processing',
    keyContactPerson: 'Michelle Park',
    designation: 'Vice President - Sales',
    email: 'm.park@ontarioair.ca',
    phoneWhatsApp: '+1 905 629 3434',
    linkedIn: 'linkedin.com/in/michellepark-ocal',
    website: 'www.ontariocompressedair.ca',
    competitiveStrengths: 'Ontario industrial expertise, ISO 8573 compliance support, pharma specialization',
    gapsWeaknesses: 'Higher premium positioning; limited reach outside Ontario'
  }
]

interface CompetitiveIntelligenceProps {
  height?: number
}

export function CompetitiveIntelligence({ height }: CompetitiveIntelligenceProps) {
  const [activeTable, setActiveTable] = useState<'oem' | 'distributor'>('oem')

  const renderOEMTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              OEM Information
            </th>
            <th colSpan={4} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Channel & Support
            </th>
            <th colSpan={1} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* OEM Information */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              OEM / Manufacturer Name
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">
              HQ Country
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              Primary Product / Compressor Focus
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Technology Focus
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[120px]">
              Canada Market Share
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Key End-use Focus
            </th>
            {/* Channel & Support */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Go-to-Market Channels
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Service / Aftermarket Strength
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Typical Positioning</div>
              <div className="font-normal text-[10px] text-gray-600">(Value/Mid/Premium)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Key Distributor/Integrator Approach
            </th>
            {/* CMI Insights */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Key Insights
            </th>
          </tr>
        </thead>
        <tbody>
          {oemData.map((oem, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* OEM Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black font-medium">{oem.oemManufacturerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.hqCountry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.primaryProductFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.technologyFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.marketShareCanada}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyEndUseFocus}</td>
              {/* Channel & Support */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.goToMarketChannels}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.serviceAftermarketStrength}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.typicalPositioning}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyDistributorIntegratorApproach}</td>
              {/* CMI Insights */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyInsights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDistributorTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={9} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Partner Profile
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={2} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Fit & Opportunity
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Partner Profile */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Distributor / Channel Partner Name
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Parent Group / Holding Company
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">
              HQ Country
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Provinces Covered
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Key OEM Brands Carried
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Channel Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Retailers/EPC Contractor/Others)</div>
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Key Compressor Types Covered
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Service Capability
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              End-use Focus
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Key Contact Person
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Designation / Department
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Email
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Phone / WhatsApp
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              LinkedIn
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Website
            </th>
            {/* Fit & Opportunity */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Competitive Strengths
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Gaps / Weaknesses
            </th>
          </tr>
        </thead>
        <tbody>
          {distributorData.map((distributor, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Partner Profile */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black font-medium">{distributor.distributorName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.parentGroupHoldingCompany}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.hqCountry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.provincesCovered}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyOEMBrandsCarried}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.channelType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyCompressorTypesCovered}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.serviceCapability}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.endUseFocus}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${distributor.email}`}>{distributor.email}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.phoneWhatsApp}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${distributor.linkedIn}`} target="_blank" rel="noopener noreferrer">{distributor.linkedIn}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${distributor.website}`} target="_blank" rel="noopener noreferrer">{distributor.website}</a>
              </td>
              {/* Fit & Opportunity */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.competitiveStrengths}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.gapsWeaknesses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-4">
        {activeTable === 'oem' ? 'OEM Intelligence' : 'Distributor Intelligence'}
      </h2>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTable('oem')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTable === 'oem'
              ? 'bg-[#4A90A4] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          OEM Intelligence
        </button>
        <button
          onClick={() => setActiveTable('distributor')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTable === 'distributor'
              ? 'bg-[#4A90A4] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Distributor Intelligence
        </button>
      </div>

      {/* Render Active Table */}
      {activeTable === 'oem' ? renderOEMTable() : renderDistributorTable()}
    </div>
  )
}

export default CompetitiveIntelligence
