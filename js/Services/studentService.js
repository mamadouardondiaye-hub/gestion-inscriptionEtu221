function confirmArchive() {
    if (pendingArchiveId) {
        const etud = etudiants.find(e => e.id === pendingArchiveId);
        if (etud) {
            archives.push({ ...etud, archivedDate: new Date().toLocaleDateString('fr-FR') });
            etudiants = etudiants.filter(e => e.id !== pendingArchiveId);
            selectedIds.delete(pendingArchiveId);
            
            const filtered = getFilteredStudents();
            const totalPages = getTotalPages(filtered);
            if (currentPage > totalPages) currentPage = totalPages;
            
            renderAll();
            showToast(`${etud.prenom} ${etud.nom} a été archivé`, "warning");
        }
        pendingArchiveId = null;
    }
    closeArchiveConfirm();
}
