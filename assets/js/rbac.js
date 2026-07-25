/**
 * Z-FINANCE 1.0.0 - Enterprise RBAC Client Engine
 * Handles AJAX Role CRUD, Visual Permission Matrix, User Role Assignment, Direct Overrides, and Offline Caching.
 */

window.ZFinanceRbac = {
  roles: [],
  permissionGroups: [],
  userContext: null,

  init: function() {
    this.cacheOfflinePermissions();
    console.log("Z-Finance RBAC Engine initialized.");
  },

  /**
   * Cache permissions locally for offline enforcement guard
   */
  cacheOfflinePermissions: function() {
    fetch('/modules/rbac/api/user_access.php?action=get_user_context')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.userContext = data.context;
          localStorage.setItem('zfinance_cached_rbac', JSON.stringify(data.context));
        }
      })
      .catch(() => {
        const cached = localStorage.getItem('zfinance_cached_rbac');
        if (cached) {
          this.userContext = JSON.parse(cached);
          console.warn("Offline RBAC fallback loaded from local cache.");
        }
      });
  },

  /**
   * Check permission with offline safety
   */
  can: function(permissionCode) {
    if (!this.userContext) {
      const cached = localStorage.getItem('zfinance_cached_rbac');
      if (cached) this.userContext = JSON.parse(cached);
    }
    if (!this.userContext) return false;
    if (this.userContext.is_super_admin) return true;
    return this.userContext.permissions && this.userContext.permissions[permissionCode] === true;
  },

  /**
   * AJAX Save Role Matrix Changes
   */
  saveRolePermissions: function(roleId, permissionIds) {
    if (!navigator.onLine) {
      alert("RBAC configuration updates require an active network connection.");
      return Promise.reject("Offline");
    }

    return fetch('/modules/rbac/api/roles.php?action=update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: roleId,
        permissions: permissionIds,
        permissions_updated: true
      })
    }).then(res => res.json());
  },

  /**
   * Save Direct User Permission Override
   */
  saveUserPermissionOverride: function(userId, permissionId, isGranted) {
    return fetch('/modules/rbac/api/user_access.php?action=override_permission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        permission_id: permissionId,
        is_granted: isGranted
      })
    }).then(res => res.json());
  }
};

document.addEventListener('DOMContentLoaded', function() {
  window.ZFinanceRbac.init();
});
