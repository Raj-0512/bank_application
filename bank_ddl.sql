create table users
(
    user_id       bigserial primary key,
    first_name    varchar         not null,
    last_name     varchar         not null,
    email         varchar         not null,
    phone         varchar unique  not null,
    password_hash varchar         not null,
    date_of_birth date,
    address       text,
    is_active     boolean                  default true,
    created_at    timestamp       not null default current_timestamp,
    updated_at    timestamp       not null default current_timestamp
);

create table account(
    account_id bigserial primary key ,
    user_id bigint not null,
    account_number varchar unique not null ,
    account_type varchar not null,
    balance numeric(20,2) not null default 0.0,
    status varchar not null default 'active',
    created_at timestamp not null default current_timestamp

);

alter table account add constraint fk_account_user
                    foreign key (user_id)
                    references users(user_id)
                    on delete cascade;

alter table account add constraint chk_account_type
check (account_type in ('saving' ,'current'));

alter table account add constraint chk_balance
check (balance >= 0);

CREATE TABLE employees (
                           employee_id BIGSERIAL PRIMARY KEY,
                           first_name VARCHAR(100) NOT NULL,
                           last_name VARCHAR(100) NOT NULL,
                           email VARCHAR(255) UNIQUE NOT NULL,
                           password_hash VARCHAR(255) NOT NULL,
                           designation VARCHAR(100),
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
                       loan_id BIGSERIAL PRIMARY KEY,
                       user_id BIGINT NOT NULL,
                       employee_id BIGINT NOT NULL,
                       loan_type VARCHAR(50) NOT NULL,
                       principal_amount NUMERIC(15,2) NOT NULL,
                       interest_rate NUMERIC(5,2) NOT NULL,
                       tenure_months INTEGER NOT NULL,
                       status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                       applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                       CONSTRAINT fk_loan_user
                           FOREIGN KEY (user_id)
                               REFERENCES users(user_id),

                       CONSTRAINT fk_loan_employee
                           FOREIGN KEY (employee_id)
                               REFERENCES employees(employee_id),

                       CONSTRAINT chk_loan_status
                           CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'CLOSED'))
);

CREATE TABLE beneficiary (
                               beneficiary_id BIGSERIAL PRIMARY KEY,
                               user_id BIGINT NOT NULL,
                               beneficiary_name VARCHAR(255) NOT NULL,
                               beneficiary_account_number VARCHAR(20) NOT NULL,
                               beneficiary_bank_name VARCHAR(255) NOT NULL,
                               beneficiary_ifsc VARCHAR(20) NOT NULL,
                               created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                               CONSTRAINT fk_beneficiary_user
                                   FOREIGN KEY (user_id)
                                       REFERENCES users(user_id)
                                       ON DELETE CASCADE
);


CREATE TABLE admin (
                        admin_id BIGSERIAL PRIMARY KEY,
                        employee_id BIGINT UNIQUE NOT NULL,
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                        CONSTRAINT fk_admin_employee
                            FOREIGN KEY (employee_id)
                                REFERENCES employees(employee_id)
                                ON DELETE CASCADE
);


CREATE TABLE transaction (
                              transaction_id BIGSERIAL PRIMARY KEY,
                              account_id BIGINT NOT NULL,
                              transaction_type VARCHAR(20) NOT NULL,
                              amount NUMERIC(15,2) NOT NULL,
                              description TEXT,
                              reference_number VARCHAR(50) UNIQUE NOT NULL,
                              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                              CONSTRAINT fk_transaction_account
                                  FOREIGN KEY (account_id)
                                      REFERENCES account(account_id),

                              CONSTRAINT chk_transaction_amount
                                  CHECK (amount > 0),

                              CONSTRAINT chk_transaction_type
                                  CHECK (
                                      transaction_type IN (
                                                           'DEPOSIT',
                                                           'WITHDRAWAL',
                                                           'TRANSFER_IN',
                                                           'TRANSFER_OUT'
                                          )
                                      )
);


CREATE TABLE notifications (
                               id BIGSERIAL PRIMARY KEY,
                               user_id BIGINT NOT NULL,
                               title VARCHAR(255) NOT NULL,
                               message TEXT NOT NULL,
                               is_read BOOLEAN DEFAULT FALSE,
                               created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                               CONSTRAINT fk_notification_user
                                   FOREIGN KEY (user_id)
                                       REFERENCES users(user_id)
                                       ON DELETE CASCADE
);
