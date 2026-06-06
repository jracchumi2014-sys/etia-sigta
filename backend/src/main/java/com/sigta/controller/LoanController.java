package com.sigta.controller;

import com.sigta.model.Loan;
import com.sigta.repository.LoanRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanRepository loanRepository;

    public LoanController(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    @GetMapping
    public List<Loan> listLoans() {
        return loanRepository.findAll();
    }
}
