# Especifica la imagen base
FROM php:8.2.6-apache

# Copia los archivos de la aplicación al contenedor
COPY . /var/www/html

# Instala las dependencias necesarias
RUN apt-get update 
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN a2enmod rewrite

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80


# Configura el punto de entrada para iniciar el servidor Apache
CMD ["apache2-foreground"]