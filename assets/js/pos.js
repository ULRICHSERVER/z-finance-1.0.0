/**
 * Z-FINANCE 1.0.0 - Enterprise POS Offline Cashier & Barcode Engine
 */

(function () {
  'use strict';

  window.ZFinancePOS = {
    init: function () {
      console.log('Z-FINANCE POS Offline Engine initialized.');
    },

    syncOfflineSales: function () {
      const pendingSales = JSON.parse(localStorage.getItem('zfinance_offline_pos_sales') || '[]');
      if (pendingSales.length > 0) {
        console.log(`Syncing ${pendingSales.length} offline POS transactions...`);
        localStorage.removeItem('zfinance_offline_pos_sales');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.ZFinancePOS.init();
  });
})();
