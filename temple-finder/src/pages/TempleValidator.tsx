import { useState, useEffect } from 'react'
import { temples } from '../data'
import type { Temple } from '../data'
import AdminAuth from '../components/AdminAuth'

interface TempleWithValidation extends Temple {
  verified?: boolean
  alternateImages?: string[]
}

interface ValidationStats {
  total: number
  verified: number
  needsReview: number
  noImage: number
}

export default function TempleValidator() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [templeList, setTempleList] = useState<TempleWithValidation[]>([])
  const [editMode, setEditMode] = useState(false)
  const [editedTemple, setEditedTemple] = useState<TempleWithValidation | null>(null)
  const [alternatePhotos, setAlternatePhotos] = useState<string[]>([])
  const [loadingPhotos, setLoadingPhotos] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unverified' | 'no-image'>('all')
  const [stats, setStats] = useState<ValidationStats>({
    total: 0,
    verified: 0,
    needsReview: 0,
    noImage: 0
  })

  useEffect(() => {
    // Load validation data from localStorage
    const savedData = localStorage.getItem('temple-validation-data')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setTempleList(parsed)
      } catch (e) {
        initializeTempleList()
      }
    } else {
      initializeTempleList()
    }
  }, [])

  useEffect(() => {
    // Calculate stats
    const total = templeList.length
    const verified = templeList.filter(t => t.verified).length
    const noImage = templeList.filter(t => !t.image).length
    const needsReview = total - verified

    setStats({ total, verified, needsReview, noImage })
  }, [templeList])

  const initializeTempleList = () => {
    const initialList = temples.map(t => ({
      ...t,
      verified: false,
      alternateImages: []
    }))
    setTempleList(initialList)
    saveToLocalStorage(initialList)
  }

  const saveToLocalStorage = (list: TempleWithValidation[]) => {
    localStorage.setItem('temple-validation-data', JSON.stringify(list))
  }

  const getCurrentTemple = () => {
    const filteredList = getFilteredTemples()
    return filteredList[currentIndex] || null
  }

  const getFilteredTemples = () => {
    if (filter === 'unverified') {
      return templeList.filter(t => !t.verified)
    } else if (filter === 'no-image') {
      return templeList.filter(t => !t.image)
    }
    return templeList
  }

  const handleNext = () => {
    const filtered = getFilteredTemples()
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setEditMode(false)
      setAlternatePhotos([])
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setEditMode(false)
      setAlternatePhotos([])
    }
  }

  const handleVerify = () => {
    const temple = getCurrentTemple()
    if (!temple) return

    const updatedList = templeList.map(t =>
      t.id === temple.id ? { ...t, verified: true } : t
    )
    setTempleList(updatedList)
    saveToLocalStorage(updatedList)
    handleNext()
  }

  const handleEdit = () => {
    const temple = getCurrentTemple()
    if (temple) {
      setEditedTemple({ ...temple })
      setEditMode(true)
    }
  }

  const handleSaveEdit = () => {
    if (!editedTemple) return

    const updatedList = templeList.map(t =>
      t.id === editedTemple.id ? { ...editedTemple, verified: true } : t
    )
    setTempleList(updatedList)
    saveToLocalStorage(updatedList)
    setEditMode(false)
    setEditedTemple(null)
    handleNext()
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setEditedTemple(null)
  }

  const handleSelectImage = (imageUrl: string) => {
    if (editedTemple) {
      setEditedTemple({ ...editedTemple, image: imageUrl })
    }
  }

  const fetchAlternatePhotos = async () => {
    const temple = getCurrentTemple()
    if (!temple) return

    setLoadingPhotos(true)
    try {
      // Call our serverless function instead of Google API directly
      const response = await fetch('/api/fetch-temple-photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templeName: temple.name,
          city: temple.city,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch photos')
      }

      const data = await response.json()

      if (data.success && data.photos && data.photos.length > 0) {
        const photoUrls = data.photos.map((p: any) => p.url)
        setAlternatePhotos(photoUrls)
        alert(`Found ${photoUrls.length} photos! Click on any image to use it.`)
      } else {
        alert('No photos found for this temple. Try manual image URL instead.')
      }
    } catch (error: any) {
      console.error('Error fetching photos:', error)
      alert(error.message || 'Failed to fetch photos. Use manual image URL instead.')
    } finally {
      setLoadingPhotos(false)
    }
  }

  const exportValidatedData = () => {
    // Export as TypeScript code for data.ts
    const validatedTemples = templeList.filter(t => t.verified)
    
    const tsCode = validatedTemples.map(t => `  {
    id: '${t.id}',
    name: '${t.name.replace(/'/g, "\\'")}',
    deity: '${t.deity}',
    description: '${t.description.replace(/'/g, "\\'")}',
    address: '${t.address.replace(/'/g, "\\'")}',
    city: '${t.city}',
    state: '${t.state}',
    latitude: ${t.latitude},
    longitude: ${t.longitude},
    rating: ${t.rating},${t.image ? `\n    image: '${t.image}'` : ''}
  }`).join(',\n')

    const blob = new Blob([tsCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `validated-temples-${validatedTemples.length}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentTemple = getCurrentTemple()
  const filteredList = getFilteredTemples()
  const progress = filteredList.length > 0 ? ((currentIndex + 1) / filteredList.length) * 100 : 0

  if (!currentTemple) {
    return (
      <AdminAuth>
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold text-orange-600 mb-4">🏛️ Temple Data Validator</h1>
            <p className="text-gray-600">No temples to validate</p>
            <button
              onClick={initializeTempleList}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Initialize Validation Data
            </button>
          </div>
        </div>
      </AdminAuth>
    )
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-orange-600">🏛️ Temple Data Validator</h1>
            <button
              onClick={exportValidatedData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              📥 Export {stats.verified} Verified
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Temples</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified ✓</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.needsReview}</div>
              <div className="text-sm text-gray-600">Needs Review</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.noImage}</div>
              <div className="text-sm text-gray-600">No Image</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => { setFilter('all'); setCurrentIndex(0); }}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => { setFilter('unverified'); setCurrentIndex(0); }}
              className={`px-4 py-2 rounded-lg ${filter === 'unverified' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Unverified
            </button>
            <button
              onClick={() => { setFilter('no-image'); setCurrentIndex(0); }}
              className={`px-4 py-2 rounded-lg ${filter === 'no-image' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              No Image
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-600">{currentIndex + 1} / {filteredList.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Temple Review Card */}
        {!editMode ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Current Image</h3>
                {currentTemple.image ? (
                  <img
                    src={currentTemple.image}
                    alt={currentTemple.name}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop'
                    }}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{currentTemple.name}</h2>
                    {currentTemple.verified && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="text-orange-600 font-medium mb-2">🕉️ {currentTemple.deity}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{currentTemple.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>ID:</strong> {currentTemple.id}</p>
                  <p><strong>Description:</strong> {currentTemple.description}</p>
                  <p><strong>Address:</strong> {currentTemple.address}</p>
                  <p><strong>Coordinates:</strong> {currentTemple.latitude.toFixed(4)}, {currentTemple.longitude.toFixed(4)}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleVerify}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    ✓ Verify & Next
                  </button>
                  <button
                    onClick={handleEdit}
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
                  >
                    ✏️ Edit Temple Data
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex >= filteredList.length - 1}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">✏️ Edit Temple Data</h2>
            
            {editedTemple && (
              <div className="space-y-4">
                {/* Image Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temple Image
                  </label>
                  {editedTemple.image && (
                    <img
                      src={editedTemple.image}
                      alt="Current"
                      className="w-full h-48 object-cover rounded-lg mb-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop'
                      }}
                    />
                  )}
                  <input
                    type="text"
                    value={editedTemple.image || ''}
                    onChange={(e) => setEditedTemple({ ...editedTemple, image: e.target.value })}
                    placeholder="Image URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={fetchAlternatePhotos}
                    disabled={loadingPhotos}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
                  >
                    {loadingPhotos ? 'Loading...' : '🔍 Find More Photos'}
                  </button>
                </div>

                {/* Alternate Photos */}
                {alternatePhotos.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select from Google Photos:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {alternatePhotos.map((photo, idx) => (
                        <img
                          key={idx}
                          src={photo}
                          alt={`Option ${idx + 1}`}
                          onClick={() => handleSelectImage(photo)}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-orange-500"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editedTemple.name}
                    onChange={(e) => setEditedTemple({ ...editedTemple, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Deity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deity</label>
                  <select
                    value={editedTemple.deity}
                    onChange={(e) => setEditedTemple({ ...editedTemple, deity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Shiva">Shiva</option>
                    <option value="Vishnu">Vishnu</option>
                    <option value="Murugan">Murugan</option>
                    <option value="Ganesha">Ganesha</option>
                    <option value="Devi">Devi</option>
                    <option value="Hanuman">Hanuman</option>
                    <option value="Krishna">Krishna</option>
                    <option value="Rama">Rama</option>
                    <option value="Ayyappa">Ayyappa</option>
                    <option value="Navagraha">Navagraha</option>
                    <option value="Hindu">Hindu (General)</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editedTemple.description}
                    onChange={(e) => setEditedTemple({ ...editedTemple, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={editedTemple.address}
                    onChange={(e) => setEditedTemple({ ...editedTemple, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={editedTemple.rating}
                    onChange={(e) => setEditedTemple({ ...editedTemple, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Phase 1 Fields */}
                <div className="border-t-2 border-orange-200 pt-4 mt-4">
                  <h4 className="text-md font-semibold text-orange-600 mb-3">✨ Additional Information (Phase 1)</h4>
                </div>

                {/* Opening Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">⏰ Opening Hours</label>
                  <input
                    type="text"
                    value={editedTemple.openingHours || ''}
                    onChange={(e) => setEditedTemple({ ...editedTemple, openingHours: e.target.value })}
                    placeholder="e.g., 6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">📞 Phone Number</label>
                  <input
                    type="tel"
                    value={editedTemple.phoneNumber || ''}
                    onChange={(e) => setEditedTemple({ ...editedTemple, phoneNumber: e.target.value })}
                    placeholder="e.g., +91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Special Significance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">⭐ Special Significance</label>
                  <textarea
                    value={editedTemple.specialSignificance || ''}
                    onChange={(e) => setEditedTemple({ ...editedTemple, specialSignificance: e.target.value })}
                    placeholder="What is this temple famous for? (1-2 sentences)"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Festivals */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">🎉 Major Festivals</label>
                  <textarea
                    value={editedTemple.festivals?.join('\n') || ''}
                    onChange={(e) => setEditedTemple({ 
                      ...editedTemple, 
                      festivals: e.target.value.split('\n').filter(f => f.trim()) 
                    })}
                    placeholder="Enter one festival per line&#10;e.g.,&#10;Panguni Uthiram (March)&#10;Karthigai Deepam (November)"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">One festival per line</p>
                </div>

                {/* Parking */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">🚗 Parking</label>
                  <select
                    value={editedTemple.parking === undefined ? 'unknown' : editedTemple.parking ? 'yes' : 'no'}
                    onChange={(e) => setEditedTemple({ 
                      ...editedTemple, 
                      parking: e.target.value === 'unknown' ? undefined : e.target.value === 'yes' 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="unknown">Not specified</option>
                    <option value="yes">Available</option>
                    <option value="no">Not Available</option>
                  </select>
                </div>

                {/* Photography */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">📸 Photography</label>
                  <select
                    value={editedTemple.photographyAllowed === undefined ? 'unknown' : editedTemple.photographyAllowed ? 'yes' : 'no'}
                    onChange={(e) => setEditedTemple({ 
                      ...editedTemple, 
                      photographyAllowed: e.target.value === 'unknown' ? undefined : e.target.value === 'yes' 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="unknown">Not specified</option>
                    <option value="yes">Allowed</option>
                    <option value="no">Not Allowed</option>
                  </select>
                </div>

                {/* Theertham */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">💧 Theertham (Sacred Tank)</label>
                  <textarea
                    value={editedTemple.theertham || ''}
                    onChange={(e) => setEditedTemple({ ...editedTemple, theertham: e.target.value })}
                    placeholder="Information about sacred water tank/pond (if applicable)"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">e.g., "Kapali Theertham - Sacred tank used for Abhishekam"</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    💾 Save & Mark Verified
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </AdminAuth>
  )
}
