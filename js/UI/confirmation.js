// ========== CONFIRMATIONS D'ARCHIVAGE ==========
function openArchiveConfirm(id, name) {
    pendingArchiveId = id;
    const msgEl = document.getElementById('confirmArchiveMsg');
    if (msgEl) msgEl.innerHTML = `Archiver <strong>${name}</strong> ? L'étudiant sera déplacé dans les archives.`;
    const modal = document.getElementById('confirmArchiveModal');
    if (modal) modal.classList.remove('hidden');
}

function closeArchiveConfirm() {
    const modal = document.getElementById('confirmArchiveModal');
    if (modal) modal.classList.add('hidden');
    pendingArchiveId = null;
}

function openMultiArchiveConfirm() {
    if (selectedIds.size < 3) return;
    const msgEl = document.getElementById('confirmMultiArchiveMsg');
    if (msgEl) msgEl.innerHTML = `Archiver <strong>${selectedIds.size}</strong> étudiant${selectedIds.size > 1 ? 's' : ''} ? Ils seront déplacés dans les archives.`;
    const modal = document.getElementById('confirmMultiArchiveModal');
    if (modal) modal.classList.remove('hidden');
}

function closeMultiArchiveConfirm() {
    const modal = document.getElementById('confirmMultiArchiveModal');
    if (modal) modal.classList.add('hidden');
}