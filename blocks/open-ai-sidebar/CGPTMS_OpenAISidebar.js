import {createContext} from 'react';
import { useState, useEffect } from '@wordpress/element'
import {Notice, Button, Modal, Spinner, TabPanel} from '@wordpress/components';
import { select, dispatch} from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import List from "./components/List";
import fetchRequest from "./utils";
import HistoryList from "./components/HistroyList";

const CGPTMS_OpenAISidebar = () => {
    const [ isOpen, setOpen ] = useState( false );
    const [ notice, setNotice ] = useState( {message:''} );
    const [ posts, setPosts ] = useState( [] );
    const [ excerpts, setExcerpts ] = useState( [] );
    const [ isLoader, setLoader ] = useState( false );
    const [ modalHeader, setModalHeader ] = useState( '' );
    const [ errors, setErrors ] = useState( '' );
    const [selectedTab, setSelectedTab] = useState('request');

    const closeModal = () => {
        setErrors('');
        setNotice({});
        setOpen( false );
    };


    const dispatchTitle = (title) => {
        if (title) {
            const postId = select('core/editor').getCurrentPostId();
            dispatch('core/editor').editPost({title: title, id: postId})
            setNotice({message: 'Title updated', status:'success'});
            const titleBlock = select('core/block-editor').getBlocks().find(block => block.name === 'core/post-title');
            if (titleBlock) {
                // Update the title attribute
                dispatch('core/block-editor').updateBlockAttributes(titleBlock.clientId, {title: title});
                dispatch('core/editor').editPost({title: title});
                console.log('Title updated', title);
            } else {
                console.log('No title block found.');
            }
        } else {
            setNotice({message: 'Title is empty or null.'});
            console.log('Title is empty or null.');
        }
        setOpen( false );
    };
    const dispatchExcerpts = (excerpt) => {
        if (excerpt) {
            const postId = select('core/editor').getCurrentPostId();
            dispatch('core/editor').editPost({excerpt: excerpt, id: postId})
            setNotice({message: 'Excerpt updated', status:'success'});
        }
        setOpen( false );
    };

    const getResponse = (param) => {
        setPosts([]);
        setErrors('');
        setExcerpts([]);
        let content = select( 'core/block-editor' ).getBlocks().filter( (i) => i.name === 'core/paragraph' || i.name === 'core/heading' );
        let temp = '';
        content.map((item) => {
            temp += item.attributes.content
        });
        const queryParams = { content: temp };
        if (!temp.length) {
            setNotice({message: 'You should have at least 1 paragraph to proceed!'});
            return;
        }
        if (param === 'get-excerpts') {
            setModalHeader('Most Relevant Excerpts')
        }
        if (param === 'get-titles') {
            setModalHeader('Most Relevant Headings')
        }
        setOpen( true );
        setLoader( true );
        setNotice(false);
        fetchRequest(param, queryParams).then( ( response ) => {
            let json_response = JSON.parse(response);
            if (json_response['error'] && json_response['error']['message'])  throw new Error(json_response['error']['message']);
            param === "get-titles" ? setPosts(json_response) : setExcerpts(json_response);
            localStorage.setItem(`mopenai_response_${param}`, JSON.stringify(json_response));
            setLoader(false)
        })
        .catch(error => {
            setNotice({message: error.message});
            setOpen( false );
            setLoader( false );
        });
    };

    return (
        <>
        <PluginSidebarMoreMenuItem target="mopenai-settings-sidebar"> Open AI </PluginSidebarMoreMenuItem>
        <PluginSidebar name="mopenai-settings-sidebar" title="Open Ai" icon="admin-settings">
            <div class="mopen-ai__body">
                <TabPanel className="my-tab-panel" activeClass="active-tab" onSelect={ setSelectedTab }
                    tabs={ [
                    {
                        name: 'request',
                        title: 'Request',
                        className: 'tab-one',
                    },
                    {
                        name: 'history',
                        title: 'History',
                        className: 'tab-two',
                    }
                ] }
                >
                    { ( tab ) => (
                        <>
                            {tab.name === 'request' &&
                                <div class="mopen-ai__buton-group" initialOpen={selectedTab === 'request'}>
                                    <Button isSecondary onClick={() => getResponse('get-titles')}>Create titles</Button>
                                    <Button isPrimary onClick={() => getResponse('get-excerpts')}>Create excerpt</Button>
                                </div>
                            }
                            {tab.name === 'history' &&
                                <HistoryList dispatchTitle={dispatchTitle} dispatchExcerpts={dispatchExcerpts} />
                            }
                        </>
                    )}
                </TabPanel>
            </div>
            { notice.message && (
                <Notice
                    status={notice.status ?? 'error'}
                    isDismissible={true}
                    onRemove={() => setNotice(false)}>
                    <p>{notice.message}</p>
                </Notice>
            )}
            { isOpen && (
                <Modal title={modalHeader} onRequestClose={ closeModal }>
                    <div class="components-modal__body">
                    { isLoader && (
                        <div class="components-modal__loader">
                            <Spinner />
                        </div>
                    )}
                    { errors && (
                        <div class='components-modal__item'>{errors}</div>
                    )}
                    <List
                        posts={posts}
                        excerpts={excerpts}
                        dispatchTitle={dispatchTitle}
                        dispatchExcerpts={dispatchExcerpts}
                        />
                    </div>
                </Modal>
            )}
        </PluginSidebar>
    </>
);
};
export default CGPTMS_OpenAISidebar