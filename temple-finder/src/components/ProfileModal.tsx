import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import { NAKSHATRA_LIST } from '../constants/nakshatras'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { userName, setUserName, birthNakshatra, setBirthNakshatra } = useUser()
  const [input, setInput] = useState(userName)
  const [nakshatra, setNakshatra] = useState(birthNakshatra)

  useEffect(() => {
    if (isOpen) {
      setInput(userName)
      setNakshatra(birthNakshatra)
    }
  }, [isOpen, userName, birthNakshatra])

  if (!isOpen) return null

  const handleSave = () => {
    setUserName(input)
    setBirthNakshatra(nakshatra)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-darshanam-brown">Your Profile</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-darshanam-beige text-darshanam-brown"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <label className="block text-sm font-medium text-darshanam-brown mb-1">Name</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-darshanam-brown placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-darshanam-orange/50 focus:border-darshanam-orange mb-4"
          autoFocus
        />
        <label className="block text-sm font-medium text-darshanam-brown mb-1">
          Birth Nakshatra <span className="text-neutral-400 font-normal">(for Chandrashtama alerts)</span>
        </label>
        <select
          value={nakshatra}
          onChange={(e) => setNakshatra(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-darshanam-brown focus:outline-none focus:ring-2 focus:ring-darshanam-orange/50 focus:border-darshanam-orange mb-4 bg-white"
        >
          <option value="">Not set</option>
          {NAKSHATRA_LIST.map((n) => (
            <option key={n.name} value={n.name}>
              {n.name} ({n.tamil})
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl bg-darshanam-orange text-white font-medium hover:bg-darshanam-orange/90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
