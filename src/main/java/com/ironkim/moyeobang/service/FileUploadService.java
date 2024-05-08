package com.ironkim.moyeobang.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.cloudfront.domain}")
    private String cloudfrontDomain;

    public List<String> uploadFiles(List<MultipartFile> files) {
        return files.stream().map(file -> {
            try {
                String randomFilename = generateRandomFilename(file);
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(file.getContentType());
                metadata.setContentLength(file.getSize());

                amazonS3Client.putObject(bucket, randomFilename, file.getInputStream(), metadata);
                return cloudfrontDomain + amazonS3Client.getUrl(bucket, randomFilename).getPath();
            } catch (IOException e) {
                throw new MoyeobangApplicationException(ErrorCode.INTERNAL_SERVER_ERROR);
            }
        }).toList();
    }

    public void deleteFile(String fileUrl) {
        String[] urlParts = fileUrl.split("/");
        String fileBucket = urlParts[2].split("\\.")[0];

        if (!fileBucket.equals(bucket)) {
            throw new MoyeobangApplicationException(ErrorCode.BAD_REQUEST);
        }

        String objectKey = String.join("/", Arrays.copyOfRange(urlParts, 3, urlParts.length));

        if (!amazonS3Client.doesObjectExist(bucket, objectKey)) {
            throw new MoyeobangApplicationException(ErrorCode.BAD_REQUEST);
        }

        try {
            amazonS3Client.deleteObject(bucket, objectKey);
        } catch (Exception e) {
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
