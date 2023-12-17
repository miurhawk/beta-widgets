/*
 this function will load our style sheet when needed
 */

function __rgpModalAddCS() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#rgp00-embedded-modal {    display: none;    position: fixed;    z-index: 1243343;    left: 0;    top: 0;    width: 100%; /* Full width */    height: 100%; /* Full height */    overflow: auto; /* Enable scroll if needed */    background-color: rgb(0,0,0); /* Fallback color */    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */    }#rgp00-embedded-modal-content {    background-color: #fff;    padding: 0;    z-index: 1243344;    border: 0;    width: 80%; /* Could be more or less, depending on screen size */    height: 80%;    max-width:800px;    max-height: 600px;    position: absolute;    top: 50%;    left: 50%;    transform: translate(-50%, -50%);    -webkit-transform: translate(-50%, -50%);    border-radius: 10px;}#rgp00-close-button {    position: absolute;    top: -16px;    right: -16px;    width:32px;    height:32px;    background-image: url("https://app.rockgympro.com/portal/img/icon_close.png");    background-color:white;    cursor: pointer !important;     border-radius: 18px;}#rgp00-embedded-modal-frame {    display:none;    border-radius: 10px;    width:100%;    height:100%;    overflow:auto;}';
    document.getElementsByTagName('head')[0].appendChild(style)
}

var __rgpModalCloseCallbackFunc = null;
var __rgpModalCallbackFuncTargetWindow = null;
var __rgpModalContainerElement = null;
var __rgpModalNewWindowPollingTimeoutHandle = null;

function __rgpModalCloseCallbackWrapper() {
    if (__rgpModalCloseCallbackFunc) {
        __rgpModalCloseCallbackFunc();
        __rgpModalCloseCallbackFunc = null;
    }
}

/*
 this is the function that displays the modal window
 If called within an iframe, it will post a message to the parent to open the window (cross domain communication requirement)
 If called within a standalone window or via the received mesage, it will just display the modal div

 */

function RGPModalJSOpenWindow(iframesrc, onCloseCallbackFunction) {


    // save the javascript to execute on close in a global variable
    __rgpModalCloseCallbackFunc = onCloseCallbackFunction;

    // mobile browser?  launch new window and then poll to see when it gets closed
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/BlackBerry/i)
    ) {
        var popup = window.open(iframesrc); // new window

        // and poll to see when it closes - and when it does run the javascript
        __rgpModalNewWindowPollingTimeoutHandle = window.setInterval(function () {
            if (popup.closed) {
                window.clearInterval(__rgpModalNewWindowPollingTimeoutHandle);
                __rgpModalCloseCallbackWrapper();
            }
        }, 500);
        return;
    }

    // running in an iframe? post message to parent and let parent call this function itself
    var is_in_iframe = window.location !== window.parent.location;
    if (is_in_iframe) {
        // post the message to the parente, which will callback this function
        parent.postMessage("rgpmessage-modal-open," + encodeURIComponent(iframesrc), "*");
        return;
    }

    //
    // if we get here we are either 1) on the parent or 2) launching within a standalone window
    //


    // add CSS to DOM
    __rgpModalAddCS();

    // display modal popup
    __rgpModalContainerElement = document.createElement("div");
    document.body.appendChild(__rgpModalContainerElement);
    __rgpModalContainerElement.id = "__rgpModalContainerElement";
    __rgpModalContainerElement.innerHTML =
        '<div id="rgp00-embedded-modal">' +
        '<div id="rgp00-embedded-modal-content" >' +
        '<div id="rgp00-close-button"></div>' +
        '<iframe id="rgp00-embedded-modal-frame" src="' + iframesrc + '" frameborder="0" allowfullscreen></iframe>' +
        '</div>' +
        '</div>';

    var element = document.getElementById('rgp00-embedded-modal');
    element.style.display = "block";
    document.getElementById('rgp00-embedded-modal-frame').style.display = 'block';

    var close = document.getElementById('rgp00-close-button');
    close.addEventListener('click',function() {
        window.postMessage("rgpmessage-modal-close" , "*");
    });
}

function __rgpModalOpenPopupAfterScriptLoad(url,callbackFuncTargetWindow) {
    __rgpModalCallbackFuncTargetWindow = callbackFuncTargetWindow // save the window that launched us
    RGPModalJSOpenWindow(url, null)

}
/*
 here is our message listener
 */


function __rgpModalAttachListener() {


    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, function (e) {
        try {
            if (typeof e.data === 'string') {
                var parts = e.data.split(",");

                //
                // this message come from the iframe and will open the window on the parent
                //

                if (parts[0] == 'rgpmessage-modal-open') {
                    iframeurl = decodeURIComponent(parts[1]);
                    __rgpModalCallbackFuncTargetWindow = e.source // save the window that launched us
                    RGPModalJSOpenWindow(iframeurl, null)
                }

                //
                // this message comes to the parent when the sub-window is closed
                //
                if (parts[0] == 'rgpmessage-modal-close') {
                    document.body.removeChild(__rgpModalContainerElement);
                    setTimeout(function () {
                        // try calling the callback here
                        __rgpModalCloseCallbackWrapper();

                        // and try calling the callback via a message back to the original window
                        if (__rgpModalCallbackFuncTargetWindow) {
                            __rgpModalCallbackFuncTargetWindow.postMessage('rgpmessage-modal-call-callback','*');
                        }
                    }, 100);
                }

                //
                // sent from the parent when the sub-window has closed and we need to call the callback
                //
                if (parts[0] == 'rgpmessage-modal-call-callback') {
                    __rgpModalCloseCallbackWrapper();
                }

            }
        }// end try within eventer
        catch (err) {

        }
    }, false); // end eventer
}

/*
 attach our listener, either immediately if the DOM is already loaded, or when the DOM is loaded
 */

try {
    var domState = document.readyState;
    if (domState === 'interactive' || domState === 'complete') {
        __rgpModalAttachListener(); // dom already loaded? attach things
    } else {
        document.addEventListener("DOMContentLoaded", function (event) { // attach it once the dom is loaded
            __rgpModalAttachListener(); // otherwise do it on a callback
        });
    }
} catch (err) {

}


