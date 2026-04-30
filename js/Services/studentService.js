<<<<<<< HEAD
<<<<<<< HEAD
function ajouterEtudiant() {
    const nom = document.getElementById('addNom').value.trim();
    const prenom = document.getElementById('addPrenom').value.trim();
    const email = document.getElementById('addEmail').value.trim();
    const telephone = document.getElementById('addTelephone').value.trim();
    const adresse = document.getElementById('addAdresse').value.trim();
    const dateInscription = document.getElementById('addDate').value.trim();
    const formation = document.getElementById('addFormation').value;
    
    const emailError = document.getElementById('addEmailError');
    const telError = document.getElementById('addTelError');
    if (emailError) emailError.classList.add('hidden');
    if (telError) telError.classList.add('hidden');
    
    if (!nom || !prenom) {
        showToast("Le nom et le prénom sont requis", "error");
        return;
    }
    
    if (!email) {
        showToast("L'email est requis", "error");
        return;
    }
    
    if (!isEmailUnique(email)) {
        if (emailError) {
            emailError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Cet email existe déjà';
            emailError.classList.remove('hidden');
        }
        return;
    }
    
    if (!telephone) {
        showToast("Le téléphone est requis", "error");
        return;
    }
    
    if (!isValidPhone(telephone)) {
        if (telError) {
            telError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Téléphone invalide (Sénégal: 70/76/77/78 + 7 chiffres, Gambie: 5/6/7/9 + 6 chiffres)';
            telError.classList.remove('hidden');
        }
        return;
    }
    
    if (!isTelephoneUnique(telephone)) {
        if (telError) {
            telError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Ce numéro de téléphone existe déjà';
            telError.classList.remove('hidden');
        }
        return;
    }
    
    const newEtudiant = {
        id: nextId++,
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: cleanPhone(telephone),
        adresse: adresse || '',
        dateInscription: dateInscription || new Date().toLocaleDateString('fr-FR'),
        formation: formation
    };
    
    etudiants.push(newEtudiant);
    closeAddModal();
    
    document.getElementById('addNom').value = '';
    document.getElementById('addPrenom').value = '';
    document.getElementById('addEmail').value = '';
    document.getElementById('addTelephone').value = '';
    document.getElementById('addAdresse').value = '';
    document.getElementById('addDate').value = '';
    
    const filtered = getFilteredStudents();
    currentPage = getTotalPages(filtered);
    renderAll();
    
    showToast(`${prenom} ${nom} a été ajouté avec succès !`, "success");
}

// ========== MODIFIER ==========
=======
>>>>>>> feature/modification-etudiant
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

// ========== ARCHIVAGE (ici ça archive au lieu de supprimer) ==========

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
// ========== ARCHIVAGE MULTIPLE ==========

function confirmMultiArchive() {
    const count = selectedIds.size;
    const idsToArchive = Array.from(selectedIds);
    
    idsToArchive.forEach(id => {
        const etud = etudiants.find(e => e.id === id);
        if (etud) {
            archives.push({ ...etud, archivedDate: new Date().toLocaleDateString('fr-FR') });
        }
    });
    
    etudiants = etudiants.filter(e => !selectedIds.has(e.id));
    selectedIds.clear();
    
    const filtered = getFilteredStudents();
    const totalPages = getTotalPages(filtered);
    if (currentPage > totalPages) currentPage = totalPages;
    
    renderAll();
    showToast(`${count} étudiant${count > 1 ? 's' : ''} archivé${count > 1 ? 's' : ''} avec succès`, "warning");
    closeMultiArchiveConfirm();
}

function restoreFromArchive(id) {
    const index = archives.findIndex(a => a.id === id);
    if (index !== -1) {
        const restored = archives[index];
        const { archivedDate, ...student } = restored;
        etudiants.push(student);
        archives.splice(index, 1);
        
        renderAll();
        renderArchiveList();
        showToast(`${student.prenom} ${student.nom} a été restauré`, "success");
    }
}

function restoreSelectedArchives() {
    if (selectedArchiveIds.size === 0) return;
    
    const idsToRestore = Array.from(selectedArchiveIds);
    idsToRestore.forEach(id => {
        const index = archives.findIndex(a => a.id === id);
        if (index !== -1) {
            const restored = archives[index];
            const { archivedDate, ...student } = restored;
            etudiants.push(student);
            archives.splice(index, 1);
        }
    });
    
    selectedArchiveIds.clear();
    renderAll();
    renderArchiveList();
    showToast(`${idsToRestore.length} étudiant${idsToRestore.length > 1 ? 's' : ''} restauré${idsToRestore.length > 1 ? 's' : ''}`, "success");
}
