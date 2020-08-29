<?php
/**
 * Fix Total Spent in WooCommerce File.
 *
 * Fixes the total spent in WooCommerce.
 *
 * You may copy, distribute and modify the software as long as you track changes/dates in source files.
 * Any modifications to or software including (via compiler) GPL-licensed code must also be made
 * available under the GPL along with build & install instructions.
 *
 * @package    WPS\WP\Plugins\WooCommerce\FixTotalSpent
 * @link       https://github.com/wpsmith/setantabooks.com
 * @version    0.0.1
 * @since      0.0.1
 */

namespace WPS\WP\Plugins\WooCommerce\FixTotalSpent;

use WPS\Core\Singleton;

/**
 * Class OrderTotal.
 *
 * @see https://github.com/wpsmith/Singleton
 *
 * @package WPS\WP\Plugins\WooCommerce
 */
class OrderTotal extends Singleton {

	/**
	 * Table name.
	 *
	 * @var string
	 */
	protected static $table_name = 'wpswoo_order_totals';

	/**
	 * OrderTotal constructor.
	 */
	function __construct() {
		add_action( "woocommerce_before_order_object_save", array( $this, 'save_order' ), PHP_INT_MAX );
		add_filter( "woocommerce_customer_get_total_spent_query", array( $this, 'intercept_query' ), PHP_INT_MAX, 2 );
	}

	/**
	 * Intercept the get_total_spent SQL query.
	 *
	 * @param string       $sql SQL query.
	 * @param \WC_Customer $customer Customer object.
	 *
	 * @return string|void
	 */
	public function intercept_query( $sql, $customer ) {
		global $wpdb;

		$user_id    = $customer->get_id();
		$statuses   = array_map( 'esc_sql', wc_get_is_paid_statuses() );
		$table_name = OrderTotal::$table_name;
		$sql        = "SELECT SUM(order_total) FROM {$table_name}
			WHERE user_id = %d
			AND order_status IN ( 'wc-" . implode( "','wc-", $statuses ) . "' )";
		$sql        = $wpdb->prepare( $sql, $user_id );

		return $sql;
	}

	/**
	 * Write the data to custom table.
	 *
	 * @param \WC_Data $instance The object being saved.
	 */
	public function save_order( $instance ) {
		$order_id     = $instance->get_id();
		$user_id      = $instance->get_user_id();
		$order_total  = floatval( $instance->get_total() );
		$order_status = 'wc-' . $instance->get_status();

		$this->write_data( $order_id, $user_id, $order_total, $order_status );
	}

	/**
	 * Writes the data to the table.
	 *
	 * @param int    $order_id Order ID.
	 * @param int    $user_id User ID.
	 * @param float  $order_total Order total.
	 * @param string $order_status WooCommerce Order Status.
	 */
	public function write_data( $order_id, $user_id, $order_total, $order_status ) {
		global $wpdb;

		$table_name = OrderTotal::$table_name;
		$sql        = "
			INSERT INTO {$wpdb->prefix}{$table_name} (order_id,user_id,order_total,order_status)
			VALUES (%d,%d,%f,%s)
			ON DUPLICATE KEY UPDATE
				order_id = VALUES(order_id),
				user_id = VALUES(user_id),
				order_total = VALUES(order_total),
				order_status = VALUES(order_status)
				";

		$sql = $wpdb->prepare( $sql, $order_id, $user_id, $order_total, $order_status );
		$wpdb->query( $sql );
	}

	/**
	 * Create the wpswoo_order_totals table.
	 */
	public static function create_table() {
		$version = (int) get_site_option( 'wpswoo_db_version' );

		if ( $version < 1 ) {
			global $wpdb;
			$charset_collate = $wpdb->get_charset_collate();

			// Create the SQL.
			$table_name = OrderTotal::$table_name;
			$sql        = "
			CREATE TABLE {$wpdb->prefix}{$table_name} (
				order_id INTEGER NOT NULL,
				user_id INTEGER NOT NULL,
				order_total FLOAT NOT NULL,
				order_status TEXT NOT NULL,
				PRIMARY KEY (order_id)
			) $charset_collate;";

			// Create the table.
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
			dbDelta( $sql );

			// Save DB version number.
			update_site_option( 'wpswoo_db_version', 1 );
		}
	}
}
