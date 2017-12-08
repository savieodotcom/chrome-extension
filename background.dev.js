/*!
                                /%%
                               |__/
  /%%%%%%%  /%%%%%%  /%%    /%% /%%  /%%%%%%   /%%%%%%
 /%%_____/ |____  %%|  %%  /%%/| %% /%%__  %% /%%__  %%
|  %%%%%%   /%%%%%%% \  %%/%%/ | %%| %%%%%%%%| %%  \ %%
 \____  %% /%%__  %%  \  %%%/  | %%| %%_____/| %%  | %%
 /%%%%%%%/|  %%%%%%%   \  %/   | %%|  %%%%%%%|  %%%%%%/
|_______/  \_______/    \_/    |__/ \_______/ \______/


Your #1 tool for saving videos and tracks off the open web.

Version 1.1

(c) 2016, 2017 Savieo.com

*/

'use strict';

var regexes = [
  /^https?:\/\/(www\.)?9gag(\.com\/tv|\.tv)\/(p|embed)\/[a-zA-Z0-9]+(\/([^?#/]+))?/,
  /^https?:\/\/(www\.|movie)?trailers\.apple\.com\/(trailers|ca)\/([^/]+)\/([^/?#]+)/,
  /^https?:\/\/(www\.)?audiomack\.com\/(song|album)\/([\w-]+)\/([^/?#]+)/,
  /^https?:\/\/((www|touch)\.)?dailymotion\.[a-z]{2,3}\/((embed|swf|#)\/)?video\/([^/?#_]+)/,
  /^https?:\/\/(www\.)?dailymotion\.[a-z]{2,3}\/playlist\/(.+?)/,
  /^https?:\/\/(www\.)?dailymotion\.[a-z]{2,3}\/(?!(?:embed|swf|#|video|playlist)\/)(?:(?:old\/)?user\/)?([^/]+)/,
  /^https?:\/\/(www\.)?facebook\.com\/([0-9]+)/,
  /^https?:\/\/(www\.)?facebook\.com\/(?:[^#]*?\#!\/)?(?:(?:video\/video\.php|photo\.php|video\.php|video\/embed|story\.php)\?(?:.*?)(?:v|video_id|story_fbid)=|[^/]+\/videos\/(?:[^/]+\/)?|[^/]+\/posts\/|groups\/[^/]+\/permalink\/)([0-9]+)/,
  /^https?:\/\/(www\.|secure\.)?flickr\.com\/photos\/([\w\-_@]+)/,
  /^https?:\/\/flic\.kr\/p\/(\w+)/,
  /^https?:\/\/(www\.)?funnyordie\.com\/(embed|articles|videos)\/([^/?#]+)\/?([^/?#]+)?/,
  /^https?:\/\/(www\.)?hypem\.com\/track\/([^/?#]+)\/?([^/?#]+)?/,
  /^https?:\/\/(www\.|m\.)?imdb\.com\/(?:video\/[^/]+\/vi|title\/tt)(\d+)/,
  /^https?:\/\/(www\.)?instagram\.com\/p\/([^/?#&]+)/,
  /^https?:\/\/(www\.)?keek\.com\/keek\/(\w+)/,
  /^https?:\/\/(www\.)?maker\.tv\/(?:[^/]+\/)*video\/([a-zA-Z0-9]{12})/,
  /^https?:\/\/(www\.)?makerplayer\.com\/embed\/maker\/([a-zA-Z0-9]{12})/,
  /^https?:\/\/(www\.|m\.)?mixcloud\.com\/(?!discover|upload)([^/]+)\/(?!stream|uploads|favorites|listens|playlists)([^/?#]+)\/?$/,
  /^https?:\/\/(www\.|m\.)?mixcloud\.com\/([^/]+)\/(uploads|favorites|listens)?\/?$/,
  /^https?:\/\/(www\.|m\.)?mixcloud\.com\/([^/]+)\/playlists\/([^/?#]+)\/?$/,
  /^https?:\/\/(www\.|m\.)?mixcloud\.com\/([^/]+)\/stream\/?$/,
  /^https?:\/\/(www\.)?play\.fm\/([^/]+\/)+([^/?#]+)\/?(?:$|[/?#])/,
  /^https?:\/\/(www\.)?rutube\.ru\/(video|play\/embed)\/([\da-z]{32})/,
  /^https?:\/\/(www\.)?rutube\.ru\/(video|play)\/embed\/([0-9]+)/,
  /^(?:https?:\/\/)?(?:(?:(?:www\.|m\.)?soundcloud\.com\/([\w\d-]+)\/(?!(?:tracks|sets(?:\/[^/?#]+)?|reposts|likes|spotlight)\/?(?:$|[?#]))([\w\d-]+)\/?([^?]+?)?(?:[?].*)?$)|(?:api\.soundcloud\.com\/tracks\/(\d+)(?:\/?\?secret_token=([^&]+))?)|((?:w|player|p.)\.soundcloud\.com\/player\/?.*?url=.*))/,
  /^https?:\/\/(?:(?:www|m)\.)?soundcloud\.com\/([\w\d-]+)\/sets\/([\w\d-]+)(?:\/([^?/]+))?/,
  /^https?:\/\/(?:(?:www|m)\.)?soundcloud\.com\/([^/]+)(?:\/(tracks|sets|reposts|likes|spotlight))?\/?(?:[?#].*)?$/,
  /^https?:\/\/(?:(?:www|embed(?:-ssl)?)\.)?ted\.com\/((playlists(?:\/\d+)?)|(talks)|(watch)\/[^/]+\/[^/]+)(\/lang\/(.*?))?\/([\w-]+).*$/,
  /^https?:\/\/(www\.)?tmz\.com\/videos\/([^/?#]+)\/?/,
  /^https?:\/\/([^/?#&]+)\.tumblr\.com\/(?:post|video)\/([0-9]+)(?:$|[/?#])/,
  /^https?:\/\/(www\.|secure\.)?twitch\.tv\/[^/]+\/(b|c|v)\/(\d+)/,
  /^https?:\/\/(www\.|secure\.)?twitch\.tv\/[^/]+\/(profile|profile\/past_broadcasts)\/?(?:[#?].*)?$/,
  /^https?:\/\/(www\.|secure\.)?twitch\.tv\/[^/]+\/?(?:[#?].*)?$/,
  /^https?:\/\/(www\.)?twitter\.com\/i\/(?:cards\/tfw\/v1|videos\/tweet)\/(\d+)/,
  /^https?:\/\/(www\.|m\.|mobile\.)?twitter\.com\/(statuses|([^/]+)\/status)\/(\d+)/,
  /^https?:\/\/(www\.)?vessel\.com\/(videos|embed)\/([^/?#]+)/,
  /^https?:\/\/(www\.vevo\.com\/watch\/(?!playlist|genre)(?:[^/]+\/(?:[^/]+\/)?)?|cache\.vevo\.com\/m\/html\/embed\.html\?video=|videoplayer\.vevo\.com\/embed\/embedded\?videoId=)([^&?/#]+)/,
  /^https?:\/\/(www\.)?vevo\.com\/watch\/(playlist|genre)\/([^/?#&]+)/,
  /^https?:\/\/(www\.)?vidio\.com\/watch\/([^/#?-]+)([^/#?]+)?/,
  /^https?:\/\/(www\.)?vid\.me\/(e\/|u\/)?([\da-zA-Z]+)(\/likes)?\/?(?:[#?].*)?$/,
  /^https?:\/\/(?:(?:www|player)\.)?vimeo(pro)?\.com\/(?!(?:channels|album)\/[^/?#]+\/?(?:$|[?#])|[^/]+\/review\/|ondemand\/)(?:.*?\/)?(?:(?:play_redirect_hls|moogaloop\.swf)\?clip_id=)?(?:videos?\/)?([0-9]+)(?:\/[\da-f]+)?\/?(?:[?&].*)?(?:[#].*)?$/,
  /^https?:\/\/(www\.)?vimeo\.com\/ondemand\/([^/?#&]+)/,
  /^https?:\/\/(www\.)?vimeo\.com\/channels\/([^/?#]+)\/?(?:$|[?#])/,
  /^https?:\/\/(www\.)?vimeo\.com\/(?!(?:[0-9]+|watchlater)(?:$|[?#/]))([^/]+)(?:\/videos|[#?]|$)/,
  /^https?:\/\/(www\.)?vimeo\.com\/album\/(\d+)(?:$|[?#]|\/(?!video))/,
  /^https?:\/\/(www\.)?vimeo\.com\/groups\/([^/]+)(?:\/(?!videos?\/\d+)|$)/,
  /^https?:\/\/(www\.)?vine\.co\/(v|oembed)\/(\w+)/,
  /^https?:\/\/(www\.)?vine\.co\/(u\/)?([^\/]+)\/?(\?.*)?$/,
  /^(https?:\/\/(?:(?:(?:(?:\w+\.)?[yY][oO][uU][tT][uU][bB][eE](?:-nocookie)?\.com\/|(?:www\.)?deturl\.com\/www\.youtube\.com\/|(?:www\.)?pwnyoutube\.com\/|(?:www\.)?yourepeat\.com\/|tube\.majestyc\.net\/|youtube\.googleapis\.com\/)(?:.*?\#\/)?(?:(?:(?:v|embed|e)\/(?!videoseries))|(?:(?:(?:watch|movie)(?:_popup)?(?:\.php)?\/?)?(?:\?|\#!?)(?:.*?[&;])??v=)))|(?:youtu\.be|vid\.plus|zwearz\.com\/watch|)\/|(?:www\.)?cleanvideosearch\.com\/media\/action\/yt\/watch\?videoId=))?([0-9A-Za-z_-]{11})(?!.*?&list=)((1).+)?$/,
  /^https?:\/\/(youtu\.be|(?:\w+\.)?youtube(?:-nocookie)?\.com)\/channel\/([0-9A-Za-z_-]+)/,
  /^(?:(?:https?:\/\/)?(?:\w+\.)?youtube\.com\/(?:(?:course|view_play_list|my_playlists|artist|playlist|watch|embed\/videoseries)\?(?:.*?[&;])*?(?:p|a|list)=|p\/)((?:PL|LL|EC|UU|FL|RD|UL)?[0-9A-Za-z-_]{10,}|(?:MC)[\w\.]*).*|((?:PL|LL|EC|UU|FL|RD|UL)[0-9A-Za-z-_]{10,}))/,
  /^(?:(?:https?:\/\/(?:\w+\.)?youtube\.com\/(?:(user|c)\/)?(?!(?:attribution_link|watch|results)(?:$|[^a-z_A-Z0-9-])))|ytuser:)(?!feed\/)([A-Za-z0-9_-]+)/,
  /^https?:\/\/(?:coub\.com\/(?:view|embed|coubs)\/|c-cdn\.coub\.com\/fb-player\.swf\?.*\bcoub(?:ID|id)=)([\da-z]+)/,
  /^https?:\/\/(?:(?:www|m)\.)?vlive\.tv\/video\/([^\/#?]+)\/?([^\/#?]+)?/,
]

var checkUrl = function(url) {
  var result = regexes.some(function(regex) {
    return regex.test(url);
  });
  return result;
};

//: let's disable button on init
chrome.browserAction.disable();

//: check url on updated tab url change
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.active && changeInfo.status == 'loading') {
    if (checkUrl(tab.url)) {
      chrome.browserAction.enable(tab.id);
    }
    else {
      chrome.browserAction.disable(tab.id);
    }
  }
});

//: browser onclick action
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = 'https://savieo.com/download?url='+ encodeURIComponent(tabs[0].url);
    chrome.tabs.create({'url': url});
  });
});
