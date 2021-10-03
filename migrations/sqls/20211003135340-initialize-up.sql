-- Table: public.db_product

-- DROP TABLE public.db_product;

CREATE TABLE IF NOT EXISTS public.db_product
(
    id SERIAL NOT NULL,
    product_name character varying COLLATE pg_catalog."default",
    sku character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    price_prod character varying COLLATE pg_catalog."default",
    CONSTRAINT id PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.db_product
    OWNER to postgres;