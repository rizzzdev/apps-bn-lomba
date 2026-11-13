/**
 * Apps-BN Portal Controller (Pure Static Edition)
 * Handles Rendering, Live Filter, Dark/Light Theme Toggle, and User Personalization Modal
 */

(function () {
  'use strict';

  // Constants
  const THEME_STORAGE_KEY = 'bn_theme';
  const USER_NAME_STORAGE_KEY = 'bn_user_name';
  const DEFAULT_USER_NAME = 'Civitas SMK BN';

  // DOM Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const appSearchInput = document.getElementById('appSearchInput');
  const appCounterBadge = document.getElementById('appCounterBadge');
  const applicationsGridContainer = document.getElementById('applicationsGridContainer');
  const searchEmptyState = document.getElementById('searchEmptyState');
  const searchEmptyMessage = document.getElementById('searchEmptyMessage');
  const resetSearchBtn = document.getElementById('resetSearchBtn');
  const welcomeUserNameDisplay = document.getElementById('welcomeUserNameDisplay');
  const editNameIconBtn = document.getElementById('editNameIconBtn');

  // Modal Elements
  const nameModalOverlay = document.getElementById('nameModalOverlay');
  const closeNameModalBtn = document.getElementById('closeNameModalBtn');
  const cancelNameModalBtn = document.getElementById('cancelNameModalBtn');
  const userNameForm = document.getElementById('userNameForm');
  const userNameInput = document.getElementById('userNameInput');

  // Helper: Escape HTML to avoid XSS
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Helper: Format clean URL slug (removes protocol and trailing slash)
  function cleanDisplayUrl(url) {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  // Cookie helpers
  function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }

  function getCookie(name) {
    return document.cookie.split('; ').reduce((acc, currentCookie) => {
      const [cookieName, ...cookieValue] = currentCookie.split('=');
      return cookieName === name ? decodeURIComponent(cookieValue.join('=')) : acc;
    }, null);
  }

  /* =========================================================================
     1. THEME MANAGER (DARK / LIGHT MODE)
     ========================================================================= */

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeToggleIcon) {
        themeToggleIcon.textContent = 'light_mode';
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Beralih ke Mode Terang');
        themeToggleBtn.setAttribute('aria-label', 'Beralih ke Mode Terang');
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (themeToggleIcon) {
        themeToggleIcon.textContent = 'dark_mode';
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Beralih ke Mode Gelap');
        themeToggleBtn.setAttribute('aria-label', 'Beralih ke Mode Gelap');
      }
    }
  }

  function toggleTheme() {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextTheme = !isCurrentlyDark;
    applyTheme(nextTheme);

    const themeString = nextTheme ? 'dark' : 'light';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeString);
      setCookie(THEME_STORAGE_KEY, themeString);
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }

  function initTheme() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || getCookie(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    applyTheme(isDark);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Sync when system theme changes (if user hasn't explicitly set preference)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches);
      }
    });

    // Sync across tabs
    window.addEventListener('storage', (event) => {
      if (event.key === THEME_STORAGE_KEY) {
        applyTheme(event.newValue === 'dark');
      }
    });
  }

  /* =========================================================================
     2. USER PERSONALIZATION MODAL & STORAGE
     ========================================================================= */

  function getStoredUserName() {
    try {
      return localStorage.getItem(USER_NAME_STORAGE_KEY) || getCookie(USER_NAME_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function saveUserName(name) {
    const cleanedName = (name || '').trim();
    const finalName = cleanedName || DEFAULT_USER_NAME;
    try {
      localStorage.setItem(USER_NAME_STORAGE_KEY, finalName);
      setCookie(USER_NAME_STORAGE_KEY, finalName);
    } catch (e) {
      console.warn('Storage error:', e);
    }
    updateUserNameDisplay(finalName);
  }

  function updateUserNameDisplay(name) {
    if (welcomeUserNameDisplay) {
      welcomeUserNameDisplay.textContent = name;
    }
  }

  function openNameModal() {
    if (!nameModalOverlay) return;
    const currentName = getStoredUserName() || '';
    if (userNameInput) {
      userNameInput.value = currentName === DEFAULT_USER_NAME ? '' : currentName;
    }
    nameModalOverlay.classList.remove('hidden');
    nameModalOverlay.classList.add('flex');
    const scrollContainer = document.getElementById('scrollContainer');
    if (scrollContainer) scrollContainer.style.overflow = 'hidden';

    setTimeout(() => {
      if (userNameInput) userNameInput.focus();
    }, 50);
  }

  function closeNameModal() {
    if (!nameModalOverlay) return;
    nameModalOverlay.classList.add('hidden');
    nameModalOverlay.classList.remove('flex');
    const scrollContainer = document.getElementById('scrollContainer');
    if (scrollContainer) scrollContainer.style.overflow = '';
  }

  function initUserPersonalization() {
    const savedName = getStoredUserName();
    if (savedName) {
      updateUserNameDisplay(savedName);
    } else {
      updateUserNameDisplay(DEFAULT_USER_NAME);
      // Auto open modal on first visit
      setTimeout(openNameModal, 400);
    }

    // Edit Name triggers
    if (welcomeUserNameDisplay) {
      welcomeUserNameDisplay.addEventListener('click', openNameModal);
    }
    if (editNameIconBtn) {
      editNameIconBtn.addEventListener('click', openNameModal);
    }

    // Close buttons
    if (closeNameModalBtn) {
      closeNameModalBtn.addEventListener('click', closeNameModal);
    }
    if (cancelNameModalBtn) {
      cancelNameModalBtn.addEventListener('click', closeNameModal);
    }

    // Click outside dialog to close
    if (nameModalOverlay) {
      nameModalOverlay.addEventListener('click', (event) => {
        if (event.target === nameModalOverlay) {
          closeNameModal();
        }
      });
    }

    // Escape key listener
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !nameModalOverlay.classList.contains('hidden')) {
        closeNameModal();
      }
    });

    // Form submission
    if (userNameForm) {
      userNameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const enteredName = userNameInput ? userNameInput.value : '';
        saveUserName(enteredName);
        closeNameModal();
      });
    }
  }

  /* =========================================================================
     3. APPLICATION CARDS RENDERER & SEARCH FILTER
     ========================================================================= */

  function createCardElement(app) {
    const card = document.createElement('a');
    card.href = app.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className =
      'group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-sand-border bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-maroon-300 hover:shadow-xl hover:shadow-maroon-950/5 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 focus:ring-offset-2 focus:ring-offset-cream-50 dark:border-dark-border dark:bg-surface-dark dark:hover:border-maroon-800 dark:focus:ring-offset-canvas-dark';

    const cleanUrl = cleanDisplayUrl(app.link);

    card.innerHTML = `
      <div class="flex-1 flex flex-col">
        <!-- Top Row: Icon Badge (Sesi Aktif badge removed) -->
        <div class="flex items-start">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-sand-border bg-cream-100 text-maroon-800 shadow-2xs transition-all duration-200 group-hover:scale-105 group-hover:bg-maroon-800 group-hover:text-white dark:border-dark-border dark:bg-dark-hover dark:text-cream-200 dark:group-hover:bg-maroon-700 dark:group-hover:text-white">
            <span class="material-symbols-outlined text-[24px] select-none">${escapeHTML(app.icon || 'apps')}</span>
          </div>
        </div>

        <!-- Title & Full Description (No Truncation) -->
        <div class="mt-4 flex-1 flex flex-col">
          <h3 class="text-base font-bold tracking-tight text-ink transition-colors group-hover:text-maroon-800 dark:text-cream-50 dark:group-hover:text-maroon-300">
            ${escapeHTML(app.name)}
          </h3>
          <p class="mt-2 text-xs leading-relaxed text-ink/70 dark:text-cream-300/80">
            ${escapeHTML(app.description)}
          </p>
        </div>

        <!-- Link URL placed under description -->
        <div class="mt-4 pt-1">
          <span class="inline-block font-mono text-3xs text-ink/40 transition-colors group-hover:text-ink/70 dark:text-cream-400 dark:group-hover:text-cream-200 break-all">
            ${escapeHTML(cleanUrl)}
          </span>
        </div>
      </div>

      <!-- Action Footer: Roomy Buka Aplikasi Button -->
      <div class="mt-5 flex items-center justify-end border-t border-sand-border/70 pt-4 text-xs font-semibold dark:border-dark-border">
        <span class="inline-flex items-center gap-1.5 font-semibold text-maroon-800 transition-transform group-hover:translate-x-1 dark:text-maroon-400">
          <span>Buka Aplikasi</span>
          <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
        </span>
      </div>
    `;

    return card;
  }

  function renderApplications(appList) {
    if (!applicationsGridContainer) return;

    applicationsGridContainer.innerHTML = '';

    if (appList.length === 0) {
      applicationsGridContainer.classList.add('hidden');
      if (searchEmptyState) {
        searchEmptyState.classList.remove('hidden');
        searchEmptyState.classList.add('flex');
      }
      return;
    }

    applicationsGridContainer.classList.remove('hidden');
    if (searchEmptyState) {
      searchEmptyState.classList.add('hidden');
      searchEmptyState.classList.remove('flex');
    }

    const fragment = document.createDocumentFragment();
    appList.forEach((appRecord) => {
      fragment.appendChild(createCardElement(appRecord));
    });
    applicationsGridContainer.appendChild(fragment);
  }

  function filterApplications(query) {
    const rawApps = typeof schoolApplications !== 'undefined' ? schoolApplications : [];
    const normalizedQuery = (query || '').trim().toLowerCase();

    const filtered = rawApps.filter((appRecord) => {
      if (!normalizedQuery) return true;
      const matchesName = (appRecord.name || '').toLowerCase().includes(normalizedQuery);
      const matchesDescription = (appRecord.description || '').toLowerCase().includes(normalizedQuery);
      return matchesName || matchesDescription;
    });

    if (appCounterBadge) {
      appCounterBadge.textContent = filtered.length;
    }

    if (searchEmptyMessage) {
      if (normalizedQuery) {
        searchEmptyMessage.innerHTML = `Tidak ditemukan aplikasi dengan kata kunci "<strong>${escapeHTML(query)}</strong>". Coba gunakan kata kunci lain.`;
      } else {
        searchEmptyMessage.textContent = 'Tidak ditemukan aplikasi. Coba periksa kembali kata kunci pencarian Anda.';
      }
    }

    renderApplications(filtered);
  }

  function initSearch() {
    if (appSearchInput) {
      appSearchInput.addEventListener('input', (event) => {
        filterApplications(event.target.value);
      });
    }

    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', () => {
        if (appSearchInput) {
          appSearchInput.value = '';
          appSearchInput.focus();
        }
        filterApplications('');
      });
    }

    // Initial render
    filterApplications('');
  }

  /* =========================================================================
     4. INITIALIZATION
     ========================================================================= */

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initUserPersonalization();
    initSearch();
  });

})();
