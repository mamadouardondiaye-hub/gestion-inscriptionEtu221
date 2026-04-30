// ========== MODALS ==========
function openAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.classList.add('active');
}

function closeAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.classList.remove('active');
}

function openEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.add('active');
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.remove('active');
}