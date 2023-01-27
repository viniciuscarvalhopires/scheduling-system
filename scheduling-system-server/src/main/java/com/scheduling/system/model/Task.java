package com.scheduling.system.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity @NoArgsConstructor
@Getter @Setter @ToString
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long id;

  @Column(nullable = false)
  private String name;

  private boolean status = false;

}
