# Usa a imagem oficial do PostgreSQL como base
FROM postgres:latest

# Copia os scripts de inicialização e inserção para o diretório de inicialização do PostgreSQL
COPY ./init-db.sql /docker-entrypoint-initdb.d/
COPY ./insert-data.sql /docker-entrypoint-initdb.d/

# O PostgreSQL executa qualquer script .sql que estiver no diretório /docker-entrypoint-initdb.d/
# O PostgreSQL executa os scripts na ordem em que foram copiados
