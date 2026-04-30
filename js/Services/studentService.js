function openEditWithId(id) {
    const etud = etudiants.find(e => e.id === id);
    if (!etud) return;
    
    document.getElementById('editId').value = etud.id;
    document.getElementById('editNom').value = etud.nom;
    document.getElementById('editPrenom').value = etud.prenom;
    document.getElementById('editEmail').value = etud.email;
    document.getElementById('editTelephone').value = etud.telephone;
    document.getElementById('editAdresse').value = etud.adresse || '';
    document.getElementById('editDate').value = etud.dateInscription || '';
    document.getElementById('editFormation').value = etud.formation;
    
    const emailError = document.getElementById('editEmailError');
    const telError = document.getElementById('editTelError');
    if (emailError) emailError.classList.add('hidden');
    if (telError) telError.classList.add('hidden');
    
    openEditModal();
}