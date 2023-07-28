/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.demo.todoApplication.payload.request;

import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author mahfujul.alam
 */
public class CreateTodoRequest {

    public CreateTodoRequest(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    private String image;

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
