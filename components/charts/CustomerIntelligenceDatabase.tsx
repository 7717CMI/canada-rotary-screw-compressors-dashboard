'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CustomerData {
  // Customer Information
  customerOrganizationName: string
  parentGroupHoldingCompany: string
  country: string
  regionCity: string
  endUseIndustrySegment: string
  noOfFacilitiesSites: string
  keyApplicationsFocus: string
  compressorLubricationType: string
  compressorPowerRange: string
  currentCoolingMethod: string
  currentInstallationFormat: string
  currentCompressorBrand: string
  // Contact Details
  keyContactPerson: string
  designationDepartment: string
  emailAddress: string
  phoneWhatsAppNumber: string
  linkedInProfile: string
  websiteUrl: string
  // Needs & Pain Points (Proposition 2+)
  primaryPurchaseIntent: string
  keyProductNeeds: string
  keyServiceNeeds: string
  painPoints: string
  complianceSustainabilityDrivers: string
  // Purchasing Behaviour (Proposition 2+)
  decisionMakers: string
  procurementMethod: string
  buyingContractModel: string
  currentSupplierSetup: string
  priorityLevel: string
  // Opportunity & Project Status (Proposition 3)
  expectedOpportunitySize: string
  plannedProjectsTriggers: string
  salesStage: string
  expectedDecisionTimeline: string
  // CMI Insights (Proposition 3)
  customerBenchmarkingSummary: string
  cmiNotesInsights: string
  sourceReferenceNotes: string
}

const sampleCustomerData: CustomerData[] = [
  {
    customerOrganizationName: 'Magna International Inc.',
    parentGroupHoldingCompany: 'Magna International Inc.',
    country: 'Canada',
    regionCity: 'Aurora, Ontario',
    endUseIndustrySegment: 'Automotive and Metalworking',
    noOfFacilitiesSites: '60+ (Canada)',
    keyApplicationsFocus: 'Pneumatic tools, paint booths, assembly lines, metal stamping',
    compressorLubricationType: 'Oil-injected and Oil-lubricated',
    compressorPowerRange: 'Above 75 kW to 160 kW',
    currentCoolingMethod: 'Air-cooled',
    currentInstallationFormat: 'Floor-mounted',
    currentCompressorBrand: 'Atlas Copco / Ingersoll Rand',
    keyContactPerson: 'Michael Saunders',
    designationDepartment: 'Director - Facilities & Utilities',
    emailAddress: 'm.saunders@magna.com',
    phoneWhatsAppNumber: '+1 905 726 2462',
    linkedInProfile: 'linkedin.com/in/michaelsaunders-magna',
    websiteUrl: 'www.magna.com',
    primaryPurchaseIntent: 'Replacement',
    keyProductNeeds: 'Variable speed drive (VSD) compressors, energy-efficient oil-injected rotary screw',
    keyServiceNeeds: 'Predictive maintenance, remote monitoring, compressed air audits',
    painPoints: 'High energy bills from fixed-speed units, aging fleet, unplanned downtime',
    complianceSustainabilityDrivers: 'ISO 50001 energy management, GHG reduction targets',
    decisionMakers: 'Director Facilities, VP Operations, Central Procurement',
    procurementMethod: 'Centralized RFP / tender',
    buyingContractModel: 'Multi-year service agreement',
    currentSupplierSetup: 'Atlas Copco direct + local dealer',
    priorityLevel: 'High',
    expectedOpportunitySize: 'Large (CAD $2M+)',
    plannedProjectsTriggers: 'Fleet upgrade program 2026-2027, energy reduction mandate',
    salesStage: 'Proposal submitted',
    expectedDecisionTimeline: 'Q2 2026',
    customerBenchmarkingSummary: "Canada's largest auto parts maker; high-volume compressed air user",
    cmiNotesInsights: 'Evaluating VSD retrofit across 15 Ontario plants; energy savings key decision driver',
    sourceReferenceNotes: 'Magna annual report 2025, trade press'
  },
  {
    customerOrganizationName: 'McCain Foods Limited',
    parentGroupHoldingCompany: 'McCain Foods Limited (Private)',
    country: 'Canada',
    regionCity: 'Florenceville, New Brunswick',
    endUseIndustrySegment: 'Food and Beverage',
    noOfFacilitiesSites: '18 (Canada)',
    keyApplicationsFocus: 'Pneumatic conveying, packaging, food-grade process air, nitrogen blanketing',
    compressorLubricationType: 'Oil-free',
    compressorPowerRange: 'Above 15 kW to 75 kW',
    currentCoolingMethod: 'Water-cooled',
    currentInstallationFormat: 'Floor-mounted',
    currentCompressorBrand: 'Kaeser / Atlas Copco',
    keyContactPerson: 'Linda Charbonneau',
    designationDepartment: 'VP Engineering & Facilities',
    emailAddress: 'l.charbonneau@mccain.com',
    phoneWhatsAppNumber: '+1 506 392 5541',
    linkedInProfile: 'linkedin.com/in/lindacharbonneau-mccain',
    websiteUrl: 'www.mccain.com',
    primaryPurchaseIntent: 'Expansion',
    keyProductNeeds: 'Oil-free rotary screw compressors, food-grade certified air systems',
    keyServiceNeeds: 'On-site service teams, air quality audits, emergency response SLA',
    painPoints: 'Zero-tolerance for oil contamination, stringent food safety standards, energy costs',
    complianceSustainabilityDrivers: 'SQF/BRC food safety, ISO 8573 air quality, net-zero 2050 pledge',
    decisionMakers: 'VP Engineering, Plant Manager, Quality Manager, Procurement',
    procurementMethod: 'Regional procurement with group framework',
    buyingContractModel: 'Purchase + comprehensive AMC',
    currentSupplierSetup: 'Kaeser dealer network',
    priorityLevel: 'High',
    expectedOpportunitySize: 'Medium (CAD $800K+)',
    plannedProjectsTriggers: 'New production line 2026, food-grade air certification audit',
    salesStage: 'Qualification',
    expectedDecisionTimeline: 'Q3 2026',
    customerBenchmarkingSummary: "World's largest frozen potato processor; strict oil-free requirement",
    cmiNotesInsights: 'Moving all process-air compressors to oil-free; evaluating heat recovery to reduce gas usage',
    sourceReferenceNotes: 'McCain sustainability report 2025, plant engineering contacts'
  },
  {
    customerOrganizationName: 'Apotex Inc.',
    parentGroupHoldingCompany: 'Apotex Inc. (Private)',
    country: 'Canada',
    regionCity: 'North York, Ontario',
    endUseIndustrySegment: 'Pharmaceuticals',
    noOfFacilitiesSites: '7 (Canada)',
    keyApplicationsFocus: 'Instrument air, tablet coating, cleanroom pressurization, nitrogen generation',
    compressorLubricationType: 'Oil-free',
    compressorPowerRange: 'Above 15 kW to 75 kW',
    currentCoolingMethod: 'Air-cooled',
    currentInstallationFormat: 'Floor-mounted',
    currentCompressorBrand: 'Atlas Copco (ZT series)',
    keyContactPerson: 'Rajesh Patel',
    designationDepartment: 'Head of Engineering & Utilities',
    emailAddress: 'r.patel@apotex.com',
    phoneWhatsAppNumber: '+1 416 749 9300',
    linkedInProfile: 'linkedin.com/in/rajeshpatel-apotex',
    websiteUrl: 'www.apotex.com',
    primaryPurchaseIntent: 'Replacement',
    keyProductNeeds: 'Class 0 oil-free compressors, redundant compressed air systems, GMP-compliant units',
    keyServiceNeeds: 'Validation support (IQ/OQ/PQ), 24/7 emergency service, calibration',
    painPoints: 'GMP compliance complexity, risk of contamination, regulatory inspection readiness',
    complianceSustainabilityDrivers: 'Health Canada GMP, ISO 8573-1 Class 1, FDA 21 CFR requirements',
    decisionMakers: 'Head Engineering, Quality Director, VP Manufacturing, Procurement',
    procurementMethod: 'Qualified vendor list (QVL) tender',
    buyingContractModel: 'Long-term service contract (5-year)',
    currentSupplierSetup: 'Atlas Copco direct (preferred vendor)',
    priorityLevel: 'High',
    expectedOpportunitySize: 'Medium (CAD $1.2M+)',
    plannedProjectsTriggers: 'GMP facility upgrade 2026, equipment lifecycle end',
    salesStage: 'Negotiation',
    expectedDecisionTimeline: 'Q1 2026',
    customerBenchmarkingSummary: "Canada's largest generic pharma maker; strict Class 0 oil-free requirement",
    cmiNotesInsights: 'Upgrading to latest ZT/Z series with heat recovery; evaluating parallel redundant systems',
    sourceReferenceNotes: 'Apotex internal procurement documents, industry contacts'
  },
  {
    customerOrganizationName: 'Canadian Natural Resources Ltd. (CNRL)',
    parentGroupHoldingCompany: 'Canadian Natural Resources Limited',
    country: 'Canada',
    regionCity: 'Calgary, Alberta',
    endUseIndustrySegment: 'Oil and Gas',
    noOfFacilitiesSites: '25+ (Alberta/BC)',
    keyApplicationsFocus: 'Natural gas compression, instrument air, pneumatic control, oil sands operations',
    compressorLubricationType: 'Oil-injected and Oil-lubricated',
    compressorPowerRange: 'Above 160 kW',
    currentCoolingMethod: 'Air-cooled',
    currentInstallationFormat: 'Floor-mounted',
    currentCompressorBrand: 'Ingersoll Rand / Kobelco',
    keyContactPerson: 'Trevor MacLeod',
    designationDepartment: 'Manager - Compression & Rotating Equipment',
    emailAddress: 't.macleod@cnrl.com',
    phoneWhatsAppNumber: '+1 403 514 7777',
    linkedInProfile: 'linkedin.com/in/trevormacleod-cnrl',
    websiteUrl: 'www.cnrl.com',
    primaryPurchaseIntent: 'Both',
    keyProductNeeds: 'Heavy-duty rotary screw compressors, skid-mounted packages, ATEX-rated units',
    keyServiceNeeds: 'Remote site service, spare parts availability, condition monitoring',
    painPoints: 'Remote locations, extreme cold weather operation, unplanned shutdowns',
    complianceSustainabilityDrivers: 'Canadian EPA methane regulations, ISO 14001, internal emissions targets',
    decisionMakers: 'Manager Compression, VP Operations, HSE Director, Supply Chain',
    procurementMethod: 'Framework agreement / spot purchase',
    buyingContractModel: 'OEM supply + service agreement',
    currentSupplierSetup: 'Ingersoll Rand direct + EPC contractors',
    priorityLevel: 'Medium',
    expectedOpportunitySize: 'Large (CAD $3M+)',
    plannedProjectsTriggers: 'Horizon oil sands expansion 2027, aging compressor fleet replacement',
    salesStage: 'Discovery',
    expectedDecisionTimeline: 'Q4 2026',
    customerBenchmarkingSummary: "Canada's largest oil producer; major gas compressor user",
    cmiNotesInsights: 'Evaluating VSD compressors for energy reduction in SAGD operations; cold-start capability critical',
    sourceReferenceNotes: 'CNRL annual report 2025, Upstream conference Calgary'
  },
  {
    customerOrganizationName: 'Celestica Inc.',
    parentGroupHoldingCompany: 'Celestica Inc.',
    country: 'Canada',
    regionCity: 'Toronto, Ontario',
    endUseIndustrySegment: 'Electronics',
    noOfFacilitiesSites: '4 (Canada)',
    keyApplicationsFocus: 'PCB assembly, cleanroom air supply, ESD-safe processes, SMT production',
    compressorLubricationType: 'Oil-free',
    compressorPowerRange: 'Up to 15 kW',
    currentCoolingMethod: 'Air-cooled',
    currentInstallationFormat: 'Tank-mounted',
    currentCompressorBrand: 'Anest Iwata / ELGi',
    keyContactPerson: 'Sarah Kowalski',
    designationDepartment: 'Facilities & Environmental Manager',
    emailAddress: 's.kowalski@celestica.com',
    phoneWhatsAppNumber: '+1 416 448 5800',
    linkedInProfile: 'linkedin.com/in/sarahkowalski-celestica',
    websiteUrl: 'www.celestica.com',
    primaryPurchaseIntent: 'Replacement',
    keyProductNeeds: 'Ultra-clean oil-free compressors, low-noise units for cleanroom proximity',
    keyServiceNeeds: 'Predictive maintenance, air quality monitoring, rapid response service',
    painPoints: 'Particle contamination risk, noise constraints in facility, energy efficiency targets',
    complianceSustainabilityDrivers: 'ISO 14644 cleanroom standard, RoHS/WEEE compliance, ISO 50001',
    decisionMakers: 'Facilities Manager, Plant Engineering, Global Procurement',
    procurementMethod: 'Global preferred vendor program',
    buyingContractModel: 'Annual service contract with equipment lease option',
    currentSupplierSetup: 'Anest Iwata dealer',
    priorityLevel: 'Medium',
    expectedOpportunitySize: 'Small (CAD $250K+)',
    plannedProjectsTriggers: 'Facility modernization 2026, lean manufacturing initiative',
    salesStage: 'RFP stage',
    expectedDecisionTimeline: 'Q2 2026',
    customerBenchmarkingSummary: 'Leading EMS provider; strict oil-free and low-noise requirements',
    cmiNotesInsights: 'Evaluating compact oil-free units with integrated dryers; noise < 65 dBA critical',
    sourceReferenceNotes: 'Celestica annual report 2025, IPC APEX trade show contacts'
  }
]

interface PropositionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function Proposition({ title, isOpen, onToggle, children }: PropositionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg font-semibold text-black">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-2 pb-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  )
}

// Shared cell styles
const thCustomerInfo = "bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thContactDetails = "bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap"
const thNeedsPainPoints = "bg-[#F5C6C6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thPurchasingBehaviour = "bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thOpportunity = "bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thCmiInsights = "bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const td = "border border-gray-300 px-3 py-2 text-sm text-black"
const tdLink = "border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline"

// Customer Information columns (shared across all propositions)
function renderCustomerInfoHeaders() {
  return (
    <>
      <th className={`${thCustomerInfo} min-w-[200px]`}>Customer / Organization Name</th>
      <th className={`${thCustomerInfo} min-w-[150px]`}>Parent Group / Holding Company</th>
      <th className={`${thCustomerInfo} min-w-[100px]`}>Country</th>
      <th className={`${thCustomerInfo} min-w-[140px]`}>Region / City</th>
      <th className={`${thCustomerInfo} min-w-[160px]`}>End-use Industry Segment</th>
      <th className={`${thCustomerInfo} min-w-[120px]`}>No. of Facilities / Sites</th>
      <th className={`${thCustomerInfo} min-w-[200px]`}>Key Applications / Focus</th>
      <th className={`${thCustomerInfo} min-w-[170px]`}>Compressor Lubrication Type</th>
      <th className={`${thCustomerInfo} min-w-[150px]`}>Compressor Power Range</th>
      <th className={`${thCustomerInfo} min-w-[140px]`}>Current Cooling Method</th>
      <th className={`${thCustomerInfo} min-w-[150px]`}>Installation Format</th>
      <th className={`${thCustomerInfo} min-w-[160px]`}>Current Compressor Brand</th>
    </>
  )
}

function renderCustomerInfoCells(c: CustomerData) {
  return (
    <>
      <td className={td}>{c.customerOrganizationName}</td>
      <td className={td}>{c.parentGroupHoldingCompany}</td>
      <td className={td}>{c.country}</td>
      <td className={td}>{c.regionCity}</td>
      <td className={td}>{c.endUseIndustrySegment}</td>
      <td className={`${td} text-center`}>{c.noOfFacilitiesSites}</td>
      <td className={td}>{c.keyApplicationsFocus}</td>
      <td className={td}>{c.compressorLubricationType}</td>
      <td className={td}>{c.compressorPowerRange}</td>
      <td className={td}>{c.currentCoolingMethod}</td>
      <td className={td}>{c.currentInstallationFormat}</td>
      <td className={td}>{c.currentCompressorBrand}</td>
    </>
  )
}

// Contact Details columns (shared across all propositions)
function renderContactDetailsHeaders() {
  return (
    <>
      <th className={`${thContactDetails} min-w-[130px]`}>Key Contact Person</th>
      <th className={`${thContactDetails} min-w-[150px]`}>Designation / Department</th>
      <th className={`${thContactDetails} min-w-[150px]`}>Email Address</th>
      <th className={`${thContactDetails} min-w-[140px]`}>Phone / WhatsApp Number</th>
      <th className={`${thContactDetails} min-w-[150px]`}>LinkedIn Profile</th>
      <th className={`${thContactDetails} min-w-[130px]`}>Website URL</th>
    </>
  )
}

function renderContactDetailsCells(c: CustomerData) {
  return (
    <>
      <td className={td}>{c.keyContactPerson}</td>
      <td className={td}>{c.designationDepartment}</td>
      <td className={tdLink}>
        <a href={`mailto:${c.emailAddress}`}>{c.emailAddress}</a>
      </td>
      <td className={td}>{c.phoneWhatsAppNumber}</td>
      <td className={tdLink}>
        <a href={`https://${c.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{c.linkedInProfile}</a>
      </td>
      <td className={tdLink}>
        <a href={`https://${c.websiteUrl}`} target="_blank" rel="noopener noreferrer">{c.websiteUrl}</a>
      </td>
    </>
  )
}

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

export default function CustomerIntelligenceDatabase({ title }: CustomerIntelligenceDatabaseProps) {
  const [openProposition, setOpenProposition] = useState<number | null>(1)

  const toggleProposition = (num: number) => {
    setOpenProposition(openProposition === num ? null : num)
  }

  // Proposition 1: Customer Information + Contact Details
  const renderProposition1Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={12} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
          </tr>
          <tr className="bg-gray-100">
            {renderCustomerInfoHeaders()}
            {renderContactDetailsHeaders()}
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderCustomerInfoCells(customer)}
              {renderContactDetailsCells(customer)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Proposition 2: Customer Information + Contact Details + Needs & Pain Points + Purchasing Behaviour
  const renderProposition2Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={12} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={5} className="bg-[#E8A0A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Needs &amp; Pain Points
            </th>
            <th colSpan={5} className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Purchasing Behaviour
            </th>
          </tr>
          <tr className="bg-gray-100">
            {renderCustomerInfoHeaders()}
            {renderContactDetailsHeaders()}
            {/* Needs & Pain Points */}
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>
              <div>Primary Purchase Intent</div>
              <div className="font-normal text-[10px] text-gray-600">(New / Replacement / Expansion / Both)</div>
            </th>
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>Key Product Needs</th>
            <th className={`${thNeedsPainPoints} min-w-[160px]`}>Key Service Needs</th>
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>Pain Points</th>
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>Compliance / Sustainability Drivers</th>
            {/* Purchasing Behaviour */}
            <th className={`${thPurchasingBehaviour} min-w-[160px]`}>Decision Makers</th>
            <th className={`${thPurchasingBehaviour} min-w-[140px]`}>Procurement Method</th>
            <th className={`${thPurchasingBehaviour} min-w-[150px]`}>Buying / Contract Model</th>
            <th className={`${thPurchasingBehaviour} min-w-[150px]`}>Current Supplier Setup</th>
            <th className={`${thPurchasingBehaviour} min-w-[100px]`}>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderCustomerInfoCells(customer)}
              {renderContactDetailsCells(customer)}
              {/* Needs & Pain Points */}
              <td className={td}>{customer.primaryPurchaseIntent}</td>
              <td className={td}>{customer.keyProductNeeds}</td>
              <td className={td}>{customer.keyServiceNeeds}</td>
              <td className={td}>{customer.painPoints}</td>
              <td className={td}>{customer.complianceSustainabilityDrivers}</td>
              {/* Purchasing Behaviour */}
              <td className={td}>{customer.decisionMakers}</td>
              <td className={td}>{customer.procurementMethod}</td>
              <td className={td}>{customer.buyingContractModel}</td>
              <td className={td}>{customer.currentSupplierSetup}</td>
              <td className={td}>{customer.priorityLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Proposition 3: All columns including Opportunity & Project Status + CMI Insights
  const renderProposition3Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={12} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={5} className="bg-[#E8A0A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Needs &amp; Pain Points
            </th>
            <th colSpan={5} className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Purchasing Behaviour
            </th>
            <th colSpan={4} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Opportunity &amp; Project Status
            </th>
            <th colSpan={3} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {renderCustomerInfoHeaders()}
            {renderContactDetailsHeaders()}
            {/* Needs & Pain Points */}
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>
              <div>Primary Purchase Intent</div>
              <div className="font-normal text-[10px] text-gray-600">(New / Replacement / Expansion / Both)</div>
            </th>
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>Key Product Needs</th>
            <th className={`${thNeedsPainPoints} min-w-[160px]`}>Key Service Needs</th>
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>Pain Points</th>
            <th className={`${thNeedsPainPoints} min-w-[180px]`}>Compliance / Sustainability Drivers</th>
            {/* Purchasing Behaviour */}
            <th className={`${thPurchasingBehaviour} min-w-[160px]`}>Decision Makers</th>
            <th className={`${thPurchasingBehaviour} min-w-[140px]`}>Procurement Method</th>
            <th className={`${thPurchasingBehaviour} min-w-[150px]`}>Buying / Contract Model</th>
            <th className={`${thPurchasingBehaviour} min-w-[150px]`}>Current Supplier Setup</th>
            <th className={`${thPurchasingBehaviour} min-w-[100px]`}>Priority Level</th>
            {/* Opportunity & Project Status */}
            <th className={`${thOpportunity} min-w-[150px]`}>Expected Opportunity Size</th>
            <th className={`${thOpportunity} min-w-[180px]`}>Planned Projects / Triggers</th>
            <th className={`${thOpportunity} min-w-[120px]`}>Sales Stage</th>
            <th className={`${thOpportunity} min-w-[150px]`}>Expected Decision Timeline</th>
            {/* CMI Insights */}
            <th className={`${thCmiInsights} min-w-[180px]`}>Customer Benchmarking Summary</th>
            <th className={`${thCmiInsights} min-w-[200px]`}>CMI Notes / Insights</th>
            <th className={`${thCmiInsights} min-w-[160px]`}>Source / Reference Notes</th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderCustomerInfoCells(customer)}
              {renderContactDetailsCells(customer)}
              {/* Needs & Pain Points */}
              <td className={td}>{customer.primaryPurchaseIntent}</td>
              <td className={td}>{customer.keyProductNeeds}</td>
              <td className={td}>{customer.keyServiceNeeds}</td>
              <td className={td}>{customer.painPoints}</td>
              <td className={td}>{customer.complianceSustainabilityDrivers}</td>
              {/* Purchasing Behaviour */}
              <td className={td}>{customer.decisionMakers}</td>
              <td className={td}>{customer.procurementMethod}</td>
              <td className={td}>{customer.buyingContractModel}</td>
              <td className={td}>{customer.currentSupplierSetup}</td>
              <td className={td}>{customer.priorityLevel}</td>
              {/* Opportunity & Project Status */}
              <td className={td}>{customer.expectedOpportunitySize}</td>
              <td className={td}>{customer.plannedProjectsTriggers}</td>
              <td className={td}>{customer.salesStage}</td>
              <td className={td}>{customer.expectedDecisionTimeline}</td>
              {/* CMI Insights */}
              <td className={td}>{customer.customerBenchmarkingSummary}</td>
              <td className={td}>{customer.cmiNotesInsights}</td>
              <td className={td}>{customer.sourceReferenceNotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-6">Customer Intelligence Database</h2>

      <Proposition
        title="Proposition 1 - Basic"
        isOpen={openProposition === 1}
        onToggle={() => toggleProposition(1)}
      >
        {renderProposition1Table()}
      </Proposition>

      <Proposition
        title="Proposition 2 - Advanced"
        isOpen={openProposition === 2}
        onToggle={() => toggleProposition(2)}
      >
        {renderProposition2Table()}
      </Proposition>

      <Proposition
        title="Proposition 3 - Premium"
        isOpen={openProposition === 3}
        onToggle={() => toggleProposition(3)}
      >
        {renderProposition3Table()}
      </Proposition>
    </div>
  )
}
