<?php

/**
 * CGPTMS_API Get AI Titles
 * @version 1.0.0
 */

namespace CGPTMS_OpenAi\api;

defined('ABSPATH') || exit();


/**
 * Class CGPTMS_APIGetAITitles
 * @package CGPTMS_OpenAi\api
 */
final class CGPTMS_APIGetAITitles
{
    private $openAI;
    public $base = 'get-titles';
    public function __construct(CGPTMS_APIConnectOpenAi $openAI)
    {
        $this->openAI = $openAI;
        $this->options = get_option('cgptms_openai_setting');

    }

    /**
     * @param \WP_REST_Request $request
     * @return false|string
     */
    public function request(\WP_REST_Request $request)
    {
       return $this->openAI->sendRequest(CGPTMS_APIPrompts::mopenPromptTitles($this->options['mopenai_model'], $request));
    }
}