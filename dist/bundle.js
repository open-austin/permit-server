/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! ../less/main.less */ 1);
	
	var $question = $('#question');
	var $answers = $('#answers');
	var $back = $('#back');
	var $caption = $('#caption');
	var $permit = $('#permit');
	var $progressBar = $('#progress');
	
	var current;
	var checklist = [];
	var actions = [];
	
	function setProgressState(id) {
	  var circle = $progressBar.find("#progress-" + id);
	  var label = circle.find("span.label");
	  var title = circle.find(".title");
	  function setLabel(text, circleId) {
	    if (circleId) {
	      this.circle = $progressBar.find("#progress-" + circleId);
	      this.circle.find("span.label").html(text);
	    } else {
	      label.html(text);
	    }
	  }
	  function setCircleState(state, circleId) {
	    if (circleId) {
	      this.circle = $progressBar.find("#progress-" + circleId);
	      this.circle.removeClass("done");
	      this.circle.removeClass("active");
	      this.circle.addClass(state);
	    } else {
	      circle.removeClass("done");
	      circle.removeClass("active");
	      circle.addClass(state);
	    }
	  }
	  if (id == 1) {
	    setCircleState("active");
	  }
	  if (id === 2) {
	    setCircleState("active");
	    setCircleState("done", 1);
	    setLabel("&#10003;", 1);
	  }
	  if (id === 3) {
	    setCircleState("active");
	    setCircleState("done", 2);
	    setLabel("&#10003;", 2);
	  }
	  if (id === 4) {
	    setCircleState("active");
	    setCircleState("done", 3);
	    setLabel("&#10003;", 3);
	  }
	}
	
	function renderPermit() {
	  // Reset
	  $question.html('');
	  $caption.html('');
	  $answers.html('');
	  $back.html('');
	  setProgressState(4);
	
	  $.get('/permits/' + current.permitId).then(function (permit) {
	    var markup = '<div class="inner-container"><h3>' + permit.title + '</h3>';
	    markup += '<p>' + permit.description + '</p>';
	    markup += '<h3>Take care of the below items before submitting application:</h3>';
	    markup += checklist.map(function (prereq) {
	      return '<p><label><input type="checkbox"></input>' + prereq + '<label></p>';
	    }).join('');
	    markup += '<h3>Next steps:</h3>';
	    markup += '<p><a target="_blank" href="' + permit.pdf + '"><button class="button full-width">Download your Express Application</button></a></p></div>';
	    markup += '<br><h5>Email or Visit the permit center in person</h5>';
	    markup += '<p><a target="_blank" href="mailto:pdrdexpresspermits@austintexas.gov"><button class="button width-40">Email your application</button></a> or <a target="_blank" href="http://i.imgur.com/in5fkg1.png"><button class="button width-40">Visit the Permit Center</button></a></p></div>';
	    markup += '<br><h5>After receiving a confirmation email (which may take 3-5 business days), you may pay for your permit online (instructions will be in confirmation email).</h5></div>';
	    $permit.html(markup);
	  });
	}
	
	function renderAnswer(text) {
	  var $answer = $('<button class="wizard-button">' + text + '</button>');
	  $answer.click(function () {
	    var id = current.answers[text].next;
	    current.selected = text;
	    actions.push(current);
	
	    if (current.answers[text].checklist) {
	      checklist.push(current.answers[text].checklist);
	    }
	
	    getQuestion(id);
	  });
	  return $answer;
	}
	
	function render(data) {
	  // Set current data
	  current = data;
	
	  // TODO Check if there is a permid id to lookup
	  if (current.permitId) {
	    renderPermit();
	    return;
	  }
	
	  // Progress bar
	  if (actions.length < 1) {
	    setProgressState(1);
	  }
	  if (current.permitFound) {
	    setProgressState(3);
	  }
	  if (actions.length === 1) {
	    setProgressState(2);
	  }
	
	  // Question
	  $question.html('<h3>' + current.text + '</h3>');
	
	  // Caption
	  if (current.caption) $caption.html(current.caption);else $caption.html('');
	
	  // Answers
	  var answers = Object.keys(current.answers).map(renderAnswer);
	  if (answers.length) $answers.html(answers);else $answers.html('');
	
	  // Back Button
	  if (actions.length) {
	    var $backBtn = $('<button class="back-button">Back</button>');
	    $backBtn.click(function () {
	      var previous = actions.pop();
	
	      var checklistIdx = checklist.indexOf(previous.checklist);
	      if (checklistIdx >= 0) {
	        checklist.splice(checklistIdx, 1);
	      }
	
	      render(previous);
	    });
	    $back.html($backBtn);
	  } else {
	    $back.html('');
	  }
	}
	
	function renderFailure() {
	  $question.html('<h3>We\'re sorry, this type of permit is not available yet.<br/>Please call 512-978-4000 or visit <a href="http://www.austintexas.gov/department/development-services">Development Services</a></h3>');
	  $answers.html('');
	  $caption.html('');
	}
	
	function getQuestion(id) {
	  $.get('/questions/' + id).then(function (data) {
	    render(data);
	  }).fail(function () {
	    renderFailure();
	  });
	}
	
	function diagnose() {
	  console.log('Actions', actions);
	  console.log('Checklist', checklist);
	}
	
	getQuestion(1);

/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./public/less/main.less ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/less-loader!./main.less */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/*!**************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./public/less/main.less ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "*,\n*:before,\n*:after {\n  box-sizing: border-box;\n}\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\na {\n  text-decoration: none;\n}\nbody {\n  font-family: 'Arial';\n  font-weight: 400;\n  font-size: 17px;\n  line-height: 1.5em;\n  display: flex;\n  min-height: 100vh;\n  flex-direction: column;\n  color: #444;\n}\n.site-content {\n  flex: 1;\n}\n.container {\n  margin: 0 auto;\n  max-width: 900px;\n}\nnav {\n  background-color: #fff;\n  padding: 20px 0;\n}\nnav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: inline-block;\n  float: right;\n  padding-top: 15px;\n}\nnav ul a {\n  text-decoration: none;\n  color: #a1561f;\n  border-bottom: 1px dotted #a1561f;\n}\nnav ul a:hover {\n  color: #7b522c;\n}\n.logo {\n  background-image: url(" + __webpack_require__(/*! ../img/logo.png */ 4) + ");\n  background-repeat: no-repeat;\n  height: 50px;\n  width: 200px;\n  display: inline-block;\n}\nh1 {\n  font-family: 'Arial';\n  font-weight: 700;\n  font-size: 40px;\n  line-height: 1.3em;\n}\nh2 {\n  font-family: 'Arial';\n  font-weight: 700;\n  font-size: 52px;\n  line-height: 1.3em;\n}\nh3 {\n  font-family: 'Arial';\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 1.3em;\n}\nh5 {\n  font-family: 'Arial';\n  font-weight: 700;\n  font-size: 15px;\n  line-height: 1.3em;\n}\n.jumbotron {\n  /*height: 250px;*/\n  background-image: url(" + __webpack_require__(/*! ../img/shutterstock_389596906_op_overlay.png */ 5) + ");\n  text-shadow: 1px 1px 3px #444;\n  color: #ffffff;\n  margin-bottom: 30px;\n  text-align: center;\n  background-size: cover;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.jumbotron-content {\n  width: 900px;\n  margin-bottom: 30px;\n}\n.permit-splash {\n  padding-bottom: 25px;\n  background-color: #f7f7f7;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.permit-splash h3 {\n  text-transform: capitalize;\n}\n.permit-splash .permit-button {\n  height: 50px;\n  background-color: #366D88;\n  margin: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  text-decoration: none !important;\n  border-bottom: 5px solid #29586f;\n  text-transform: capitalize;\n}\n.permit-splash .permit-button:hover {\n  background-color: #29586f;\n}\n.permit-splash .permit-button a ul {\n  text-decoration: none;\n}\n/* Bottom section */\n.QuickLink {\n  text-align: center;\n  margin: 0 auto;\n  margin-bottom: 75px;\n  max-width: 950px;\n  min-width: 350px;\n}\n.QuickLink div {\n  display: inline-block;\n  width: 250px;\n  margin-top: 10px;\n  vertical-align: top;\n  margin-right: 50px;\n  color: #444;\n}\n.icon svg {\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n  height: 100px;\n  width: 150px;\n  margin-top: 75px !important;\n}\n.app {\n  fill: #669940;\n}\n.icon.app:hover {\n  fill: #5d7f40;\n}\n.status {\n  fill: #13436b;\n}\n.status:hover {\n  fill: #153347;\n}\n.pay {\n  fill: #636c76;\n}\n.pay:hover {\n  fill: #454a4f;\n}\n.faq {\n  fill: #a6592c;\n}\n.faq:hover {\n  fill: #7f482d;\n}\n.building {\n  fill: #664c2d;\n}\n.building:hover {\n  fill: #473829;\n}\n/* Form Progress */\n.progress {\n  margin: 20px auto;\n  text-align: center;\n}\n.progress .circle,\n.progress .bar {\n  display: inline-block;\n  background: #fff;\n  width: 40px;\n  height: 40px;\n  border-radius: 40px;\n  border: 1px solid #d5d5da;\n}\n.progress .bar {\n  position: relative;\n  width: 80px;\n  height: 6px;\n  top: -33px;\n  margin-left: -5px;\n  margin-right: -5px;\n  border-left: none;\n  border-right: none;\n  border-radius: 0;\n}\n.progress .circle .label {\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  line-height: 32px;\n  border-radius: 32px;\n  margin-top: 3px;\n  color: #b5b5ba;\n  font-size: 17px;\n}\n.progress .circle .title {\n  color: #b5b5ba;\n  font-size: 13px;\n  line-height: 30px;\n  margin-left: -15px;\n  text-align: center;\n}\n/* Done / Active */\n.progress .bar.done,\n.progress .circle.done {\n  background: #eee;\n}\n.progress .bar.active {\n  background: linear-gradient(to right, #EEE 40%, #FFF 60%);\n}\n.progress .circle .label {\n  margin-top: 4px;\n}\n.progress .circle.done .label {\n  color: #FFF;\n  background: #8bc435;\n  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);\n}\n.progress .circle.done .title {\n  color: #444;\n}\n.progress .circle.active .label {\n  color: #FFF;\n  background: #0c95be;\n  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);\n}\n.progress .circle.active .title {\n  color: #0c95be;\n}\n.footer {\n  margin-top: 4em;\n  width: 100%;\n  text-align: center;\n  background-color: #366D88;\n  color: white;\n}\n.footer a {\n  color: white;\n  border-bottom: 1px dotted white;\n}\n.contact {\n  display: inline-block;\n  vertical-align: top;\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n.contact > ul {\n  list-style: none;\n  text-align: left;\n  padding: 0;\n}\n.contact > ul li a {\n  text-decoration: none;\n}\n/* Wizard page styling here */\n.wizard-button,\n.button {\n  height: 50px;\n  width: 175px;\n  background-color: #366D88;\n  margin-top: 50px;\n  border: 1px solid grey;\n  border-bottom: 5px solid #29586f;\n  font-size: 18px;\n  color: white;\n  cursor: pointer;\n}\n.wizard-button + .wizard-button,\n.button + .button {\n  margin-left: 25px;\n}\n.wizard-button:hover,\n.button:hover {\n  background-color: #29586f;\n}\n.full-width {\n  width: 100%;\n}\n.width-40 {\n  width: 40%;\n}\n.back-button {\n  width: 100px;\n  height: 50px;\n  margin-top: 75px;\n  background-color: white;\n  border: 1px solid grey;\n  border-bottom: 3px solid grey;\n  cursor: pointer;\n  font-size: 17px;\n  color: grey;\n}\n.back-button:hover {\n  border-bottom: 1px solid grey;\n  color: grey;\n}\n.centered {\n  text-align: center;\n}\n#question {\n  margin-top: 75px;\n}\n.inner-container {\n  max-width: 600px;\n  text-align: left;\n  margin: 0 auto;\n}\n.horizontal-spaced {\n  display: flex;\n  justify-content: space-between;\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/*!*****************************!*\
  !*** ./public/img/logo.png ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e76fc922ffe07a3a67d8b0598fbf329c.png";

/***/ },
/* 5 */
/*!**********************************************************!*\
  !*** ./public/img/shutterstock_389596906_op_overlay.png ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "00c50be7d034ad415e3cb28b825e18f4.png";

/***/ },
/* 6 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map