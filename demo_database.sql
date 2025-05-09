-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: db
-- Üretim Zamanı: 09 May 2025, 12:18:53
-- Sunucu sürümü: 8.0.42
-- PHP Sürümü: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `php_app_database`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categories`
--

CREATE TABLE `categories` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `color` varchar(7) DEFAULT '#FFFFFF',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `categories`
--

INSERT INTO `categories` (`id`, `name`, `color`, `created_at`, `updated_at`) VALUES
(1, 'Back-End', '#ff0000', '2025-05-09 06:38:32', '2025-05-09 06:38:32'),
(2, 'Front-End', '#2b00ff', '2025-05-09 06:38:42', '2025-05-09 06:38:42'),
(3, 'Database', '#00ff91', '2025-05-09 06:38:52', '2025-05-09 06:38:52'),
(4, 'Deploy', '#ffea00', '2025-05-09 06:39:15', '2025-05-09 06:39:15'),
(5, 'Restful API', '#808080', '2025-05-09 06:39:39', '2025-05-09 06:39:39'),
(6, 'PHP', '#ffb22e', '2025-05-09 06:39:57', '2025-05-09 06:39:57'),
(7, 'React', '#00ff6e', '2025-05-09 06:40:14', '2025-05-09 06:40:14'),
(8, 'MySQL', '#0f00e0', '2025-05-09 06:40:58', '2025-05-09 06:40:58'),
(9, 'Test', '#0ced84', '2025-05-09 06:41:43', '2025-05-09 06:41:56');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `todos`
--

CREATE TABLE `todos` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('pending','in_progress','completed','cancelled') DEFAULT 'pending',
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `due_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `todos`
--

INSERT INTO `todos` (`id`, `title`, `description`, `status`, `priority`, `due_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Set up HTTPS', 'Set up HTTPS with Let’s Encrypt', 'in_progress', 'high', '2025-05-10 13:46:00', '2025-05-09 06:45:02', '2025-05-09 11:22:59', NULL),
(2, 'Add pagination', 'Add pagination to the data table.', 'completed', 'high', '2025-05-07 09:45:00', '2025-05-09 06:46:03', '2025-05-09 11:14:18', NULL),
(3, 'Persist user', 'Persist user preferences in localStorage', 'cancelled', 'high', '2025-05-08 09:50:00', '2025-05-09 06:46:55', '2025-05-09 11:17:49', NULL),
(4, 'Feature flags', 'Add feature flags for A/B testing', 'in_progress', 'low', '2025-05-10 09:48:00', '2025-05-09 06:49:04', '2025-05-09 11:26:58', NULL),
(5, 'Limit API', 'Add rate limiting to the API.', 'completed', 'medium', '2025-05-08 09:49:00', '2025-05-09 06:49:43', '2025-05-09 11:15:26', NULL),
(6, 'Optimize font', 'Optimize font loading for faster rendering.', 'cancelled', 'low', '2025-05-08 09:50:00', '2025-05-09 06:50:13', '2025-05-09 11:16:52', NULL),
(7, 'Optimize SVG', 'Optimize SVG files for faster loading', 'cancelled', 'high', '2025-05-08 09:50:00', '2025-05-09 06:51:02', '2025-05-09 11:19:40', NULL),
(8, 'Preferences in local', 'Persist user preferences in localStorage', 'in_progress', 'high', '2025-05-08 09:51:00', '2025-05-09 06:51:35', '2025-05-09 11:18:42', NULL),
(9, 'State manager', 'Add a global loading state manager', 'cancelled', 'low', '2025-05-08 09:52:00', '2025-05-09 06:52:42', '2025-05-09 11:18:18', NULL),
(10, 'Background workers', 'Containerize background workers', 'completed', 'medium', '2025-05-09 12:53:00', '2025-05-09 06:53:13', '2025-05-09 11:26:00', NULL),
(11, 'Background workers', 'Containerize background workers', 'in_progress', 'high', '2025-05-10 09:55:00', '2025-05-09 06:55:18', '2025-05-09 11:27:24', NULL),
(12, 'Traffic spikes', 'Configure auto-scaling for traffic spikes', 'pending', 'medium', '2025-05-15 09:56:00', '2025-05-09 06:56:16', '2025-05-09 11:29:58', NULL),
(13, 'Deleted items', 'Add undo functionality for deleted items', 'in_progress', 'high', '2025-05-08 09:56:00', '2025-05-09 06:56:37', '2025-05-09 11:19:17', NULL),
(14, 'Fault tolerance', 'Set up circuit breakers for fault tolerance', 'in_progress', 'low', '2025-05-11 09:57:00', '2025-05-09 06:57:09', '2025-05-09 11:25:33', NULL),
(15, 'Optimize database', 'Optimize database indexes', 'cancelled', 'medium', '2025-05-15 09:57:00', '2025-05-09 06:57:22', '2025-05-09 11:38:34', NULL),
(16, 'Encrypt', 'Encrypt sensitive user data at rest', 'cancelled', 'high', '2025-05-09 09:59:00', '2025-05-09 06:57:31', '2025-05-09 11:22:42', NULL),
(17, 'Add prefetch', 'Add prefetch for main navigation routes', 'in_progress', 'medium', '2025-05-09 12:57:00', '2025-05-09 06:57:48', '2025-05-09 11:33:31', NULL),
(18, 'Staging environment', 'Set up a staging environment', 'in_progress', 'medium', '2025-05-16 09:57:00', '2025-05-09 06:58:04', '2025-05-09 11:29:16', NULL),
(19, 'Tracing', 'Implement distributed tracing', 'completed', 'medium', '2025-05-08 09:58:00', '2025-05-09 06:58:19', '2025-05-09 11:26:31', NULL),
(20, 'Implement image', 'Implement image compression pipeline', 'in_progress', 'low', '2025-05-08 09:58:00', '2025-05-09 06:58:41', '2025-05-09 11:33:44', NULL),
(21, 'Reduce images', 'Compress and serve WebP images', 'in_progress', 'medium', '2025-05-08 09:58:00', '2025-05-09 06:58:54', '2025-05-09 11:21:03', NULL),
(22, 'Cache frequent', 'Cache frequent API responses with Redis', 'in_progress', 'low', '2025-05-08 09:58:00', '2025-05-09 06:59:05', '2025-05-09 11:21:38', NULL),
(23, 'Reusable modal', 'Create a reusable modal component', 'completed', 'medium', '2025-05-07 09:59:00', '2025-05-09 06:59:19', '2025-05-09 11:14:46', NULL),
(24, 'Schedule backups', 'Schedule daily backups to S3', 'completed', 'low', '2025-05-23 09:59:00', '2025-05-09 06:59:33', '2025-05-09 11:24:19', NULL),
(25, 'Radio buttons', 'Develop custom checkbox/radio buttons', 'completed', 'high', '2025-05-16 10:03:00', '2025-05-09 07:03:32', '2025-05-09 11:36:43', NULL),
(26, 'Rotation server logs', 'Add log rotation for server logs', 'in_progress', 'medium', '2025-05-15 10:04:00', '2025-05-09 07:04:08', '2025-05-09 11:29:01', NULL),
(27, 'Add CSRF', 'Add CSRF protection for forms', 'pending', 'high', '2025-05-23 10:04:00', '2025-05-09 07:04:16', '2025-05-09 11:23:19', NULL),
(28, 'Meta tags', 'Add meta tags for better search visibility', 'completed', 'high', '2025-05-10 10:04:00', '2025-05-09 07:04:31', '2025-05-09 11:27:49', NULL),
(29, 'Non-critical JavaScript', 'Defer non-critical JavaScript', 'pending', 'medium', '2025-05-07 10:04:00', '2025-05-09 07:04:45', '2025-05-09 11:17:30', NULL),
(30, 'Server CPU/RAM', 'Monitor server CPU/RAM with Prometheus', 'pending', 'medium', '2025-05-11 10:04:00', '2025-05-09 07:05:03', '2025-05-09 11:29:40', NULL),
(31, 'Custom hooks', 'Create custom hooks for API calls', 'completed', 'medium', '2025-05-15 10:05:00', '2025-05-09 07:05:15', '2025-05-09 11:34:16', NULL),
(32, 'Implement functionality', 'Implement undo/redo functionality', 'completed', 'medium', '2025-05-15 10:05:00', '2025-05-09 07:05:26', '2025-05-09 11:34:34', NULL),
(33, 'Sanitize user input', 'Sanitize user input to prevent', 'in_progress', 'medium', '2025-05-17 10:05:00', '2025-05-09 07:05:35', '2025-05-09 11:31:03', NULL),
(34, 'Permissions to API', 'Add field-level permissions to API', 'completed', 'medium', '2025-05-17 10:05:00', '2025-05-09 07:05:49', '2025-05-09 11:37:38', NULL),
(35, 'Checkbox buttons', 'Custom checkbox/radio buttons', 'completed', 'medium', '2025-05-16 10:06:00', '2025-05-09 07:06:28', '2025-05-09 11:37:00', NULL),
(36, 'Monolith microservices', 'Seperate monolith into microservices', 'completed', 'high', '2025-05-14 10:06:00', '2025-05-09 07:06:57', '2025-05-09 11:28:40', NULL),
(37, 'Usage analytics', 'Implement API usage analytics', 'completed', 'medium', '2025-05-17 10:07:00', '2025-05-09 07:07:08', '2025-05-09 11:37:52', NULL),
(38, 'Stepper component', 'Progress stepper component', 'completed', 'high', '2025-05-15 10:07:00', '2025-05-09 07:07:20', '2025-05-09 11:36:31', NULL),
(39, 'Unused packages', 'Audit unused npm packages', 'in_progress', 'medium', '2025-05-18 10:07:00', '2025-05-09 07:07:37', '2025-05-09 11:31:54', NULL),
(40, 'Mock API', 'Create mock API for development', 'completed', 'medium', '2025-05-13 10:07:00', '2025-05-09 07:07:48', '2025-05-09 11:38:06', NULL),
(41, 'Add unit', 'Add unit tests for utility functions', 'completed', 'medium', '2025-05-16 10:07:00', '2025-05-09 07:07:57', '2025-05-09 11:37:20', NULL),
(42, 'Configure auto-scaling', 'Configure auto-scaling for traffic spikes', 'pending', 'medium', '2025-05-18 10:08:00', '2025-05-09 07:08:05', '2025-05-09 11:25:09', NULL),
(43, 'Progress stepper', 'Create progress stepper component', 'completed', 'medium', '2025-05-20 10:08:00', '2025-05-09 07:08:15', '2025-05-09 11:36:14', NULL),
(44, 'Pop-up component', 'Develop custom pop-up component', 'completed', 'high', '2025-05-17 10:08:00', '2025-05-09 07:08:25', '2025-05-09 11:32:31', NULL),
(45, 'Spinner for async operations', 'Add loading spinner for async operations', 'pending', 'medium', '2025-05-23 10:08:00', '2025-05-09 07:08:38', '2025-05-09 11:13:44', NULL),
(46, 'Form validation', 'Add form validation to the login page.', 'completed', 'medium', '2025-05-21 10:08:00', '2025-05-09 07:08:47', '2025-05-09 11:24:55', NULL),
(47, '23453453', '332423', 'pending', 'medium', '2025-05-24 13:06:00', '2025-05-09 10:06:09', '2025-05-09 10:06:21', '2025-05-09 10:06:21'),
(48, 'User preferences', 'User preferences in browser', 'in_progress', 'medium', '2025-05-24 15:17:00', '2025-05-09 12:17:56', '2025-05-09 12:17:56', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `todo_category`
--

CREATE TABLE `todo_category` (
  `todo_id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `todo_category`
--

INSERT INTO `todo_category` (`todo_id`, `category_id`) VALUES
(7, 1),
(14, 1),
(17, 1),
(40, 1),
(48, 1),
(1, 2),
(6, 2),
(7, 2),
(9, 2),
(11, 2),
(12, 2),
(13, 2),
(18, 2),
(19, 2),
(22, 2),
(25, 2),
(28, 2),
(35, 2),
(37, 2),
(44, 2),
(45, 2),
(48, 2),
(1, 3),
(4, 3),
(9, 3),
(10, 3),
(11, 3),
(12, 3),
(14, 3),
(18, 3),
(19, 3),
(24, 3),
(25, 3),
(28, 3),
(29, 3),
(33, 3),
(34, 3),
(35, 3),
(36, 3),
(38, 3),
(39, 3),
(42, 3),
(46, 3),
(47, 3),
(2, 4),
(8, 4),
(14, 4),
(15, 4),
(16, 4),
(18, 4),
(20, 4),
(22, 4),
(23, 4),
(24, 4),
(26, 4),
(30, 4),
(33, 4),
(34, 4),
(36, 4),
(41, 4),
(42, 4),
(43, 4),
(47, 4),
(4, 5),
(6, 5),
(8, 5),
(10, 5),
(21, 5),
(23, 5),
(25, 5),
(26, 5),
(27, 5),
(30, 5),
(31, 5),
(39, 5),
(40, 5),
(41, 5),
(43, 5),
(48, 5),
(1, 6),
(2, 6),
(5, 6),
(8, 6),
(10, 6),
(11, 6),
(12, 6),
(13, 6),
(15, 6),
(17, 6),
(21, 6),
(22, 6),
(24, 6),
(26, 6),
(27, 6),
(29, 6),
(30, 6),
(36, 6),
(37, 6),
(38, 6),
(40, 6),
(45, 6),
(46, 6),
(48, 6),
(5, 7),
(13, 7),
(16, 7),
(17, 7),
(31, 7),
(32, 7),
(3, 8),
(5, 8),
(7, 8),
(15, 8),
(16, 8),
(19, 8),
(20, 8),
(32, 8),
(44, 8),
(3, 9),
(6, 9),
(13, 9),
(20, 9),
(32, 9);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `todo_category`
--
ALTER TABLE `todo_category`
  ADD PRIMARY KEY (`todo_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `todo_category`
--
ALTER TABLE `todo_category`
  ADD CONSTRAINT `todo_category_ibfk_1` FOREIGN KEY (`todo_id`) REFERENCES `todos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `todo_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
