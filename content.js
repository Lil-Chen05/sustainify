const snackbar = document.createElement('div');
snackbar.id = 'sustainify-snackbar';
snackbar.textContent = 'Sustainify Analyzing...';

const themes = {
    light: { bg: 'hsl(155 40% 28%)', text: '#fff' },
    dark: { bg: 'hsl(155 50% 55%)', text: 'hsl(155 25% 10%)' }
};

const applyTheme = dark => {
    const t = dark ? themes.dark : themes.light;
    snackbar.style.background = t.bg;
    snackbar.style.color = t.text;
};

Object.assign(snackbar.style, {
    position: 'fixed',
    top: '16px',
    right: '16px',
    padding: '10px 16px',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '13px',
    fontWeight: '500',
    borderRadius: '6px',
    boxShadow: '0 px 6px rgba(0,0,0,0.11)',
    zIndex: '2147483647',
    opacity: '0',
    transform: 'translateY(-8px)',
    transition: 'opacity 0.3s, transform 0.3s, background 0.3s, color 0.3s'
});

chrome.storage.sync.get('darkMode', ({ darkMode }) => {
    applyTheme(darkMode ?? false);
    document.body.appendChild(snackbar);

    requestAnimationFrame(() => {
        snackbar.style.opacity = '1';
        snackbar.style.transform = 'translateY(0)';
    });
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.darkMode) {
        applyTheme(changes.darkMode.newValue);
    }
});
