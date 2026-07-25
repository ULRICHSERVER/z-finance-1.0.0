/**
 * Z-FINANCE 1.0.0 - Developer Portal & API Engine JS
 */

(function () {
  'use strict';

  window.ZFinanceDeveloper = {
    init: function () {
      console.log('Z-FINANCE Developer Portal & API Gateway Engine initialized.');
    },

    copyToClipboard: function (text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('API Key / Token copied to clipboard!');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.ZFinanceDeveloper.init();
  });
})();
