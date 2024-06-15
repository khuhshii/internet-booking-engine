package com.kdu.ibe.entity.bookings;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cost")
public class CostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long costId;

    private Double totalCost;
    private Double amountDueAtResort;
    private Double nightlyRate;
    private Double taxes;
    private Double vat;


}