package com.ironkim.moyeobang.domain.converter;

import com.ironkim.moyeobang.domain.constant.PreferenceType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Converter
public class PreferenceTypesConverter implements AttributeConverter<Set<PreferenceType>, String> {

    private static final String DELIMITER = ",";

    @Override
    public String convertToDatabaseColumn(Set<PreferenceType> attribute) {
        if(attribute == null || attribute.isEmpty()) return null;

        return attribute.stream().map(PreferenceType::name).sorted().collect(Collectors.joining(DELIMITER));
    }

    @Override
    public Set<PreferenceType> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) return Set.of();

        return Arrays.stream(dbData.split(DELIMITER)).map(PreferenceType::valueOf).collect(Collectors.toSet());
    }
}
