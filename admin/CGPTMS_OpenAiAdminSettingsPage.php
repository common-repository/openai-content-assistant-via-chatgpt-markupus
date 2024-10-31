<?php

/*
 * Plugin Settings Page
 */

namespace CGPTMS_OpenAi\admin;

/**
 * Class CGPTMS_OpenAiAdminSettingsPage
 * @package CGPTMS_OpenAi\admin
 */

class CGPTMS_OpenAiAdminSettingsPage
{

    private $settings;

    /**
     * CGPTMS_OpenAiAdminSettingsPage constructor.
     */
    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_plugin_page'));
        add_action('admin_init', array($this, 'admin_page_init'));
    }


    /**
     * Register Menu Page
     *
     * @return void
     */
    
    public function add_plugin_page()
    {

        add_menu_page(
            'OpenAI Generation Settings',
            'OpenAI Generation Settings',
            'edit_theme_options',
            'cgptms_openai_options',
            array($this, 'cgptms_openai_render_options_page')
        );

    }


    /**
     * Render Menu Page
     *
     * @return void
     */
    
    public function cgptms_openai_render_options_page()
    {
        $this->settings = get_option('cgptms_openai_option_group'); ?>

        <div class="wrap">
            <h2><?php echo get_admin_page_title() ?></h2>

            <?php settings_errors(); ?>

            <form action="options.php" method="POST">
                <?php
                settings_fields( 'cgptms_openai_option_group' );
                do_settings_sections( 'cgptms_openai_opts' );
                submit_button();
                ?>
            </form>
        </div>

    <?php }


    public function admin_page_init()
    {
        register_setting(
            'cgptms_openai_option_group',
            'cgptms_openai_setting'
        );

        add_settings_section(
            'cgptms_openai_settings_section',
            __('Setting Plugin Options', 'openai-content-assistant-via-chatgpt-markupus'),
            '',
            'cgptms_openai_opts' );

        add_settings_field('cgptms_openai_api_token', __('API token', 'openai-content-assistant-via-chatgpt-markupus'), array($this, 'cgptms_openai_render_field'), 'cgptms_openai_opts', 'cgptms_openai_settings_section',['id' => 'cgptms_openai_api_token']);
        add_settings_field('cgptms_openai_model', __('Model', 'openai-content-assistant-via-chatgpt-markupus'), array( $this, 'model_field' ), 'cgptms_openai_opts', 'cgptms_openai_settings_section', ['id' => 'cgptms_openai_model']);
    }


    /**
     * @param $args
     */
    public function cgptms_openai_render_field($args)
    {
        $option_name = "cgptms_openai_setting";
        $val = get_option($option_name);
        $sanitize_settings_key = sanitize_key($args['id']);
        $val = isset($val[$args['id']]) ? sanitize_text_field($val[$args['id']]) : null;?>

        <input type="text" name="cgptms_openai_setting[<?php echo $sanitize_settings_key; ?>]" value="<?php echo $val ?>">

    <?php }

    /**
     * @param $args
     */
    public function model_field($args)
    {
        $option_name = "cgptms_openai_setting";
        $val = get_option($option_name);
        $val = isset($val['cgptms_openai_model']) ? $val['cgptms_openai_model'] : 'gpt-3.5-turbo'; ?>
        <select name="cgptms_openai_setting[cgptms_openai_model]" >
            <option <?php selected( $val, 'gpt-3.5-turbo', true ); ?> value="gpt-3.5-turbo" > gpt-3.5-turbo</option>
            <option <?php selected( $val, 'text-davinci-003', true ); ?> value="text-davinci-003" > text-davinci-003</option>
        </select
        <?php

    }
}