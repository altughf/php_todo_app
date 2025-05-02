FROM php:8.2-apache

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache modules
RUN a2enmod rewrite

# Copy vhost configuration
COPY docker-host.conf /etc/apache2/sites-available/docker-host.conf

# Enable vhost
RUN a2ensite docker-host

# Start Apache service
CMD ["apache2-foreground"]
