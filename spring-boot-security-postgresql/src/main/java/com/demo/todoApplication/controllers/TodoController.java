/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.demo.todoApplication.controllers;

import com.demo.todoApplication.models.TodoList;
import com.demo.todoApplication.payload.request.CreateTodoRequest;
import com.demo.todoApplication.payload.response.MessageResponse;
import com.demo.todoApplication.repository.TodoRepository;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mahfujul.alam
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    TodoRepository todoRepository;

    @GetMapping("/getlist")
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public ResponseEntity<List<TodoList>> getTodoList() {
        try {
            List<TodoList> todoLists = new ArrayList<TodoList>();
            todoRepository.findAll(Sort.by(Order.by("markedas"))).forEach(todoLists::add);

            if (todoLists.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(todoLists, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createtodo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TodoList> createTodoList(@RequestBody CreateTodoRequest reqTodo) {
        System.out.println(reqTodo.getDescription());
        if (reqTodo.getTitle() == null || reqTodo.getTitle().isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if (reqTodo.getDescription() == null || reqTodo.getDescription().isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if (reqTodo.getImage() == null || reqTodo.getImage().isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        try {
            TodoList todo = todoRepository
                    .save(new TodoList(reqTodo.getTitle(), reqTodo.getDescription(), false, reqTodo.getImage(), resizeImage(reqTodo.getImage()))); //resizeImage(reqTodo.getImage()
            return new ResponseEntity<>(todo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updatetodo/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TodoList> updateTodoList(@PathVariable("id") long id, @RequestBody CreateTodoRequest updateReq) {
        Optional<TodoList> todoData = todoRepository.findById(id);

        try {
            if (todoData.isPresent()) {
                TodoList todo = todoData.get();
                todo.setTitle(updateReq.getTitle());
                todo.setDescription(updateReq.getDescription());
                todo.setOrgImage(updateReq.getImage());
                todo.setResImage(resizeImage(updateReq.getImage()));
                return new ResponseEntity<>(todoRepository.save(todo), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException ex) {
            Logger.getLogger(TodoController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            
        }
    }
    
    @PutMapping("/updatetodostatus/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<TodoList> updateTodoStatus(@PathVariable("id") long id) {
        Optional<TodoList> todoData = todoRepository.findById(id);

        try {
            if (todoData.isPresent()) {
                TodoList todo = todoData.get();
                todo.setMarkedas(true);
                return new ResponseEntity<>(todoRepository.save(todo), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            Logger.getLogger(TodoController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            
        }
    }
    
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TodoList>> deleteTodo(@PathVariable("id") long id) {
        try {
            Optional<TodoList> todoData = todoRepository.findById(id);
            List<TodoList> todoLists = new ArrayList<TodoList>();
            if (todoData.isPresent()) {
                todoRepository.deleteById(id);
                
                todoRepository.findAll().forEach(todoLists::add);
                return new ResponseEntity<>(todoLists, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            Logger.getLogger(TodoController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            
        }
    }
    
    private String resizeImage(String base64Image) throws IOException {

        byte[] imageBytes = DatatypeConverter.parseBase64Binary(base64Image);
        BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));

        int newWidth = 200;
        int newHeight = 200;

        BufferedImage resizedImg = new BufferedImage(newWidth, newHeight, img.getType());
        Graphics2D g2d = resizedImg.createGraphics();
        g2d.drawImage(img, 0, 0, newWidth, newHeight, null);
        g2d.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(resizedImg, "png", baos);
        baos.flush();
        byte[] resizedImageBytes = baos.toByteArray();
        baos.close();

        String resizedBase64Image = DatatypeConverter.printBase64Binary(resizedImageBytes);
        return resizedBase64Image;
    }
}
