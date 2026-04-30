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
function modifierEtudiant() {
    const id = parseInt(document.getElementById('editId').value);
    const index = etudiants.findIndex(e => e.id === id);
    if (index === -1) return;
    
    const nom = document.getElementById('editNom').value.trim();
    const prenom = document.getElementById('editPrenom').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const telephone = document.getElementById('editTelephone').value.trim();
    const adresse = document.getElementById('editAdresse').value.trim();
    const dateInscription = document.getElementById('editDate').value.trim();
    const formation = document.getElementById('editFormation').value;
    
    const emailError = document.getElementById('editEmailError');
    const telError = document.getElementById('editTelError');
    if (emailError) emailError.classList.add('hidden');
    if (telError) telError.classList.add('hidden');
    
    let valid = true;
    
    if (!isEmailUnique(email, id)) {
        if (emailError) {
            emailError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Cet email existe déjà';
            emailError.classList.remove('hidden');
        }
        valid = false;
    }
    
    if (!isValidPhone(telephone)) {
        if (telError) {
            telError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Téléphone invalide';
            telError.classList.remove('hidden');
        }
        valid = false;
    } else if (!isTelephoneUnique(telephone, id)) {
        if (telError) {
            telError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Ce numéro de téléphone existe déjà';
            telError.classList.remove('hidden');
        }
        valid = false;
    }
    
    if (!valid) return;
    
    etudiants[index] = {
        ...etudiants[index],
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: cleanPhone(telephone),
        adresse: adresse,
        dateInscription: dateInscription || etudiants[index].dateInscription,
        formation: formation
    };
    
    closeEditModal();
    renderAll();
    showToast(`${prenom} ${nom} a été modifié avec succès`, "success");
}