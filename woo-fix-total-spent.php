<?php
/**
 * Plugin Name:     WooCommerce Fix Total Spent
 * Plugin URI:      https://github.com/wpsmith/woo-fix-total-spent
 * Description:     Short-circuits and fixes get_total_spent.
 * Author:          Travis Smith <t@wpsmith.net>
 * Author URI:      https://wpsmith.net
 * Text Domain:     woo-fix-total-spent
 * Domain Path:     /languages
 * Version:         0.0.1
 * Requires PHP:    7.2.20
 *
 * WC requires at least: 4.3.0
 * WC tested up to: 4.3.3
 *
 * @package WPS\WP\Plugins\WooCommerce\FixTotalSpent
 */

namespace WPS\WP\Plugins\WooCommerce\FixTotalSpent;

// Require the files.
require_once __DIR__ . '/vendor/autoload.php';

// Let's get started.
OrderTotal::get_instance();

// Register activation hook to create the table.
register_activation_hook( __FILE__, array( __NAMESPACE__ . '\OrderTotal', 'create_table' ) );
