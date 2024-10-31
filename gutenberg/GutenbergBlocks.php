<?php
namespace CGPTMS_OpenAi\gutenberg;

final class GutenbergBlocks {
    public function __construct()
    {
        add_action('enqueue_block_editor_assets', function() {
            wp_enqueue_script( 'cgptms_openai-js', CGPTMS_PLUGIN_DIR . '/build/blocks.js', ['wp-blocks', 'wp-element', 'wp-edit-post'] );
            wp_enqueue_style( 'cgptms_openai-style', CGPTMS_PLUGIN_DIR . '/blocks/open-ai-sidebar/css/style.css' );
        });
    }
}