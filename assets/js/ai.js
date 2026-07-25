/**
 * Z-FINANCE 1.0.0 - AI Assistant Offline & Voice Command Engine
 */

(function () {
  'use strict';

  window.ZFinanceAI = {
    init: function () {
      console.log('Z-FINANCE AI Assistant Engine initialized.');
    },

    speakResponse: function (text) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } else {
        console.warn('Speech synthesis not supported on this browser.');
      }
    },

    listenVoiceInput: function (onResultCallback) {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = function (event) {
          const transcript = event.results[0][0].transcript;
          if (onResultCallback) onResultCallback(transcript);
        };
        recognition.start();
      } else {
        alert('Voice recognition is not supported in this browser.');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.ZFinanceAI.init();
  });
})();
