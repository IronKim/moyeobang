package com.ironkim.moyeobang.controller;

import com.ironkim.moyeobang.dto.response.Response;
import com.ironkim.moyeobang.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/storage")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/upload")
    public Response<List<String>> uploadFiles(@RequestPart(value = "files") List<MultipartFile> files) {
        List<String> fileUrls = fileUploadService.uploadFiles(files);
        return Response.success(fileUrls);
    }

    @DeleteMapping("/delete")
    public Response<Void> deleteFile(@RequestParam("fileUrl") String fileUrl) {
        fileUploadService.deleteFile(fileUrl);
        return Response.success();
    }
}
