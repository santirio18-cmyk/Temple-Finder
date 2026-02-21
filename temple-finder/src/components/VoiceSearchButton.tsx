import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { voiceSearchService, VoiceSearchResult } from '../services/voiceSearchService'

interface VoiceSearchButtonProps {
  onVoiceResult: (transcript: string) => void
  className?: string
}

const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ onVoiceResult, className = '' }) => {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setIsSupported(voiceSearchService.isSupported())
  }, [])

  const handleVoiceSearch = () => {
    if (!isSupported) {
      alert('Voice search is not supported in your browser. Please use Chrome, Safari, or Edge.')
      return
    }

    if (isListening) {
      voiceSearchService.stopListening()
      setIsListening(false)
      return
    }

    setIsProcessing(true)
    setIsListening(true)

    voiceSearchService.startListening(
      (result: VoiceSearchResult) => {
        setIsListening(false)
        setIsProcessing(false)
        
        if (result.confidence > 0.7) {
          onVoiceResult(result.transcript)
        } else {
          alert('Could not understand clearly. Please try again.')
        }
      },
      (error: string) => {
        setIsListening(false)
        setIsProcessing(false)
        
        let errorMessage = 'Voice search failed. Please try again.'
        
        switch (error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.'
            break
          case 'audio-capture':
            errorMessage = 'Microphone not available. Please check your microphone permissions.'
            break
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access.'
            break
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.'
            break
        }
        
        alert(errorMessage)
      }
    )
  }

  if (!isSupported) {
    return null
  }

  return (
    <button
      onClick={handleVoiceSearch}
      disabled={isProcessing}
      className={`
        flex items-center justify-center p-2 rounded-full transition-all duration-200
        ${isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-primary-500 text-white hover:bg-primary-600'
        }
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={isListening ? 'Stop listening' : 'Start voice search'}
    >
      {isProcessing ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  )
}

export default VoiceSearchButton









