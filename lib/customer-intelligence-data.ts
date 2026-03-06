/**
 * Customer Intelligence Data Generator
 * Generates realistic customer data for End User segments across regions
 */

export interface Customer {
  id: string
  name: string
  region: string
  endUserSegment: string
  type: 'residential' | 'commercial' | 'utility'
}

export interface CustomerIntelligenceData {
  region: string
  endUserSegment: string
  customerCount: number
  customers: Customer[]
}

// Realistic customer name generators by industry segment (Canada rotary screw compressor end-users)
const manufacturingNames = [
  'Auto Parts Manufacturing', 'Steel Fabrication Plant', 'Precision Machining', 'Metal Stamping Works',
  'Pharmaceutical Manufacturing', 'Food Processing Plant', 'Electronics Assembly', 'Packaging Facility',
  'Plastics Extrusion Plant', 'Automotive Assembly'
]

const energyResourcesNames = [
  'Oil Sands Processing', 'Natural Gas Facility', 'Refinery Operations', 'Pipeline Terminal',
  'Power Generation Plant', 'Utilities Distribution', 'Mining Operations', 'LNG Facility',
  'Petrochemical Plant', 'Energy Recovery Station'
]

const generalIndustrialNames = [
  'Construction Materials Plant', 'Lumber Processing Mill', 'Pulp & Paper Facility', 'Cement Works',
  'Logistics & Warehousing', 'Marine Dry Dock', 'Industrial Services Hub', 'Water Treatment Plant',
  'Municipal Infrastructure', 'Agricultural Processing'
]

const locationSuffixes = [
  'Ontario', 'Quebec', 'Alberta', 'BC', 'Manitoba', 'Saskatchewan',
  'Nova Scotia', 'New Brunswick', 'Newfoundland', 'Toronto', 'Calgary', 'Montreal'
]

// Province-specific prefixes
const regionPrefixes: Record<string, string[]> = {
  'Ontario': ['Ontario', 'Greater Toronto', 'Southern Ontario', 'Northern Ontario', 'Ottawa Valley'],
  'Quebec': ['Quebec', 'Montreal', 'Quebec City', 'Saguenay', 'Sherbrooke'],
  'Alberta': ['Alberta', 'Calgary', 'Edmonton', 'Fort McMurray', 'Red Deer'],
  'British Columbia': ['BC', 'Vancouver', 'Surrey', 'Burnaby', 'Prince George'],
  'Rest of Canada': ['Atlantic', 'Prairie', 'Manitoba', 'Saskatchewan', 'Maritime']
}

function generateCustomerName(region: string, endUserSegment: string, index: number): string {
  const prefixes = regionPrefixes[region] || ['Canadian', 'Regional']
  const prefix = prefixes[index % prefixes.length]
  const location = locationSuffixes[index % locationSuffixes.length]

  let baseName = ''
  if (endUserSegment === 'Manufacturing & Processing') {
    baseName = manufacturingNames[index % manufacturingNames.length]
  } else if (endUserSegment === 'Energy & Resources') {
    baseName = energyResourcesNames[index % energyResourcesNames.length]
  } else {
    baseName = generalIndustrialNames[index % generalIndustrialNames.length]
  }

  return `${prefix} ${baseName} ${location}`
}

/**
 * Generate realistic customer counts based on region and end user segment
 * Residential typically has more installations in developed regions
 * Utility-scale is more concentrated in large markets
 */
// Deterministic seed function for consistent data generation
function seededRandom(seed: number): () => number {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function generateCustomerCount(region: string, endUserSegment: string): number {
  // Base multipliers by Canadian province (reflecting industrial density)
  const regionMultipliers: Record<string, number> = {
    'Ontario': 1.4,          // Largest industrial base
    'Quebec': 1.2,           // Strong manufacturing
    'Alberta': 1.3,          // Oil & gas intensive
    'British Columbia': 1.0, // Moderate industrial
    'Rest of Canada': 0.7    // Lower density
  }

  // Base multipliers by end-use industry segment (Canada compressor market)
  const segmentMultipliers: Record<string, number> = {
    'Manufacturing & Processing': 1.5, // Largest segment
    'Energy & Resources': 1.2,         // Oil sands, mining, power
    'General Industrial': 0.8          // Construction, logistics, other
  }

  // Base count range (industrial compressor customers per region/segment)
  const baseMin = 30
  const baseMax = 180

  const regionMulti = regionMultipliers[region] || 1.0
  const segmentMulti = segmentMultipliers[endUserSegment] || 1.0

  // Calculate realistic range
  const min = Math.floor(baseMin * regionMulti * segmentMulti)
  const max = Math.floor(baseMax * regionMulti * segmentMulti)

  // Create deterministic seed based on region and segment
  const seed = (region.charCodeAt(0) * 1000 + endUserSegment.charCodeAt(0) * 100) % 10000
  const random = seededRandom(seed)

  // Generate consistent count
  const count = Math.floor(random() * (max - min + 1)) + min

  return Math.max(10, count) // Minimum 10 customers
}

/**
 * Generate all customer intelligence data
 */
export function generateCustomerIntelligenceData(): CustomerIntelligenceData[] {
  // Canadian provinces (geographic breakdown for Canada market)
  const regions = [
    'Ontario',
    'Quebec',
    'Alberta',
    'British Columbia',
    'Rest of Canada'
  ]

  // End-use industry segments (aligned with PPT By End-use Industry segmentation)
  const endUserSegments = [
    'Manufacturing & Processing',
    'Energy & Resources',
    'General Industrial'
  ]

  const data: CustomerIntelligenceData[] = []

  regions.forEach(region => {
    endUserSegments.forEach(endUserSegment => {
      const customerCount = generateCustomerCount(region, endUserSegment)
      const customers: Customer[] = []

      // Generate customer names (deterministic based on region, segment, and index)
      for (let i = 0; i < customerCount; i++) {
        customers.push({
          id: `${region}-${endUserSegment}-${i}`,
          name: generateCustomerName(region, endUserSegment, i),
          region,
          endUserSegment,
          type: endUserSegment === 'Manufacturing & Processing' ? 'commercial'
                : endUserSegment === 'Energy & Resources' ? 'utility'
                : 'residential'
        })
      }

      data.push({
        region,
        endUserSegment,
        customerCount,
        customers
      })
    })
  })

  return data
}

/**
 * Get customers for a specific region and end user segment
 */
export function getCustomersForCell(
  data: CustomerIntelligenceData[],
  region: string,
  endUserSegment: string
): Customer[] {
  const cell = data.find(
    d => d.region === region && d.endUserSegment === endUserSegment
  )
  return cell?.customers || []
}

/**
 * Get customer count for a specific region and end user segment
 */
export function getCustomerCountForCell(
  data: CustomerIntelligenceData[],
  region: string,
  endUserSegment: string
): number {
  const cell = data.find(
    d => d.region === region && d.endUserSegment === endUserSegment
  )
  return cell?.customerCount || 0
}

/**
 * Parse customer intelligence data from Excel rows
 * Extracts customer information and groups by region and end user segment
 */
export function parseCustomerIntelligenceFromData(rows: Record<string, any>[]): CustomerIntelligenceData[] {
  // Map to store customers by region and end user segment
  const customerMap = new Map<string, Customer[]>()

  // Common column name variations
  const getColumnValue = (row: Record<string, any>, possibleNames: string[]): string | null => {
    for (const name of possibleNames) {
      // Try exact match
      if (row[name] !== undefined && row[name] !== null && row[name] !== '') {
        const value = String(row[name]).trim()
        if (value && value !== 'xx' && value.toLowerCase() !== 'n/a') {
          return value
        }
      }
      // Try case-insensitive match
      const lowerName = name.toLowerCase().trim()
      for (const key in row) {
        if (key && key.toLowerCase().trim() === lowerName && row[key] !== undefined && row[key] !== null && row[key] !== '') {
          const value = String(row[key]).trim()
          if (value && value !== 'xx' && value.toLowerCase() !== 'n/a') {
            return value
          }
        }
      }
      // Try partial match (contains)
      for (const key in row) {
        if (key && key.toLowerCase().includes(lowerName) && row[key] !== undefined && row[key] !== null && row[key] !== '') {
          const value = String(row[key]).trim()
          if (value && value !== 'xx' && value.toLowerCase() !== 'n/a') {
            return value
          }
        }
      }
    }
    return null
  }

  // Log first row structure for debugging
  if (rows.length > 0) {
    console.log('Parser - First row keys:', Object.keys(rows[0]))
    console.log('Parser - First row sample:', rows[0])
  }

  let processedCount = 0
  let skippedCount = 0

  // Process each row
  rows.forEach((row, index) => {
    // Try to extract customer name/company (most important field)
    let customerName = getColumnValue(row, [
      'Company Name', 'Company', 'Customer Name', 'Customer',
      'End User Name', 'Client Name', 'Organization Name',
      'Name', 'Organization', 'Institution', 'End User', 'Client'
    ])

    // If no customer name found with standard names, try to find any field that looks like a name
    if (!customerName) {
      // Look for the first non-empty field that doesn't look like metadata
      for (const key in row) {
        // Skip metadata fields
        if (key.startsWith('_') ||
            key.toLowerCase().includes('sheet') ||
            key.toLowerCase().includes('index') ||
            key.toLowerCase().includes('row')) {
          continue
        }

        const value = row[key]
        if (value && typeof value === 'string') {
          const trimmed = value.trim()
          // If it's a reasonable length and not a placeholder, use it as name
          if (trimmed &&
              trimmed.length > 2 &&
              trimmed.length < 200 &&
              trimmed !== 'xx' &&
              trimmed.toLowerCase() !== 'n/a' &&
              !trimmed.match(/^\d+$/) && // Not just numbers
              !trimmed.toLowerCase().includes('region') &&
              !trimmed.toLowerCase().includes('segment') &&
              !trimmed.toLowerCase().includes('type')) {
            customerName = trimmed
            break
          }
        }
      }
    }

    // Skip rows without customer name
    if (!customerName) {
      skippedCount++
      if (skippedCount <= 3) {
        console.log(`Parser - Skipping row ${index + 1}: No customer name found. Available keys:`, Object.keys(row))
      }
      return
    }

    processedCount++

    // Try to extract region
    const region = getColumnValue(row, [
      'Region', 'Geography', 'Geographic Region', 'Market Region',
      'Country', 'Location', 'Territory', 'Market', 'Area'
    ])

    // Try to extract end user segment/type
    const endUserSegment = getColumnValue(row, [
      'End User Type', 'End User Segment', 'Industry Category',
      'Industry Type', 'Segment', 'Customer Type', 'End User Category',
      'Industry', 'Category', 'Type', 'Segment Type'
    ])

    // Normalize region - map to Canadian provinces
    let normalizedRegion = region || null
    if (region) {
      const lowerRegion = region.toLowerCase()
      if (lowerRegion.includes('ontario') || lowerRegion.includes('toronto') || lowerRegion.includes('ottawa')) {
        normalizedRegion = 'Ontario'
      } else if (lowerRegion.includes('quebec') || lowerRegion.includes('montreal')) {
        normalizedRegion = 'Quebec'
      } else if (lowerRegion.includes('alberta') || lowerRegion.includes('calgary') || lowerRegion.includes('edmonton') || lowerRegion.includes('fort mcmurray')) {
        normalizedRegion = 'Alberta'
      } else if (lowerRegion.includes('british columbia') || lowerRegion.includes('vancouver') || lowerRegion.includes(' bc')) {
        normalizedRegion = 'British Columbia'
      } else if (lowerRegion.includes('canada') || lowerRegion.includes('manitoba') || lowerRegion.includes('saskatchewan') || lowerRegion.includes('nova') || lowerRegion.includes('brunswick') || lowerRegion.includes('newfoundland')) {
        normalizedRegion = 'Rest of Canada'
      } else {
        normalizedRegion = region
      }
    }

    // If still no region, default to Ontario (largest market)
    if (!normalizedRegion) {
      normalizedRegion = 'Ontario'
    }

    // Normalize end user segment to Canada compressor industry segments
    let normalizedSegment = endUserSegment || null
    if (endUserSegment) {
      const lowerSegment = endUserSegment.toLowerCase()
      if (lowerSegment.includes('manufactur') || lowerSegment.includes('processing') || lowerSegment.includes('automotive') || lowerSegment.includes('food') || lowerSegment.includes('pharma') || lowerSegment.includes('electronics')) {
        normalizedSegment = 'Manufacturing & Processing'
      } else if (lowerSegment.includes('energy') || lowerSegment.includes('oil') || lowerSegment.includes('gas') || lowerSegment.includes('mining') || lowerSegment.includes('resource') || lowerSegment.includes('utility') || lowerSegment.includes('utilities')) {
        normalizedSegment = 'Energy & Resources'
      } else if (lowerSegment.includes('industrial') || lowerSegment.includes('construction') || lowerSegment.includes('logistics') || lowerSegment.includes('marine') || lowerSegment.includes('general')) {
        normalizedSegment = 'General Industrial'
      } else {
        normalizedSegment = endUserSegment
      }
    }

    // If still no segment, default to Manufacturing & Processing (largest segment)
    if (!normalizedSegment) {
      normalizedSegment = 'Manufacturing & Processing'
    }

    // Create customer object
    const customer: Customer = {
      id: `customer-${index}-${Date.now()}`,
      name: customerName,
      region: normalizedRegion,
      endUserSegment: normalizedSegment,
      type: normalizedSegment === 'Manufacturing & Processing' ? 'commercial'
            : normalizedSegment === 'Energy & Resources' ? 'utility'
            : 'residential'
    }

    // Group by region and segment
    const key = `${normalizedRegion}|||${normalizedSegment}`
    if (!customerMap.has(key)) {
      customerMap.set(key, [])
    }
    customerMap.get(key)!.push(customer)
  })

  // Convert map to CustomerIntelligenceData array
  const result: CustomerIntelligenceData[] = []
  customerMap.forEach((customers, key) => {
    const [region, endUserSegment] = key.split('|||')
    result.push({
      region,
      endUserSegment,
      customerCount: customers.length,
      customers
    })
  })

  console.log(`Parser - Summary:`)
  console.log(`  Total rows: ${rows.length}`)
  console.log(`  Processed: ${processedCount}`)
  console.log(`  Skipped: ${skippedCount}`)
  console.log(`  Unique region/segment combinations: ${result.length}`)
  console.log(`  Total customers: ${result.reduce((sum, cell) => sum + cell.customerCount, 0)}`)

  // Log the breakdown by region and segment
  if (result.length > 0) {
    console.log('Parser - Breakdown by region/segment:')
    result.forEach(cell => {
      console.log(`  ${cell.region} / ${cell.endUserSegment}: ${cell.customerCount} customers`)
    })
  }

  if (result.length === 0 && rows.length > 0) {
    console.warn('Parser - No customers extracted. Sample row:', rows[0])
  }

  return result
}

/**
 * Load customer intelligence data from API
 * Falls back to generated data if API fails
 */
let cachedData: CustomerIntelligenceData[] | null = null

export async function loadCustomerIntelligenceData(filePath?: string): Promise<CustomerIntelligenceData[]> {
  // Ensure we're on the client side
  if (typeof window === 'undefined') {
    return generateCustomerIntelligenceData()
  }

  // If we have cached data and no new file path, return cached
  if (cachedData && !filePath) {
    return Promise.resolve(cachedData)
  }

  try {
    // Try to load from API endpoint
    const url = filePath
      ? `/api/load-customer-intelligence?filePath=${encodeURIComponent(filePath)}`
      : '/api/load-customer-intelligence'

    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      if (!controller.signal.aborted) {
        controller.abort()
      }
    }, 30000) // 30 second timeout

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        // If file not found, fall back to generated data
        if (response.status === 404) {
          console.log('Customer intelligence Excel file not found, using generated data')
          return generateCustomerIntelligenceData()
        }

        // Try to get error details from response
        let errorMessage = response.statusText
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || response.statusText
          console.error('API Error details:', errorData)
        } catch {
          // If JSON parsing fails, use status text
        }

        console.warn(`Failed to load customer intelligence: ${errorMessage}, using generated data`)
        return generateCustomerIntelligenceData()
      }

      const data = await response.json()

      console.log('API Response received:', {
        hasData: !!data.data,
        dataType: Array.isArray(data.data) ? 'array' : typeof data.data,
        dataLength: Array.isArray(data.data) ? data.data.length : 'N/A',
        metadata: data.metadata,
        error: data.error,
        message: data.message
      })

      // Transform the API response to match CustomerIntelligenceData structure
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        console.log(`Successfully loaded ${data.data.length} customer intelligence cells`)
        cachedData = data.data as CustomerIntelligenceData[]
        return cachedData
      }

      // If data structure is unexpected, fall back to generated data
      console.warn('Unexpected data structure from API:', data)
      console.warn('Falling back to generated data')
      return generateCustomerIntelligenceData()
    } catch (fetchError) {
      clearTimeout(timeoutId)

      // Handle abort errors gracefully
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.log('Customer intelligence data fetch was aborted')
        return generateCustomerIntelligenceData()
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Error loading customer intelligence data:', error)
    // Fall back to generated data on error
    return generateCustomerIntelligenceData()
  }
}
