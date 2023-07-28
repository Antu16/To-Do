/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.demo.todoApplication.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 *
 * @author mahfujul.alam
 */
@Entity
@Table(name = "todolist")
public class TodoList {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "markedas")
    private boolean markedas; //true-> closed false->open

    @Column(name = "originalimage")
    private String orgImage;

    @Column(name = "resizedimage")
    private String resImage;
    
    public TodoList(){
    
    }
    
    public TodoList(String title, String description, boolean markedas, String orgImage, String resImage) {
        
        this.title = title;
        this.description = description;
        this.markedas = markedas;
        this.orgImage = orgImage;
        this.resImage = resImage;
    }    
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isMarkedas() {
        return markedas;
    }

    public void setMarkedas(boolean markedas) {
        this.markedas = markedas;
    }

    public String getOrgImage() {
        return orgImage;
    }

    public void setOrgImage(String orgImage) {
        this.orgImage = orgImage;
    }

    public String getResImage() {
        return resImage;
    }

    public void setResImage(String resImage) {
        this.resImage = resImage;
    }

    
}
