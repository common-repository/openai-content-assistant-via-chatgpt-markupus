import List from "./List";
import {useState} from "@wordpress/element";
import {TabPanel} from '@wordpress/components';

const HistoryList = (props) => {
    const {dispatchTitle, dispatchExcerpts } = props;
    const posts = JSON.parse(localStorage.getItem('mopenai_response_get-titles'));
    const excerpts = JSON.parse(localStorage.getItem('mopenai_response_get-excerpts'));
    const [selectedTab, setSelectedTab] = useState('history-title');
    return (
        <>
            <TabPanel
                className="history-tab-panel"
                activeClass="active-tab"
                onSelect={ setSelectedTab }
                tabs={ [
                    {
                        name: 'history-titles',
                        title: 'History titles',
                        className: 'history-tab-one',
                    },
                    {
                        name: 'history-excerpts',
                        title: 'History excerpts',
                        className: 'history-tab-two',
                    }
            ] }>
                { ( tab ) => (
                    <>
                    { tab.name === 'history-titles' &&
                        <List
                            posts={posts}
                            dispatchTitle={dispatchTitle}
                            dispatchExcerpts={dispatchExcerpts}/>
                    }
                    { tab.name === 'history-excerpts' &&
                        <List
                            excerpts={excerpts}
                            dispatchTitle={dispatchTitle}
                            dispatchExcerpts={dispatchExcerpts}/>
                    }
                </>
                )}
            </TabPanel>
        </>
    )
};
export default HistoryList;
