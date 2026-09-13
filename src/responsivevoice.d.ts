interface Window {
  responsiveVoice: {
    speak: (text: string, voice?: string, params?: any) => void;
    getVoices: () => string[];
    cancel: () => void;
  };
}
