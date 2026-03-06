/**
 * Competitive Intelligence Data Generator
 * Generates data for competitive dashboard and market share analysis
 * Last updated: 2024
 */

import { CHART_COLORS } from '@/lib/chart-theme'

export interface Proposition {
  title: string
  description: string
  category: string
}

export interface CompanyData {
  id: string
  name: string
  headquarters: string
  ceo: string
  yearEstablished: number
  portfolio: string
  strategies: string[]
  regionalStrength: string
  overallRevenue: number // in USD Mn
  segmentalRevenue: number // in USD Mn for 2024
  marketShare: number // percentage
  propositions?: Proposition[] // Dynamic propositions array
}

export interface MarketShareData {
  company: string
  marketShare: number
  color: string
}

export interface CompetitiveIntelligenceData {
  metadata: {
    market: string
    year: number
    currency: string
    revenue_unit: string
    total_companies: number
  }
  companies: CompanyData[]
  market_share_data: MarketShareData[]
}

let cachedData: CompetitiveIntelligenceData | null = null

/**
 * Parse competitive intelligence CSV row and extract propositions
 */
function parsePropositionsFromRow(row: Record<string, any>): Proposition[] {
  const propositions: Proposition[] = []
  
  // Look for proposition fields (Proposition 1 Title, Proposition 1 Description, etc.)
  let propIndex = 1
  while (true) {
    const titleKey = `Proposition ${propIndex} Title`
    const descKey = `Proposition ${propIndex} Description`
    const catKey = `Proposition ${propIndex} Category`
    
    const title = row[titleKey]?.toString().trim()
    const description = row[descKey]?.toString().trim()
    const category = row[catKey]?.toString().trim()
    
    // If no title, stop looking for more propositions
    if (!title || title === 'N/A' || title === '') {
      break
    }
    
    propositions.push({
      title,
      description: description || '',
      category: category || 'General'
    })
    
    propIndex++
    
    // Safety limit - prevent infinite loops
    if (propIndex > 10) break
  }
  
  return propositions
}

/**
 * Parse competitive intelligence data from CSV/JSON format
 */
export function parseCompetitiveIntelligenceFromData(rows: Record<string, any>[]): CompanyData[] {
  return rows.map((row, index) => {
    const marketShare = parseFloat(row['Market Share (%)']?.toString().replace('%', '') || '0')
    const revenue = generateRevenue(marketShare)
    
    // Parse propositions from row
    const propositions = parsePropositionsFromRow(row)
    
    // Get company name for color lookup
    const companyName = row['Company Name']?.toString() || ''
    const color = companyColors[companyName] || companyColors['Others'] || '#94a3b8'
    
    return {
      id: (row['Company ID'] || companyName.toLowerCase().replace(/\s+/g, '-') || `company-${index}`).toString(),
      name: companyName,
      headquarters: row['Headquarters']?.toString() || '',
      ceo: row['CEO']?.toString() || '',
      yearEstablished: parseInt(row['Year Established']?.toString() || '0'),
      portfolio: row['Product/Service Portfolio']?.toString() || '',
      strategies: (row['Strategies (comma-separated)']?.toString() || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      regionalStrength: row['Regional Strength']?.toString() || '',
      overallRevenue: parseFloat(row['Overall Revenue (USD Mn)']?.toString() || revenue.overall.toString()),
      segmentalRevenue: parseFloat(row['Segmental Revenue (USD Mn)']?.toString() || revenue.segmental.toString()),
      marketShare: marketShare,
      propositions: propositions.length > 0 ? propositions : undefined,
      color: color
    }
  })
}

/**
 * Load competitive intelligence data from store or API
 */
export async function loadCompetitiveIntelligenceData(): Promise<CompetitiveIntelligenceData | null> {
  if (cachedData) {
    return cachedData
  }

  // Try to get data from store first (if uploaded via dashboard builder)
  // Only try this in browser environment (client-side)
  if (typeof window !== 'undefined') {
    try {
      const { useDashboardStore } = require('./store')
      const store = useDashboardStore.getState()
      
      if (store.competitiveIntelligenceData && store.competitiveIntelligenceData.rows && store.competitiveIntelligenceData.rows.length > 0) {
        console.log('Using competitive intelligence data from store')
        // Parse the store data
        const companies = parseCompetitiveIntelligenceFromData(store.competitiveIntelligenceData.rows)
        
        // Calculate market share data
        const marketShareData = companies.map((company, index) => ({
          company: company.name,
          marketShare: company.marketShare,
          color: CHART_COLORS.primary[index % CHART_COLORS.primary.length]
        }))
        
        const data: CompetitiveIntelligenceData = {
          metadata: {
            market: 'Competitive Intelligence Market',
            year: 2024,
            currency: 'USD',
            revenue_unit: 'Mn',
            total_companies: companies.length
          },
          companies,
          market_share_data: marketShareData
        }
        
        // Cache the data
        cachedData = data
        return cachedData
      }
    } catch (error) {
      console.warn('Could not access store for competitive intelligence data:', error)
    }
  }

  try {
    // Try to load from API endpoint
    const response = await fetch('/api/load-competitive-intelligence', {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      // If file not found, return null to use fallback data
      if (response.status === 404) {
        console.log('Competitive intelligence CSV not found, using fallback data')
        return null
      }
      throw new Error(`Failed to load competitive intelligence: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Cache the data
    cachedData = data as CompetitiveIntelligenceData
    
    return cachedData
  } catch (error) {
    console.error('Error loading competitive intelligence data:', error)
    // Return null to use fallback data
    return null
  }
}

// Key players tracked in Canada Stationary Rotary Screw Compressors Market (from PPT competitive landscape)
const companies = [
  'Atlas Copco AB',
  'Ingersoll Rand Inc.',
  'Kaeser Kompressoren SE',
  'ELGi Equipments Limited',
  'Hitachi Industrial Equipment Systems Co., Ltd.',
  'Kobelco Compressors Corporation',
  'Anest Iwata Corporation',
  'BAUER Kompressoren GmbH',
  'Mattei Compressors Inc.',
  'Others'
]

// Company colors using the enterprise palette
const companyColors: Record<string, string> = {
  'Atlas Copco AB': '#1A6FA8',                              // Deep Blue
  'Ingersoll Rand Inc.': '#2196A6',                         // Teal Blue
  'Kaeser Kompressoren SE': '#52B69A',                      // Teal Green
  'ELGi Equipments Limited': '#34A0A4',                     // Medium Teal
  'Hitachi Industrial Equipment Systems Co., Ltd.': '#184E77', // Navy Blue
  'Kobelco Compressors Corporation': '#1E6091',             // Deep Blue
  'Anest Iwata Corporation': '#168AAD',                     // Ocean Blue
  'BAUER Kompressoren GmbH': '#B5E48C',                     // Light Lime
  'Mattei Compressors Inc.': '#76C893',                     // Medium Green
  'Others': '#99D98C'                                       // Light Green
}

// Headquarters locations
const headquarters: Record<string, string> = {
  'Atlas Copco AB': 'Stockholm, Sweden',
  'Ingersoll Rand Inc.': 'Dublin, Ireland',
  'Kaeser Kompressoren SE': 'Coburg, Germany',
  'ELGi Equipments Limited': 'Coimbatore, India',
  'Hitachi Industrial Equipment Systems Co., Ltd.': 'Tokyo, Japan',
  'Kobelco Compressors Corporation': 'Kobe, Japan',
  'Anest Iwata Corporation': 'Yokohama, Japan',
  'BAUER Kompressoren GmbH': 'Munich, Germany',
  'Mattei Compressors Inc.': 'Milan, Italy',
  'Others': 'Various'
}

// CEOs / Key Leadership
const ceos: Record<string, string> = {
  'Atlas Copco AB': 'Mats Rahmström',
  'Ingersoll Rand Inc.': 'Vicente Reynal',
  'Kaeser Kompressoren SE': 'Thomas Kaeser',
  'ELGi Equipments Limited': 'Jairam Varadaraj',
  'Hitachi Industrial Equipment Systems Co., Ltd.': 'Keiji Kojima',
  'Kobelco Compressors Corporation': 'Hiroshi Yamazaki',
  'Anest Iwata Corporation': 'Tomoyuki Kuwabara',
  'BAUER Kompressoren GmbH': 'Heinrich Bauer',
  'Mattei Compressors Inc.': 'Matteo Anastasi',
  'Others': 'Multiple'
}

// Year established
const yearEstablished: Record<string, number> = {
  'Atlas Copco AB': 1873,
  'Ingersoll Rand Inc.': 1871,
  'Kaeser Kompressoren SE': 1919,
  'ELGi Equipments Limited': 1960,
  'Hitachi Industrial Equipment Systems Co., Ltd.': 1920,
  'Kobelco Compressors Corporation': 1905,
  'Anest Iwata Corporation': 1926,
  'BAUER Kompressoren GmbH': 1946,
  'Mattei Compressors Inc.': 1919,
  'Others': 0
}

// Product portfolios (stationary rotary screw compressor context)
const portfolios: Record<string, string> = {
  'Atlas Copco AB': 'Oil-free & Oil-injected Rotary Screw, Centrifugal, VSD Compressors',
  'Ingersoll Rand Inc.': 'Rotary Screw, Reciprocating, Variable Speed Drive Compressors',
  'Kaeser Kompressoren SE': 'Rotary Screw, Sigma Control Smart Systems, Blowers',
  'ELGi Equipments Limited': 'Oil-injected Rotary Screw, Oil-free, Reciprocating Compressors',
  'Hitachi Industrial Equipment Systems Co., Ltd.': 'Oil-free Rotary Screw, Scroll, Centrifugal Compressors',
  'Kobelco Compressors Corporation': 'Oil-free Rotary Screw, Large Industrial Compressors',
  'Anest Iwata Corporation': 'Compact Oil-free Rotary Screw, Scroll, Reciprocating Compressors',
  'BAUER Kompressoren GmbH': 'High-Pressure Compressors, Breathing Air Systems, Industrial Rotary Screw',
  'Mattei Compressors Inc.': 'Rotary Vane, Oil-injected Rotary Screw, Long-life Compressors',
  'Others': 'Various Rotary Screw and Industrial Compressor Products'
}

// Regional strengths in Canada / global
const regionalStrengths: Record<string, string> = {
  'Atlas Copco AB': 'Canada, North America, Europe, Global',
  'Ingersoll Rand Inc.': 'Canada, North America, Latin America',
  'Kaeser Kompressoren SE': 'Canada, Europe, North America',
  'ELGi Equipments Limited': 'Canada, India, Europe, Asia Pacific',
  'Hitachi Industrial Equipment Systems Co., Ltd.': 'Canada, Japan, Asia Pacific',
  'Kobelco Compressors Corporation': 'Canada, Japan, Asia Pacific',
  'Anest Iwata Corporation': 'Canada, Japan, North America',
  'BAUER Kompressoren GmbH': 'Canada, Europe, Global',
  'Mattei Compressors Inc.': 'Canada, Europe, North America',
  'Others': 'Canada, Various Regions'
}

// Market share percentages in Canada (must sum to 100)
const marketShares: Record<string, number> = {
  'Atlas Copco AB': 25.0,
  'Ingersoll Rand Inc.': 20.0,
  'Kaeser Kompressoren SE': 14.0,
  'ELGi Equipments Limited': 8.0,
  'Hitachi Industrial Equipment Systems Co., Ltd.': 6.0,
  'Kobelco Compressors Corporation': 5.0,
  'Anest Iwata Corporation': 4.0,
  'BAUER Kompressoren GmbH': 3.0,
  'Mattei Compressors Inc.': 3.0,
  'Others': 12.0
}

// Generate strategies based on company type
function generateStrategies(company: string): string[] {
  const strategyMap: Record<string, string[]> = {
    'Atlas Copco AB': ['Innovation Focus', 'Sustainability Leadership', 'Digital Transformation'],
    'Ingersoll Rand Inc.': ['M&A Growth', 'VSD Penetration', 'Service Expansion'],
    'Kaeser Kompressoren SE': ['Smart Factory Integration', 'Energy Auditing', 'Premium Positioning'],
    'ELGi Equipments Limited': ['Cost Leadership', 'Distributor Network', 'Emerging Market Expansion'],
    'Hitachi Industrial Equipment Systems Co., Ltd.': ['Technology Excellence', 'Oil-Free Growth', 'Pharma & Food Focus'],
    'Kobelco Compressors Corporation': ['Custom Solutions', 'Heavy Industry Focus', 'Niche Markets'],
    'Anest Iwata Corporation': ['Compact Portfolio', 'Medical & Pharma Niche', 'Quality Focus'],
    'BAUER Kompressoren GmbH': ['High-Pressure Niche', 'Safety & Compliance', 'Defense & Industrial'],
    'Mattei Compressors Inc.': ['Long-Life Technology', 'Low Total Cost of Ownership', 'Service Contracts'],
    'Others': ['Diverse Strategies', 'Regional Focus', 'Market Specific']
  }

  return strategyMap[company] || ['Market Development', 'Product Innovation', 'Strategic Partnerships']
}

// Generate propositions based on company type
function generatePropositions(company: string): Proposition[] {
  const propositionMap: Record<string, Proposition[]> = {
    'Atlas Copco AB': [
      { title: 'Energy-Efficient Oil-Free Solutions', description: 'Class 0 oil-free compressors delivering 100% pure air for food, pharma, and electronics industries with up to 35% energy savings', category: 'Product Innovation' },
      { title: 'Smart Monitoring & IoT Integration', description: 'SMARTLINK remote monitoring platform enabling predictive maintenance and real-time performance optimization', category: 'Digital Services' },
      { title: 'Full-Lifecycle Service Contracts', description: 'Comprehensive service agreements covering installation, maintenance, and parts for maximum uptime across Canadian plants', category: 'Service Excellence' }
    ],
    'Ingersoll Rand Inc.': [
      { title: 'Variable Speed Drive Technology', description: 'Next-generation VSD compressors reducing energy consumption by up to 50% by matching output to demand', category: 'Energy Efficiency' },
      { title: 'Predictive Maintenance Programs', description: 'AI-driven diagnostics and remote service capabilities minimizing unplanned downtime for industrial customers', category: 'Digital Services' },
      { title: 'Multi-Stage Compressed Air Systems', description: 'Integrated compressed air system design for large-scale industrial facilities including dryers, filters, and controls', category: 'System Integration' }
    ],
    'Kaeser Kompressoren SE': [
      { title: 'Sigma Control 2 Smart Systems', description: 'Industry-leading compressor controller with integrated connectivity for Industry 4.0 environments', category: 'Smart Technology' },
      { title: 'Compressed Air Auditing Services', description: 'Free comprehensive air demand analysis and energy efficiency audits for Canadian industrial customers', category: 'Value-Added Services' },
      { title: 'Heat Recovery Solutions', description: 'Recovering up to 96% of compression heat for space heating and hot water, significantly reducing facility energy costs', category: 'Sustainability' }
    ],
    'ELGi Equipments Limited': [
      { title: 'Cost-Competitive Oil-Injected Compressors', description: 'High-reliability rotary screw compressors at 15-20% lower total cost of ownership versus premium European brands', category: 'Price Advantage' },
      { title: 'Rapid Deployment & Installation', description: 'Factory-ready compressor packages with simplified installation reducing site commissioning time by 40%', category: 'Operational Efficiency' },
      { title: 'Aftermarket Parts Availability', description: 'Comprehensive Canadian spare parts network with 24-hour parts availability and local service technicians', category: 'After-Sales Service' }
    ],
    'Hitachi Industrial Equipment Systems Co., Ltd.': [
      { title: 'Oil-Free High-Purity Air Systems', description: 'Certified oil-free rotary screw compressors for pharmaceutical, food processing, and semiconductor manufacturing in Canada', category: 'Product Purity' },
      { title: 'Industrial-Grade Reliability', description: 'Compressors engineered for continuous 24/7 operation in demanding Canadian industrial environments', category: 'Reliability' },
      { title: 'Global Technical Support', description: 'Worldwide service network with Canadian-based technical engineers and rapid response protocols', category: 'Service Network' }
    ],
    'Kobelco Compressors Corporation': [
      { title: 'Custom Engineering Solutions', description: 'Bespoke large-capacity compressor systems designed for specific industrial applications including mining and petrochemicals', category: 'Custom Engineering' },
      { title: 'Large-Scale Industrial Compressors', description: 'High-capacity oil-free rotary screw compressors for refineries, LNG facilities, and large manufacturing plants', category: 'Heavy Industry' },
      { title: 'CO2 Reduction Programs', description: 'Energy optimization programs helping Canadian industrial customers reduce carbon footprint and meet sustainability targets', category: 'Sustainability' }
    ],
    'Anest Iwata Corporation': [
      { title: 'Compact Oil-Free Compressors', description: 'Space-efficient oil-free scroll and rotary screw compressors for laboratories, dental, and medical applications', category: 'Compact Solutions' },
      { title: 'Medical & Pharma Grade Air', description: 'ISO 8573-1 Class 0 certified oil-free air systems meeting Canadian pharmacopoeia standards', category: 'Quality Standards' },
      { title: 'Dealer Network Support', description: 'Extensive Canadian authorized dealer network providing local sales, installation, and maintenance services', category: 'Distribution' }
    ],
    'BAUER Kompressoren GmbH': [
      { title: 'High-Pressure Industrial Compressors', description: 'Specialty high-pressure rotary screw compressors for industrial gas applications and process industries', category: 'Specialty Products' },
      { title: 'Breathing Air & Safety Systems', description: 'Certified breathing air compressors for mining, fire departments, and emergency services across Canada', category: 'Safety Applications' },
      { title: 'Defense & Industrial Contracts', description: 'Long-term supply agreements with Canadian defense agencies and major industrial contractors', category: 'Strategic Contracts' }
    ],
    'Mattei Compressors Inc.': [
      { title: 'Rotary Vane Technology', description: 'Patented rotary vane compressors offering longer service life (60,000+ hours) versus conventional rotary screw designs', category: 'Product Longevity' },
      { title: 'Low-Noise Operation', description: 'Ultra-quiet compressor systems enabling installation in noise-sensitive environments without soundproofing', category: 'Operational Comfort' },
      { title: 'Extended Service Intervals', description: 'Industry-leading 6,000-hour service intervals reducing maintenance costs and production downtime for Canadian customers', category: 'Low Maintenance' }
    ],
    'Others': [
      { title: 'Market-Specific Solutions', description: 'Tailored rotary screw compressor products for niche Canadian industrial and commercial applications', category: 'Market Adaptation' },
      { title: 'Regional Distribution Focus', description: 'Strong local distributor networks providing competitive pricing and responsive service across Canadian provinces', category: 'Local Expertise' },
      { title: 'Competitive Pricing', description: 'Cost-effective compressed air solutions targeting price-sensitive segments of the Canadian industrial market', category: 'Price Competition' }
    ]
  }

  return propositionMap[company] || [
    { title: 'Market Development', description: 'Expanding into new Canadian industrial segments and provinces', category: 'Market Strategy' },
    { title: 'Product Innovation', description: 'Continuous compressor technology R&D and product development', category: 'Innovation' },
    { title: 'Strategic Partnerships', description: 'Building alliances with Canadian distributors and system integrators', category: 'Partnerships' }
  ]
}

// Generate revenue based on market share
function generateRevenue(marketShare: number): { overall: number, segmental: number } {
  // Total Canada Stationary Rotary Screw Compressors market size approximately 141.9 USD Mn (2025 base year)
  const totalMarketSize = 141.9
  const segmentalRevenue = (marketShare / 100) * totalMarketSize

  // Overall company revenue is typically 50-150x the Canada segment revenue (global company)
  const multiplier = 50 + Math.floor(Math.random() * 100)
  const overallRevenue = segmentalRevenue * multiplier

  return {
    overall: Math.round(overallRevenue),
    segmental: Math.round(segmentalRevenue * 10) / 10
  }
}

/**
 * Generate competitive intelligence data for all companies
 * Now loads from store, JSON file, or fallback to hardcoded data
 * Can also accept parsed CSV data
 */
export async function generateCompetitiveData(csvData?: Record<string, any>[]): Promise<CompanyData[]> {
  // If CSV data is provided, parse it
  if (csvData && csvData.length > 0) {
    return parseCompetitiveIntelligenceFromData(csvData)
  }
  
  // Try to get data from store first (only in browser environment)
  if (typeof window !== 'undefined') {
    try {
      const { useDashboardStore } = require('./store')
      const store = useDashboardStore.getState()
      
      if (store.competitiveIntelligenceData && store.competitiveIntelligenceData.rows && store.competitiveIntelligenceData.rows.length > 0) {
        console.log('Using competitive intelligence data from store for generateCompetitiveData')
        return parseCompetitiveIntelligenceFromData(store.competitiveIntelligenceData.rows)
      }
    } catch (error) {
      console.warn('Could not access store for competitive intelligence data:', error)
    }
  }
  
  const jsonData = await loadCompetitiveIntelligenceData()
  
  if (jsonData && jsonData.companies) {
    return jsonData.companies
  }
  
  // Fallback to hardcoded data
  return companies.map(company => {
    const revenue = generateRevenue(marketShares[company])
    
    // Generate sample propositions based on company
    const propositions: Proposition[] = generatePropositions(company)
    
    return {
      id: company.toLowerCase().replace(/\s+/g, '-'),
      name: company,
      headquarters: headquarters[company],
      ceo: ceos[company],
      yearEstablished: yearEstablished[company],
      portfolio: portfolios[company],
      strategies: generateStrategies(company),
      regionalStrength: regionalStrengths[company],
      overallRevenue: revenue.overall,
      segmentalRevenue: revenue.segmental,
      marketShare: marketShares[company],
      propositions,
      color: companyColors[company]
    }
  })
}

/**
 * Generate market share data for pie chart
 * Now loads from JSON file, with fallback to hardcoded data
 * Groups smaller companies into "Others" to reduce clutter
 */
export async function generateMarketShareData(showTopN: number = 10): Promise<MarketShareData[]> {
  const jsonData = await loadCompetitiveIntelligenceData()
  
  let allData: MarketShareData[]
  
  if (jsonData && jsonData.market_share_data) {
    allData = jsonData.market_share_data
  } else {
    // Fallback to hardcoded data
    allData = companies.map(company => ({
      company,
      marketShare: marketShares[company],
      color: companyColors[company]
    }))
  }
  
  // Sort by market share (descending)
  const sorted = [...allData].sort((a, b) => b.marketShare - a.marketShare)
  
  // Take top N companies
  const topCompanies = sorted.slice(0, showTopN)
  
  // Group the rest into "Others"
  const othersShare = sorted.slice(showTopN).reduce((sum, c) => sum + c.marketShare, 0)
  
  if (othersShare > 0) {
    topCompanies.push({
      company: 'Others',
      marketShare: othersShare,
      color: '#94a3b8' // Gray color for Others
    })
  }
  
  return topCompanies
}

/**
 * Get top companies by market share
 */
export async function getTopCompanies(limit: number = 5): Promise<CompanyData[]> {
  const allCompanies = await generateCompetitiveData()
  return allCompanies
    .filter(c => c.name !== 'Others')
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, limit)
}

/**
 * Calculate market concentration (HHI - Herfindahl-Hirschman Index)
 */
export function calculateMarketConcentration(): { hhi: number; concentration: string } {
  const shares = Object.values(marketShares)
  const hhi = shares.reduce((sum, share) => sum + Math.pow(share, 2), 0)
  
  let concentration = 'Competitive'
  if (hhi < 1500) {
    concentration = 'Competitive'
  } else if (hhi < 2500) {
    concentration = 'Moderately Concentrated'
  } else {
    concentration = 'Highly Concentrated'
  }
  
  return { hhi: Math.round(hhi), concentration }
}

/**
 * Get company comparison data for competitive dashboard
 * Now includes propositions with parent/child header structure
 */
export async function getCompanyComparison(): Promise<{
  headers: string[];
  rows: { 
    label: string; 
    values: (string | number)[]; 
    section?: string; // Parent section header
    isProposition?: boolean; // Flag for proposition rows
  }[];
  sections?: string[]; // List of section headers
}> {
  const companies = (await generateCompetitiveData()).slice(0, 10) // Top 10 companies
  
  const headers = companies.map(c => c.name)
  
  // Find maximum number of propositions across all companies
  const maxPropositions = Math.max(
    ...companies.map(c => c.propositions?.length || 0),
    3 // Default to 3 if no propositions
  )
  
  const rows: { 
    label: string; 
    values: (string | number)[]; 
    section?: string;
    isProposition?: boolean;
  }[] = [
    {
      label: "Headquarters",
      values: companies.map(c => c.headquarters),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Key Management (CEO)",
      values: companies.map(c => c.ceo),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Year of Establishment",
      values: companies.map(c => c.yearEstablished || 'N/A'),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Product/Service Portfolio",
      values: companies.map(c => c.portfolio),
      section: "PRODUCT & SERVICES"
    },
    {
      label: "Strategies/Recent Developments",
      values: companies.map(c => c.strategies.join(', ')),
      section: "STRATEGY & DEVELOPMENT"
    },
    {
      label: "Regional Strength",
      values: companies.map(c => c.regionalStrength),
      section: "MARKET PRESENCE"
    },
    {
      label: "Overall Revenue (USD Mn)",
      values: companies.map(c => c.overallRevenue.toLocaleString()),
      section: "FINANCIAL METRICS"
    },
    {
      label: "Segmental Revenue (USD Mn), 2024",
      values: companies.map(c => c.segmentalRevenue.toLocaleString()),
      section: "FINANCIAL METRICS"
    },
    {
      label: "Market Share (%)",
      values: companies.map(c => c.marketShare.toFixed(1) + '%'),
      section: "FINANCIAL METRICS"
    }
  ]
  
  // Add proposition rows dynamically
  if (maxPropositions > 0) {
    for (let i = 0; i < maxPropositions; i++) {
      const propIndex = i + 1
      
      // Proposition Title row
      rows.push({
        label: `Proposition ${propIndex} - Title`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.title || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
      
      // Proposition Description row
      rows.push({
        label: `Proposition ${propIndex} - Description`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.description || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
      
      // Proposition Category row
      rows.push({
        label: `Proposition ${propIndex} - Category`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.category || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
    }
  }
  
  // Extract unique sections
  const sections = Array.from(new Set(rows.map(r => r.section).filter(Boolean))) as string[]
  
  return { headers, rows, sections }
}
