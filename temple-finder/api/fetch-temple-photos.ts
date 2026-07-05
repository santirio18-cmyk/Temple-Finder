import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { templeName, city } = req.body

  if (!templeName) {
    return res.status(400).json({ error: 'Temple name is required' })
  }

  const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' })
  }

  try {
    // Search for the temple
    const searchQuery = encodeURIComponent(`${templeName} ${city || 'Chennai'}`)
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`

    const response = await fetch(searchUrl)

    if (!response.ok) {
      throw new Error(`Google API returned ${response.status}`)
    }

    const data = await response.json()

    if (data.status === 'ZERO_RESULTS') {
      return res.status(404).json({ error: 'No results found', photos: [] })
    }

    if (data.status !== 'OK') {
      return res.status(500).json({ error: `Google API error: ${data.status}` })
    }

    // Extract photos from first result
    if (data.results && data.results[0] && data.results[0].photos) {
      const photos = data.results[0].photos.slice(0, 6).map((photo: any) => ({
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${apiKey}`,
        width: photo.width,
        height: photo.height,
      }))

      return res.status(200).json({ 
        success: true,
        photos,
        placeName: data.results[0].name,
      })
    }

    return res.status(404).json({ error: 'No photos found', photos: [] })

  } catch (error: any) {
    console.error('Error fetching photos:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch photos',
      details: error.message 
    })
  }
}
