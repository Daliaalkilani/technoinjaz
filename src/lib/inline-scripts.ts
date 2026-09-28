import { LOADER_MODE } from '@/config/site';

export const LEGACY_HASH_REDIRECT = `(function(){try{
  if(location.pathname!=='/')return;var h=location.hash;if(!h)return;
  var map={'#projects':'/projects','#articles':'/articles','#videos':'/videos','#faq':'/faq','#about':'/about','#contact':'/contact','#login':'/login','#auth':'/login','#register':'/register','#my-profile':'/account','#favorites':'/account','#profile':'/account','#academic-projects':'/projects'};
  if(h==='#top'){history.replaceState(null,'','/');return;}
  if(map[h]){location.replace(map[h]);return;}
  var m;
  if((m=h.match(/^#article\\/([a-z0-9-]+)\\/?$/)))location.replace('/articles/'+m[1]);
  else if((m=h.match(/^#project\\/([a-z0-9-]+)\\/?$/)))location.replace('/projects/'+m[1]);
  else if((m=h.match(/^#profile-([a-z0-9-]+)$/)))location.replace('/team/'+m[1]);
}catch(e){}})();`;

export const THEME_LANG_BOOT = `(function() {
  try {
    var isManual = localStorage.getItem('techno_theme_manual');
    var saved = localStorage.getItem('theme') || localStorage.getItem('techno_theme');
    var theme = 'dark';
    if (isManual && (saved === 'light' || saved === 'dark')) {
      theme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light';
    } else if (saved === 'light' || saved === 'dark') {
      theme = saved;
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');

    var savedLang = localStorage.getItem('techno_lang');
    if (savedLang === 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('data-lang-pending', '');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }

    var skip = false;
    ${
      LOADER_MODE === 'off'
        ? 'skip = true;'
        : LOADER_MODE === 'always'
        ? "skip = location.pathname !== '/';"
        : "skip = location.pathname !== '/' || sessionStorage.getItem('te_loader_seen') === '1';"
    }
    if (skip) {
      document.documentElement.setAttribute('data-skip-loader', '');
    } else {
      sessionStorage.setItem('te_loader_seen', '1');
    }
  } catch (e) {}
})();`;
