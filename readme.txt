=== WooCommerce Fix Total Spent ===
Contributors: wpsmith
Tags: woocommerce
Requires at least: 5.0
Requires PHP: 7.0.0

Short-circuits and fixes `get_total_spent()` to ensure that it does not overload the server.

== Description ==
WooCommerce is a flexible, open-source eCommerce solution built on WordPress. Whether you're launching a business, taking an existing brick and mortar store online, or designing sites for clients you can get started quickly and build exactly the store you want.

However, there are various parts of WooCommerce that kills your performance. One of them is the automatic, asynchronous update of getting the total spend. This plugin "fixes" that.

== Installation ==

= Minimum Requirements =

* PHP 7.2 or greater is recommended
* MySQL 5.6 or greater is recommended

Visit the [WooCommerce server requirements documentation](https://docs.woocommerce.com/document/server-requirements/?utm_source=wp%20org%20repo%20listing&utm_content=3.6) for a detailed list of server requirements.

= Automatic installation =

Automatic installation is the easiest option -- WordPress will handles the file transfer, and you won’t need to leave your web browser. To do an automatic install of WooCommerce, log in to your WordPress dashboard, navigate to the Plugins menu, and click “Add New.”

In the search field type “WooCommerce,” then click “Search Plugins.” Once you’ve found us,  you can view details about it such as the point release, rating, and description. Most importantly of course, you can install it by! Click “Install Now,” and WordPress will take it from there.

= Manual installation =

Manual installation method requires downloading the WooCommerce plugin and uploading it to your web server via your favorite FTP application. The WordPress codex contains [instructions on how to do this here](https://wordpress.org/support/article/managing-plugins/#manual-plugin-installation).
