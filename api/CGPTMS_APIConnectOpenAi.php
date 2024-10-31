<?php

/**
 * Abstract CGPTMS_API Connect to OpenAi
 */

namespace CGPTMS_OpenAi\api;

use GuzzleHttp\Client;
use Symfony\Component\HttpClient\Psr18Client;
use Tectalic\OpenAi\Authentication;
use Tectalic\OpenAi\Manager;
use Tectalic\OpenAi\Models\ChatCompletions\CreateRequest;
use Tectalic\OpenAi\Models\Completions\CreateRequest as Davinci_003;
defined('ABSPATH') || exit();


/**
 * Class CGPTMS_APIConnectOpenAi
 * @package CGPTMS_OpenAi\api
 */
final class CGPTMS_APIConnectOpenAi
{
    protected $openaiClient;

    protected $options;
    protected $error;
    /**
     * Configuration Variable
     *
     * @var array

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->options = get_option('cgptms_openai_setting');
        $oai_key = isset($this->options['cgptms_openai_api_token']) ? $this->options['cgptms_openai_api_token'] : null;

        if (!$oai_key) {
            return;
        }

        $this->openaiClient = Manager::isGlobal() ? Manager::access() :  Manager::build(
            new Client(),
            new Authentication($oai_key)
        );
    }

    /**
     * @param $args
     * @return \Tectalic\OpenAi\Handlers\ChatCompletions|\Tectalic\OpenAi\Handlers\Completions
     */
    public function createRequest($args) {

        $this::errorRequestHelper($args);

        switch ( $this->options['cgptms_openai_model'] ) {
            case 'text-davinci-003':
                return $this->openaiClient->Completions()->create(
                    new Davinci_003([
                        'model' => 'text-davinci-003',
                        'prompt' => $args,
                        'max_tokens' => 1000,
                        'temperature' => 0.7,
                        ])
                );
                break;

            default:
                return $this->openaiClient->chatCompletions()->create(
                    new CreateRequest([
                        'model' => $this->options['cgptms_openai_model'],
                        'messages' => $args,
                        ])
                );
                break;
        }
    }

    /**
     * @param $args
     * @return false|string
     */
    public function sendRequest($args) {

        try {
            $response = $this->createRequest($args);

            if ($this::errorAPIHandler($response)) return $this::errorAPIHandler($response);

            return $this::parseResponse($this->options['cgptms_openai_model'], $response);

        } catch (\Exception $e) {
            error_log('Can\'t create request', $e);
        }
    }

    /**
     * @param $args
     * @return false|string
     */
    private static function errorAPIHandler($args) {

        if (is_array($args) && isset($args['error'])) {
            return json_encode($args, false);
        }

        if ($args && isset($args->toArray()['error'])) {
            return json_encode($args->toArray(), false);
        }
    }

    /**
     * @param $args
     * @return array
     */
    private static function errorRequestHelper($args) {
        if (empty($args[1]['content'])) {
            return [ 'error' => ['message' => __('No content to generate', 'openai-content-assistant-via-chatgpt-markupus')] ];
        }
    }

    /**
     * @param $mopenai_model
     * @param $response
     * @return false|string
     */
    private static function parseResponse($mopenai_model, $response)
    {
        if ($mopenai_model == 'text-davinci-003') {
            preg_match_all('/%%(.*?)%%/', $response->toModel()->choices[0]->text, $matches);
        } else {
            preg_match_all('/%%(.*?)%%/', $response->toModel()->choices[0]->message->content, $matches);
        }

        return json_encode($matches[1], false);
    }
}