package com.appdev.arradazadelossantos.notenest.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appdev.arradazadelossantos.notenest.Entity.Note;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long>  {
    List<Note> findByUserUserID(Long userId);  
    Optional<Note> findByNoteIdAndUserUserId(Long noteId, Long userId); 
}
