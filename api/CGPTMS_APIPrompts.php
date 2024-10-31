<?php
/**
 * API Prompts
 * @version 1.0.0
 */

namespace CGPTMS_OpenAi\api;

defined('ABSPATH') || exit();

/**
 * Class APIPrompts
 * @package MOpenAi\api
 */
class CGPTMS_APIPrompts
{

    /**
     * @var mixed|void
     */
    protected $options;

    /**
     * APIPrompts constructor.
     */
    public function __construct()
    {

        $this->options = get_option('cgptms_openai_setting');

    }

    /**
     * @param $mopenai_model
     * @param $request
     * @return array|mixed|void
     */
    static function mopenPromptTitles($mopenai_model, $request)
    {

        switch ( $mopenai_model ) {

            case 'text-davinci-003':
                $args = [
                    "Summarize and create 10 titles for articles return exact titles without points numbers in the beginning use user content and Wrap each titles special symbols as %% in start and end:",
                    $request['content']
                ];
                break;

            default:
                $args = [
                    [
                        "role" => "system",
                        "content" => "Summarize and create 10 titles for articles return exact titles without points numbers in the beginning use user content"
                    ],
                    [
                        "role" => "user",
                        "content" => $request['content']
                    ],
                    [
                        "role" => "system",
                        "content" => 'wrap each titles special symbols as %% in start and end'
                    ]
                ];
                break;

        }

        $args = apply_filters('mopen_ai_get_titles_prompt', $args);

        return $args;
    }

    static function mopenPromptExcerpts($mopenai_model, $request)
    {

        switch ( $mopenai_model ) {

            case 'text-davinci-003':
                $args = [
                    "Write 5 different relevant excerpts in 200 words from the following user content, convincing the reader to click the link and read the full article:wrap each excerpt special symbols as %% in start and end",
                    $request['content']
                ];
                break;

            default:
                $args = [
                    [
                        "role" => "system",
                        "content" => "Write 5 different relevant excerpts in 200 words from the following user content, convincing the reader to click the link and read the full article:wrap each excerpt special symbols as %% in start and end"
                    ],
                    [
                        "role" => "user",
                        "content" => $request['content']
                    ]
                ];
                break;

        }

        $args = apply_filters('mopen_ai_get_excerpts_prompt', $args);

        return $args;
    }
}