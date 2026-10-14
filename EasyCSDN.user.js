// ==UserScript==
// @name         EasyCSDN
// @description  这是一款促进CSDN极致简洁和高效的插件。免费共享大量创新功能，如：净化页面、展示全屏、显示推荐、复制文本、展开代码等。让我们的学习体验无比简洁、专注、高效、畅快。
// @version      34.1
// @author       xcanwin
// @namespace    https://github.com/xcanwin/EasyCSDN/
// @supportURL   https://github.com/xcanwin/EasyCSDN/
// @license      GPL-2.0-only
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://*.blog.csdn.net/article/details/*
// @grant        GM_addStyle
// @run-at       document-start
// @downloadURL https://raw.githubusercontent.com/ikznbfin/EasyCSDN/main/EasyCSDN.user.js
// @updateURL https://raw.githubusercontent.com/ikznbfin/EasyCSDN/main/EasyCSDN.user.js
// ==/UserScript==

(function() {
    'use strict';

    const $ = (Selector, el) => (el || document).querySelector(Selector);
    const $$ = (Selector, el) => (el || document).querySelectorAll(Selector);

    /*电脑端净化样式*/
    const purify_style_pc = `
.passport-login-container /*隐藏[置顶的]登录提示*/,
.passport-login-tip-container /*隐藏[置顶的]登录权益提示*/,
body>#toolbarBox /*隐藏[置顶的][顶部的]菜单栏(旧版)*/ ,
body>#toolBarBox /*隐藏[置顶的][顶部的]菜单栏(新版)*/ ,
.left-toolbox /*隐藏[置顶的][底部的]关注栏*/,
.blog_container_aside /*隐藏[左边的]栏*/,
#rightAside /*隐藏[右边的]栏*/,
.csdn-side-toolbar /*隐藏[右边的]磁吸栏*/,
.blog-footer-bottom /*隐藏[底部的]网站介绍*/,
.recommend-nps-box /*隐藏[底部的]打分*/,
.blog-tags-box /*隐藏[正文的][顶部的]分类*/,
.column-group /*隐藏[正文的][顶部的]加入社区*/,
#blogColumnPayAdvert /*隐藏[正文的][顶部的]专栏*/,
.more-toolbox-new /*隐藏[正文的][底部的]关注栏*/,
#treeSkill /*隐藏[正文的][底部的]技能树*/,
.recommend-box /*隐藏[正文的][底部的]推荐文章*/,
.recommend-box div[data-url*="download.csdn.net"] /*隐藏[正文的][底部的]含有下载的推荐文章*/,
.recommend-box div[data-url*="wenku.csdn.net"] /*隐藏[正文的][底部的]含有文库的推荐文章*/,
.hljs-button.signin /*隐藏[正文的][代码块的]复制提示*/,
.code-annotation /*隐藏[正文的][代码块的]一键注释*/,
.article-search-tip /*隐藏[正文的]搜索提示*/
{
    display: none !important;
}

/*隐藏背景*/
html body {
    background: none !important;
    background-image: unset !important;
    background-color: unset !important;
}

/*调整标题*/
.title-article {
    display: flex !important;
    justify-content: center !important;
    font-size: 33px !important;
    padding-top:23px !important;
    padding-bottom: 10px !important;
}

/*调整头像*/
.article-type-img {
    display: none !important;
    border-radius: 4px !important;
    height: 28px !important;
    width: 28px !important;
    margin: 6px !important;
    margin-right: 20px !important;
}

/*正文的div居中*/
#mainBox {
    display: flex;
    justify-content: center;
}

/*正文的图片居中*/
#content_views p img {
    display: flex;
    margin-left: auto;
    margin-right: auto;
}

/*展示全屏*/
#mainBox {
    width: 100%;
}
#mainBox main {
    width: 82%;
    margin-bottom: unset !important;
}
.main_father {
    padding: unset !important;
}
.main_father.d-flex {
    display: unset !important;
}

/*临时显示*/
.show-temp {
    display: unset !important;
}

/*适当展示图片*/
main #content_views img {
    max-width: 70% !important;
}

/*阅读全文*/
.hide-article-box {
    display: none !important;
}
#article_content {
    height: auto !important;
    overflow: auto !important;
}

/*文章末尾渐隐遮罩*/
.article-end {
    -webkit-mask-image: unset !important;
    mask-image: unset !important;
}
`;


    /*广告与推广净化样式(v34.0 新增)*/
    const purify_style_ads = `
#dmp_ad_58 /*文中广告位(伪装成推荐条目)*/,
#kp_box_58 /*文中广告容器*/,
iframe[src*="kunpeng-sc.csdnimg.cn"] /*CSDN鲲鹏广告平台的所有广告位*/,
.wwads-img /*万维广告联盟广告图*/,
.wwads-poweredby /*万维广告"广告"标识*/,
.wwads-hide /*万维广告关闭按钮*/,
.recommend-item-box.baiduSearch /*推荐流中的"百度推广"条目*/,
a[href*="vip_blogleftbanner"] /*左侧栏VIP横幅广告*/,
.sidecolumn-vip /*右边缘"送VIP"竖条*/,
#sidecolumn-deepseek /*右边缘DeepSeek体验胶囊*/,
.sidecolumn-deepseek /*右边缘DeepSeek体验胶囊(兼容)*/,
#vip-limited-time-offer-box-new /*VIP限时优惠弹窗*/,
.directory-boxshadow-dialog /*弹窗遮罩*/,
#csdn-new-user-gift-bubble /*会员新人礼包气泡*/,
.option-box.styleab /*右边缘客服悬浮按钮*/,
.ai-abstract-box /*文章顶部AI摘要框*/,
.btn-code-notes.mdeditor /*代码块"AI写代码"外链按钮*/
{
    display: none !important;
}
`;


    /*移动端净化样式*/
    const purify_style_mb = `
#csdn-toolbar /*隐藏[置顶的][顶部的]菜单栏*/,
#operate /*隐藏[置顶的][底部的]搜索标签与评论*/,
.article-type /*隐藏[正文的][顶部的]文章类型*/,
.have-heart-count /*隐藏[正文的][顶部的]赞*/,
.identity-icon /*隐藏[正文的][顶部的]身份等级*/,
#detailFollow /*隐藏[正文的][顶部的]关注*/,
#recommend /*隐藏[正文的][底部的]推荐文章*/,
#recommend div[data-url*="download.csdn.net"] /*隐藏[正文的][底部的]含有下载的推荐文章*/,
#recommend div[data-url*="wenku.csdn.net"] /*隐藏[正文的][底部的]含有文库的推荐文章*/
{
    display: none !important;
}

/*展示全屏*/
body #main {
    padding-top: unset !important;
    margin-top: unset !important;
}
body {
    padding-bottom: unset !important;
}

/*展示分界线*/
.spec_space {
    height: 32px !important;
    background-color: #eaeaea !important;
}
`;

    //净化页面
    const purifyPage = function() {
        GM_addStyle(purify_style_pc);
        GM_addStyle(purify_style_mb);
        GM_addStyle(purify_style_ads);
    };

    //显示推荐的开关
    const showRecommend = function() {
        const mainEl = $('main');
        const recBox = $('.recommend-box');
        if (!mainEl || !recBox) {
            return;
        }
        const sr = document.createElement("div");
        sr.style = "height: 64px; background-color: #eaeaea;";
        sr.onclick = function() {
            $$(".recommend-box").forEach(el => {
                el.classList.toggle("show-temp");
            });
            recBox.scrollIntoView();
        };
        mainEl.insertBefore(sr, recBox);
    };

    //展开代码
    const prettyCode = function() {
        const browser_menu_height = window.outerHeight - window.innerHeight; //浏览器顶部菜单栏高度
        const browser_height_max = screen.height - browser_menu_height; //浏览器最大可展示高度
        let i = 0;
        $$('.set-code-hide').forEach(el => {
            if (i == 0 && $("code", el)?.clientHeight <= browser_height_max * 1.8) {
                //预判首个代码块实际高度，若小于浏览器最大可展示高度的180%，则自动展开代码
                $(".hide-preCode-bt", el)?.click();
            } else if ($("code", el)?.clientHeight <= browser_height_max * 0.8) {
                //预判其余代码块实际高度，若小于浏览器最大可展示高度的80%，则自动展开代码
                $(".hide-preCode-bt", el)?.click();
            }
            i++;
        });
    };

    //拦截推荐搜索
    const hookXHR = function() {
        const origOpen = XMLHttpRequest.prototype.open;
        const block_url = 'redisdatarecall\.csdn\.net/recommend/';
        XMLHttpRequest.prototype.open = function() {
            const reqUrl = arguments[1];
            if (typeof reqUrl === 'string' && reqUrl.match(block_url)){
                return;
            }
            return origOpen.apply(this, arguments);
        };
    };

    //调整头像(新版CSDN已移除.article-type-img, 保留兼容逻辑)
    const beautyLOGO = function() {
        const img = $('.article-type-img');
        const icon = $('link[rel="shortcut icon"]');
        if (img && icon) {
            img.src = icon.href;
            img.style = 'display: block !important;';
        }
    };

    //净化URL, 保障用户信息安全
    const prettyURL = function() {
        let newurl = location.href.match('(https?://.*?blog\\.csdn\\.net/.*?article/details/.*?)\\?');
        if (newurl) {
            newurl = newurl[1];
            window.history.replaceState({
                path: newurl
            }, '', newurl);
        }
    };

    window.addEventListener('load', function() {
        beautyLOGO();
        prettyCode();
        showRecommend();
    });

    purifyPage();
    prettyURL();
    hookXHR();

})();
