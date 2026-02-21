// Voice Search Service for Temple Finder
// This service provides voice search functionality using Web Speech API

export interface VoiceSearchResult {
  transcript: string
  confidence: number
  isListening: boolean
}

export class VoiceSearchService {
  private recognition: any = null
  private isListening = false
  private onResultCallback: ((result: VoiceSearchResult) => void) | null = null
  private onErrorCallback: ((error: string) => void) | null = null

  constructor() {
    this.initializeSpeechRecognition()
  }

  private initializeSpeechRecognition() {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    this.recognition = new SpeechRecognition()
    this.recognition.continuous = false
    this.recognition.interimResults = false
    this.recognition.lang = 'en-US'

    this.recognition.onstart = () => {
      this.isListening = true
      console.log('Voice recognition started')
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      const confidence = event.results[0][0].confidence
      
      this.isListening = false
      
      if (this.onResultCallback) {
        this.onResultCallback({
          transcript,
          confidence,
          isListening: false
        })
      }
    }

    this.recognition.onerror = (event: any) => {
      this.isListening = false
      console.error('Speech recognition error:', event.error)
      
      if (this.onErrorCallback) {
        this.onErrorCallback(event.error)
      }
    }

    this.recognition.onend = () => {
      this.isListening = false
      console.log('Voice recognition ended')
    }
  }

  startListening(onResult: (result: VoiceSearchResult) => void, onError: (error: string) => void) {
    if (!this.recognition) {
      onError('Speech recognition not supported')
      return
    }

    if (this.isListening) {
      this.stopListening()
      return
    }

    this.onResultCallback = onResult
    this.onErrorCallback = onError

    try {
      this.recognition.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      onError('Failed to start voice recognition')
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  isSupported(): boolean {
    return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition
  }

  isCurrentlyListening(): boolean {
    return this.isListening
  }
}

export const voiceSearchService = new VoiceSearchService()









