#!/bin/bash

# Copiar .env si no existe
if [ ! -f /var/www/html/portafolio/.env ]; then
    echo "Copiando .env.example a .env..."
    cp /var/www/html/portafolio/.env.example /var/www/html/portafolio/.env
fi

# Ajustar permisos para Laravel
chown -R www-data:www-data /var/www/html/portafolio/storage /var/www/html/portafolio/bootstrap/cache

# Iniciar Apache
exec apache2ctl -D FOREGROUND