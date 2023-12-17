

// third party cookies within iframe on safari - redirect fix
try {
    var cookiename='betasafariiframefix';
    var cookievalue='TRUST';
    var isSafariOnMac =
        navigator.userAgent.indexOf('Safari') != -1 && // SAFARI = yes
        navigator.userAgent.indexOf('Macintosh') != -1 && // MACINTOSH = yes
        navigator.userAgent.indexOf('Chrome') == -1 && // CHROME = NO
        navigator.userAgent.indexOf('Mobile') == -1 && // MOBILE = NO (since it opens a new tab)
        navigator.userAgent.indexOf('Windows ') == -1; // WINDOWS = NO (note extra space)
    if (isSafariOnMac) {
        var alreadyfixed = document.cookie.indexOf(cookiename+"="+cookievalue)>-1;
        // make sure cookies exist
        document.cookie="betatestcookie"
        cookiesEnabled=(document.cookie.indexOf("betatestcookie")!=-1)? true : false;
        if (navigator.cookieEnabled && cookiesEnabled && !alreadyfixed) { 
            var d = new Date();
            d.setTime(d.getTime() + (24*60*60*365));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cookiename + "=" + cookievalue + ";" + expires + ";path=/";
            firstscript = document.getElementsByTagName('script')[0];
            fixscriptjs = document.createElement('script');
            fixscriptjs.src = 'https://app.rockgympro.com/js/iframecookiefix.js.php?referrer=' + encodeURIComponent(window.location.toString());
            firstscript.parentNode.insertBefore(fixscriptjs, firstscript);
        }
    }
} catch (err)
{
}


var __betaModalAlreadyLoaded = false;

function __isIE9OrLess() {
    try {
        if (document.addEventListener  ) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return true
    }
}

function __isOKToRedirect() {
    try {
       tag = document.getElementById("beta_never_redirect_script_id")
        if (tag) {
            return false;
        }
    }
    catch (err) {
    }
    return true;
}

function __isMobileDevice() {
    // no mobile mode for now
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    ) {
        return true;
    }
    return false;
}

function __isSmallScreen() {


    try {
        var width = window.innerWidth;
        if (width<=700) {
            return true;
        }
    } catch (err) {
        return false;
    }
    return false;
}

function __redirectToMobile() {
    let params = new URL(document.location).searchParams;
    let widgetURL = params.get("BETAWidgetURL");
    // let age = parseInt(params.get("age")); // is the number 18
    window.location=widgetURL;
}

function __makebutton() {
    
    let params = new URL(document.location).searchParams;
    let widgetURL = params.get("BETAWidgetURL");
document.write("<a href='"+widgetURL+"'style='-webkit-border-radius: 10;-moz-border-radius: 10;border-radius: 10px;color: #ffffff;background-color: blue;font-size: 25px;padding: 10px 20px 10px 20px;text-decoration: none;display:inline-block;margin:20px;'target='_blank'>Book Here</a>");
}


function __iframebetaiframe657f4cb99ede4yoffset() {
    var curleft=0;
    var curtop=0;
    var obj = document.getElementById('betaiframe657f4cb99ede4');
    do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return curtop;
}

function __makebetaiframebetaiframe657f4cb99ede4() {
    
    let params = new URL(document.location).searchParams;
    let widgetURL = params.get("BETAWidgetURL");
    if (!widgetURL) {
        return;
    }
    try {
        if (document.getElementById("beta-iframe-spinner")) {
            document.write("<div><br/><b><em>Error: Only one embedded booking widget is allowed per page.</em></b><br/></div>");
            return;
        }
        document.write("<div>");
        // document.write("<div id='beta-iframe-spinner' style='display:block; position: absolute; '><img src='http://www.makeitmove.co.uk/'/></div>");
        document.write("<iframe id='betaiframe657f4cb99ede4' src='"+widgetURL+"' width=100% height=400 scrolling='no' style='border:0px;'></iframe>");
        document.write("</div>")

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent, function (e) {
            try {
                if (typeof e.data === 'string') {

                    var parts = e.data.split(",");

                    if (parts[0]=='betamessage-iframe-resize' && parts[2]=='betaiframe657f4cb99ede4')  {
                        document.getElementById('betaiframe657f4cb99ede4').style.height=parts[1]+"px";
                    }

                    if (parts[0]=='beta-show-spinner') {
                                                     document.getElementById('beta-iframe-spinner').style.display='block';
                                                                    }

                    if (parts[0]=='beta-hide-spinner') {
                        document.getElementById('beta-iframe-spinner').style.display='none';
                        var message = {'action': 'showspinner', 'state': 'hide'};
                        // ios
                        try {
                             window.webkit.messageHandlers.betaro.postMessage(message);
                        } catch (ex) {
                        }
                        // android
                        try {
                            window.betaro.message(JSON.stringify(message));
                        } catch (ex) {
                        }
                    }

                    if (parts[0]=='scroll_to_top_of_iframe' && parts[1]=='betaiframe657f4cb99ede4') {
                        var iframetop = __iframebetaiframe657f4cb99ede4yoffset();
                        if (window.pageYOffset>iframetop) {
                            window.scrollTo(0, iframetop-150);
                        }
                        return;
                    }

                    if (parts[0]=='scroll_to_position' && parts[1]=='betaiframe657f4cb99ede4') {
                        var offset = parseInt(parts[2]);
                        var iframetop = __iframebetaiframe657f4cb99ede4yoffset();;
                        // this is broken - need to fix
                        //window.scrollTo(0, iframetop-150+offset);
                        return;
                    }

                    if (parts[0]=='scroll_to_middle_of_iframe'  && parts[1]=='betaiframe657f4cb99ede4') {
                        var iframeheight = parseInt(parts[2]);
                        var iframetop = __iframebetaiframe657f4cb99ede4yoffset();
                        window.scrollTo(0, iframetop+iframeheight/2-window.innerHeight/2);
                        return;
                    }

                    if (parts[0]=='scroll_to_bottom_of_iframe'  && parts[1]=='betaiframe657f4cb99ede4') {
                        var iframeheight = parseInt(parts[2]);
                        var iframetop = __iframebetaiframe657f4cb99ede4yoffset();
                        window.scrollTo(0, iframetop+iframeheight-window.innerHeight);
                        return;
                    }

                    // betamessage-modal-open message is caught here ONCE so we can load the betamodal.js.php file

                    if (parts[0] == 'betamessage-modal-open') {
                        try {

                            // use global to only handle message here.   Once the .js file is loaded
                            // message will be handled by that library
                            if (__betaModalAlreadyLoaded) {
                                return;
                            }
                            __betaModalAlreadyLoaded=true;

                            document.getElementById('beta-iframe-spinner').style.display='block';

                            // load the betamodal js library and set a callback when it is loaded
                            var beta_modal_firstScript = document.getElementsByTagName('script')[0];
                            beta_modal_firstScript_js = document.createElement('script');
                            beta_modal_firstScript_js.addEventListener("load", function() {
                                        // once loaded, we need to parse the message and open the window via
                                        // a special function.  URL for popup is encoded in second park of message
                                        var parts = e.data.split(",");
                                        var popupurl= decodeURIComponent(parts[1]);
                                        __betaModalOpenPopupAfterScriptLoad(popupurl,document.getElementById('betaiframe657f4cb99ede4').contentWindow);
                                        // hide spinner
                                        document.getElementById('beta-iframe-spinner').style.display='none';
                            });
                            beta_modal_firstScript_js.src = 'https://cdn.jsdelivr.net/gh/miurhawk/beta-widgets@main/betamodal.js';
                            beta_modal_firstScript.parentNode.insertBefore(beta_modal_firstScript_js, beta_modal_firstScript);

                            // sanity check to hide spinner at 5 seconds
                            setTimeout(function(){ document.getElementById('beta-iframe-spinner').style.display='none';},5000);
                        } catch (err)
                        {
                        }
                    }
                }
            }// end try within eventer
            catch (err) {
            }
        }, false); // end eventer
    }
    catch (err) { //end try inside makebetaframe
    }
}

if (__isIE9OrLess()) {
    __makebutton();
} else {
    if (__isMobileDevice() && __isSmallScreen() && __isOKToRedirect()) {
        __redirectToMobile();
    } else {
        document.getElementById('betaLink').onclick = __makebetaiframebetaiframe657f4cb99ede4();
    }
}




