package com.appdev.arradazadelossantos.notenest.Controller;

import com.appdev.arradazadelossantos.notenest.Entity.Note;
import com.appdev.arradazadelossantos.notenest.Service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.appdev.arradazadelossantos.notenest.Entity.User;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class NoteController {
    
    @Autowired
    private NoteService noteService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Note>> getNotesByUser(@PathVariable Long userId){
        List<Note> notes = noteService.getNotesByUser(userId);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{noteId}/user/{userId}")
    public ResponseEntity<Note> getNote(@PathVariable Long noteId, @PathVariable Long userId){
        Note note = noteService.getNoteByIdOwnedByUser(noteId, userId);
        return ResponseEntity.ok(note);
    }
    
    @PostMapping("/user/{userId}")
    public ResponseEntity<Note> createNote(@PathVariable Long userId, @RequestBody Note note) {
        note.setUser(new User());
        note.getUser().setUserId(userId);
        Note savedNote = noteService.createNote(note);
        return ResponseEntity.ok(savedNote);
    }

    
}
