<?php
/*
Plugin Name: OpenAI Content Assistant via ChatGPT | Markupus
Description: OpenAI helps to create a title & an excerpt based on the content of post using ChatGPT API.
Version: 1.1
Author: Markupus
Author URI: https://markupus.com/
Domain Path: /lang
*/


if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

require_once(__DIR__ . '/vendor/autoload.php');

use CGPTMS_OpenAi\gutenberg\GutenbergBlocks;
use CGPTMS_OpenAi\api\CGPTMS_APIRegisterRoutes;
use CGPTMS_OpenAi\admin\CGPTMS_OpenAiAdminSettingsPage;

if (! defined('ABSPATH')) {
    exit;
}
require_once ABSPATH.'wp-admin/includes/plugin.php';

define( 'CGPTMS_PLUGIN_DIR', plugin_dir_url(__FILE__));
define( 'CGPTMS_OPENAI_PLUGIN_FILE', __FILE__ );


class CGPTMS_OpenAi
    {
        /**
         * CGPTMS_OpenAi constructor.
         */
        public function __construct()
        {

            if (version_compare(PHP_VERSION, '7.2', '<=')) {

                deactivate_plugins( plugin_basename( __FILE__ ) );
                add_action( 'admin_notices', [$this, 'cgptms_openai_incompatible_admin_notice'] );

                return;
            }

            if ( !function_exists( 'use_block_editor_for_post' ) ) {

                deactivate_plugins( plugin_basename( __FILE__ ) );
                add_action( 'admin_notices', [$this, 'cgptms_openai_gutenberg_admin_notice'] );

                return;
            }

            add_action( 'admin_init', [$this, 'check_editor'] );
            add_action( 'init', [$this, 'initialization']);
            add_action( 'plugins_loaded', [$this, 'cgptms_openai_plugin_textdomain'] );
            add_filter( 'plugin_action_links', [$this, 'cgptms_openai_plugin_settings_link'], 10, 2 );
        }

        /**
         * Message about incompatible PHP version
         */

        public function cgptms_openai_incompatible_admin_notice() {
            echo '<div class="error"><p>' . __( 'OpenAI Generation requires PHP 7.2 (or higher) to function properly. Please upgrade PHP. The Plugin has been auto-deactivated.', 'openai-content-assistant-via-chatgpt-markupus' ) . '</p></div>';
            if ( isset( $_GET['activate'] ) ) {
                unset( $_GET['activate'] );
            }
        }

        /**
         * Message about Gutenberg
         */

        public function cgptms_openai_gutenberg_admin_notice() {
            echo '<div class="error"><p>' . __( 'The new text editor (Gutenberg) is not included. The plugin only works with the Gutenberg editor.', 'openai-content-assistant-via-chatgpt-markupus' ) . '</p></div>';
            if ( isset( $_GET['activate'] ) ) {
                unset( $_GET['activate'] );
            }
        }

        /**
         * Check if Gutenberg is enabled or not
         * @return bool
         */
        public function check_editor() {
            $check_editor = false;
            if (has_filter('use_block_editor_for_post') || is_plugin_active( 'classic-editor/classic-editor.php' )) {
                deactivate_plugins( plugin_basename( __FILE__ ) );
                add_action( 'admin_notices', [$this, 'cgptms_openai_gutenberg_admin_notice'] );
                $check_editor = true;
            }
            return $check_editor;
        }

        /**
         * Plugin functionality initialization
         */
        public function initialization()
        {
            if (!$this->check_editor()) {
                new CGPTMS_OpenAiAdminSettingsPage();
                new CGPTMS_APIRegisterRoutes();
                new GutenbergBlocks();
            }
        }

        /**
         * Text domain for translations
         */
        public function cgptms_openai_plugin_textdomain() {
            load_plugin_textdomain( 'openai-content-assistant-via-chatgpt-markupus', FALSE, basename( dirname( __FILE__ ) ) . '/lang/' );

        }

        public function cgptms_openai_plugin_settings_link( $links, $file ) {
            if ( plugin_basename( __FILE__ ) == $file ) {
                $settings_link = '<a href="' . admin_url( 'admin.php?page=cgptms_openai_options' ) . '">' . __( 'Settings', 'openai-content-assistant-via-chatgpt-markupus' ) . '</a>';
                array_unshift( $links, $settings_link );
            }
            return $links;
        }

    }

new CGPTMS_OpenAi();




