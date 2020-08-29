<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitfee35d8ae4c71218166f8e13c531173a
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WPS\\WP\\Plugins\\WooCommerce\\FixTotalSpent\\' => 41,
            'WPS\\Core\\' => 9,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WPS\\WP\\Plugins\\WooCommerce\\FixTotalSpent\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
        'WPS\\Core\\' => 
        array (
            0 => __DIR__ . '/..' . '/wpsmith/singleton/src',
        ),
    );

    public static $classMap = array (
        'WPS\\Core\\Singleton' => __DIR__ . '/..' . '/wpsmith/singleton/src/Singleton.php',
        'WPS\\WP\\Plugins\\WooCommerce\\FixTotalSpent\\OrderTotal' => __DIR__ . '/../..' . '/includes/OrderTotal.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitfee35d8ae4c71218166f8e13c531173a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitfee35d8ae4c71218166f8e13c531173a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitfee35d8ae4c71218166f8e13c531173a::$classMap;

        }, null, ClassLoader::class);
    }
}