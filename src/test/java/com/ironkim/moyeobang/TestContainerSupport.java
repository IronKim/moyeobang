package com.ironkim.moyeobang;

import com.ironkim.moyeobang.config.TestJpaConfig;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.JdbcDatabaseContainer;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@ActiveProfiles("test")
@Import(TestJpaConfig.class)
@Testcontainers
@DataJpaTest(properties = {"spring.datasource.url=jdbc:tc:mysql:8:///", "spring.jpa.hibernate.ddl-auto=create"})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public abstract class TestContainerSupport {

    private static final String MYSQL_IMAGE = "mysql:8";

    private static final JdbcDatabaseContainer<?> MYSQL;

    static {
        MYSQL = new MySQLContainer<>(MYSQL_IMAGE);

        MYSQL.start();
    }
}
