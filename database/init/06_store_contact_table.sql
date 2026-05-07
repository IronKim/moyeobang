-- StoreContact 테이블 생성
CREATE TABLE store_contact (
    id BIGSERIAL PRIMARY KEY,
    store_id BIGINT NOT NULL,
    store_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE,
    CONSTRAINT uc_store_contact_store_number UNIQUE(store_id, store_number)
);

CREATE INDEX idx_store_contact_store_id ON store_contact(store_id);
