package com.ironkim.moyeobang.service;

import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final S3Client s3Client;
    @Value("${supabase.bucket}")
    private String bucket;
    @Value("${supabase.public-domain}")
    private String publicDomain;

    public List<String> uploadFiles(List<MultipartFile> files) {
        return files.stream().map(file -> {
            try {
                String randomFilename = generateRandomFilename(file);

                PutObjectRequest request = PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(randomFilename)
                        .contentType(file.getContentType())
                        .build();

                s3Client.putObject(
                        request,
                        RequestBody.fromInputStream(file.getInputStream(), file.getSize())
                );

                return publicDomain + "/" + bucket + "/" + randomFilename;

            } catch (IOException e) {
                throw new MoyeobangApplicationException(ErrorCode.INTERNAL_SERVER_ERROR);
            }
        }).toList();
    }

    public void deleteFile(String fileUrl) {
        String objectKey = fileUrl.replace(publicDomain, "").replaceFirst("^/+", "");

        // 1. 존재 여부 체크
        try {
            s3Client.headObject(
                    HeadObjectRequest.builder()
                            .bucket(bucket)
                            .key(objectKey)
                            .build()
            );
        } catch (NoSuchKeyException e) {
            throw new MoyeobangApplicationException(ErrorCode.BAD_REQUEST);
        } catch (S3Exception e) {
            throw new MoyeobangApplicationException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        // 2. 삭제
        try {
            s3Client.deleteObject(
                    DeleteObjectRequest.builder()
                            .bucket(bucket)
                            .key(objectKey)
                            .build()
            );
        } catch (S3Exception e) {
            throw new MoyeobangApplicationException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    // 랜덤파일명 생성 (파일명 중복 방지)
    private String generateRandomFilename(MultipartFile multipartFile) {
        String originalFilename = multipartFile.getOriginalFilename();
        String fileExtension = validateFileExtension(originalFilename);
        return UUID.randomUUID() + "." + fileExtension;
    }

    // 파일 확장자 체크
    private String validateFileExtension(String originalFilename) {
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        List<String> allowedExtensions = Arrays.asList("jpg", "png", "gif", "jpeg");

        if (!allowedExtensions.contains(fileExtension)) {
            throw new MoyeobangApplicationException(ErrorCode.NOT_IMAGE_EXTENSION);
        }
        return fileExtension;
    }
}
