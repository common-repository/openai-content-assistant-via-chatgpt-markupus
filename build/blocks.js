/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks/open-ai-sidebar/CGPTMS_OpenAISidebar.js":
/*!********************************************************!*\
  !*** ./blocks/open-ai-sidebar/CGPTMS_OpenAISidebar.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_List__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/List */ "./blocks/open-ai-sidebar/components/List.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./blocks/open-ai-sidebar/utils/index.js");
/* harmony import */ var _components_HistroyList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/HistroyList */ "./blocks/open-ai-sidebar/components/HistroyList.js");











const CGPTMS_OpenAISidebar = () => {
  var _notice$status;
  const [isOpen, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    message: ''
  });
  const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [excerpts, setExcerpts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isLoader, setLoader] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [modalHeader, setModalHeader] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [errors, setErrors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [selectedTab, setSelectedTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('request');
  const closeModal = () => {
    setErrors('');
    setNotice({});
    setOpen(false);
  };
  const dispatchTitle = title => {
    if (title) {
      const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/editor').getCurrentPostId();
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/editor').editPost({
        title: title,
        id: postId
      });
      setNotice({
        message: 'Title updated',
        status: 'success'
      });
      const titleBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor').getBlocks().find(block => block.name === 'core/post-title');
      if (titleBlock) {
        // Update the title attribute
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').updateBlockAttributes(titleBlock.clientId, {
          title: title
        });
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/editor').editPost({
          title: title
        });
        console.log('Title updated', title);
      } else {
        console.log('No title block found.');
      }
    } else {
      setNotice({
        message: 'Title is empty or null.'
      });
      console.log('Title is empty or null.');
    }
    setOpen(false);
  };
  const dispatchExcerpts = excerpt => {
    if (excerpt) {
      const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/editor').getCurrentPostId();
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/editor').editPost({
        excerpt: excerpt,
        id: postId
      });
      setNotice({
        message: 'Excerpt updated',
        status: 'success'
      });
    }
    setOpen(false);
  };
  const getResponse = param => {
    setPosts([]);
    setErrors('');
    setExcerpts([]);
    let content = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor').getBlocks().filter(i => i.name === 'core/paragraph' || i.name === 'core/heading');
    let temp = '';
    content.map(item => {
      temp += item.attributes.content;
    });
    const queryParams = {
      content: temp
    };
    if (!temp.length) {
      setNotice({
        message: 'You should have at least 1 paragraph to proceed!'
      });
      return;
    }
    if (param === 'get-excerpts') {
      setModalHeader('Most Relevant Excerpts');
    }
    if (param === 'get-titles') {
      setModalHeader('Most Relevant Headings');
    }
    setOpen(true);
    setLoader(true);
    setNotice(false);
    (0,_utils__WEBPACK_IMPORTED_MODULE_8__["default"])(param, queryParams).then(response => {
      let json_response = JSON.parse(response);
      if (json_response['error'] && json_response['error']['message']) throw new Error(json_response['error']['message']);
      param === "get-titles" ? setPosts(json_response) : setExcerpts(json_response);
      localStorage.setItem(`mopenai_response_${param}`, JSON.stringify(json_response));
      setLoader(false);
    }).catch(error => {
      setNotice({
        message: error.message
      });
      setOpen(false);
      setLoader(false);
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__.PluginSidebarMoreMenuItem, {
    target: "mopenai-settings-sidebar"
  }, " Open AI "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__.PluginSidebar, {
    name: "mopenai-settings-sidebar",
    title: "Open Ai",
    icon: "admin-settings"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "mopen-ai__body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
    className: "my-tab-panel",
    activeClass: "active-tab",
    onSelect: setSelectedTab,
    tabs: [{
      name: 'request',
      title: 'Request',
      className: 'tab-one'
    }, {
      name: 'history',
      title: 'History',
      className: 'tab-two'
    }]
  }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, tab.name === 'request' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "mopen-ai__buton-group",
    initialOpen: selectedTab === 'request'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isSecondary: true,
    onClick: () => getResponse('get-titles')
  }, "Create titles"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isPrimary: true,
    onClick: () => getResponse('get-excerpts')
  }, "Create excerpt")), tab.name === 'history' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_HistroyList__WEBPACK_IMPORTED_MODULE_9__["default"], {
    dispatchTitle: dispatchTitle,
    dispatchExcerpts: dispatchExcerpts
  })))), notice.message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: (_notice$status = notice.status) !== null && _notice$status !== void 0 ? _notice$status : 'error',
    isDismissible: true,
    onRemove: () => setNotice(false)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, notice.message)), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: modalHeader,
    onRequestClose: closeModal
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "components-modal__body"
  }, isLoader && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "components-modal__loader"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null)), errors && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "components-modal__item"
  }, errors), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_List__WEBPACK_IMPORTED_MODULE_7__["default"], {
    posts: posts,
    excerpts: excerpts,
    dispatchTitle: dispatchTitle,
    dispatchExcerpts: dispatchExcerpts
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CGPTMS_OpenAISidebar);

/***/ }),

/***/ "./blocks/open-ai-sidebar/components/HistroyList.js":
/*!**********************************************************!*\
  !*** ./blocks/open-ai-sidebar/components/HistroyList.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List */ "./blocks/open-ai-sidebar/components/List.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




const HistoryList = props => {
  const {
    dispatchTitle,
    dispatchExcerpts
  } = props;
  const posts = JSON.parse(localStorage.getItem('mopenai_response_get-titles'));
  const excerpts = JSON.parse(localStorage.getItem('mopenai_response_get-excerpts'));
  const [selectedTab, setSelectedTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('history-title');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
    className: "history-tab-panel",
    activeClass: "active-tab",
    onSelect: setSelectedTab,
    tabs: [{
      name: 'history-titles',
      title: 'History titles',
      className: 'history-tab-one'
    }, {
      name: 'history-excerpts',
      title: 'History excerpts',
      className: 'history-tab-two'
    }]
  }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, tab.name === 'history-titles' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_List__WEBPACK_IMPORTED_MODULE_1__["default"], {
    posts: posts,
    dispatchTitle: dispatchTitle,
    dispatchExcerpts: dispatchExcerpts
  }), tab.name === 'history-excerpts' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_List__WEBPACK_IMPORTED_MODULE_1__["default"], {
    excerpts: excerpts,
    dispatchTitle: dispatchTitle,
    dispatchExcerpts: dispatchExcerpts
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HistoryList);

/***/ }),

/***/ "./blocks/open-ai-sidebar/components/List.js":
/*!***************************************************!*\
  !*** ./blocks/open-ai-sidebar/components/List.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const List = props => {
  const {
    posts,
    excerpts,
    dispatchTitle,
    dispatchExcerpts
  } = props;
  if (Array.isArray(posts) || Array.isArray(excerpts)) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, posts && posts.map((item, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        class: "components__item",
        onClick: () => dispatchTitle(item)
      }, `${i + 1}) ${item}`);
    }), excerpts && excerpts.map((item, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        class: "components__item",
        onClick: () => dispatchExcerpts(item)
      }, `${i + 1}) ${item}`);
    }));
  } else {
    return '';
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./blocks/open-ai-sidebar/utils/index.js":
/*!***********************************************!*\
  !*** ./blocks/open-ai-sidebar/utils/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);


const fetchRequest = (param, queryParams) => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(`/mopen_ai/v1/${param}`, queryParams)
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchRequest);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["url"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./blocks/open-ai-sidebar/index.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CGPTMS_OpenAISidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CGPTMS_OpenAISidebar */ "./blocks/open-ai-sidebar/CGPTMS_OpenAISidebar.js");



const CGPTMS_OpenAiRegisterPlugin = () => {
  const {
    registerPlugin
  } = wp.plugins;
  const {
    getEditedPostAttribute
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (getEditedPostAttribute('type') === 'post') {
      registerPlugin('mopen-plugin-sidebar', {
        render: _CGPTMS_OpenAISidebar__WEBPACK_IMPORTED_MODULE_2__["default"]
      });
    }
  }, [getEditedPostAttribute('type')]);
  return null;
};
wp.domReady(() => {
  wp.plugins.registerPlugin('mopen-plugin', {
    render: CGPTMS_OpenAiRegisterPlugin
  });
});
})();

/******/ })()
;
//# sourceMappingURL=blocks.js.map