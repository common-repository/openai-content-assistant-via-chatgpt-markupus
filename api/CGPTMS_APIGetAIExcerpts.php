<?php

/**
 * CGPTMS_API Get AI Titles
 * CGPTMS_API Get AI Excerpts

 * @version 1.0.0
 */

namespace CGPTMS_OpenAi\api;

defined('ABSPATH') || exit();

/**
 * Class APIGetAIExcerpts
 * @package CGPTMS_OpenAi\api
 */
final class CGPTMS_APIGetAIExcerpts
{
    public $base = 'get-excerpts';
    protected $options;
    private $openAI;
    public function __construct(CGPTMS_APIConnectOpenAi $openAI)
    {
        $this->openAI = $openAI;
        $this->options = get_option('cgptms_openai_setting');
    }
    public function request(\WP_REST_Request $request)
    {
        return $this->openAI->sendRequest(CGPTMS_APIPrompts::mopenPromptExcerpts($this->options['mopenai_model'], $request));
    }
}