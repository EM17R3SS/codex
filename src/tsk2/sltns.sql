CREATE TABLE core_objects (
    object_identifier INTEGER NOT NULL PRIMARY KEY,
    object_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    parent_object_identifier INTEGER,

    record_creation_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    record_modification_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),

    creating_user_identifier VARCHAR(255),
    modifying_user_identifier VARCHAR(255),

    CONSTRAINT fk_parent_object
        FOREIGN KEY (parent_object_identifier)
        REFERENCES core_objects(object_identifier)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_not_self_referential
        CHECK (object_identifier != parent_object_identifier OR parent_object_identifier IS NULL),

    CONSTRAINT chk_valid_timestamp
        CHECK (object_timestamp <= NOW() AT TIME ZONE 'UTC')
);

CREATE TABLE object_contact_details (
    contact_identifier INTEGER NOT NULL PRIMARY KEY,
    associated_object_identifier INTEGER UNIQUE NOT NULL,

    mail_server_hostname VARCHAR(255),
    email_address_string VARCHAR(255),

    contact_creation_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    last_verified_time TIMESTAMP WITH TIME ZONE,

    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED',

    CONSTRAINT fk_associated_object
        FOREIGN KEY (associated_object_identifier)
        REFERENCES core_objects(object_identifier)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_valid_email_format
        CHECK (email_address_string ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),

    CONSTRAINT chk_verification_status
        CHECK (verification_status IN ('VERIFIED', 'UNVERIFIED', 'EXPIRED', 'REVOKED')),

    CONSTRAINT chk_hostname_format
        CHECK (mail_server_hostname ~* '^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$')
);

CREATE TABLE contact_associated_users (
    user_association_identifier INTEGER NOT NULL PRIMARY KEY,
    parent_contact_identifier INTEGER NOT NULL,

    user_display_name VARCHAR(255) NOT NULL,
    user_sort_order INTEGER NOT NULL DEFAULT 0,

    association_creation_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),

    CONSTRAINT fk_parent_contact
        FOREIGN KEY (parent_contact_identifier)
        REFERENCES object_contact_details(contact_identifier)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_valid_display_name
        CHECK (LENGTH(TRIM(user_display_name)) > 0 AND user_display_name ~* '^[A-Za-z\s\-\.]+$'),

    CONSTRAINT chk_positive_sort_order
        CHECK (user_sort_order >= 0),

    CONSTRAINT unq_name_per_contact
        UNIQUE (parent_contact_identifier, LOWER(TRIM(user_display_name)))
);

CREATE TABLE object_geographical_addresses (
    address_identifier INTEGER NOT NULL PRIMARY KEY,
    associated_object_identifier INTEGER NOT NULL,
    full_address_text TEXT NOT NULL,

    address_type_classification VARCHAR(50) NOT NULL DEFAULT 'PRIMARY',
    address_sort_order INTEGER NOT NULL DEFAULT 0,

    address_creation_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    address_validation_status VARCHAR(50) DEFAULT 'UNVALIDATED',

    CONSTRAINT fk_address_object
        FOREIGN KEY (associated_object_identifier)
        REFERENCES core_objects(object_identifier)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_valid_address_text
        CHECK (LENGTH(TRIM(full_address_text)) > 5),

    CONSTRAINT chk_address_type
        CHECK (address_type_classification IN ('PRIMARY', 'SECONDARY', 'BUSINESS', 'RESIDENTIAL', 'MAILING', 'OTHER')),

    CONSTRAINT chk_positive_address_order
        CHECK (address_sort_order >= 0)
);
