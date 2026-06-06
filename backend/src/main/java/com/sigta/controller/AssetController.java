package com.sigta.controller;

import com.sigta.model.Asset;
import com.sigta.repository.AssetRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@PreAuthorize("hasAnyRole('ADMIN','ALMACENERO')")
public class AssetController {

    private final AssetRepository assetRepository;

    public AssetController(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    @GetMapping
    public List<Asset> listAssets() {
        return assetRepository.findAll();
    }
}
