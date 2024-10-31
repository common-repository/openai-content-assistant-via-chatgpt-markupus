import { useEffect } from '@wordpress/element'
import { select} from '@wordpress/data';
import CGPTMS_OpenAISidebar from "./CGPTMS_OpenAISidebar";

const CGPTMS_OpenAiRegisterPlugin = () => {
    const { registerPlugin } = wp.plugins;
    const { getEditedPostAttribute } = select('core/editor');

    useEffect(() => {
        if (getEditedPostAttribute('type') === 'post') {
            registerPlugin('mopen-plugin-sidebar', {
                render: CGPTMS_OpenAISidebar,
            });
        }
    }, [getEditedPostAttribute('type')]);

    return null;
};

wp.domReady(() => {
    wp.plugins.registerPlugin('mopen-plugin', { render: CGPTMS_OpenAiRegisterPlugin });
});