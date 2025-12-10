package com.appdev.arradazadelossantos.notenest.Service;

import com.appdev.arradazadelossantos.notenest.Entity.Note;
import com.appdev.arradazadelossantos.notenest.Repository.NoteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteService {
    
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getNotesByUser(Long userId) {
        return noteRepository.findByUserUserId(userId);
    }

    public Note getNoteByIdOwnedByUser(Long noteID, Long userID) {
        return noteRepository.findByNoteIdAndUserUserId(noteID, userID)  
                .orElseThrow(() -> new RuntimeException("Note not found or not owned by user"));
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note updatedNote, Long userID) {
        Note note = getNoteByIdOwnedByUser(id, userID);
        
        note.setTitle(updatedNote.getTitle());
        note.setDescription(updatedNote.getDescription());
        note.setUploadDate(java.time.LocalDateTime.now());
        note.setContent(updatedNote.getContent());
        

        return noteRepository.save(note);
    }

    public void deleteNote(Long id, Long userID) {
        Note note = getNoteByIdOwnedByUser(id, userID);
        noteRepository.delete(note);
    }
}
