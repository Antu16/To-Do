/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.demo.todoApplication.repository;

import com.demo.todoApplication.models.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author mahfujul.alam
 */


@Repository
public interface TodoRepository extends JpaRepository<TodoList, Long> {
  
}