// ========== DRAWER ARCHIVES ==========
function openArchiveDrawer() {
    const drawer = document.getElementById('archiveDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    renderArchiveList();
}

function closeArchiveDrawer() {
    const drawer = document.getElementById('archiveDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
}