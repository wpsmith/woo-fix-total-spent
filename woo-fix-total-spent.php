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

add_filter( 'get_user_metadata', __NAMESPACE__ . '\filter_user_metadata', 10, 3 );
/**
 * Short-circuits the return value of a user's meta field: _money_spend & _order_count.
 *
 * @param mixed  $value     The value to return, either a single metadata value or an array
 *                          of values depending on the value of `$single`. Default null.
 * @param int    $object_id ID of the object metadata is for.
 * @param string $meta_key  Metadata key.
 *
 * @return mixed
 */
function filter_user_metadata( $value, $object_id, $meta_key ) {
	// Check if it's one of the keys we want to filter.
	if ( in_array( $meta_key, array( '_money_spent', '_order_count' ) ) ) {
		// Return 0 so WC doesn't try calculate it.
		return 0;
	}

	return $value;
}
