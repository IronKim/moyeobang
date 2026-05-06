package com.ironkim.moyeobang;

import com.ironkim.moyeobang.config.TestJpaConfig;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Testcontainers;

@ActiveProfiles("test")
@Import(TestJpaConfig.class)
@Testcontainers(disabledWithoutDocker = true)
@DataJpaTest(properties = { "spring.datasource.url=jdbc:tc:postgres:16:///moyeobang",
        "spring.jpa.hibernate.ddl-auto=create" })
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public abstract class TestContainerSupport {
}
