/**
 * Z-FINANCE 1.0.0 - Enterprise CRM & Customer Portal Frontend Logic
 */

(function () {
  'use strict';

  window.ZFinanceCRM = {
    init: function () {
      console.log('Z-FINANCE CRM Engine initialized.');
    },

    calculatePipelineTotal: function (opportunities) {
      if (!Array.isArray(opportunities)) return 0;
      return opportunities.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    },

    syncOfflineLeads: function () {
      const pendingLeads = JSON.parse(localStorage.getItem('zfinance_offline_leads') || '[]');
      if (pendingLeads.length > 0) {
        console.log(`Syncing ${pendingLeads.length} offline leads to server...`);
        localStorage.removeItem('zfinance_offline_leads');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.ZFinanceCRM.init();
  });
})();
