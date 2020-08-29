<?php
/**
 * WPS Core Singleton Abstract Class
 *
 * @package    WPS\Core
 * @author     Travis Smith <t@wpsmith.net>
 * @copyright  2015-2019 WP Smith, Travis Smith
 * @link       https://github.com/wpsmith/WPS/
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @version    1.0.0
 * @since      0.1.0
 */

namespace WPS\Core;

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Singleton' ) ) {
	/**
	 * Singleton Abstract Class
	 *
	 * Assists in properly creating Singletons.
	 *
	 * @package WPS\Core
	 * @author Travis Smith <t@wpsmith.net>
	 */
	abstract class Singleton {

		/**
		 * Holds various singleton instances.
		 *
		 * @since 1.0.0
		 *
		 * @var array
		 */
		private static $instances = array();

		/**
		 * Singleton class constructor.
		 * Protected constructor to prevent creating a new instance of the
		 * *Singleton* via the `new` operator from outside of this class.
		 *
		 * @access private
		 * @since  1.0.0
		 *
		 * @param mixed|null $args Required args.
		 */
		protected function __construct( $args = null ) {
			// Thou shalt not construct that which is unconstructable!
		}

		/**
		 * Private clone method to prevent cloning of the instance of the
		 * *Singleton* instance.
		 *
		 * @access private
		 * @since  1.0.0
		 *
		 * @return void
		 */
		protected function __clone() {
			// Me not like clones! Me smash clones!
		}

		/**
		 * Private unserialize method to prevent unserializing of the *Singleton*
		 * instance.
		 *
		 * @access private
		 * @since  1.0.0
		 * @throws \Exception
		 *
		 * @return void
		 */
		private function __wakeup() {

			// Sleepy, sleepy.
			throw new \Exception( 'Cannot unserialize singleton' );

		}

		/**
		 * Returns the singleton instance of the class.
		 *
		 * @access public
		 * @since  1.0.0
		 * @static
		 *
		 * @param array $args Array of args.
		 *
		 * @return static Instance of the Singleton class or child class.
		 */
		public static function get_instance( $args = array() ) {

			$cls = get_called_class(); // late-static-bound class name
			if ( ! isset( self::$instances[ $cls ] ) ) {
				self::$instances[ $cls ] = new static( $args );
			}

			return self::$instances[ $cls ];
		}
	}
}
