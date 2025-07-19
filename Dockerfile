# Usar Ubuntu como base
FROM ubuntu:20.04

# Cambiar al usuario root
USER root

# Variables para evitar interactividad de apt
ENV DEBIAN_FRONTEND=noninteractive

# Actualizar paquetes e instalar dependencias básicas
RUN apt-get update && apt-get install -y \
    software-properties-common \
    nano \
    zip \
    curl \
    gnupg \
    && add-apt-repository ppa:ondrej/php \
    && apt-get update \
    && apt-get install -y \
    php8.4 \
    php8.4-cli \
    php8.4-common \
    php8.4-curl \
    php8.4-mbstring \
    php8.4-mysql \
    php8.4-xml \
    apache2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Descargar e instalar la última versión de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar Laravel Installer globalmente usando Composer
RUN composer global require laravel/installer

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    && apt-get clean

# Agregar la ruta de Laravel al PATH
ENV PATH="/root/.composer/vendor/bin:$PATH"

# Instalar Node.js y npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs 

# Habilitar módulos necesarios de Apache
RUN a2enmod rewrite

# Establecer el directorio de trabajo
WORKDIR /var/www/html/portafolio

# Copiar configuración personalizada para Apache
COPY --chmod=0644 container-files/apache2.conf /etc/apache2/apache2.conf

# Cambiar los permisos del directorio
RUN chown -R www-data:www-data /var/www/html/portafolio

# Exponer el puerto 80 para Apache
EXPOSE 80

# Copiar script de entrada
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Usar el script como comando de arranque
ENTRYPOINT ["/entrypoint.sh"]

# Comando por defecto para iniciar Apache
# CMD ["apache2ctl", "-D", "FOREGROUND"]
