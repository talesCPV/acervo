/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */
function recaptchaContactFocus() {
    /(iPhone)/i.test(navigator.userAgent) && document.getElementsByClassName("form-group")[0].scrollIntoView()
}

function captchaVerifiedShowSubmit() {
    document.querySelector(".contact_form input[type=submit]").classList.remove("hidden"), recaptchaContactFocus()
}

function captchaExpiredHideSubmit() {
    document.querySelector(".contact_form input[type=submit]").classList.add("hidden"), recaptchaContactFocus()
}

function trimCurrencyRate(t) {
    return Math.round(100 * t) / 100
}

function convertCurrencyCallback(t) {
    t.to, t.rate, t.from;
    var e = t.v;
    document.getElementById("currency_to_value").value = trimCurrencyRate(e)
}

function cycleImages(t, e) {
    t = t == undefined ? window.cyclerDefaultFadeOutTime : t, e = e || "next";
    var n = $("#cycler .cycle-slide.active"),
        i = "PICTURE" === n.parent().get(0).tagName,
        o = i ? "picture:first" : ".cycle-slide:first",
        r = (i ? n.parent() : n)[e](o);
    i && (r = r.find(".cycle-slide"));
    var a = r.length > 0 ? r : $("#cycler .cycle-slide:" + ("prev" === e ? "last" : "first"));
    "prev" === e ? cycleImageCurrentIndex -= 1 : cycleImageCurrentIndex += 1;
    var s = $("#cycler .cycle-slide").length;
    cycleImageCurrentIndex < 0 ? cycleImageCurrentIndex = s - 1 : cycleImageCurrentIndex >= s && (cycleImageCurrentIndex = 0), t > 0 ? (a.css("z-index", 2), n.fadeOut(t, function() {
        n.css("z-index", 1).show().removeClass("active"), a.css("z-index", 3).addClass("active"), setActiveIndicator(cycleImageCurrentIndex)
    })) : (n.removeClass("active"), a.addClass("active"), setActiveIndicator(cycleImageCurrentIndex)), $(".dot").length && ($(".dot").removeClass("active"), $(".dot").each(function() {
        $(this).data("slide") == cycleImageCurrentIndex && $(this).addClass("active")
    }))
}

function setActiveIndicator(t) {
    var e = $(".cycler-indicators li:nth-of-type(" + (1 + t) + ")");
    e.siblings("li").removeClass("active"), e.addClass("active"), cycleImageCurrentIndex = t
}

function resetCycleInterval() {
    clearInterval(cycleInterval), $("#cycler .cycle-slide").length <= 1 || $("#cycler").length && (cycleInterval = setInterval(cycleImages, window.imageCyclerInterval))
}

function hasScrolled() {
    var t = $(this).scrollTop();
    Math.abs(lastScrollTop - t) <= delta || (t > lastScrollTop && t > navbarHeight ? $(".text-message-sticky-widget").addClass("hide-message-bar") : t + $(window).height() < $(document).height() && $(".text-message-sticky-widget").removeClass("hide-message-bar"), lastScrollTop = t)
}

function resizeModal(t) {
    var e = new Image;
    e.onload = function() {}, e.src = t
}

function currentImageSrc() {
    var t = $(".vehicle-image");
    return t.data("original") || t.attr("src")
}

function overlay() {
    return $("#lead-image-overlay .modal")
}

function setModalImage() {
    overlay().find(".modal-lead-image").html("<img src=" + currentImageSrc() + "></img>"), resizeModal(currentImageSrc())
}

function loadHammerJsOnLoad() {
    window.__loadedHammer = !0;
    var t = document.querySelector(".modal-lead-image");
    new Hammer(t).on("swipe tap", function(t) {
        console.log(t.type + " " + t.direction + " detected"), "tap" === t.type || "swipe" === t.type && t.direction === Hammer.DIRECTION_LEFT ? loadNextImage(t) : loadPrevImage(t), updateModal()
    })
}

function loadHammerJs() {
    if (window.__loadedHammer) loadHammerJsOnLoad();
    else {
        var t = document.createElement("script");
        t.src = "/assets/hammer.min-c8ef32df9e08e8d135a1e12284094ef2.js", t.type = "text/javascript", t.async = !0, t.onload = loadHammerJsOnLoad, document.body.appendChild(t)
    }
}

function loadModal() {
    (setModalImage(), overlay().modal(), window.browserDetector && window.browserDetector.isMobile()) && (loadHammerJs(), $(".modal .modal-content").css("padding", 0))
}

function updateModal() {
    setModalImage()
}

function clickExtendLink(t) {
    t.preventDefault();
    var e = $(".show-car-thumbs");
    e.hasClass("extend") ? shrinkGallery(e) : extendGallery(e)
}

function extendGallery(t) {
    var e = t.find("a").length;
    t.animate({
        height: "+=" + 75 * Math.floor(e / 6)
    }, 1e3), t.addClass("extend"), event.target.innerHTML = "^"
}

function shrinkGallery(t) {
    t.animate({
        height: "75px"
    }, 1500), t.removeClass("extend"), event.target.innerHTML = "v"
}

function getImageSelector() {
    return $(".vehicle-image img:first").length > 0 ? $(".vehicle-image img:first") : $(".part-image img:first")
}

function currentImageSrc() {
    var t = getImageSelector();
    return t.data("original") || t.attr("src")
}

function setCompareVehicleCookie(t) {
    var e = getCompareVehicleIds();
    idPresentInCookie(t) ? e.splice(e.indexOf(t), 1) : e.push(t), Cookies.set("compare_vehicle_ids", e, {
        expires: 1 / 24
    }), setClearCompareButtonText()
}

function resetCompareVehicleCookie() {
    Cookies.set("compare_vehicle_ids", []), $("[id^=" + compareVehicleIdPrefix() + "]").attr("checked", !1), setClearCompareButtonText()
}

function setClearCompareButtonText() {
    var t = getCompareVehicleIds(),
        e = "Clear " + t.length + (1 === t.length ? " Vehicle" : " Vehicles");
    $(".reset-compare-button").html(e)
}

function setCheckboxValues() {
    $("[id^=" + compareVehicleIdPrefix() + "]").each(function(t, e) {
        $(e).attr("checked", idPresentInCookie(e.id.slice(compareVehicleIdPrefix().length)))
    })
}

function getCompareVehicleIds() {
    return Cookies.getJSON("compare_vehicle_ids") || []
}

function compareVehicleIdPrefix() {
    return "compare_vehicle_vehicle_id_"
}

function idPresentInCookie(t) {
    return -1 != getCompareVehicleIds().indexOf(t)
}

function loadPinterest() {
    delete window["PIN_" + ~~((new Date).getTime() / 864e5)], $.getScript("//assets.pinterest.com/js/pinit.js")
}

function stopVideo(t) {
    t.preventDefault(), toggleVideo("off")
}

function clickThumb(t) {
    t.preventDefault(), stopVideo()
}

function videoIsPaused(t) {
    return t.currentTime <= 0 || t.paused || t.ended || t.readyState <= 2
}

function toggleVideo(t) {
    var e = $("#vehicle-hero-video-large"),
        n = e.attr("src");
    if (n && ("on" == t || "off" == t && n.indexOf("autoplay") > -1)) {
        $("#hero-video-large, #vehicle-hero-lead-image, .lead-image-left, .lead-image-right, .zoom-lead-image").toggle();
        var i = n.indexOf("autoplay") > -1 ? n.replace("&autoplay=1", "") : n + "&autoplay=1",
            o = $(e.parent().html()).attr("src", i);
        e.replaceWith(o)
    }
}

function startVideo() {
    $("#vehicle-video-thumb").length > 0 && toggleVideo("on")
}

function printWindow(t) {
    t.preventDefault(), window.print()
}

function navHideShow() {
    worldwidePageContent.currentScrollPos = window.pageYOffset, window.scrollY > 70 && allowScroll && (worldwidePageContent.prevScrollpos >= worldwidePageContent.currentScrollPos ? ($("header").removeClass("compress-nav"), $("#worldwide-menu-toggle").removeClass("compressed")) : ($("header").addClass("compress-nav"), $("#worldwide-menu-toggle").addClass("compressed")), window.scrollY > 300 && allowScroll ? worldwidePageContent.prevScrollpos >= worldwidePageContent.currentScrollPos ? $(".home-filters").addClass("nav-open") : ($(".home-filters").removeClass("nav-open"), $(".home-filters").addClass("sticky-home-filters")) : $(".home-filters").removeClass("sticky-home-filters")), worldwidePageContent.prevScrollpos = worldwidePageContent.currentScrollPos
}

function showAllCars() {
    document.getElementById("more-cars").classList.toggle("show-all-cars"), $(".show-car-thumbs-container").hasClass("show-all-cars") ? ($(".more-btn .btn-front").text("View Less"), $(".more-btn .btn-back").text("View Less")) : ($(".more-btn .btn-front").text("View More"), $(".more-btn .btn-back").text("View More"))
}

function toggleVideo(t) {
    var e = $("iframe.embed-responsive-item"),
        n = e.attr("src");
    if ("on" == t || "off" == t && n.indexOf("autoplay") > -1) {
        $("#worldwide-video-large").toggle(), $("#worldwide-lead-image").toggle();
        var i = n.indexOf("autoplay") > -1 ? n.replace("&autoplay=1", "") : n + "&autoplay=1&rel=0",
            o = $(e.parent().html()).attr("src", i);
        e.replaceWith(o)
    }
}

function fullWidth() {
    $(".zoom-lead-icon").on("click", function() {
        var t = document.querySelectorAll(".show-car-thumbs a:not(.is-a-video)"),
            e = [];
        t.forEach(function(t) {
            e.push({
                src: t.attributes["data-original"].nodeValue,
                thumb: t.attributes.thumb.nodeValue,
                subHtml: t.attributes.alt.nodeValue
            })
        }), $(this).lightGallery({
            dynamic: !0,
            dynamicEl: e
        })
    }), $(".cast-img-responsive").on("click", function() {
        var t = document.querySelectorAll(".show-car-thumbs a:not(.is-a-video)"),
            e = [];
        t.forEach(function(t) {
            e.push({
                src: t.attributes["data-original"].nodeValue,
                thumb: t.attributes.thumb.nodeValue,
                subHtml: t.attributes.alt.nodeValue
            })
        }), $(this).lightGallery({
            dynamic: !0,
            dynamicEl: e
        })
    })
}

function formatOfferSubmit(t) {
    var e = t.value.replace(/[^0-9.]/g, "");
    isNaN(parseInt(e)) ? t.value = "" : t.value = parseInt(e)
}

function formatCurrency(t) {
    var e = $(t).val();
    if ("" !== e) {
        var n = e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(t).val(n)
    }
}

function check_deposit_checkboxes() {
    $("#non_ref").prop("checked") && $("#dealership").prop("checked") && $("#full_payment").prop("checked") ? $("#smart-button-container").css("display", "") : $("#smart-button-container").css("display", "none")
}(function() {
    var t, e;
    t = window.jQuery || ("function" == typeof require ? require("jquery") : void 0), e = t(document), t.turbo = {
        version: "2.1.0",
        isReady: !1,
        use: function(t, n) {
            return e.off(".turbo").on(t + ".turbo", this.onLoad).on(n + ".turbo", this.onFetch)
        },
        addCallback: function(n) {
            return t.turbo.isReady && n(t), e.on("turbo:ready", function() {
                return n(t)
            })
        },
        onLoad: function() {
            return t.turbo.isReady = !0, e.trigger("turbo:ready")
        },
        onFetch: function() {
            return t.turbo.isReady = !1
        },
        register: function() {
            return t(this.onLoad), t.fn.ready = this.addCallback
        }
    }, t.turbo.register(), t.turbo.use("page:load", "page:fetch")
}).call(this),
    function(t, e) {
        var n;
        t.rails !== e && t.error("jquery-ujs has already been loaded!");
        var i = t(document);
        t.rails = n = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
            buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
            disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input[type=file]",
            linkDisableSelector: "a[data-disable-with], a[data-disable]",
            buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
            CSRFProtection: function(e) {
                var n = t('meta[name="csrf-token"]').attr("content");
                n && e.setRequestHeader("X-CSRF-Token", n)
            },
            refreshCSRFTokens: function() {
                var e = t("meta[name=csrf-token]").attr("content"),
                    n = t("meta[name=csrf-param]").attr("content");
                t('form input[name="' + n + '"]').val(e)
            },
            fire: function(e, n, i) {
                var o = t.Event(n);
                return e.trigger(o, i), !1 !== o.result
            },
            confirm: function(t) {
                return confirm(t)
            },
            ajax: function(e) {
                return t.ajax(e)
            },
            href: function(t) {
                return t.attr("href")
            },
            handleRemote: function(i) {
                var o, r, a, s, l, c, d, u;
                if (n.fire(i, "ajax:before")) {
                    if (l = (s = i.data("cross-domain")) === e ? null : s, c = i.data("with-credentials") || null, d = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, i.is("form")) {
                        o = i.attr("method"), r = i.attr("action"), a = i.serializeArray();
                        var h = i.data("ujs:submit-button");
                        h && (a.push(h), i.data("ujs:submit-button", null))
                    } else i.is(n.inputChangeSelector) ? (o = i.data("method"), r = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (o = i.data("method") || "get", r = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : (o = i.data("method"), r = n.href(i), a = i.data("params") || null);
                    return u = {
                        type: o || "GET",
                        data: a,
                        dataType: d,
                        beforeSend: function(t, o) {
                            if (o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), !n.fire(i, "ajax:beforeSend", [t, o])) return !1;
                            i.trigger("ajax:send", t)
                        },
                        success: function(t, e, n) {
                            i.trigger("ajax:success", [t, e, n])
                        },
                        complete: function(t, e) {
                            i.trigger("ajax:complete", [t, e])
                        },
                        error: function(t, e, n) {
                            i.trigger("ajax:error", [t, e, n])
                        },
                        crossDomain: l
                    }, c && (u.xhrFields = {
                        withCredentials: c
                    }), r && (u.url = r), n.ajax(u)
                }
                return !1
            },
            handleMethod: function(i) {
                var o = n.href(i),
                    r = i.data("method"),
                    a = i.attr("target"),
                    s = t("meta[name=csrf-token]").attr("content"),
                    l = t("meta[name=csrf-param]").attr("content"),
                    c = t('<form method="post" action="' + o + '"></form>'),
                    d = '<input name="_method" value="' + r + '" type="hidden" />';
                l !== e && s !== e && (d += '<input name="' + l + '" value="' + s + '" type="hidden" />'), a && c.attr("target", a), c.hide().append(d).appendTo("body"), c.submit()
            },
            formElements: function(e, n) {
                return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
            },
            disableFormElements: function(e) {
                n.formElements(e, n.disableSelector).each(function() {
                    n.disableFormElement(t(this))
                })
            },
            disableFormElement: function(t) {
                var n, i;
                n = t.is("button") ? "html" : "val", i = t.data("disable-with"), t.data("ujs:enable-with", t[n]()), i !== e && t[n](i), t.prop("disabled", !0)
            },
            enableFormElements: function(e) {
                n.formElements(e, n.enableSelector).each(function() {
                    n.enableFormElement(t(this))
                })
            },
            enableFormElement: function(t) {
                var e = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
            },
            allowAction: function(t) {
                var e, i = t.data("confirm"),
                    o = !1;
                return !i || (n.fire(t, "confirm") && (o = n.confirm(i), e = n.fire(t, "confirm:complete", [o])), o && e)
            },
            blankInputs: function(e, n, i) {
                var o, r = t(),
                    a = n || "input,textarea",
                    s = e.find(a);
                return s.each(function() {
                    if (o = t(this), !(o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : o.val()) == !i) {
                        if (o.is("input[type=radio]") && s.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length) return !0;
                        r = r.add(o)
                    }
                }), !!r.length && r
            },
            nonBlankInputs: function(t, e) {
                return n.blankInputs(t, e, !0)
            },
            stopEverything: function(e) {
                return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            disableElement: function(t) {
                var i = t.data("disable-with");
                t.data("ujs:enable-with", t.html()), i !== e && t.html(i), t.bind("click.railsDisable", function(t) {
                    return n.stopEverything(t)
                })
            },
            enableElement: function(t) {
                t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
            }
        }, n.fire(i, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, i) {
            t.crossDomain || n.CSRFProtection(i)
        }), i.delegate(n.linkDisableSelector, "ajax:complete", function() {
            n.enableElement(t(this))
        }), i.delegate(n.buttonDisableSelector, "ajax:complete", function() {
            n.enableFormElement(t(this))
        }), i.delegate(n.linkClickSelector, "click.rails", function(i) {
            var o = t(this),
                r = o.data("method"),
                a = o.data("params"),
                s = i.metaKey || i.ctrlKey;
            if (!n.allowAction(o)) return n.stopEverything(i);
            if (!s && o.is(n.linkDisableSelector) && n.disableElement(o), o.data("remote") !== e) {
                if (s && (!r || "GET" === r) && !a) return !0;
                var l = n.handleRemote(o);
                return !1 === l ? n.enableElement(o) : l.error(function() {
                    n.enableElement(o)
                }), !1
            }
            return o.data("method") ? (n.handleMethod(o), !1) : void 0
        }), i.delegate(n.buttonClickSelector, "click.rails", function(e) {
            var i = t(this);
            if (!n.allowAction(i)) return n.stopEverything(e);
            i.is(n.buttonDisableSelector) && n.disableFormElement(i);
            var o = n.handleRemote(i);
            return !1 === o ? n.enableFormElement(i) : o.error(function() {
                n.enableFormElement(i)
            }), !1
        }), i.delegate(n.inputChangeSelector, "change.rails", function(e) {
            var i = t(this);
            return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(e)
        }), i.delegate(n.formSubmitSelector, "submit.rails", function(i) {
            var o, r, a = t(this),
                s = a.data("remote") !== e;
            if (!n.allowAction(a)) return n.stopEverything(i);
            if (a.attr("novalidate") == e && (o = n.blankInputs(a, n.requiredInputSelector)) && n.fire(a, "ajax:aborted:required", [o])) return n.stopEverything(i);
            if (s) {
                if (r = n.nonBlankInputs(a, n.fileInputSelector)) {
                    setTimeout(function() {
                        n.disableFormElements(a)
                    }, 13);
                    var l = n.fire(a, "ajax:aborted:file", [r]);
                    return l || setTimeout(function() {
                        n.enableFormElements(a)
                    }, 13), l
                }
                return n.handleRemote(a), !1
            }
            setTimeout(function() {
                n.disableFormElements(a)
            }, 13)
        }), i.delegate(n.formInputClickSelector, "click.rails", function(e) {
            var i = t(this);
            if (!n.allowAction(i)) return n.stopEverything(e);
            var o = i.attr("name"),
                r = o ? {
                    name: o,
                    value: i.val()
                } : null;
            i.closest("form").data("ujs:submit-button", r)
        }), i.delegate(n.formSubmitSelector, "ajax:send.rails", function(e) {
            this == e.target && n.disableFormElements(t(this))
        }), i.delegate(n.formSubmitSelector, "ajax:complete.rails", function(e) {
            this == e.target && n.enableFormElements(t(this))
        }), t(function() {
            n.refreshCSRFTokens()
        }))
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("bs.affix"),
                    r = "object" == typeof e && e;
                o || i.data("bs.affix", o = new n(this, r)), "string" == typeof e && o[e]()
            })
        }
        var n = function(e, i) {
            this.options = t.extend({}, n.DEFAULTS, i), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        n.VERSION = "3.3.5", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
            offset: 0,
            target: window
        }, n.prototype.getState = function(t, e, n, i) {
            var o = this.$target.scrollTop(),
                r = this.$element.offset(),
                a = this.$target.height();
            if (null != n && "top" == this.affixed) return o < n && "top";
            if ("bottom" == this.affixed) return null != n ? !(o + this.unpin <= r.top) && "bottom" : !(o + a <= t - i) && "bottom";
            var s = null == this.affixed,
                l = s ? o : r.top;
            return null != n && o <= n ? "top" : null != i && l + (s ? a : e) >= t - i && "bottom"
        }, n.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(n.RESET).addClass("affix");
            var t = this.$target.scrollTop(),
                e = this.$element.offset();
            return this.pinnedOffset = e.top - t
        }, n.prototype.checkPositionWithEventLoop = function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, n.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var e = this.$element.height(),
                    i = this.options.offset,
                    o = i.top,
                    r = i.bottom,
                    a = Math.max(t(document).height(), t(document.body).height());
                "object" != typeof i && (r = o = i), "function" == typeof o && (o = i.top(this.$element)), "function" == typeof r && (r = i.bottom(this.$element));
                var s = this.getState(a, e, o, r);
                if (this.affixed != s) {
                    null != this.unpin && this.$element.css("top", "");
                    var l = "affix" + (s ? "-" + s : ""),
                        c = t.Event(l + ".bs.affix");
                    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                    this.affixed = s, this.unpin = "bottom" == s ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == s && this.$element.offset({
                    top: a - e - r
                })
            }
        };
        var i = t.fn.affix;
        t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function() {
            return t.fn.affix = i, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var n = t(this),
                    i = n.data();
                i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), e.call(n, i)
            })
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("bs.alert");
                o || n.data("bs.alert", o = new i(this)), "string" == typeof e && o[e].call(n)
            })
        }
        var n = '[data-dismiss="alert"]',
            i = function(e) {
                t(e).on("click", n, this.close)
            };
        i.VERSION = "3.3.5", i.TRANSITION_DURATION = 150, i.prototype.close = function(e) {
            function n() {
                a.detach().trigger("closed.bs.alert").remove()
            }
            var o = t(this),
                r = o.attr("data-target");
            r || (r = (r = o.attr("href")) && r.replace(/.*(?=#[^\s]*$)/, ""));
            var a = t(r);
            e && e.preventDefault(), a.length || (a = o.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
        };
        var o = t.fn.alert;
        t.fn.alert = e, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
            return t.fn.alert = o, this
        }, t(document).on("click.bs.alert.data-api", n, i.prototype.close)
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("bs.button"),
                    r = "object" == typeof e && e;
                o || i.data("bs.button", o = new n(this, r)), "toggle" == e ? o.toggle() : e && o.setState(e)
            })
        }
        var n = function(e, i) {
            this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.isLoading = !1
        };
        n.VERSION = "3.3.5", n.DEFAULTS = {
            loadingText: "loading..."
        }, n.prototype.setState = function(e) {
            var n = "disabled",
                i = this.$element,
                o = i.is("input") ? "val" : "html",
                r = i.data();
            e += "Text", null == r.resetText && i.data("resetText", i[o]()), setTimeout(t.proxy(function() {
                i[o](null == r[e] ? this.options[e] : r[e]), "loadingText" == e ? (this.isLoading = !0, i.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n))
            }, this), 0)
        }, n.prototype.toggle = function() {
            var t = !0,
                e = this.$element.closest('[data-toggle="buttons"]');
            if (e.length) {
                var n = this.$element.find("input");
                "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
        };
        var i = t.fn.button;
        t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function() {
            return t.fn.button = i, this
        }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
            var i = t(n.target);
            i.hasClass("btn") || (i = i.closest(".btn")), e.call(i, "toggle"), t(n.target).is('input[type="radio"]') || t(n.target).is('input[type="checkbox"]') || n.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("bs.carousel"),
                    r = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e),
                    a = "string" == typeof e ? e : r.slide;
                o || i.data("bs.carousel", o = new n(this, r)), "number" == typeof e ? o.to(e) : a ? o[a]() : r.interval && o.pause().cycle()
            })
        }
        var n = function(e, n) {
            this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        n.VERSION = "3.3.5", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, n.prototype.keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, n.prototype.cycle = function(e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, n.prototype.getItemIndex = function(t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, n.prototype.getItemForDirection = function(t, e) {
            var n = this.getItemIndex(e);
            if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap) return e;
            var i = (n + ("prev" == t ? -1 : 1)) % this.$items.length;
            return this.$items.eq(i)
        }, n.prototype.to = function(t) {
            var e = this,
                n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
                e.to(t)
            }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
        }, n.prototype.pause = function(e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, n.prototype.next = function() {
            if (!this.sliding) return this.slide("next")
        }, n.prototype.prev = function() {
            if (!this.sliding) return this.slide("prev")
        }, n.prototype.slide = function(e, i) {
            var o = this.$element.find(".item.active"),
                r = i || this.getItemForDirection(e, o),
                a = this.interval,
                s = "next" == e ? "left" : "right",
                l = this;
            if (r.hasClass("active")) return this.sliding = !1;
            var c = r[0],
                d = t.Event("slide.bs.carousel", {
                    relatedTarget: c,
                    direction: s
                });
            if (this.$element.trigger(d), !d.isDefaultPrevented()) {
                if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var u = t(this.$indicators.children()[this.getItemIndex(r)]);
                    u && u.addClass("active")
                }
                var h = t.Event("slid.bs.carousel", {
                    relatedTarget: c,
                    direction: s
                });
                return t.support.transition && this.$element.hasClass("slide") ? (r.addClass(e), r[0].offsetWidth, o.addClass(s), r.addClass(s), o.one("bsTransitionEnd", function() {
                    r.removeClass([e, s].join(" ")).addClass("active"), o.removeClass(["active", s].join(" ")), l.sliding = !1, setTimeout(function() {
                        l.$element.trigger(h)
                    }, 0)
                }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (o.removeClass("active"), r.addClass("active"), this.sliding = !1, this.$element.trigger(h)), a && this.cycle(), this
            }
        };
        var i = t.fn.carousel;
        t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function() {
            return t.fn.carousel = i, this
        };
        var o = function(n) {
            var i, o = t(this),
                r = t(o.attr("data-target") || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
            if (r.hasClass("carousel")) {
                var a = t.extend({}, r.data(), o.data()),
                    s = o.attr("data-slide-to");
                s && (a.interval = !1), e.call(r, a), s && r.data("bs.carousel").to(s), n.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function() {
            t('[data-ride="carousel"]').each(function() {
                var n = t(this);
                e.call(n, n.data())
            })
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            var n, i = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
            return t(i)
        }

        function n(e) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("bs.collapse"),
                    r = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
                !o && r.toggle && /show|hide/.test(e) && (r.toggle = !1), o || n.data("bs.collapse", o = new i(this, r)), "string" == typeof e && o[e]()
            })
        }
        var i = function(e, n) {
            this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        i.VERSION = "3.3.5", i.TRANSITION_DURATION = 350, i.DEFAULTS = {
            toggle: !0
        }, i.prototype.dimension = function() {
            return this.$element.hasClass("width") ? "width" : "height"
        }, i.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var e, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(o && o.length && (e = o.data("bs.collapse")) && e.transitioning)) {
                    var r = t.Event("show.bs.collapse");
                    if (this.$element.trigger(r), !r.isDefaultPrevented()) {
                        o && o.length && (n.call(o, "hide"), e || o.data("bs.collapse", null));
                        var a = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var s = function() {
                            this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition) return s.call(this);
                        var l = t.camelCase(["scroll", a].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[a](this.$element[0][l])
                    }
                }
            }
        }, i.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var e = t.Event("hide.bs.collapse");
                if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                    var n = this.dimension();
                    this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var o = function() {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    if (!t.support.transition) return o.call(this);
                    this.$element[n](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(i.TRANSITION_DURATION)
                }
            }
        }, i.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, i.prototype.getParent = function() {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(n, i) {
                var o = t(i);
                this.addAriaAndCollapsedClass(e(o), o)
            }, this)).end()
        }, i.prototype.addAriaAndCollapsedClass = function(t, e) {
            var n = t.hasClass("in");
            t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
        };
        var o = t.fn.collapse;
        t.fn.collapse = n, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = o, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
            var o = t(this);
            o.attr("data-target") || i.preventDefault();
            var r = e(o),
                a = r.data("bs.collapse") ? "toggle" : o.data();
            n.call(r, a)
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            var n = e.attr("data-target");
            n || (n = (n = e.attr("href")) && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
            var i = n && t(n);
            return i && i.length ? i : e.parent()
        }

        function n(n) {
            n && 3 === n.which || (t(o).remove(), t(r).each(function() {
                var i = t(this),
                    o = e(i),
                    r = {
                        relatedTarget: this
                    };
                o.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(o[0], n.target) || (o.trigger(n = t.Event("hide.bs.dropdown", r)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), o.removeClass("open").trigger("hidden.bs.dropdown", r))))
            }))
        }

        function i(e) {
            return this.each(function() {
                var n = t(this),
                    i = n.data("bs.dropdown");
                i || n.data("bs.dropdown", i = new a(this)), "string" == typeof e && i[e].call(n)
            })
        }
        var o = ".dropdown-backdrop",
            r = '[data-toggle="dropdown"]',
            a = function(e) {
                t(e).on("click.bs.dropdown", this.toggle)
            };
        a.VERSION = "3.3.5", a.prototype.toggle = function(i) {
            var o = t(this);
            if (!o.is(".disabled, :disabled")) {
                var r = e(o),
                    a = r.hasClass("open");
                if (n(), !a) {
                    "ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                    var s = {
                        relatedTarget: this
                    };
                    if (r.trigger(i = t.Event("show.bs.dropdown", s)), i.isDefaultPrevented()) return;
                    o.trigger("focus").attr("aria-expanded", "true"), r.toggleClass("open").trigger("shown.bs.dropdown", s)
                }
                return !1
            }
        }, a.prototype.keydown = function(n) {
            if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
                var i = t(this);
                if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                    var o = e(i),
                        a = o.hasClass("open");
                    if (!a && 27 != n.which || a && 27 == n.which) return 27 == n.which && o.find(r).trigger("focus"), i.trigger("click");
                    var s = " li:not(.disabled):visible a",
                        l = o.find(".dropdown-menu" + s);
                    if (l.length) {
                        var c = l.index(n.target);
                        38 == n.which && c > 0 && c--, 40 == n.which && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
                    }
                }
            }
        };
        var s = t.fn.dropdown;
        t.fn.dropdown = i, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = s, this
        }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", r, a.prototype.toggle).on("keydown.bs.dropdown.data-api", r, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("bs.tab");
                o || i.data("bs.tab", o = new n(this)), "string" == typeof e && o[e]()
            })
        }
        var n = function(e) {
            this.element = t(e)
        };
        n.VERSION = "3.3.5", n.TRANSITION_DURATION = 150, n.prototype.show = function() {
            var e = this.element,
                n = e.closest("ul:not(.dropdown-menu)"),
                i = e.data("target");
            if (i || (i = (i = e.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
                var o = n.find(".active:last a"),
                    r = t.Event("hide.bs.tab", {
                        relatedTarget: e[0]
                    }),
                    a = t.Event("show.bs.tab", {
                        relatedTarget: o[0]
                    });
                if (o.trigger(r), e.trigger(a), !a.isDefaultPrevented() && !r.isDefaultPrevented()) {
                    var s = t(i);
                    this.activate(e.closest("li"), n), this.activate(s, s.parent(), function() {
                        o.trigger({
                            type: "hidden.bs.tab",
                            relatedTarget: e[0]
                        }), e.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: o[0]
                        })
                    })
                }
            }
        }, n.prototype.activate = function(e, i, o) {
            function r() {
                a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
            }
            var a = i.find("> .active"),
                s = o && t.support.transition && (a.length && a.hasClass("fade") || !!i.find("> .fade").length);
            a.length && s ? a.one("bsTransitionEnd", r).emulateTransitionEnd(n.TRANSITION_DURATION) : r(), a.removeClass("in")
        };
        var i = t.fn.tab;
        t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
            return t.fn.tab = i, this
        };
        var o = function(n) {
            n.preventDefault(), e.call(t(this), "show")
        };
        t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
    }(jQuery),
    function(t) {
        "use strict";

        function e() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var n in e)
                if (t.style[n] !== undefined) return {
                    end: e[n]
                };
            return !1
        }
        t.fn.emulateTransitionEnd = function(e) {
            var n = !1,
                i = this;
            return t(this).one("bsTransitionEnd", function() {
                n = !0
            }), setTimeout(function() {
                n || t(i).trigger(t.support.transition.end)
            }, e), this
        }, t(function() {
            t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            })
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(n, i) {
            this.$body = t(document.body), this.$scrollElement = t(n).is(document.body) ? t(window) : t(n), this.options = t.extend({}, e.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
        }

        function n(n) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("bs.scrollspy"),
                    r = "object" == typeof n && n;
                o || i.data("bs.scrollspy", o = new e(this, r)), "string" == typeof n && o[n]()
            })
        }
        e.VERSION = "3.3.5", e.DEFAULTS = {
            offset: 10
        }, e.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, e.prototype.refresh = function() {
            var e = this,
                n = "offset",
                i = 0;
            this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (n = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
                var e = t(this),
                    o = e.data("target") || e.attr("href"),
                    r = /^#./.test(o) && t(o);
                return r && r.length && r.is(":visible") && [
                    [r[n]().top + i, o]
                ] || null
            }).sort(function(t, e) {
                return t[0] - e[0]
            }).each(function() {
                e.offsets.push(this[0]), e.targets.push(this[1])
            })
        }, e.prototype.process = function() {
            var t, e = this.$scrollElement.scrollTop() + this.options.offset,
                n = this.getScrollHeight(),
                i = this.options.offset + n - this.$scrollElement.height(),
                o = this.offsets,
                r = this.targets,
                a = this.activeTarget;
            if (this.scrollHeight != n && this.refresh(), e >= i) return a != (t = r[r.length - 1]) && this.activate(t);
            if (a && e < o[0]) return this.activeTarget = null, this.clear();
            for (t = o.length; t--;) a != r[t] && e >= o[t] && (o[t + 1] === undefined || e < o[t + 1]) && this.activate(r[t])
        }, e.prototype.activate = function(e) {
            this.activeTarget = e, this.clear();
            var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
                i = t(n).parents("li").addClass("active");
            i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
        }, e.prototype.clear = function() {
            t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
        var i = t.fn.scrollspy;
        t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
            return t.fn.scrollspy = i, this
        }, t(window).on("load.bs.scrollspy.data-api", function() {
            t('[data-spy="scroll"]').each(function() {
                var e = t(this);
                n.call(e, e.data())
            })
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e, i) {
            return this.each(function() {
                var o = t(this),
                    r = o.data("bs.modal"),
                    a = t.extend({}, n.DEFAULTS, o.data(), "object" == typeof e && e);
                r || o.data("bs.modal", r = new n(this, a)), "string" == typeof e ? r[e](i) : a.show && r.show(i)
            })
        }
        var n = function(e, n) {
            this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        n.VERSION = "3.3.5", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, n.prototype.toggle = function(t) {
            return this.isShown ? this.hide() : this.show(t)
        }, n.prototype.show = function(e) {
            var i = this,
                o = t.Event("show.bs.modal", {
                    relatedTarget: e
                });
            this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                i.$element.one("mouseup.dismiss.bs.modal", function(e) {
                    t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var o = t.support.transition && i.$element.hasClass("fade");
                i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), o && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
                var r = t.Event("shown.bs.modal", {
                    relatedTarget: e
                });
                o ? i.$dialog.one("bsTransitionEnd", function() {
                    i.$element.trigger("focus").trigger(r)
                }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(r)
            }))
        }, n.prototype.hide = function(e) {
            e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
        }, n.prototype.enforceFocus = function() {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
            }, this))
        }, n.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, n.prototype.resize = function() {
            this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
        }, n.prototype.hideModal = function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
            })
        }, n.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, n.prototype.backdrop = function(e) {
            var i = this,
                o = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var r = t.support.transition && o;
                if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + o).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                        this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
                    }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
                r ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var a = function() {
                    i.removeBackdrop(), e && e()
                };
                t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
            } else e && e()
        }, n.prototype.handleUpdate = function() {
            this.adjustDialog()
        }, n.prototype.adjustDialog = function() {
            var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
            })
        }, n.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        }, n.prototype.checkScrollbar = function() {
            var t = window.innerWidth;
            if (!t) {
                var e = document.documentElement.getBoundingClientRect();
                t = e.right - Math.abs(e.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
        }, n.prototype.setScrollbar = function() {
            var t = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
        }, n.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        }, n.prototype.measureScrollbar = function() {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", this.$body.append(t);
            var e = t.offsetWidth - t.clientWidth;
            return this.$body[0].removeChild(t), e
        };
        var i = t.fn.modal;
        t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function() {
            return t.fn.modal = i, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
            var i = t(this),
                o = i.attr("href"),
                r = t(i.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                a = r.data("bs.modal") ? "toggle" : t.extend({
                    remote: !/#/.test(o) && o
                }, r.data(), i.data());
            i.is("a") && n.preventDefault(), r.one("show.bs.modal", function(t) {
                t.isDefaultPrevented() || r.one("hidden.bs.modal", function() {
                    i.is(":visible") && i.trigger("focus")
                })
            }), e.call(r, a, this)
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("bs.tooltip"),
                    r = "object" == typeof e && e;
                !o && /destroy|hide/.test(e) || (o || i.data("bs.tooltip", o = new n(this, r)), "string" == typeof e && o[e]())
            })
        }
        var n = function(t, e) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
        };
        n.VERSION = "3.3.5", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, n.prototype.init = function(e, n, i) {
            if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                    click: !1,
                    hover: !1,
                    focus: !1
                }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var o = this.options.trigger.split(" "), r = o.length; r--;) {
                var a = o[r];
                if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != a) {
                    var s = "hover" == a ? "mouseenter" : "focusin",
                        l = "hover" == a ? "mouseleave" : "focusout";
                    this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, n.prototype.getDefaults = function() {
            return n.DEFAULTS
        }, n.prototype.getOptions = function(e) {
            return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, n.prototype.getDelegateOptions = function() {
            var e = {},
                n = this.getDefaults();
            return this._options && t.each(this._options, function(t, i) {
                n[t] != i && (e[t] = i)
            }), e
        }, n.prototype.enter = function(e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState) n.hoverState = "in";
            else {
                if (clearTimeout(n.timeout), n.hoverState = "in", !n.options.delay || !n.options.delay.show) return n.show();
                n.timeout = setTimeout(function() {
                    "in" == n.hoverState && n.show()
                }, n.options.delay.show)
            }
        }, n.prototype.isInStateTrue = function() {
            for (var t in this.inState)
                if (this.inState[t]) return !0;
            return !1
        }, n.prototype.leave = function(e) {
            var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
            if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), !n.isInStateTrue()) {
                if (clearTimeout(n.timeout), n.hoverState = "out", !n.options.delay || !n.options.delay.hide) return n.hide();
                n.timeout = setTimeout(function() {
                    "out" == n.hoverState && n.hide()
                }, n.options.delay.hide)
            }
        }, n.prototype.show = function() {
            var e = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !i) return;
                var o = this,
                    r = this.tip(),
                    a = this.getUID(this.type);
                this.setContent(), r.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && r.addClass("fade");
                var s = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                    l = /\s?auto?\s?/i,
                    c = l.test(s);
                c && (s = s.replace(l, "") || "top"), r.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(s).data("bs." + this.type, this), this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
                var d = this.getPosition(),
                    u = r[0].offsetWidth,
                    h = r[0].offsetHeight;
                if (c) {
                    var p = s,
                        f = this.getPosition(this.$viewport);
                    s = "bottom" == s && d.bottom + h > f.bottom ? "top" : "top" == s && d.top - h < f.top ? "bottom" : "right" == s && d.right + u > f.width ? "left" : "left" == s && d.left - u < f.left ? "right" : s, r.removeClass(p).addClass(s)
                }
                var g = this.getCalculatedOffset(s, d, u, h);
                this.applyPlacement(g, s);
                var m = function() {
                    var t = o.hoverState;
                    o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
                };
                t.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", m).emulateTransitionEnd(n.TRANSITION_DURATION) : m()
            }
        }, n.prototype.applyPlacement = function(e, n) {
            var i = this.tip(),
                o = i[0].offsetWidth,
                r = i[0].offsetHeight,
                a = parseInt(i.css("margin-top"), 10),
                s = parseInt(i.css("margin-left"), 10);
            isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top += a, e.left += s, t.offset.setOffset(i[0], t.extend({
                using: function(t) {
                    i.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, e), 0), i.addClass("in");
            var l = i[0].offsetWidth,
                c = i[0].offsetHeight;
            "top" == n && c != r && (e.top = e.top + r - c);
            var d = this.getViewportAdjustedDelta(n, e, l, c);
            d.left ? e.left += d.left : e.top += d.top;
            var u = /top|bottom/.test(n),
                h = u ? 2 * d.left - o + l : 2 * d.top - r + c,
                p = u ? "offsetWidth" : "offsetHeight";
            i.offset(e), this.replaceArrow(h, i[0][p], u)
        }, n.prototype.replaceArrow = function(t, e, n) {
            this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
        }, n.prototype.setContent = function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, n.prototype.hide = function(e) {
            function i() {
                "in" != o.hoverState && r.detach(), o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), e && e()
            }
            var o = this,
                r = t(this.$tip),
                a = t.Event("hide.bs." + this.type);
            if (this.$element.trigger(a), !a.isDefaultPrevented()) return r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), this.hoverState = null, this
        }, n.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, n.prototype.hasContent = function() {
            return this.getTitle()
        }, n.prototype.getPosition = function(e) {
            var n = (e = e || this.$element)[0],
                i = "BODY" == n.tagName,
                o = n.getBoundingClientRect();
            null == o.width && (o = t.extend({}, o, {
                width: o.right - o.left,
                height: o.bottom - o.top
            }));
            var r = i ? {
                    top: 0,
                    left: 0
                } : e.offset(),
                a = {
                    scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
                },
                s = i ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, o, a, s, r)
        }, n.prototype.getCalculatedOffset = function(t, e, n, i) {
            return "bottom" == t ? {
                top: e.top + e.height,
                left: e.left + e.width / 2 - n / 2
            } : "top" == t ? {
                top: e.top - i,
                left: e.left + e.width / 2 - n / 2
            } : "left" == t ? {
                top: e.top + e.height / 2 - i / 2,
                left: e.left - n
            } : {
                top: e.top + e.height / 2 - i / 2,
                left: e.left + e.width
            }
        }, n.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
            var o = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return o;
            var r = this.options.viewport && this.options.viewport.padding || 0,
                a = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var s = e.top - r - a.scroll,
                    l = e.top + r - a.scroll + i;
                s < a.top ? o.top = a.top - s : l > a.top + a.height && (o.top = a.top + a.height - l)
            } else {
                var c = e.left - r,
                    d = e.left + r + n;
                c < a.left ? o.left = a.left - c : d > a.right && (o.left = a.left + a.width - d)
            }
            return o
        }, n.prototype.getTitle = function() {
            var t = this.$element,
                e = this.options;
            return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
        }, n.prototype.getUID = function(t) {
            do {
                t += ~~(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        }, n.prototype.tip = function() {
            if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
            return this.$tip
        }, n.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, n.prototype.enable = function() {
            this.enabled = !0
        }, n.prototype.disable = function() {
            this.enabled = !1
        }, n.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, n.prototype.toggle = function(e) {
            var n = this;
            e && ((n = t(e.currentTarget).data("bs." + this.type)) || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
        }, n.prototype.destroy = function() {
            var t = this;
            clearTimeout(this.timeout), this.hide(function() {
                t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
            })
        };
        var i = t.fn.tooltip;
        t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = i, this
        }
    }(jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("bs.popover"),
                    r = "object" == typeof e && e;
                !o && /destroy|hide/.test(e) || (o || i.data("bs.popover", o = new n(this, r)), "string" == typeof e && o[e]())
            })
        }
        var n = function(t, e) {
            this.init("popover", t, e)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        n.VERSION = "3.3.5", n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function() {
            return n.DEFAULTS
        }, n.prototype.setContent = function() {
            var t = this.tip(),
                e = this.getTitle(),
                n = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, n.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, n.prototype.getContent = function() {
            var t = this.$element,
                e = this.options;
            return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
        }, n.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var i = t.fn.popover;
        t.fn.popover = e, t.fn.popover.Constructor = n, t.fn.popover.noConflict = function() {
            return t.fn.popover = i, this
        }
    }(jQuery),
    /*!
     * imagesLoaded PACKAGED v3.1.2
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    /*!
     * EventEmitter v4.2.6 - git.io/ee
     * Oliver Caldwell
     * MIT license
     * @preserve
     */
    function() {
        function t() {}

        function e(t, e) {
            for (var n = t.length; n--;)
                if (t[n].listener === e) return n;
            return -1
        }

        function n(t) {
            return function() {
                return this[t].apply(this, arguments)
            }
        }
        var i = t.prototype,
            o = this,
            r = o.EventEmitter;
        i.getListeners = function(t) {
            var e, n, i = this._getEvents();
            if ("object" == typeof t)
                for (n in e = {}, i) i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n]);
            else e = i[t] || (i[t] = []);
            return e
        }, i.flattenListeners = function(t) {
            var e, n = [];
            for (e = 0; e < t.length; e += 1) n.push(t[e].listener);
            return n
        }, i.getListenersAsObject = function(t) {
            var e, n = this.getListeners(t);
            return n instanceof Array && ((e = {})[t] = n), e || n
        }, i.addListener = function(t, n) {
            var i, o = this.getListenersAsObject(t),
                r = "object" == typeof n;
            for (i in o) o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(r ? n : {
                listener: n,
                once: !1
            });
            return this
        }, i.on = n("addListener"), i.addOnceListener = function(t, e) {
            return this.addListener(t, {
                listener: e,
                once: !0
            })
        }, i.once = n("addOnceListener"), i.defineEvent = function(t) {
            return this.getListeners(t), this
        }, i.defineEvents = function(t) {
            for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
            return this
        }, i.removeListener = function(t, n) {
            var i, o, r = this.getListenersAsObject(t);
            for (o in r) r.hasOwnProperty(o) && -1 !== (i = e(r[o], n)) && r[o].splice(i, 1);
            return this
        }, i.off = n("removeListener"), i.addListeners = function(t, e) {
            return this.manipulateListeners(!1, t, e)
        }, i.removeListeners = function(t, e) {
            return this.manipulateListeners(!0, t, e)
        }, i.manipulateListeners = function(t, e, n) {
            var i, o, r = t ? this.removeListener : this.addListener,
                a = t ? this.removeListeners : this.addListeners;
            if ("object" != typeof e || e instanceof RegExp)
                for (i = n.length; i--;) r.call(this, e, n[i]);
            else
                for (i in e) e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? r.call(this, i, o) : a.call(this, i, o));
            return this
        }, i.removeEvent = function(t) {
            var e, n = typeof t,
                i = this._getEvents();
            if ("string" === n) delete i[t];
            else if ("object" === n)
                for (e in i) i.hasOwnProperty(e) && t.test(e) && delete i[e];
            else delete this._events;
            return this
        }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(t, e) {
            var n, i, o, r = this.getListenersAsObject(t);
            for (o in r)
                if (r.hasOwnProperty(o))
                    for (i = r[o].length; i--;) !0 === (n = r[o][i]).once && this.removeListener(t, n.listener), n.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, n.listener);
            return this
        }, i.trigger = n("emitEvent"), i.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(t, e)
        }, i.setOnceReturnValue = function(t) {
            return this._onceReturnValue = t, this
        }, i._getOnceReturnValue = function() {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, i._getEvents = function() {
            return this._events || (this._events = {})
        }, t.noConflict = function() {
            return o.EventEmitter = r, t
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
            return t
        }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
    }.call(this),
    /*!
     * eventie v1.0.4
     * event binding helper
     *   eventie.bind( elem, 'click', myFn )
     *   eventie.unbind( elem, 'click', myFn )
     */
    function(t) {
        function e(e) {
            var n = t.event;
            return n.target = n.target || n.srcElement || e, n
        }
        var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(t, e, n) {
            t.addEventListener(e, n, !1)
        } : n.attachEvent && (i = function(t, n, i) {
            t[n + i] = i.handleEvent ? function() {
                var n = e(t);
                i.handleEvent.call(i, n)
            } : function() {
                var n = e(t);
                i.call(t, n)
            }, t.attachEvent("on" + n, t[n + i])
        });
        var o = function() {};
        n.removeEventListener ? o = function(t, e, n) {
            t.removeEventListener(e, n, !1)
        } : n.detachEvent && (o = function(t, e, n) {
            t.detachEvent("on" + e, t[e + n]);
            try {
                delete t[e + n]
            } catch (i) {
                t[e + n] = undefined
            }
        });
        var r = {
            bind: i,
            unbind: o
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", r) : t.eventie = r
    }(this),
    /*!
     * imagesLoaded v3.1.2
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    function(t) {
        function e(t, e) {
            for (var n in e) t[n] = e[n];
            return t
        }

        function n(t) {
            return "[object Array]" === l.call(t)
        }

        function i(t) {
            var e = [];
            if (n(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0, o = t.length; i < o; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function o(t, n) {
            function o(t, n, a) {
                if (!(this instanceof o)) return new o(t, n);
                "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = i(t), this.options = e({}, this.options), "function" == typeof n ? a = n : e(this.options, n), a && this.on("always", a), this.getImages(), r && (this.jqDeferred = new r.Deferred);
                var s = this;
                setTimeout(function() {
                    s.check()
                })
            }

            function l(t) {
                this.img = t
            }

            function c(t) {
                this.src = t, d[t] = this
            }
            o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function() {
                this.images = [];
                for (var t = 0, e = this.elements.length; t < e; t++) {
                    var n = this.elements[t];
                    "IMG" === n.nodeName && this.addImage(n);
                    for (var i = n.querySelectorAll("img"), o = 0, r = i.length; o < r; o++) {
                        var a = i[o];
                        this.addImage(a)
                    }
                }
            }, o.prototype.addImage = function(t) {
                var e = new l(t);
                this.images.push(e)
            }, o.prototype.check = function() {
                function t(t, o) {
                    return e.options.debug && s && a.log("confirm", t, o), e.progress(t), ++n === i && e.complete(), !0
                }
                var e = this,
                    n = 0,
                    i = this.images.length;
                if (this.hasAnyBroken = !1, i)
                    for (var o = 0; o < i; o++) {
                        var r = this.images[o];
                        r.on("confirm", t), r.check()
                    } else this.complete()
            }, o.prototype.progress = function(t) {
                this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
                var e = this;
                setTimeout(function() {
                    e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t)
                })
            }, o.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var e = this;
                setTimeout(function() {
                    if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                        var n = e.hasAnyBroken ? "reject" : "resolve";
                        e.jqDeferred[n](e)
                    }
                })
            }, r && (r.fn.imagesLoaded = function(t, e) {
                return new o(this, t, e).jqDeferred.promise(r(this))
            }), l.prototype = new t, l.prototype.check = function() {
                var t = d[this.img.src] || new c(this.img.src);
                if (t.isConfirmed) this.confirm(t.isLoaded, "cached was confirmed");
                else if (this.img.complete && this.img.naturalWidth !== undefined) this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
                else {
                    var e = this;
                    t.on("confirm", function(t, n) {
                        return e.confirm(t.isLoaded, n), !0
                    }), t.check()
                }
            }, l.prototype.confirm = function(t, e) {
                this.isLoaded = t, this.emit("confirm", this, e)
            };
            var d = {};
            return c.prototype = new t, c.prototype.check = function() {
                if (!this.isChecked) {
                    var t = new Image;
                    n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.src, this.isChecked = !0
                }
            }, c.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, c.prototype.onload = function(t) {
                this.confirm(!0, "onload"), this.unbindProxyEvents(t)
            }, c.prototype.onerror = function(t) {
                this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
            }, c.prototype.confirm = function(t, e) {
                this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
            }, c.prototype.unbindProxyEvents = function(t) {
                n.unbind(t.target, "load", this), n.unbind(t.target, "error", this)
            }, o
        }
        var r = t.jQuery,
            a = t.console,
            s = void 0 !== a,
            l = Object.prototype.toString;
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], o) : t.imagesLoaded = o(t.EventEmitter, t.eventie)
    }(window),
    /*!
     * jQuery Mobile Events
     * by Ben Major (www.ben-major.co.uk)
     *
     * Copyright 2011, Ben Major
     * Licensed under the MIT License:
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     * 
     */
    function(t) {
        function e() {
            var t = a();
            t !== s && (s = t, d.trigger("orientationchange"))
        }

        function n(e, n, i, o) {
            var r = i.type;
            i.type = n, t.event.dispatch.call(e, i, o), i.type = r
        }
        t.attrFn = t.attrFn || {};
        var i = navigator.userAgent.toLowerCase(),
            o = i.indexOf("chrome") > -1 && (i.indexOf("windows") > -1 || i.indexOf("macintosh") > -1 || i.indexOf("linux") > -1) && i.indexOf("mobile") < 0 && i.indexOf("nexus") < 0,
            r = {
                tap_pixel_range: 5,
                swipe_h_threshold: 50,
                swipe_v_threshold: 50,
                taphold_threshold: 750,
                doubletap_int: 500,
                touch_capable: "ontouchstart" in document.documentElement && !o,
                orientation_support: "orientation" in window && "onorientationchange" in window,
                startevent: "ontouchstart" in document.documentElement && !o ? "touchstart" : "mousedown",
                endevent: "ontouchstart" in document.documentElement && !o ? "touchend" : "mouseup",
                moveevent: "ontouchstart" in document.documentElement && !o ? "touchmove" : "mousemove",
                tapevent: "ontouchstart" in document.documentElement && !o ? "tap" : "click",
                scrollevent: "ontouchstart" in document.documentElement && !o ? "touchmove" : "scroll",
                hold_timer: null,
                tap_timer: null
            };
        t.isTouchCapable = function() {
            return r.touch_capable
        }, t.getStartEvent = function() {
            return r.startevent
        }, t.getEndEvent = function() {
            return r.endevent
        }, t.getMoveEvent = function() {
            return r.moveevent
        }, t.getTapEvent = function() {
            return r.tapevent
        }, t.getScrollEvent = function() {
            return r.scrollevent
        }, t.each(["tapstart", "tapend", "tap", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(e, n) {
            t.fn[n] = function(t) {
                return t ? this.on(n, t) : this.trigger(n)
            }, t.attrFn[n] = !0
        }), t.event.special.tapstart = {
            setup: function() {
                var e = this,
                    i = t(e);
                i.on(r.startevent, function(t) {
                    if (i.data("callee", arguments.callee), t.which && 1 !== t.which) return !1;
                    var o = t.originalEvent,
                        a = {
                            position: {
                                x: r.touch_capable ? o.touches[0].screenX : t.screenX,
                                y: r.touch_capable ? o.touches[0].screenY : t.screenY
                            },
                            offset: {
                                x: r.touch_capable ? o.touches[0].pageX - o.touches[0].target.offsetLeft : t.offsetX,
                                y: r.touch_capable ? o.touches[0].pageY - o.touches[0].target.offsetTop : t.offsetY
                            },
                            time: (new Date).getTime(),
                            target: t.target
                        };
                    return n(e, "tapstart", t, a), !0
                })
            },
            remove: function() {
                t(this).off(r.startevent, t(this).data.callee)
            }
        }, t.event.special.tapmove = {
            setup: function() {
                var e = this,
                    i = t(e);
                i.on(r.moveevent, function(t) {
                    i.data("callee", arguments.callee);
                    var o = t.originalEvent,
                        a = {
                            position: {
                                x: r.touch_capable ? o.touches[0].screenX : t.screenX,
                                y: r.touch_capable ? o.touches[0].screenY : t.screenY
                            },
                            offset: {
                                x: r.touch_capable ? o.touches[0].pageX - o.touches[0].target.offsetLeft : t.offsetX,
                                y: r.touch_capable ? o.touches[0].pageY - o.touches[0].target.offsetTop : t.offsetY
                            },
                            time: (new Date).getTime(),
                            target: t.target
                        };
                    return n(e, "tapmove", t, a), !0
                })
            },
            remove: function() {
                t(this).off(r.moveevent, t(this).data.callee)
            }
        }, t.event.special.tapend = {
            setup: function() {
                var e = this,
                    i = t(e);
                i.on(r.endevent, function(t) {
                    i.data("callee", arguments.callee);
                    var o = t.originalEvent,
                        a = {
                            position: {
                                x: r.touch_capable ? o.changedTouches[0].screenX : t.screenX,
                                y: r.touch_capable ? o.changedTouches[0].screenY : t.screenY
                            },
                            offset: {
                                x: r.touch_capable ? o.changedTouches[0].pageX - o.changedTouches[0].target.offsetLeft : t.offsetX,
                                y: r.touch_capable ? o.changedTouches[0].pageY - o.changedTouches[0].target.offsetTop : t.offsetY
                            },
                            time: (new Date).getTime(),
                            target: t.target
                        };
                    return n(e, "tapend", t, a), !0
                })
            },
            remove: function() {
                t(this).off(r.endevent, t(this).data.callee)
            }
        }, t.event.special.taphold = {
            setup: function() {
                var e, i = this,
                    o = t(i),
                    a = {
                        x: 0,
                        y: 0
                    };
                o.on(r.startevent, function(t) {
                    if (t.which && 1 !== t.which) return !1;
                    o.data("tapheld", !1), e = t.target;
                    var s = t.originalEvent,
                        l = (new Date).getTime(),
                        c = {
                            x: r.touch_capable ? s.touches[0].screenX : t.screenX,
                            y: r.touch_capable ? s.touches[0].screenY : t.screenY
                        },
                        d = {
                            x: r.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : t.offsetX,
                            y: r.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : t.offsetY
                        };
                    return a.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX, a.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY, r.hold_timer = window.setTimeout(function() {
                        var u = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX,
                            h = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY;
                        if (t.target == e && a.x == u && a.y == h) {
                            o.data("tapheld", !0);
                            var p = (new Date).getTime(),
                                f = {
                                    x: r.touch_capable ? s.touches[0].screenX : t.screenX,
                                    y: r.touch_capable ? s.touches[0].screenY : t.screenY
                                },
                                g = {
                                    x: r.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : t.offsetX,
                                    y: r.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : t.offsetY
                                };
                            duration = p - l;
                            var m = {
                                startTime: l,
                                endTime: p,
                                startPosition: c,
                                startOffset: d,
                                endPosition: f,
                                endOffset: g,
                                duration: duration,
                                target: t.target
                            };
                            o.data("callee1", arguments.callee), n(i, "taphold", t, m)
                        }
                    }, r.taphold_threshold), !0
                }).on(r.endevent, function() {
                    o.data("callee2", arguments.callee), o.data("tapheld", !1), window.clearTimeout(r.hold_timer)
                })
            },
            remove: function() {
                t(this).off(r.startevent, t(this).data.callee1).off(r.endevent, t(this).data.callee2)
            }
        }, t.event.special.doubletap = {
            setup: function() {
                var e, i, o, a, s = this,
                    l = t(s);
                l.on(r.startevent, function(t) {
                    return (!t.which || 1 === t.which) && (l.data("lastTouch") ? void 0 : (l.data("doubletapped", !1), e = t.target, l.data("callee1", arguments.callee), a = t.originalEvent, o = {
                        position: {
                            x: r.touch_capable ? a.touches[0].screenX : t.screenX,
                            y: r.touch_capable ? a.touches[0].screenY : t.screenY
                        },
                        offset: {
                            x: r.touch_capable ? a.touches[0].pageX - a.touches[0].target.offsetLeft : t.offsetX,
                            y: r.touch_capable ? a.touches[0].pageY - a.touches[0].target.offsetTop : t.offsetY
                        },
                        time: (new Date).getTime(),
                        target: t.target
                    }, !0))
                }).on(r.endevent, function(t) {
                    var a = (new Date).getTime(),
                        c = a - (l.data("lastTouch") || a + 1);
                    if (window.clearTimeout(i), l.data("callee2", arguments.callee), c < r.doubletap_int && c > 0 && t.target == e && c > 100) {
                        l.data("doubletapped", !0), window.clearTimeout(r.tap_timer);
                        var d = {
                                position: {
                                    x: r.touch_capable ? t.originalEvent.touches[0].screenX : t.screenX,
                                    y: r.touch_capable ? t.originalEvent.touches[0].screenY : t.screenY
                                },
                                offset: {
                                    x: r.touch_capable ? t.originalEvent.touches[0].pageX - t.originalEvent.touches[0].target.offsetLeft : t.offsetX,
                                    y: r.touch_capable ? t.originalEvent.touches[0].pageY - t.originalEvent.touches[0].target.offsetTop : t.offsetY
                                },
                                time: (new Date).getTime(),
                                target: t.target
                            },
                            u = {
                                firstTap: o,
                                secondTap: d,
                                interval: d.time - o.time
                            };
                        n(s, "doubletap", t, u)
                    } else l.data("lastTouch", a), i = window.setTimeout(function() {
                        window.clearTimeout(i)
                    }, r.doubletap_int, [t]);
                    l.data("lastTouch", a)
                })
            },
            remove: function() {
                t(this).off(r.startevent, t(this).data.callee1).off(r.endevent, t(this).data.callee2)
            }
        }, t.event.special.singletap = {
            setup: function() {
                var e = this,
                    i = t(e),
                    o = null,
                    a = null,
                    s = {
                        x: 0,
                        y: 0
                    };
                i.on(r.startevent, function(t) {
                    return (!t.which || 1 === t.which) && (a = (new Date).getTime(), o = t.target, i.data("callee1", arguments.callee), s.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX, s.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY, !0)
                }).on(r.endevent, function(t) {
                    i.data("callee2", arguments.callee), t.target == o && (end_pos_x = t.originalEvent.changedTouches ? t.originalEvent.changedTouches[0].pageX : t.pageX, end_pos_y = t.originalEvent.changedTouches ? t.originalEvent.changedTouches[0].pageY : t.pageY, r.tap_timer = window.setTimeout(function() {
                        if (!i.data("doubletapped") && !i.data("tapheld") && s.x == end_pos_x && s.y == end_pos_y) {
                            var o = t.originalEvent,
                                l = {
                                    position: {
                                        x: r.touch_capable ? o.changedTouches[0].screenX : t.screenX,
                                        y: r.touch_capable ? o.changedTouches[0].screenY : t.screenY
                                    },
                                    offset: {
                                        x: r.touch_capable ? o.changedTouches[0].pageX - o.changedTouches[0].target.offsetLeft : t.offsetX,
                                        y: r.touch_capable ? o.changedTouches[0].pageY - o.changedTouches[0].target.offsetTop : t.offsetY
                                    },
                                    time: (new Date).getTime(),
                                    target: t.target
                                };
                            l.time - a < r.taphold_threshold && n(e, "singletap", t, l)
                        }
                    }, r.doubletap_int))
                })
            },
            remove: function() {
                t(this).off(r.startevent, t(this).data.callee1).off(r.endevent, t(this).data.callee2)
            }
        }, t.event.special.tap = {
            setup: function() {
                var e, i = this,
                    o = t(i),
                    a = !1,
                    s = null,
                    l = {
                        x: 0,
                        y: 0
                    };
                o.on(r.startevent, function(t) {
                    return o.data("callee1", arguments.callee), (!t.which || 1 === t.which) && (a = !0, l.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX, l.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY, e = (new Date).getTime(), s = t.target, !0)
                }).on(r.endevent, function(t) {
                    o.data("callee2", arguments.callee);
                    var c = t.originalEvent.targetTouches ? t.originalEvent.changedTouches[0].pageX : t.pageX,
                        d = t.originalEvent.targetTouches ? t.originalEvent.changedTouches[0].pageY : t.pageY;
                    if (diff_x = l.x - c, diff_y = l.y - d, s == t.target && a && (new Date).getTime() - e < r.taphold_threshold && (l.x == c && l.y == d || diff_x >= -r.tap_pixel_range && diff_x <= r.tap_pixel_range && diff_y >= -r.tap_pixel_range && diff_y <= r.tap_pixel_range)) {
                        var u = t.originalEvent,
                            h = {
                                position: {
                                    x: r.touch_capable ? u.changedTouches[0].screenX : t.screenX,
                                    y: r.touch_capable ? u.changedTouches[0].screenY : t.screenY
                                },
                                offset: {
                                    x: r.touch_capable ? u.changedTouches[0].pageX - u.changedTouches[0].target.offsetLeft : t.offsetX,
                                    y: r.touch_capable ? u.changedTouches[0].pageY - u.changedTouches[0].target.offsetTop : t.offsetY
                                },
                                time: (new Date).getTime(),
                                target: t.target
                            };
                        n(i, "tap", t, h)
                    }
                })
            },
            remove: function() {
                t(this).off(r.startevent, t(this).data.callee1).off(r.endevent, t(this).data.callee2)
            }
        }, t.event.special.swipe = {
            setup: function() {
                function e(e) {
                    (a = t(e.target)).data("callee1", arguments.callee), c.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, c.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, d.x = c.x, d.y = c.y, s = !0;
                    var n = e.originalEvent;
                    o = {
                        position: {
                            x: r.touch_capable ? n.touches[0].screenX : e.screenX,
                            y: r.touch_capable ? n.touches[0].screenY : e.screenY
                        },
                        offset: {
                            x: r.touch_capable ? n.touches[0].pageX - n.touches[0].target.offsetLeft : e.offsetX,
                            y: r.touch_capable ? n.touches[0].pageY - n.touches[0].target.offsetTop : e.offsetY
                        },
                        time: (new Date).getTime(),
                        target: e.target
                    };
                    for (var i = new Date; new Date - i < 100;);
                }

                function n(e) {
                    var n;
                    (a = t(e.target)).data("callee2", arguments.callee), d.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, d.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, window.clearTimeout(r.hold_timer);
                    var i = a.data("xthreshold"),
                        u = a.data("ythreshold"),
                        h = void 0 !== i && !1 !== i && parseInt(i) ? parseInt(i) : r.swipe_h_threshold,
                        p = void 0 !== u && !1 !== u && parseInt(u) ? parseInt(u) : r.swipe_v_threshold;
                    if (c.y > d.y && c.y - d.y > p && (n = "swipeup"), c.x < d.x && d.x - c.x > h && (n = "swiperight"), c.y < d.y && d.y - c.y > p && (n = "swipedown"), c.x > d.x && c.x - d.x > h && (n = "swipeleft"), n != undefined && s) {
                        c.x = 0, c.y = 0, d.x = 0, d.y = 0, s = !1;
                        var f = e.originalEvent;
                        endEvnt = {
                            position: {
                                x: r.touch_capable ? f.touches[0].screenX : e.screenX,
                                y: r.touch_capable ? f.touches[0].screenY : e.screenY
                            },
                            offset: {
                                x: r.touch_capable ? f.touches[0].pageX - f.touches[0].target.offsetLeft : e.offsetX,
                                y: r.touch_capable ? f.touches[0].pageY - f.touches[0].target.offsetTop : e.offsetY
                            },
                            time: (new Date).getTime(),
                            target: e.target
                        };
                        var g = Math.abs(o.position.x - endEvnt.position.x),
                            m = Math.abs(o.position.y - endEvnt.position.y),
                            v = {
                                startEvnt: o,
                                endEvnt: endEvnt,
                                direction: n.replace("swipe", ""),
                                xAmount: g,
                                yAmount: m,
                                duration: endEvnt.time - o.time
                            };
                        l = !0, a.trigger("swipe", v).trigger(n, v)
                    }
                }

                function i(e) {
                    var n = "";
                    if ((a = t(e.target)).data("callee3", arguments.callee), l) {
                        var i = a.data("xthreshold"),
                            c = a.data("ythreshold"),
                            d = void 0 !== i && !1 !== i && parseInt(i) ? parseInt(i) : r.swipe_h_threshold,
                            u = void 0 !== c && !1 !== c && parseInt(c) ? parseInt(c) : r.swipe_v_threshold,
                            h = e.originalEvent;
                        endEvnt = {
                            position: {
                                x: r.touch_capable ? h.changedTouches[0].screenX : e.screenX,
                                y: r.touch_capable ? h.changedTouches[0].screenY : e.screenY
                            },
                            offset: {
                                x: r.touch_capable ? h.changedTouches[0].pageX - h.changedTouches[0].target.offsetLeft : e.offsetX,
                                y: r.touch_capable ? h.changedTouches[0].pageY - h.changedTouches[0].target.offsetTop : e.offsetY
                            },
                            time: (new Date).getTime(),
                            target: e.target
                        }, o.position.y > endEvnt.position.y && o.position.y - endEvnt.position.y > u && (n = "swipeup"), o.position.x < endEvnt.position.x && endEvnt.position.x - o.position.x > d && (n = "swiperight"), o.position.y < endEvnt.position.y && endEvnt.position.y - o.position.y > u && (n = "swipedown"), o.position.x > endEvnt.position.x && o.position.x - endEvnt.position.x > d && (n = "swipeleft");
                        var p = Math.abs(o.position.x - endEvnt.position.x),
                            f = Math.abs(o.position.y - endEvnt.position.y),
                            g = {
                                startEvnt: o,
                                endEvnt: endEvnt,
                                direction: n.replace("swipe", ""),
                                xAmount: p,
                                yAmount: f,
                                duration: endEvnt.time - o.time
                            };
                        a.trigger("swipeend", g)
                    }
                    s = !1, l = !1
                }
                var o, a = t(this),
                    s = !1,
                    l = !1,
                    c = {
                        x: 0,
                        y: 0
                    },
                    d = {
                        x: 0,
                        y: 0
                    };
                a.on(r.startevent, e), a.on(r.moveevent, n), a.on(r.endevent, i)
            },
            remove: function() {
                t(this).off(r.startevent, t(this).data.callee1).off(r.moveevent, t(this).data.callee2).off(r.endevent, t(this).data.callee3)
            }
        }, t.event.special.scrollstart = {
            setup: function() {
                function e(t, e) {
                    n(a, (i = e) ? "scrollstart" : "scrollend", t)
                }
                var i, o, a = this,
                    s = t(a);
                s.on(r.scrollevent, function(t) {
                    s.data("callee", arguments.callee), i || e(t, !0), clearTimeout(o), o = setTimeout(function() {
                        e(t, !1)
                    }, 50)
                })
            },
            remove: function() {
                t(this).off(r.scrollevent, t(this).data.callee)
            }
        };
        var a, s, l, c, d = t(window),
            u = {
                0: !0,
                180: !0
            };
        if (r.orientation_support) {
            var h = window.innerWidth || t(window).width(),
                p = window.innerHeight || t(window).height();
            l = h > p && h - p > 50, c = u[window.orientation], (l && c || !l && !c) && (u = {
                "-90": !0,
                90: !0
            })
        }
        t.event.special.orientationchange = {
            setup: function() {
                return !r.orientation_support && (s = a(), d.on("throttledresize", e), !0)
            },
            teardown: function() {
                return !r.orientation_support && (d.off("throttledresize", e), !0)
            },
            add: function(t) {
                var e = t.handler;
                t.handler = function(t) {
                    return t.orientation = a(), e.apply(this, arguments)
                }
            }
        }, t.event.special.orientationchange.orientation = a = function() {
            var t = document.documentElement;
            return (r.orientation_support ? u[window.orientation] : t && t.clientWidth / t.clientHeight < 1.1) ? "portrait" : "landscape"
        }, t.event.special.throttledresize = {
            setup: function() {
                t(this).on("resize", b)
            },
            teardown: function() {
                t(this).off("resize", b)
            }
        };
        var f, g, m, v = 250,
            b = function() {
                g = (new Date).getTime(), (m = g - y) >= v ? (y = g, t(this).trigger("throttledresize")) : (f && window.clearTimeout(f), f = window.setTimeout(e, v - m))
            },
            y = 0;
        t.each({
            scrollend: "scrollstart",
            swipeup: "swipe",
            swiperight: "swipe",
            swipedown: "swipe",
            swipeleft: "swipe",
            swipeend: "swipe"
        }, function(e, n) {
            t.event.special[e] = {
                setup: function() {
                    t(this).on(n, t.noop)
                }
            }
        })
    }(jQuery),
    function() {
        $(document).on("change", "[data-select-make]", function() {
            var t, e;
            return (t = $(this.getAttribute("data-select-make"))).children("option:gt(0)").remove(), "" !== (e = this.value) ? $.get("/contact/models", {
                make_id: this.value
            }, function(n) {
                var i, o, r, a, s;
                for (t.get(0).setAttribute("data-make-id", e), n.length > 0 && t.removeAttr("disabled"), s = [], i = 0, r = n.length; i < r; i++) o = n[i], a = $("<option>").val(o.id).text(o.name), s.push(a.appendTo(t));
                return s
            }) : t.attr("disabled", "disabled")
        }).on("change", "[data-select-model]", function() {
            var t, e;
            return e = this.getAttribute("data-make-id"), (t = $(this.getAttribute("data-select-model"))).children("option:gt(0)").remove(), "" !== this.value ? $.get("/contact/sub_models", {
                make_id: e,
                model_id: this.value
            }, function(e) {
                var n, i, o, r, a;
                for (e.length > 0 && t.removeAttr("disabled"), a = [], n = 0, o = e.length; n < o; n++) i = e[n], r = $("<option>").val(i.id).text(i.name), a.push(r.appendTo(t));
                return a
            }) : $models.attr("disabled", "disabled")
        }).on("change", "#contact_vehicle_requests_attributes_0_make_id", function() {
            var t;
            return (t = $("#contact_vehicle_requests_attributes_0_model_id")).children("option:gt(0)").remove(), "" !== this.value ? $.get("/contact/models", {
                make_id: this.value
            }, function(e) {
                var n, i, o, r, a;
                for (e.length > 0 && t.removeAttr("disabled"), a = [], n = 0, o = e.length; n < o; n++) i = e[n], r = $("<option>").val(i.id).text(i.name), a.push(r.appendTo(t));
                return a
            }) : t.attr("disabled", "disabled")
        }).on("change", "#contact_vehicle_requests_attributes_1_make_id", function() {
            var t;
            return (t = $("#contact_vehicle_requests_attributes_1_model_id")).children("option:gt(0)").remove(), "" !== this.value ? $.get("/contact/models", {
                make_id: this.value
            }, function(e) {
                var n, i, o, r, a;
                for (e.length > 0 && t.removeAttr("disabled"), a = [], n = 0, o = e.length; n < o; n++) i = e[n], r = $("<option>").val(i.id).text(i.name), a.push(r.appendTo(t));
                return a
            }) : t.attr("disabled", "disabled")
        }).on("change", "#contact_vehicle_requests_attributes_2_make_id", function() {
            var t;
            return (t = $("#contact_vehicle_requests_attributes_2_model_id")).children("option:gt(0)").remove(), "" !== this.value ? $.get("/contact/models", {
                make_id: this.value
            }, function(e) {
                var n, i, o, r, a;
                for (e.length > 0 && t.removeAttr("disabled"), a = [], n = 0, o = e.length; n < o; n++) i = e[n], r = $("<option>").val(i.id).text(i.name), a.push(r.appendTo(t));
                return a
            }) : t.attr("disabled", "disabled")
        }).on("change", "#contact_make_id", function() {
            var t;
            return (t = $("#contact_model_id")).children("option:gt(0)").remove(), "" !== this.value ? $.get("/contact/models", {
                make_id: this.value
            }, function(e) {
                var n, i, o, r, a;
                for (e.length > 0 && t.removeAttr("disabled"), a = [], n = 0, o = e.length; n < o; n++) i = e[n], r = $("<option>").val(i.id).text(i.name), a.push(r.appendTo(t));
                return a
            }) : t.attr("disabled", "disabled")
        })
    }.call(this),
    function() {
        $(document).on("change", "#q_make_eq", function() {
            var t, e;
            return (t = $("#q_model_eq")).children("option:gt(0)").remove(), e = $(this).parents("form:first").data("filter") || {}, "" !== this.value ? $.get("/vehicles/models", {
                filter: e,
                make: this.value
            }, function(e) {
                var n, i, o, r, a;
                for (e.length > 0 && t.removeAttr("disabled"), a = [], n = 0, o = e.length; n < o; n++) i = e[n], r = $("<option>").val(i).text(i), a.push(r.appendTo(t));
                return a
            }) : t.attr("disabled", "disabled")
        })
    }.call(this),
    function() {
        var t;
        t = function(t, e, n) {
            var i, o, r, a, s;
            i = (o = e.children("a:first")).children("img:first"), r = o.next(".rotating-vehicle-name"), a = e.find(".rotating-vehicle-price"), s = n.name.join(" ").trim(), i.attr({
                src: n.img,
                alt: s
            }), o.attr({
                href: n.url,
                title: s,
                alt: s
            }), r.text(s), a.text(null != n.price ? n.price : "")
        }, $(function() {
            return $(".rotating-inventory[data-vehicles]").each(function() {
                var e, n, i, o, r, a;
                n = $(this), e = $(this).find(".list > .col"), i = e.size(), r = n.data("vehicles"), o = 0, a = function() {
                    var a, s, l, c, d, u, h, p, f, g;
                    for (l = [], c = d = p = o, f = o + i; p <= f ? d < f : d > f; c = p <= f ? ++d : --d) c >= r.length ? l.push(r[c - r.length]) : l.push(r[c]);
                    for (g = [], a = u = 0, h = l.length; u < h; a = ++u) s = l[a], g.push(t(n, e.eq(a), s));
                    return g
                }, n.children("a.previous-link").on("click", function(t) {
                    return t.preventDefault(), o = 0 === o ? r.length - 1 : o - 1, a()
                }), n.children("a.next-link").on("click", function(t) {
                    return t.preventDefault(), o = o >= r.length - 1 ? 0 : o + 1, a()
                })
            })
        })
    }.call(this),
    function() {
        $(document).on("ajax:error", "form.contact_form", function(t, e) {
            return $(this).replaceWith(e.responseText)
        }), $(document).on("ajax:success", "form.contact_form", function() {
            return $(this).slideUp(400), $(this).next(".contact-success").delay(500).fadeIn()
        }), $(document).on("ajax:send", "form.contact_form", function() {
            return $(this).find("input[type=submit]").attr("disabled", "disabled")
        })
    }.call(this),
    function() {
        $(function() {
            return $("#jump-to-top").on("click", function() {
                return $("html,body").animate({
                    scrollTop: $("body").offset().top
                }, 1e3)
            })
        })
    }.call(this), window.__onLoadRecaptcha = window.__onLoadRecaptcha || function() {
        $(".invisible-recaptcha-container").each(function() {
            function t() {
                var t = grecaptcha.render(s, {
                    sitekey: o,
                    callback: e,
                    size: "invisible"
                });
                r.data("recaptcha-rendered", t)
            }

            function e(t) {
                r.data("recaptcha-token", t), a.data("remote") ? a.trigger("submit.rails") : (a.off("submit", n), a.submit())
            }

            function n(e) {
                e.preventDefault(), r.data("recaptcha-rendered") || t(), grecaptcha.execute(r.data("recaptcha-rendered"))
            }

            function i(t, e) {
                return !!r.data("recaptcha-token") && (e.setRequestHeader("X-Recaptcha-Token", l), !0)
            }
            var o = "6Le7LDgUAAAAAFt86MPjPyNmq8cqoYakXmNalzg_",
                r = $(this);
            if (!r.data("initialized")) {
                r.data("initialized", !0);
                var a = r.parents("form:first");
                if (a.length) {
                    var s = this,
                        l = null,
                        c = $(c).get(0);
                    a.on("submit", n), a.on("ajax:beforeSend", i)
                } else console.error("failed to find form for invisible recaptcha", this)
            }
        }), $(".recaptcha_v2").each(function() {
            function t() {
                var t = grecaptcha.render(r, {
                    sitekey: n
                });
                i.data("recaptcha-rendered", t)
            }

            function e() {
                if (0 === grecaptcha.getResponse(i.data("recaptcha-rendered")).length) return $(".recaptcha-error").removeClass("hidden"), !1
            }
            var n = "6LegMhETAAAAADIOt7KZGTt3yITaIyqoGEZY3e6l",
                i = $(this);
            if (!i.data("initialized")) {
                i.data("initialized", !0);
                var o = i.parents("form:first");
                if (o.length) {
                    var r = this,
                        a = $(a).get(0);
                    i.data("recaptcha-rendered") || t(), o.on("submit", e)
                } else console.error("failed to find form for recaptcha", this)
            }
        })
    }, $(document).on("ajax:error", window.__onLoadRecaptcha), $(document).on("page:load", window.__onLoadRecaptcha),
    function() {
        var t;
        (t = $(document)).ready(function(e) {
            var n, i, o, r, a, s, l, c, d, u;
            if (0 !== (n = e((c = function() {
                    return e(".vehicle-lead-image").length > 0 ? ".vehicle-lead-image" : ".part-lead-image"
                })())).length) return (o = e(".show-car-thumbs").find("a")).find("img"), i = n.find("img:first"), l = null, u = void 0 === u ? "" : u, window.currentImageIndex = function() {
                return o.filter(".Current").index()
            }, this.loadNextImage = function(t) {
                var e;
                for (t.preventDefault(), e = currentImageIndex() + 1, (o[currentImageIndex()].classList.contains("is-a-video") || o[currentImageIndex()].classList.contains("is-a-spincar")) && e++, o[currentImageIndex() + 1] && o[currentImageIndex() + 1].classList.contains("is-a-spincar") && e++, e >= o.size() && (e = 0); o[e] && ("none" === o[e].style.display || o[e].classList.contains("is-a-video") || o[e].classList.contains("is-a-spincar"));) ++e >= o.size() && (e = 0);
                return r(e)
            }, this.loadPrevImage = function(t) {
                var e;
                for (t.preventDefault(), (e = currentImageIndex() - 1) < 0 && (e = o.size() - 1); o[e] && ("none" === o[e].style.display || o[e].classList.contains("is-a-video") || o[e].classList.contains("is-a-spincar"));) --e < 0 && (e = o.size() - 1);
                return r(e)
            }, d = function() {
                return l = setTimeout(function() {
                    return n.addClass("Loading")
                }, 200)
            }, a = function() {
                return clearTimeout(l), n.removeClass("Loading")
            }, r = function(t) {
                var n, r, l;
                if (s(t), d(), "number" == typeof t) n = o.eq(t);
                else {
                    if (t.classList.contains("is-a-video") || t.classList.contains("is-a-spincar")) return;
                    n = e(t)
                }
                return l = n[0].href, r = n.data("original"), imagesLoaded(c()).on("always", a), i.attr("src", l), null != r ? (i.attr("data-original", r), i.data("original", r)) : i = i.removeData("original").removeAttr("data-original"), o.removeClass("Current"), n.addClass("Current")
            }, s = function(t) {
                var n, i;
                i = e(".vehicle-lead-video").length > 0 ? e(".vehicle-lead-video") : e(".part-lead-video"), n = e(".vehicle-image").length > 0 ? e(".vehicle-image") : e(".part-image"), i.length && i.is(":visible") ? (i.hide(), n.show()) : i.length && !i.is(":visible") && 0 === t && (n.hide(), i.show())
            }, o.on("click", function(t) {
                var i;
                if (!this.classList.contains("is-a-video") && !this.classList.contains("is-a-spincar")) return i = null != window.customAnimateBodyValue ? window.customAnimateBodyValue : 20, t.preventDefault(), r(this), e("html, body").animate({
                    scrollTop: n.offset().top - i
                }, "slow")
            }), t.on("swipeleft", c(), loadNextImage), t.on("swiperight", c(), loadPrevImage), t.on("click", ".lead-image-left a", loadPrevImage), t.on("click", ".lead-image-right a", loadNextImage), t.on("click", ".FullScreen", function(t) {
                return t.preventDefault(), window.open(i.attr("src"))
            }), 0 === o.filter(".Current").length ? o.eq(0).addClass("Current") : void 0
        })
    }.call(this),
    function() {
        var t;
        t = function(t) {
            if (t.length) return t.on("click", function(t) {
                var e, n;
                return t.preventDefault(), e = $.param({
                    image_source: $("a.Current").attr("href")
                }), n = document.URL + "/gallery?" + e, window.open(n, "Gallery", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1200,height=900")
            })
        }, jQuery(document).ready(function(e) {
            var n, i, o, r, a;
            if (t(e("#high-res-image-scroller")), e(".high-res-image-scroller").length) return o = e(".vehicle-images").data("initial-image-source"), n = e(".vehicle-images").data("images"), null == (a = "img.high-res-image") || null == n ? (e(".high-res-image-scroller").html("Missing target or image collection."), !1) : (i = o ? n.indexOf(o) : 0, r = new HighResImageScroller(n, a, i), e("a.previous").on("click", function() {
                return r.previousImage()
            }), e("a.next").on("click", function() {
                return r.nextImage()
            }), e(".high-res-image-scroller a.close_window").on("click", function() {
                return window.close()
            }), e(".high-res-image-scroller a.play").on("click", function() {
                return r.play()
            }), e(".high-res-image-scroller a.stop").on("click", function() {
                return r.stop()
            }), e(".high-res-image-scroller a.last").on("click", function() {
                return r.lastImage()
            }), e(".high-res-image-scroller a.first").on("click", function() {
                return r.firstImage()
            }))
        }), this.HighResImageScroller = function() {
            function t(t, e, n) {
                this.imageCollection = t, this.target = e, this.index = n, this.imageCollection instanceof Array || (this.imageCollection = []), null == this.target && (this.target = ""), null == this.index && (this.index = 0), this.renderImage(this.index)
            }
            return t.prototype.getIndex = function() {
                var t;
                return t = this.imageCollection.length - 1, this.index > t ? this.index = 0 : this.index < 0 && (this.index = t), this.index
            }, t.prototype.setIndex = function(t) {
                return this.index = t
            }, t.prototype.decrementIndex = function() {
                return this.setIndex(this.getIndex() - 1)
            }, t.prototype.incrementIndex = function() {
                return this.setIndex(this.getIndex() + 1)
            }, t.prototype.nextImage = function() {
                return this.incrementIndex(), this.renderImage()
            }, t.prototype.previousImage = function() {
                return this.decrementIndex(), this.renderImage()
            }, t.prototype.lastImage = function() {
                return this.setIndex(this.imageCollection.length - 1), this.renderImage()
            }, t.prototype.firstImage = function() {
                return this.setIndex(0), this.renderImage()
            }, t.prototype.renderImage = function() {
                var t, e;
                return e = this, $(this.target).attr("src", this.imageCollection[this.getIndex()]), (t = new Image).onload = function() {
                    return e.adjustWindowSize(t.width, t.height)
                }, t.src = this.imageCollection[this.getIndex()]
            }, t.prototype.play = function() {
                var t;
                return t = this, this.autoScroll = setInterval(function() {
                    return t.incrementIndex(), t.renderImage()
                }, 3e3)
            }, t.prototype.stop = function() {
                return clearInterval(this.autoScroll)
            }, t.prototype.adjustWindowSize = function(t, e) {
                var n, i, o, r;
                return r = window.innerWidth, o = window.innerHeight, i = 200, n = 400, r < t && o < e ? window.resizeTo(t + i, e + n) : r <= t ? window.resizeTo(t + i, o) : o <= e ? window.resizeTo(r, e + n) : void 0
            }, t
        }()
    }.call(this),
    function() {}.call(this), $(function() {
        function t() {
            var t = document.createElement("script"),
                e = i.value,
                r = n.value,
                a = o.value;
            t.src = "http://rate-exchange.appspot.com/currency?from=" + e + "&to=" + r + "&q=" + a + "&callback=convertCurrencyCallback", document.body.appendChild(t)
        }

        function e() {
            $.get("/currencies.csv", function(t) {
                var e = t.trim().split("\n");
                $.each(e, function(t, e) {
                    var o = e.split(","),
                        r = o[1],
                        a = o[0],
                        s = document.createElement("option");
                    s.value = r, s.innerHTML = a, n.appendChild(s), i.appendChild(s.cloneNode(!0))
                }), i.value = "USD", n.value = "EUR"
            })
        }
        var n = document.getElementById("currency_to_list"),
            i = document.getElementById("currency_from_list"),
            o = document.getElementById("currency_from_value"),
            r = document.getElementById("currency_to_value");
        n && i && o && r && (e(), $(document).on("click", ".currency-converter-button", t))
    }),
    function() {
        var t, e, n, i, o, r, a, s, l, c, d, u, h, p, f, g, m, v, b, y, w, $, _, T, x, C, E, k, S, I, D, A, O, j, P, R, N, L, F, H, q, X, B, U, z, W, M, Y, V, G, Q, Z, J, K, tt, et = [].indexOf || function(t) {
                for (var e = 0, n = this.length; e < n; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            },
            nt = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var i in e) it.call(e, i) && (t[i] = e[i]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            },
            it = {}.hasOwnProperty,
            ot = [].slice,
            rt = function(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            };
        O = {}, u = 10, Q = !1, L = null, v = null, D = null, q = null, tt = null, i = {
            BEFORE_CHANGE: "page:before-change",
            FETCH: "page:fetch",
            RECEIVE: "page:receive",
            CHANGE: "page:change",
            UPDATE: "page:update",
            LOAD: "page:load",
            RESTORE: "page:restore",
            BEFORE_UNLOAD: "page:before-unload",
            EXPIRE: "page:expire"
        }, _ = function(t) {
            var e;
            return t = new n(t), W(), d(), null != L && L.start(), Q && (e = Z(t.absolute)) ? (T(e), x(t, null, !1)) : x(t, V)
        }, Z = function(t) {
            var e;
            if ((e = O[t]) && !e.transitionCacheDisabled) return e
        }, y = function(t) {
            return null == t && (t = !0), Q = t
        }, b = function(t) {
            if (null == t && (t = !0), l) return t ? null != L ? L : L = new r("html") : (null != L && L.uninstall(), L = null)
        }, x = function(t, e, n) {
            return null == n && (n = !0), J(i.FETCH, {
                url: t.absolute
            }), null != tt && tt.abort(), (tt = new XMLHttpRequest).open("GET", t.withoutHashForIE10compatibility(), !0), tt.setRequestHeader("Accept", "text/html, application/xhtml+xml, application/xml"), tt.setRequestHeader("X-XHR-Referer", q), tt.onload = function() {
                var n;
                return J(i.RECEIVE, {
                    url: t.absolute
                }), (n = N()) ? (X(t), B(), h.apply(null, $(n)), A(), "function" == typeof e && e(), J(i.LOAD)) : document.location.href = m() || t.absolute
            }, L && n && (tt.onprogress = function(t) {
                var e;
                return e = t.lengthComputable ? t.loaded / t.total * 100 : L.value + (100 - L.value) / 10, L.advanceTo(e)
            }), tt.onloadend = function() {
                return tt = null
            }, tt.onerror = function() {
                return document.location.href = t.absolute
            }, tt.send()
        }, T = function(t) {
            return null != tt && tt.abort(), h(t.title, t.body), F(t), J(i.RESTORE)
        }, d = function() {
            var t;
            return t = new n(v.url), O[t.absolute] = {
                url: t.relative,
                body: document.body,
                title: document.title,
                positionY: window.pageYOffset,
                positionX: window.pageXOffset,
                cachedAt: (new Date).getTime(),
                transitionCacheDisabled: null != document.querySelector("[data-no-transition-cache]")
            }, f(u)
        }, P = function(t) {
            if (null == t && (t = u), /^[\d]+$/.test(t)) return u = parseInt(t)
        }, f = function(t) {
            var e, n, o, r, a, s;
            for (e = (a = Object.keys(O)).map(function(t) {
                    return O[t].cachedAt
                }).sort(function(t, e) {
                    return e - t
                }), s = [], n = 0, r = a.length; n < r; n++) o = a[n], O[o].cachedAt <= e[t] && (J(i.EXPIRE, O[o]), s.push(delete O[o]));
            return s
        }, h = function(e, n, o, r) {
            return J(i.BEFORE_UNLOAD), document.title = e, document.documentElement.replaceChild(n, document.body), null != o && t.update(o), G(), r && w(), v = window.history.state, null != L && L.done(), J(i.CHANGE), J(i.UPDATE)
        }, w = function() {
            var t, e, n, i, o, r, a, s, l, c, d, u;
            for (n = 0, o = (u = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'))).length; n < o; n++)
                if ("" === (l = (d = u[n]).type) || "text/javascript" === l) {
                    for (e = document.createElement("script"), i = 0, r = (c = d.attributes).length; i < r; i++) t = c[i], e.setAttribute(t.name, t.value);
                    d.hasAttribute("async") || (e.async = !1), e.appendChild(document.createTextNode(d.innerHTML)), s = d.parentNode, a = d.nextSibling, s.removeChild(d), s.insertBefore(e, a)
                }
        }, M = function(t) {
            return t.innerHTML = t.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi, ""), t
        }, G = function() {
            var t, e;
            if ((t = (e = document.querySelectorAll("input[autofocus], textarea[autofocus]"))[e.length - 1]) && document.activeElement !== t) return t.focus()
        }, X = function(t) {
            if ((t = new n(t)).absolute !== q) return window.history.pushState({
                turbolinks: !0,
                url: t.absolute
            }, "", t.absolute)
        }, B = function() {
            var t, e;
            if (t = tt.getResponseHeader("X-XHR-Redirected-To")) return e = (t = new n(t)).hasNoHash() ? document.location.hash : "", window.history.replaceState(window.history.state, "", t.href + e)
        }, m = function() {
            var t;
            if (null != (t = tt.getResponseHeader("Location")) && new n(t).crossOrigin()) return t
        }, W = function() {
            return q = document.location.href
        }, z = function() {
            return window.history.replaceState({
                turbolinks: !0,
                url: document.location.href
            }, "", document.location.href)
        }, U = function() {
            return v = window.history.state
        }, A = function() {
            var t;
            if (navigator.userAgent.match(/Firefox/) && !(t = new n).hasNoHash()) return window.history.replaceState(v, "", t.withoutHash()), document.location.hash = t.hash
        }, F = function(t) {
            return window.scrollTo(t.positionX, t.positionY)
        }, V = function() {
            return document.location.hash ? document.location.href = document.location.href : window.scrollTo(0, 0)
        }, p = function(t) {
            var e, n, i;
            if (null == t || "object" != typeof t) return t;
            for (n in e = new t.constructor, t) i = t[n], e[n] = p(i);
            return e
        }, R = function(t) {
            var e, n;
            return n = (null != (e = document.cookie.match(new RegExp(t + "=(\\w+)"))) ? e[1].toUpperCase() : void 0) || "", document.cookie = t + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/", n
        }, J = function(t, e) {
            var n;
            return "undefined" != typeof Prototype && Event.fire(document, t, e, !0), n = document.createEvent("Events"), e && (n.data = e), n.initEvent(t, !0, !0), document.dispatchEvent(n)
        }, j = function(t) {
            return !J(i.BEFORE_CHANGE, {
                url: t
            })
        }, N = function() {
            var t, e, n, i, o;
            if (o = function() {
                    var t;
                    return null != (t = tt.getResponseHeader("Content-Type")) && t.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)
                }, n = function(t) {
                    var e, n, i, o, r;
                    for (r = [], e = 0, n = (o = t.querySelector("head").childNodes).length; e < n; e++) null != ("function" == typeof(i = o[e]).getAttribute ? i.getAttribute("data-turbolinks-track") : void 0) && r.push(i.getAttribute("src") || i.getAttribute("href"));
                    return r
                }, t = function(t) {
                    var e;
                    return D || (D = n(document)), (e = n(t)).length !== D.length || i(e, D).length !== D.length
                }, i = function(t, e) {
                    var n, i, o, r, a;
                    for (t.length > e.length && (t = (o = [e, t])[0], e = o[1]), r = [], n = 0, i = t.length; n < i; n++) a = t[n], et.call(e, a) >= 0 && r.push(a);
                    return r
                }, ! function() {
                    var t;
                    return 400 <= (t = tt.status) && t < 600
                }() && o() && (e = g(tt.responseText)) && !t(e)) return e
        }, $ = function(e) {
            var n;
            return [null != (n = e.querySelector("title")) ? n.textContent : void 0, M(e.querySelector("body")), t.get(e).token, "runScripts"]
        }, t = {
            get: function(t) {
                var e;
                return null == t && (t = document), {
                    node: e = t.querySelector('meta[name="csrf-token"]'),
                    token: null != e && "function" == typeof e.getAttribute ? e.getAttribute("content") : void 0
                }
            },
            update: function(t) {
                var e;
                if (null != (e = this.get()).token && null != t && e.token !== t) return e.node.setAttribute("content", t)
            }
        }, g = function(t) {
            var e;
            return (e = document.documentElement.cloneNode()).innerHTML = t, e.head = e.querySelector("head"), e.body = e.querySelector("body"), e
        }, n = function() {
            function t(e) {
                if (this.original = null != e ? e : document.location.href, this.original.constructor === t) return this.original;
                this._parse()
            }
            return t.prototype.withoutHash = function() {
                return this.href.replace(this.hash, "").replace("#", "")
            }, t.prototype.withoutHashForIE10compatibility = function() {
                return this.withoutHash()
            }, t.prototype.hasNoHash = function() {
                return 0 === this.hash.length
            }, t.prototype.crossOrigin = function() {
                return this.origin !== (new t).origin
            }, t.prototype._parse = function() {
                var t;
                return (null != this.link ? this.link : this.link = document.createElement("a")).href = this.original, t = this.link, this.href = t.href, this.protocol = t.protocol, this.host = t.host, this.hostname = t.hostname, this.port = t.port, this.pathname = t.pathname, this.search = t.search, this.hash = t.hash, this.origin = [this.protocol, "//", this.hostname].join(""), 0 !== this.port.length && (this.origin += ":" + this.port), this.relative = [this.pathname, this.search, this.hash].join(""), this.absolute = this.href
            }, t
        }(), o = function() {
            function t(e) {
                if (this.link = e, this.link.constructor === t) return this.link;
                this.original = this.link.href, this.originalElement = this.link, this.link = this.link.cloneNode(!1), t.__super__.constructor.apply(this, arguments)
            }
            return nt(t, n), t.HTML_EXTENSIONS = ["html"], t.allowExtensions = function() {
                var e, n, i, o;
                for (i = 0, o = (n = 1 <= arguments.length ? ot.call(arguments, 0) : []).length; i < o; i++) e = n[i], t.HTML_EXTENSIONS.push(e);
                return t.HTML_EXTENSIONS
            }, t.prototype.shouldIgnore = function() {
                return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target()
            }, t.prototype._anchored = function() {
                return (this.hash.length > 0 || "#" === this.href.charAt(this.href.length - 1)) && this.withoutHash() === (new n).withoutHash()
            }, t.prototype._nonHtml = function() {
                return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + t.HTML_EXTENSIONS.join("|") + ")?$", "g"))
            }, t.prototype._optOut = function() {
                var t, e;
                for (e = this.originalElement; !t && e !== document;) t = null != e.getAttribute("data-no-turbolink"), e = e.parentNode;
                return t
            }, t.prototype._target = function() {
                return 0 !== this.link.target.length
            }, t
        }(), e = function() {
            function t(t) {
                this.event = t, this.event.defaultPrevented || (this._extractLink(), this._validForTurbolinks() && (j(this.link.absolute) || K(this.link.href), this.event.preventDefault()))
            }
            return t.installHandlerLast = function(e) {
                if (!e.defaultPrevented) return document.removeEventListener("click", t.handle, !1), document.addEventListener("click", t.handle, !1)
            }, t.handle = function(e) {
                return new t(e)
            }, t.prototype._extractLink = function() {
                var t;
                for (t = this.event.target; t.parentNode && "A" !== t.nodeName;) t = t.parentNode;
                if ("A" === t.nodeName && 0 !== t.href.length) return this.link = new o(t)
            }, t.prototype._validForTurbolinks = function() {
                return null != this.link && !(this.link.shouldIgnore() || this._nonStandardClick())
            }, t.prototype._nonStandardClick = function() {
                return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey
            }, t
        }(), r = function() {
            function t(t) {
                this.elementSelector = t, this._trickle = rt(this._trickle, this), this.value = 0, this.content = "", this.speed = 300, this.opacity = .99, this.install()
            }
            var e;
            return e = "turbolinks-progress-bar", t.prototype.install = function() {
                return this.element = document.querySelector(this.elementSelector), this.element.classList.add(e), this.styleElement = document.createElement("style"), document.head.appendChild(this.styleElement), this._updateStyle()
            }, t.prototype.uninstall = function() {
                return this.element.classList.remove(e), document.head.removeChild(this.styleElement)
            }, t.prototype.start = function() {
                return this.advanceTo(5)
            }, t.prototype.advanceTo = function(t) {
                var e;
                if (t > (e = this.value) && e <= 100) {
                    if (this.value = t, this._updateStyle(), 100 === this.value) return this._stopTrickle();
                    if (this.value > 0) return this._startTrickle()
                }
            }, t.prototype.done = function() {
                if (this.value > 0) return this.advanceTo(100), this._reset()
            }, t.prototype._reset = function() {
                var t, e;
                return t = this.opacity, setTimeout((e = this, function() {
                    return e.opacity = 0, e._updateStyle()
                }), this.speed / 2), setTimeout(function(e) {
                    return function() {
                        return e.value = 0, e.opacity = t, e._withSpeed(0, function() {
                            return e._updateStyle(!0)
                        })
                    }
                }(this), this.speed)
            }, t.prototype._startTrickle = function() {
                if (!this.trickling) return this.trickling = !0, setTimeout(this._trickle, this.speed)
            }, t.prototype._stopTrickle = function() {
                return delete this.trickling
            }, t.prototype._trickle = function() {
                if (this.trickling) return this.advanceTo(this.value + Math.random() / 2), setTimeout(this._trickle, this.speed)
            }, t.prototype._withSpeed = function(t, e) {
                var n, i;
                return n = this.speed, this.speed = t, i = e(), this.speed = n, i
            }, t.prototype._updateStyle = function(t) {
                return null == t && (t = !1), t && this._changeContentToForceRepaint(), this.styleElement.textContent = this._createCSSRule()
            }, t.prototype._changeContentToForceRepaint = function() {
                return this.content = "" === this.content ? " " : ""
            }, t.prototype._createCSSRule = function() {
                return this.elementSelector + "." + e + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + this.speed / 2 + "ms ease-in;\n  transform: translate3d(0,0,0);\n}"
            }, t
        }(), c = function(t) {
            return setTimeout(t, 500)
        }, k = function() {
            return document.addEventListener("DOMContentLoaded", function() {
                return J(i.CHANGE), J(i.UPDATE)
            }, !0)
        }, I = function() {
            if ("undefined" != typeof jQuery) return jQuery(document).on("ajaxSuccess", function(t, e) {
                if (jQuery.trim(e.responseText)) return J(i.UPDATE)
            })
        }, S = function(t) {
            var e, i;
            if (null != (i = t.state) ? i.turbolinks : void 0) return (e = O[new n(t.state.url).absolute]) ? (d(), T(e)) : K(t.target.location.href)
        }, E = function() {
            return z(), U(), document.addEventListener("click", e.installHandlerLast, !0), window.addEventListener("hashchange", function() {
                return z(), U()
            }, !1), c(function() {
                return window.addEventListener("popstate", S, !1)
            })
        }, C = void 0 !== window.history.state || navigator.userAgent.match(/Firefox\/2[6|7]/), s = window.history && window.history.pushState && window.history.replaceState && C, a = !navigator.userAgent.match(/CriOS\//), Y = "GET" === (H = R("request_method")) || "" === H, l = s && a && Y, document.addEventListener && document.createEvent && (k(), I()), l ? (K = _, E()) : K = function(t) {
            return document.location.href = t
        }, this.Turbolinks = {
            visit: K,
            pagesCached: P,
            enableTransitionCache: y,
            enableProgressBar: b,
            allowLinkExtensions: o.allowExtensions,
            supported: l,
            EVENTS: p(i)
        }
    }.call(this);
var cycleImageCurrentIndex = 0;
window.cyclerDefaultFadeOutTime = 1500, window.imageCyclerInterval = 4e3, $(document).ready(resetCycleInterval);
var didScroll, cycleInterval = null;
$(document).on("page:fetch", function() {
        clearInterval(cycleInterval)
    }), $(document).on("click", ".next-cycle", function(t) {
        t.preventDefault(), resetCycleInterval(), cycleImages(0)
    }), $(document).on("click", ".previous-cycle", function(t) {
        t.preventDefault(), resetCycleInterval(), cycleImages(0, "prev")
    }), $(document).on("click", ".cycler-indicators li", function() {
        resetCycleInterval();
        var t = $(this),
            e = $("#cycler .cycle-slide");
        e.removeClass("active").css("z-index", 1), $(e.get(t.index())).addClass("active").css("z-index", 3), setActiveIndicator(t.index())
    }),
    /*!
     * jQuery UI Widget 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        var e, n = 0,
            i = Array.prototype.slice;
        return t.cleanData = (e = t.cleanData, function(n) {
            var i, o, r;
            for (r = 0; null != (o = n[r]); r++) try {
                (i = t._data(o, "events")) && i.remove && t(o).triggerHandler("remove")
            } catch (a) {}
            e(n)
        }), t.widget = function(e, n, i) {
            var o, r, a, s, l = {},
                c = e.split(".")[0];
            return e = e.split(".")[1], o = c + "-" + e, i || (i = n, n = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
                return !!t.data(e, o)
            }, t[c] = t[c] || {}, r = t[c][e], a = t[c][e] = function(t, e) {
                if (!this._createWidget) return new a(t, e);
                arguments.length && this._createWidget(t, e)
            }, t.extend(a, r, {
                version: i.version,
                _proto: t.extend({}, i),
                _childConstructors: []
            }), (s = new n).options = t.widget.extend({}, s.options), t.each(i, function(e, i) {
                var o, r;
                t.isFunction(i) ? l[e] = (o = function() {
                    return n.prototype[e].apply(this, arguments)
                }, r = function(t) {
                    return n.prototype[e].apply(this, t)
                }, function() {
                    var t, e = this._super,
                        n = this._superApply;
                    return this._super = o, this._superApply = r, t = i.apply(this, arguments), this._super = e, this._superApply = n, t
                }) : l[e] = i
            }), a.prototype = t.widget.extend(s, {
                widgetEventPrefix: r && s.widgetEventPrefix || e
            }, l, {
                constructor: a,
                namespace: c,
                widgetName: e,
                widgetFullName: o
            }), r ? (t.each(r._childConstructors, function(e, n) {
                var i = n.prototype;
                t.widget(i.namespace + "." + i.widgetName, a, n._proto)
            }), delete r._childConstructors) : n._childConstructors.push(a), t.widget.bridge(e, a), a
        }, t.widget.extend = function(e) {
            for (var n, o, r = i.call(arguments, 1), a = 0, s = r.length; a < s; a++)
                for (n in r[a]) o = r[a][n], r[a].hasOwnProperty(n) && o !== undefined && (t.isPlainObject(o) ? e[n] = t.isPlainObject(e[n]) ? t.widget.extend({}, e[n], o) : t.widget.extend({}, o) : e[n] = o);
            return e
        }, t.widget.bridge = function(e, n) {
            var o = n.prototype.widgetFullName || e;
            t.fn[e] = function(r) {
                var a = "string" == typeof r,
                    s = i.call(arguments, 1),
                    l = this;
                return a ? this.each(function() {
                    var n, i = t.data(this, o);
                    return "instance" === r ? (l = i, !1) : i ? t.isFunction(i[r]) && "_" !== r.charAt(0) ? (n = i[r].apply(i, s)) !== i && n !== undefined ? (l = n && n.jquery ? l.pushStack(n.get()) : n, !1) : void 0 : t.error("no such method '" + r + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + r + "'")
                }) : (s.length && (r = t.widget.extend.apply(null, [r].concat(s))), this.each(function() {
                    var e = t.data(this, o);
                    e ? (e.option(r || {}), e._init && e._init()) : t.data(this, o, new n(r, this))
                })), l
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(e, i) {
                i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === i && this.destroy()
                    }
                }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, n) {
                var i, o, r, a = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (a = {}, e = (i = e.split(".")).shift(), i.length) {
                        for (o = a[e] = t.widget.extend({}, this.options[e]), r = 0; r < i.length - 1; r++) o[i[r]] = o[i[r]] || {}, o = o[i[r]];
                        if (e = i.pop(), 1 === arguments.length) return o[e] === undefined ? null : o[e];
                        o[e] = n
                    } else {
                        if (1 === arguments.length) return this.options[e] === undefined ? null : this.options[e];
                        a[e] = n
                    } return this._setOptions(a), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function(e, n, i) {
                var o, r = this;
                "boolean" != typeof e && (i = n, n = e, e = !1), i ? (n = o = t(n), this.bindings = this.bindings.add(n)) : (i = n, n = this.element, o = this.widget()), t.each(i, function(i, a) {
                    function s() {
                        if (e || !0 !== r.options.disabled && !t(this).hasClass("ui-state-disabled")) return ("string" == typeof a ? r[a] : a).apply(r, arguments)
                    }
                    "string" != typeof a && (s.guid = a.guid = a.guid || s.guid || t.guid++);
                    var l = i.match(/^([\w:-]*)\s*(.*)$/),
                        c = l[1] + r.eventNamespace,
                        d = l[2];
                    d ? o.delegate(d, c, s) : n.bind(c, s)
                })
            },
            _off: function(e, n) {
                n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(n).undelegate(n), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
            },
            _delay: function(t, e) {
                function n() {
                    return ("string" == typeof t ? i[t] : t).apply(i, arguments)
                }
                var i = this;
                return setTimeout(n, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, n, i) {
                var o, r, a = this.options[e];
                if (i = i || {}, (n = t.Event(n)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), n.target = this.element[0], r = n.originalEvent)
                    for (o in r) o in n || (n[o] = r[o]);
                return this.element.trigger(n, i), !(t.isFunction(a) && !1 === a.apply(this.element[0], [n].concat(i)) || n.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, n) {
            t.Widget.prototype["_" + e] = function(i, o, r) {
                "string" == typeof o && (o = {
                    effect: o
                });
                var a, s = o ? !0 === o || "number" == typeof o ? n : o.effect || n : e;
                "number" == typeof(o = o || {}) && (o = {
                    duration: o
                }), a = !t.isEmptyObject(o), o.complete = r, o.delay && i.delay(o.delay), a && t.effects && t.effects.effect[s] ? i[e](o) : s !== e && i[s] ? i[s](o.duration, o.easing, r) : i.queue(function(n) {
                    t(this)[e](), r && r.call(i[0]), n()
                })
            }
        }), t.widget
    }),
    /*
     * jQuery Iframe Transport Plugin 1.8.2
     * https://github.com/blueimp/jQuery-File-Upload
     *
     * Copyright 2011, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * http://www.opensource.org/licenses/MIT
     */
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery)
    }(function(t) {
        "use strict";
        var e = 0;
        t.ajaxTransport("iframe", function(n) {
            if (n.async) {
                var i, o, r, a = n.initialIframeSrc || "javascript:false;";
                return {
                    send: function(s, l) {
                        (i = t('<form style="display:none;"></form>')).attr("accept-charset", n.formAcceptCharset), r = /\?/.test(n.url) ? "&" : "?", "DELETE" === n.type ? (n.url = n.url + r + "_method=DELETE", n.type = "POST") : "PUT" === n.type ? (n.url = n.url + r + "_method=PUT", n.type = "POST") : "PATCH" === n.type && (n.url = n.url + r + "_method=PATCH", n.type = "POST"), o = t('<iframe src="' + a + '" name="iframe-transport-' + (e += 1) + '"></iframe>').bind("load", function() {
                            var e, r = t.isArray(n.paramName) ? n.paramName : [n.paramName];
                            o.unbind("load").bind("load", function() {
                                var e;
                                try {
                                    if (!(e = o.contents()).length || !e[0].firstChild) throw new Error
                                } catch (n) {
                                    e = undefined
                                }
                                l(200, "success", {
                                    iframe: e
                                }), t('<iframe src="' + a + '"></iframe>').appendTo(i), window.setTimeout(function() {
                                    i.remove()
                                }, 0)
                            }), i.prop("target", o.prop("name")).prop("action", n.url).prop("method", n.type), n.formData && t.each(n.formData, function(e, n) {
                                t('<input type="hidden"/>').prop("name", n.name).val(n.value).appendTo(i)
                            }), n.fileInput && n.fileInput.length && "POST" === n.type && (e = n.fileInput.clone(), n.fileInput.after(function(t) {
                                return e[t]
                            }), n.paramName && n.fileInput.each(function(e) {
                                t(this).prop("name", r[e] || n.paramName)
                            }), i.append(n.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), n.fileInput.removeAttr("form")), i.submit(), e && e.length && n.fileInput.each(function(n, i) {
                                var o = t(e[n]);
                                t(i).prop("name", o.prop("name")).attr("form", o.attr("form")), o.replaceWith(i)
                            })
                        }), i.append(o).appendTo(document.body)
                    },
                    abort: function() {
                        o && o.unbind("load").prop("src", a), i && i.remove()
                    }
                }
            }
        }), t.ajaxSetup({
            converters: {
                "iframe text": function(e) {
                    return e && t(e[0].body).text()
                },
                "iframe json": function(e) {
                    return e && t.parseJSON(t(e[0].body).text())
                },
                "iframe html": function(e) {
                    return e && t(e[0].body).html()
                },
                "iframe xml": function(e) {
                    var n = e && e[0];
                    return n && t.isXMLDoc(n) ? n : t.parseXML(n.XMLDocument && n.XMLDocument.xml || t(n.body).html())
                },
                "iframe script": function(e) {
                    return e && t.globalEval(t(e[0].body).text())
                }
            }
        })
    }),
    /*
     * jQuery File Upload Plugin 5.42.0
     * https://github.com/blueimp/jQuery-File-Upload
     *
     * Copyright 2010, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * http://www.opensource.org/licenses/MIT
     */
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "jquery.ui.widget"], t) : t(window.jQuery)
    }(function(t) {
        "use strict";

        function e(e) {
            var n = "dragover" === e;
            return function(i) {
                i.dataTransfer = i.originalEvent && i.originalEvent.dataTransfer;
                var o = i.dataTransfer;
                o && -1 !== t.inArray("Files", o.types) && !1 !== this._trigger(e, t.Event(e, {
                    delegatedEvent: i
                })) && (i.preventDefault(), n && (o.dropEffect = "copy"))
            }
        }
        t.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || t('<input type="file">').prop("disabled")), t.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), t.support.xhrFormDataFileUpload = !!window.FormData, t.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), t.widget("blueimp.fileupload", {
            options: {
                dropZone: t(document),
                pasteZone: undefined,
                fileInput: undefined,
                replaceFileInput: !0,
                paramName: undefined,
                singleFileUploads: !0,
                limitMultiFileUploads: undefined,
                limitMultiFileUploadSize: undefined,
                limitMultiFileUploadSizeOverhead: 512,
                sequentialUploads: !1,
                limitConcurrentUploads: undefined,
                forceIframeTransport: !1,
                redirect: undefined,
                redirectParamName: undefined,
                postMessage: undefined,
                multipart: !0,
                maxChunkSize: undefined,
                uploadedBytes: undefined,
                recalculateProgress: !0,
                progressInterval: 100,
                bitrateInterval: 500,
                autoUpload: !0,
                messages: {
                    uploadedBytes: "Uploaded bytes exceed file size"
                },
                i18n: function(e, n) {
                    return e = this.messages[e] || e.toString(), n && t.each(n, function(t, n) {
                        e = e.replace("{" + t + "}", n)
                    }), e
                },
                formData: function(t) {
                    return t.serializeArray()
                },
                add: function(e, n) {
                    if (e.isDefaultPrevented()) return !1;
                    (n.autoUpload || !1 !== n.autoUpload && t(this).fileupload("option", "autoUpload")) && n.process().done(function() {
                        n.submit()
                    })
                },
                processData: !1,
                contentType: !1,
                cache: !1
            },
            _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
            _blobSlice: t.support.blobSlice && function() {
                return (this.slice || this.webkitSlice || this.mozSlice).apply(this, arguments)
            },
            _BitrateTimer: function() {
                this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function(t, e, n) {
                    var i = t - this.timestamp;
                    return (!this.bitrate || !n || i > n) && (this.bitrate = (e - this.loaded) * (1e3 / i) * 8, this.loaded = e, this.timestamp = t), this.bitrate
                }
            },
            _isXHRUpload: function(e) {
                return !e.forceIframeTransport && (!e.multipart && t.support.xhrFileUpload || t.support.xhrFormDataFileUpload)
            },
            _getFormData: function(e) {
                var n;
                return "function" === t.type(e.formData) ? e.formData(e.form) : t.isArray(e.formData) ? e.formData : "object" === t.type(e.formData) ? (n = [], t.each(e.formData, function(t, e) {
                    n.push({
                        name: t,
                        value: e
                    })
                }), n) : []
            },
            _getTotal: function(e) {
                var n = 0;
                return t.each(e, function(t, e) {
                    n += e.size || 1
                }), n
            },
            _initProgressObject: function(e) {
                var n = {
                    loaded: 0,
                    total: 0,
                    bitrate: 0
                };
                e._progress ? t.extend(e._progress, n) : e._progress = n
            },
            _initResponseObject: function(t) {
                var e;
                if (t._response)
                    for (e in t._response) t._response.hasOwnProperty(e) && delete t._response[e];
                else t._response = {}
            },
            _onProgress: function(e, n) {
                if (e.lengthComputable) {
                    var i, o = Date.now ? Date.now() : (new Date).getTime();
                    if (n._time && n.progressInterval && o - n._time < n.progressInterval && e.loaded !== e.total) return;
                    n._time = o, i = Math.floor(e.loaded / e.total * (n.chunkSize || n._progress.total)) + (n.uploadedBytes || 0), this._progress.loaded += i - n._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(o, this._progress.loaded, n.bitrateInterval), n._progress.loaded = n.loaded = i, n._progress.bitrate = n.bitrate = n._bitrateTimer.getBitrate(o, i, n.bitrateInterval), this._trigger("progress", t.Event("progress", {
                        delegatedEvent: e
                    }), n), this._trigger("progressall", t.Event("progressall", {
                        delegatedEvent: e
                    }), this._progress)
                }
            },
            _initProgressListener: function(e) {
                var n = this,
                    i = e.xhr ? e.xhr() : t.ajaxSettings.xhr();
                i.upload && (t(i.upload).bind("progress", function(t) {
                    var i = t.originalEvent;
                    t.lengthComputable = i.lengthComputable, t.loaded = i.loaded, t.total = i.total, n._onProgress(t, e)
                }), e.xhr = function() {
                    return i
                })
            },
            _isInstanceOf: function(t, e) {
                return Object.prototype.toString.call(e) === "[object " + t + "]"
            },
            _initXHRData: function(e) {
                var n, i = this,
                    o = e.files[0],
                    r = e.multipart || !t.support.xhrFileUpload,
                    a = "array" === t.type(e.paramName) ? e.paramName[0] : e.paramName;
                e.headers = t.extend({}, e.headers), e.contentRange && (e.headers["Content-Range"] = e.contentRange), r && !e.blob && this._isInstanceOf("File", o) || (e.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(o.name) + '"'), r ? t.support.xhrFormDataFileUpload && (e.postMessage ? (n = this._getFormData(e), e.blob ? n.push({
                    name: a,
                    value: e.blob
                }) : t.each(e.files, function(i, o) {
                    n.push({
                        name: "array" === t.type(e.paramName) && e.paramName[i] || a,
                        value: o
                    })
                })) : (i._isInstanceOf("FormData", e.formData) ? n = e.formData : (n = new FormData, t.each(this._getFormData(e), function(t, e) {
                    n.append(e.name, e.value)
                })), e.blob ? n.append(a, e.blob, o.name) : t.each(e.files, function(o, r) {
                    (i._isInstanceOf("File", r) || i._isInstanceOf("Blob", r)) && n.append("array" === t.type(e.paramName) && e.paramName[o] || a, r, r.uploadName || r.name)
                })), e.data = n) : (e.contentType = o.type || "application/octet-stream", e.data = e.blob || o), e.blob = null
            },
            _initIframeSettings: function(e) {
                var n = t("<a></a>").prop("href", e.url).prop("host");
                e.dataType = "iframe " + (e.dataType || ""), e.formData = this._getFormData(e), e.redirect && n && n !== location.host && e.formData.push({
                    name: e.redirectParamName || "redirect",
                    value: e.redirect
                })
            },
            _initDataSettings: function(t) {
                this._isXHRUpload(t) ? (this._chunkedUpload(t, !0) || (t.data || this._initXHRData(t), this._initProgressListener(t)), t.postMessage && (t.dataType = "postmessage " + (t.dataType || ""))) : this._initIframeSettings(t)
            },
            _getParamName: function(e) {
                var n = t(e.fileInput),
                    i = e.paramName;
                return i ? t.isArray(i) || (i = [i]) : (i = [], n.each(function() {
                    for (var e = t(this), n = e.prop("name") || "files[]", o = (e.prop("files") || [1]).length; o;) i.push(n), o -= 1
                }), i.length || (i = [n.prop("name") || "files[]"])), i
            },
            _initFormSettings: function(e) {
                e.form && e.form.length || (e.form = t(e.fileInput.prop("form")), e.form.length || (e.form = t(this.options.fileInput.prop("form")))), e.paramName = this._getParamName(e), e.url || (e.url = e.form.prop("action") || location.href), e.type = (e.type || "string" === t.type(e.form.prop("method")) && e.form.prop("method") || "").toUpperCase(), "POST" !== e.type && "PUT" !== e.type && "PATCH" !== e.type && (e.type = "POST"), e.formAcceptCharset || (e.formAcceptCharset = e.form.attr("accept-charset"))
            },
            _getAJAXSettings: function(e) {
                var n = t.extend({}, this.options, e);
                return this._initFormSettings(n), this._initDataSettings(n), n
            },
            _getDeferredState: function(t) {
                return t.state ? t.state() : t.isResolved() ? "resolved" : t.isRejected() ? "rejected" : "pending"
            },
            _enhancePromise: function(t) {
                return t.success = t.done, t.error = t.fail, t.complete = t.always, t
            },
            _getXHRPromise: function(e, n, i) {
                var o = t.Deferred(),
                    r = o.promise();
                return n = n || this.options.context || r, !0 === e ? o.resolveWith(n, i) : !1 === e && o.rejectWith(n, i), r.abort = o.promise, this._enhancePromise(r)
            },
            _addConvenienceMethods: function(e, n) {
                var i = this,
                    o = function(e) {
                        return t.Deferred().resolveWith(i, e).promise()
                    };
                n.process = function(e, r) {
                    return (e || r) && (n._processQueue = this._processQueue = (this._processQueue || o([this])).pipe(function() {
                        return n.errorThrown ? t.Deferred().rejectWith(i, [n]).promise() : o(arguments)
                    }).pipe(e, r)), this._processQueue || o([this])
                }, n.submit = function() {
                    return "pending" !== this.state() && (n.jqXHR = this.jqXHR = !1 !== i._trigger("submit", t.Event("submit", {
                        delegatedEvent: e
                    }), this) && i._onSend(e, this)), this.jqXHR || i._getXHRPromise()
                }, n.abort = function() {
                    return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", i._trigger("fail", null, this), i._getXHRPromise(!1))
                }, n.state = function() {
                    return this.jqXHR ? i._getDeferredState(this.jqXHR) : this._processQueue ? i._getDeferredState(this._processQueue) : void 0
                }, n.processing = function() {
                    return !this.jqXHR && this._processQueue && "pending" === i._getDeferredState(this._processQueue)
                }, n.progress = function() {
                    return this._progress
                }, n.response = function() {
                    return this._response
                }
            },
            _getUploadedBytes: function(t) {
                var e = t.getResponseHeader("Range"),
                    n = e && e.split("-"),
                    i = n && n.length > 1 && parseInt(n[1], 10);
                return i && i + 1
            },
            _chunkedUpload: function(e, n) {
                e.uploadedBytes = e.uploadedBytes || 0;
                var i, o, r = this,
                    a = e.files[0],
                    s = a.size,
                    l = e.uploadedBytes,
                    c = e.maxChunkSize || s,
                    d = this._blobSlice,
                    u = t.Deferred(),
                    h = u.promise();
                return !(!(this._isXHRUpload(e) && d && (l || c < s)) || e.data) && (!!n || (l >= s ? (a.error = e.i18n("uploadedBytes"), this._getXHRPromise(!1, e.context, [null, "error", a.error])) : (o = function() {
                    var n = t.extend({}, e),
                        h = n._progress.loaded;
                    n.blob = d.call(a, l, l + c, a.type), n.chunkSize = n.blob.size, n.contentRange = "bytes " + l + "-" + (l + n.chunkSize - 1) + "/" + s, r._initXHRData(n), r._initProgressListener(n), i = (!1 !== r._trigger("chunksend", null, n) && t.ajax(n) || r._getXHRPromise(!1, n.context)).done(function(i, a, c) {
                        l = r._getUploadedBytes(c) || l + n.chunkSize, h + n.chunkSize - n._progress.loaded && r._onProgress(t.Event("progress", {
                            lengthComputable: !0,
                            loaded: l - n.uploadedBytes,
                            total: l - n.uploadedBytes
                        }), n), e.uploadedBytes = n.uploadedBytes = l, n.result = i, n.textStatus = a, n.jqXHR = c, r._trigger("chunkdone", null, n), r._trigger("chunkalways", null, n), l < s ? o() : u.resolveWith(n.context, [i, a, c])
                    }).fail(function(t, e, i) {
                        n.jqXHR = t, n.textStatus = e, n.errorThrown = i, r._trigger("chunkfail", null, n), r._trigger("chunkalways", null, n), u.rejectWith(n.context, [t, e, i])
                    })
                }, this._enhancePromise(h), h.abort = function() {
                    return i.abort()
                }, o(), h)))
            },
            _beforeSend: function(t, e) {
                0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(e), this._initProgressObject(e), e._progress.loaded = e.loaded = e.uploadedBytes || 0, e._progress.total = e.total = this._getTotal(e.files) || 1, e._progress.bitrate = e.bitrate = 0, this._active += 1, this._progress.loaded += e.loaded, this._progress.total += e.total
            },
            _onDone: function(e, n, i, o) {
                var r = o._progress.total,
                    a = o._response;
                o._progress.loaded < r && this._onProgress(t.Event("progress", {
                    lengthComputable: !0,
                    loaded: r,
                    total: r
                }), o), a.result = o.result = e, a.textStatus = o.textStatus = n, a.jqXHR = o.jqXHR = i, this._trigger("done", null, o)
            },
            _onFail: function(t, e, n, i) {
                var o = i._response;
                i.recalculateProgress && (this._progress.loaded -= i._progress.loaded, this._progress.total -= i._progress.total), o.jqXHR = i.jqXHR = t, o.textStatus = i.textStatus = e, o.errorThrown = i.errorThrown = n, this._trigger("fail", null, i)
            },
            _onAlways: function(t, e, n, i) {
                this._trigger("always", null, i)
            },
            _onSend: function(e, n) {
                n.submit || this._addConvenienceMethods(e, n);
                var i, o, r, a, s = this,
                    l = s._getAJAXSettings(n),
                    c = function() {
                        return s._sending += 1, l._bitrateTimer = new s._BitrateTimer, i = i || ((o || !1 === s._trigger("send", t.Event("send", {
                            delegatedEvent: e
                        }), l)) && s._getXHRPromise(!1, l.context, o) || s._chunkedUpload(l) || t.ajax(l)).done(function(t, e, n) {
                            s._onDone(t, e, n, l)
                        }).fail(function(t, e, n) {
                            s._onFail(t, e, n, l)
                        }).always(function(t, e, n) {
                            if (s._onAlways(t, e, n, l), s._sending -= 1, s._active -= 1, l.limitConcurrentUploads && l.limitConcurrentUploads > s._sending)
                                for (var i = s._slots.shift(); i;) {
                                    if ("pending" === s._getDeferredState(i)) {
                                        i.resolve();
                                        break
                                    }
                                    i = s._slots.shift()
                                }
                            0 === s._active && s._trigger("stop")
                        })
                    };
                return this._beforeSend(e, l), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (r = t.Deferred(), this._slots.push(r), a = r.pipe(c)) : (this._sequence = this._sequence.pipe(c, c), a = this._sequence), a.abort = function() {
                    return o = [undefined, "abort", "abort"], i ? i.abort() : (r && r.rejectWith(l.context, o), c())
                }, this._enhancePromise(a)) : c()
            },
            _onAdd: function(e, n) {
                var i, o, r, a, s = this,
                    l = !0,
                    c = t.extend({}, this.options, n),
                    d = n.files,
                    u = d.length,
                    h = c.limitMultiFileUploads,
                    p = c.limitMultiFileUploadSize,
                    f = c.limitMultiFileUploadSizeOverhead,
                    g = 0,
                    m = this._getParamName(c),
                    v = 0;
                if (!p || u && d[0].size !== undefined || (p = undefined), (c.singleFileUploads || h || p) && this._isXHRUpload(c))
                    if (c.singleFileUploads || p || !h)
                        if (!c.singleFileUploads && p)
                            for (r = [], i = [], a = 0; a < u; a += 1) g += d[a].size + f, (a + 1 === u || g + d[a + 1].size + f > p || h && a + 1 - v >= h) && (r.push(d.slice(v, a + 1)), (o = m.slice(v, a + 1)).length || (o = m), i.push(o), v = a + 1, g = 0);
                        else i = m;
                else
                    for (r = [], i = [], a = 0; a < u; a += h) r.push(d.slice(a, a + h)), (o = m.slice(a, a + h)).length || (o = m), i.push(o);
                else r = [d], i = [m];
                return n.originalFiles = d, t.each(r || d, function(o, a) {
                    var c = t.extend({}, n);
                    return c.files = r ? a : [a], c.paramName = i[o], s._initResponseObject(c), s._initProgressObject(c), s._addConvenienceMethods(e, c), l = s._trigger("add", t.Event("add", {
                        delegatedEvent: e
                    }), c)
                }), l
            },
            _replaceFileInput: function(e) {
                var n = e.fileInput,
                    i = n.clone(!0);
                e.fileInputClone = i, t("<form></form>").append(i)[0].reset(), n.after(i).detach(), t.cleanData(n.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(t, e) {
                    return e === n[0] ? i[0] : e
                }), n[0] === this.element[0] && (this.element = i)
            },
            _handleFileTreeEntry: function(e, n) {
                var i, o = this,
                    r = t.Deferred(),
                    a = function(t) {
                        t && !t.entry && (t.entry = e), r.resolve([t])
                    },
                    s = function(t) {
                        o._handleFileTreeEntries(t, n + e.name + "/").done(function(t) {
                            r.resolve(t)
                        }).fail(a)
                    },
                    l = function() {
                        i.readEntries(function(t) {
                            t.length ? (c = c.concat(t), l()) : s(c)
                        }, a)
                    },
                    c = [];
                return n = n || "", e.isFile ? e._file ? (e._file.relativePath = n, r.resolve(e._file)) : e.file(function(t) {
                    t.relativePath = n, r.resolve(t)
                }, a) : e.isDirectory ? (i = e.createReader(), l()) : r.resolve([]), r.promise()
            },
            _handleFileTreeEntries: function(e, n) {
                var i = this;
                return t.when.apply(t, t.map(e, function(t) {
                    return i._handleFileTreeEntry(t, n)
                })).pipe(function() {
                    return Array.prototype.concat.apply([], arguments)
                })
            },
            _getDroppedFiles: function(e) {
                var n = (e = e || {}).items;
                return n && n.length && (n[0].webkitGetAsEntry || n[0].getAsEntry) ? this._handleFileTreeEntries(t.map(n, function(t) {
                    var e;
                    return t.webkitGetAsEntry ? ((e = t.webkitGetAsEntry()) && (e._file = t.getAsFile()), e) : t.getAsEntry()
                })) : t.Deferred().resolve(t.makeArray(e.files)).promise()
            },
            _getSingleFileInputFiles: function(e) {
                var n, i, o = (e = t(e)).prop("webkitEntries") || e.prop("entries");
                if (o && o.length) return this._handleFileTreeEntries(o);
                if ((n = t.makeArray(e.prop("files"))).length) n[0].name === undefined && n[0].fileName && t.each(n, function(t, e) {
                    e.name = e.fileName, e.size = e.fileSize
                });
                else {
                    if (!(i = e.prop("value"))) return t.Deferred().resolve([]).promise();
                    n = [{
                        name: i.replace(/^.*\\/, "")
                    }]
                }
                return t.Deferred().resolve(n).promise()
            },
            _getFileInputFiles: function(e) {
                return e instanceof t && 1 !== e.length ? t.when.apply(t, t.map(e, this._getSingleFileInputFiles)).pipe(function() {
                    return Array.prototype.concat.apply([], arguments)
                }) : this._getSingleFileInputFiles(e)
            },
            _onChange: function(e) {
                var n = this,
                    i = {
                        fileInput: t(e.target),
                        form: t(e.target.form)
                    };
                this._getFileInputFiles(i.fileInput).always(function(o) {
                    i.files = o, n.options.replaceFileInput && n._replaceFileInput(i), !1 !== n._trigger("change", t.Event("change", {
                        delegatedEvent: e
                    }), i) && n._onAdd(e, i)
                })
            },
            _onPaste: function(e) {
                var n = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
                    i = {
                        files: []
                    };
                n && n.length && (t.each(n, function(t, e) {
                    var n = e.getAsFile && e.getAsFile();
                    n && i.files.push(n)
                }), !1 !== this._trigger("paste", t.Event("paste", {
                    delegatedEvent: e
                }), i) && this._onAdd(e, i))
            },
            _onDrop: function(e) {
                e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
                var n = this,
                    i = e.dataTransfer,
                    o = {};
                i && i.files && i.files.length && (e.preventDefault(), this._getDroppedFiles(i).always(function(i) {
                    o.files = i, !1 !== n._trigger("drop", t.Event("drop", {
                        delegatedEvent: e
                    }), o) && n._onAdd(e, o)
                }))
            },
            _onDragOver: e("dragover"),
            _onDragEnter: e("dragenter"),
            _onDragLeave: e("dragleave"),
            _initEventHandlers: function() {
                this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    dragenter: this._onDragEnter,
                    dragleave: this._onDragLeave
                }), this._on(this.options.pasteZone, {
                    paste: this._onPaste
                })), t.support.fileInput && this._on(this.options.fileInput, {
                    change: this._onChange
                })
            },
            _destroyEventHandlers: function() {
                this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
            },
            _setOption: function(e, n) {
                var i = -1 !== t.inArray(e, this._specialOptions);
                i && this._destroyEventHandlers(), this._super(e, n), i && (this._initSpecialOptions(), this._initEventHandlers())
            },
            _initSpecialOptions: function() {
                var e = this.options;
                e.fileInput === undefined ? e.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : e.fileInput instanceof t || (e.fileInput = t(e.fileInput)), e.dropZone instanceof t || (e.dropZone = t(e.dropZone)), e.pasteZone instanceof t || (e.pasteZone = t(e.pasteZone))
            },
            _getRegExp: function(t) {
                var e = t.split("/"),
                    n = e.pop();
                return e.shift(), new RegExp(e.join("/"), n)
            },
            _isRegExpOption: function(e, n) {
                return "url" !== e && "string" === t.type(n) && /^\/.*\/[igm]{0,3}$/.test(n)
            },
            _initDataAttributes: function() {
                var e = this,
                    n = this.options,
                    i = t(this.element[0].cloneNode(!1));
                t.each(i.data(), function(t, o) {
                    var r = "data-" + t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                    i.attr(r) && (e._isRegExpOption(t, o) && (o = e._getRegExp(o)), n[t] = o)
                })
            },
            _create: function() {
                this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
            },
            active: function() {
                return this._active
            },
            progress: function() {
                return this._progress
            },
            add: function(e) {
                var n = this;
                e && !this.options.disabled && (e.fileInput && !e.files ? this._getFileInputFiles(e.fileInput).always(function(t) {
                    e.files = t, n._onAdd(null, e)
                }) : (e.files = t.makeArray(e.files), this._onAdd(null, e)))
            },
            send: function(e) {
                if (e && !this.options.disabled) {
                    if (e.fileInput && !e.files) {
                        var n, i, o = this,
                            r = t.Deferred(),
                            a = r.promise();
                        return a.abort = function() {
                            return i = !0, n ? n.abort() : (r.reject(null, "abort", "abort"), a)
                        }, this._getFileInputFiles(e.fileInput).always(function(t) {
                            i || (t.length ? (e.files = t, (n = o._onSend(null, e)).then(function(t, e, n) {
                                r.resolve(t, e, n)
                            }, function(t, e, n) {
                                r.reject(t, e, n)
                            })) : r.reject())
                        }), this._enhancePromise(a)
                    }
                    if (e.files = t.makeArray(e.files), e.files.length) return this._onSend(null, e)
                }
                return this._getXHRPromise(!1, e && e.context)
            }
        })
    }), $(document).on("page:load page:restore", function() {
        $(".ctct-inline-form").length > 0 && SignUpFormWidget.main()
    }), $(document).on("mouseenter mouseleave", ".hagerty-widget-container icon", t => {
        $(t.target).find(".tooltip").fadeToggle(200), $(t.target).hasClass("tooltip") && "mouseleave" === t.type && $(t.target).fadeOut(200)
    }), $(document).on("ajax:complete", ".text-message-widget-form", function() {
        $(".hidden-sms")[0].click()
    });
var lastScrollTop = 0,
    delta = 100,
    navbarHeight = $(".text-message-sticky-widget").outerHeight();
$(window).scroll(function() {
        didScroll = !0
    }), setInterval(function() {
        didScroll && (hasScrolled(), didScroll = !1)
    }, 0), $(document).on("mouseenter mouseleave", ".nsm-widget-container icon", t => {
        $(t.target).parent().find(".tooltip").fadeToggle(200)
    }), window.browserDetector = {
        isAndroid: function() {
            return navigator.userAgent.match(/Android/i)
        },
        isBlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        isIOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        isOpera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        isWindows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        isMobile: function() {
            var t = window.browserDetector;
            return t.isAndroid() || t.isBlackBerry() || t.isIOS() || t.isOpera() || t.isWindows()
        }
    }, $(document).on("click", ".back-to-inventory", function() {
        window.history.back()
    }), $(document).on("click", ".original-image-control.prev", function(t) {
        t.preventDefault(), loadPrevImage(t), updateModal()
    }), $(document).on("click", ".original-image-control.next", function(t) {
        t.preventDefault(), loadNextImage(t), updateModal()
    }), $(document).on("click", ".zoom-lead-image", function(t) {
        t.preventDefault(), loadModal()
    }),
    function(t) {
        var e = !1;
        if ("function" == typeof define && define.amd && (define(t), e = !0), "object" == typeof exports && (module.exports = t(), e = !0), !e) {
            var n = window.Cookies,
                i = window.Cookies = t();
            i.noConflict = function() {
                return window.Cookies = n, i
            }
        }
    }(function() {
        function t() {
            for (var t = 0, e = {}; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) e[i] = n[i]
            }
            return e
        }

        function e(n) {
            function i(e, o, r) {
                var a;
                if ("undefined" != typeof document) {
                    if (arguments.length > 1) {
                        if ("number" == typeof(r = t({
                                path: "/"
                            }, i.defaults, r)).expires) {
                            var s = new Date;
                            s.setMilliseconds(s.getMilliseconds() + 864e5 * r.expires), r.expires = s
                        }
                        try {
                            a = JSON.stringify(o), /^[\{\[]/.test(a) && (o = a)
                        } catch (f) {}
                        return o = n.write ? n.write(o, e) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = (e = (e = encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape), document.cookie = [e, "=", o, r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join("")
                    }
                    e || (a = {});
                    for (var l = document.cookie ? document.cookie.split("; ") : [], c = /(%[0-9A-Z]{2})+/g, d = 0; d < l.length; d++) {
                        var u = l[d].split("="),
                            h = u.slice(1).join("=");
                        '"' === h.charAt(0) && (h = h.slice(1, -1));
                        try {
                            var p = u[0].replace(c, decodeURIComponent);
                            if (h = n.read ? n.read(h, p) : n(h, p) || h.replace(c, decodeURIComponent), this.json) try {
                                h = JSON.parse(h)
                            } catch (f) {}
                            if (e === p) {
                                a = h;
                                break
                            }
                            e || (a[p] = h)
                        } catch (f) {}
                    }
                    return a
                }
            }
            return i.set = i, i.get = function(t) {
                return i.call(i, t)
            }, i.getJSON = function() {
                return i.apply({
                    json: !0
                }, [].slice.call(arguments))
            }, i.defaults = {}, i.remove = function(e, n) {
                i(e, "", t(n, {
                    expires: -1
                }))
            }, i.withConverter = e, i
        }
        return e(function() {})
    }), $(document).ready(function() {
        setClearCompareButtonText(), setCheckboxValues()
    }), $(document).on("click", ".more-filters-btn", function(t) {
        t.preventDefault(), "More Filters" == $(this).text() ? $(this).text("Hide") : $(this).text("More Filters"), $(".inventory-filters-row .filters-mobile-hidden").slideToggle()
    }), $(document).on("click", ".expand-gallery", function(t) {
        t.preventDefault(), "More Photos" == $(this).text().trim() ? ($(this).text("Hide Photos"), $(".car-thumb-height-container").toggleClass("open-thumbs"), $(".car-thumb-height-container .show-car-thumbs").toggleClass("open-thumbs")) : ($(this).text("More Photos"), $(".car-thumb-height-container").toggleClass("open-thumbs"), $(".car-thumb-height-container .show-car-thumbs").toggleClass("open-thumbs"))
    }), $(document).on("click", ".share-box-pop-size", function() {
        var t = 575,
            e = 400,
            n = ($(window).width() - t) / 2,
            i = ($(window).height() - e) / 2,
            o = this.href,
            r = "status=1,width=" + t + ",height=" + e + ",top=" + i + ",left=" + n;
        return window.open(o, "twitter", r), !1
    }), $(document).on("click", ".mobile-menu-fixed-btn", function(t) {
        t.preventDefault(), $("body").toggleClass("fixed-body"), $(this).toggleClass("is-open"), $(".navigation-bottom-row").slideToggle()
    }),
    function(t, e) {
        "use strict";

        function n(n, i, r, s, l) {
            function c() {
                x = t.devicePixelRatio > 1, r = d(r), i.delay >= 0 && setTimeout(function() {
                    u(!0)
                }, i.delay), (i.delay < 0 || i.combined) && (s.e = b(i.throttle, function(t) {
                    "resize" === t.type && (_ = T = -1), u(t.all)
                }), s.a = function(t) {
                    t = d(t), r.push.apply(r, t)
                }, s.g = function() {
                    return r = o(r).filter(function() {
                        return !o(this).data(i.loadedName)
                    })
                }, s.f = function(t) {
                    for (var e = 0; e < t.length; e++) {
                        var n = r.filter(function() {
                            return this === t[e]
                        });
                        n.length && u(!1, n)
                    }
                }, u(), o(i.appendScroll).on("scroll." + l + " resize." + l, s.e))
            }

            function d(t) {
                for (var r = i.defaultImage, a = i.placeholder, s = i.imageBase, l = i.srcsetAttribute, c = i.loaderAttribute, d = i._f || {}, u = 0, h = (t = o(t).filter(function() {
                        var t = o(this),
                            n = m(this);
                        return !t.data(i.handledName) && (t.attr(i.attribute) || t.attr(l) || t.attr(c) || d[n] !== e)
                    }).data("plugin_" + i.name, n)).length; u < h; u++) {
                    var p = o(t[u]),
                        f = m(t[u]),
                        g = p.attr(i.imageBaseAttribute) || s;
                    f === S && g && p.attr(l) && p.attr(l, v(p.attr(l), g)), d[f] === e || p.attr(c) || p.attr(c, d[f]), f === S && r && !p.attr(I) ? p.attr(I, r) : f === S || !a || p.css(O) && "none" !== p.css(O) || p.css(O, "url('" + a + "')")
                }
                return t
            }

            function u(t, e) {
                if (r.length) {
                    for (var a = e || r, s = !1, l = i.imageBase || "", c = i.srcsetAttribute, d = i.handledName, u = 0; u < a.length; u++)
                        if (t || e || p(a[u])) {
                            var f = o(a[u]),
                                g = m(a[u]),
                                v = f.attr(i.attribute),
                                b = f.attr(i.imageBaseAttribute) || l,
                                y = f.attr(i.loaderAttribute);
                            f.data(d) || i.visibleOnly && !f.is(":visible") || !((v || f.attr(c)) && (g === S && (b + v !== f.attr(I) || f.attr(c) !== f.attr(D)) || g !== S && b + v !== f.css(O)) || y) || (s = !0, f.data(d, !0), h(f, g, b, y))
                        } s && (r = o(r).filter(function() {
                        return !o(this).data(d)
                    }))
                } else i.autoDestroy && n.destroy()
            }

            function h(t, e, n, r) {
                ++$;
                var a = function() {
                    w("onError", t), y(), a = o.noop
                };
                w("beforeLoad", t);
                var s = i.attribute,
                    l = i.srcsetAttribute,
                    c = i.sizesAttribute,
                    d = i.retinaAttribute,
                    u = i.removeAttribute,
                    h = i.loadedName,
                    p = t.attr(d);
                if (r) {
                    var f = function() {
                        u && t.removeAttr(i.loaderAttribute), t.data(h, !0), w(C, t), setTimeout(y, 1), f = o.noop
                    };
                    t.off(k).one(k, a).one(E, f), w(r, t, function(e) {
                        e ? (t.off(E), f()) : (t.off(k), a())
                    }) || t.trigger(k)
                } else {
                    var g = o(new Image);
                    g.one(k, a).one(E, function() {
                        t.hide(), e === S ? t.attr(A, g.attr(A)).attr(D, g.attr(D)).attr(I, g.attr(I)) : t.css(O, "url('" + g.attr(I) + "')"), t[i.effect](i.effectTime), u && (t.removeAttr(s + " " + l + " " + d + " " + i.imageBaseAttribute), c !== A && t.removeAttr(c)), t.data(h, !0), w(C, t), g.remove(), y()
                    });
                    var m = (x && p ? p : t.attr(s)) || "";
                    g.attr(A, t.attr(c)).attr(D, t.attr(l)).attr(I, m ? n + m : null), g.complete && g.trigger(E)
                }
            }

            function p(t) {
                var e = t.getBoundingClientRect(),
                    n = i.scrollDirection,
                    o = i.threshold,
                    r = g() + o > e.top && -o < e.bottom,
                    a = f() + o > e.left && -o < e.right;
                return "vertical" === n ? r : "horizontal" === n ? a : r && a
            }

            function f() {
                return _ >= 0 ? _ : _ = o(t).width()
            }

            function g() {
                return T >= 0 ? T : T = o(t).height()
            }

            function m(t) {
                return t.tagName.toLowerCase()
            }

            function v(t, e) {
                if (e) {
                    var n = t.split(",");
                    t = "";
                    for (var i = 0, o = n.length; i < o; i++) t += e + n[i].trim() + (i !== o - 1 ? "," : "")
                }
                return t
            }

            function b(t, e) {
                var o, r = 0;
                return function(a, s) {
                    function l() {
                        r = +new Date, e.call(n, a)
                    }
                    var c = +new Date - r;
                    o && clearTimeout(o), c > t || !i.enableThrottle || s ? l() : o = setTimeout(l, t - c)
                }
            }

            function y() {
                --$, r.length || $ || w("onFinishedAll")
            }

            function w(t) {
                return !!(t = i[t]) && (t.apply(n, [].slice.call(arguments, 1)), !0)
            }
            var $ = 0,
                _ = -1,
                T = -1,
                x = !1,
                C = "afterLoad",
                E = "load",
                k = "error",
                S = "img",
                I = "src",
                D = "srcset",
                A = "sizes",
                O = "background-image";
            "event" === i.bind || a ? c() : o(t).on(E + "." + l, c)
        }

        function i(i, a) {
            var s = this,
                l = o.extend({}, s.config, a),
                c = {},
                d = l.name + "-" + ++r;
            return s.config = function(t, n) {
                return n === e ? l[t] : (l[t] = n, s)
            }, s.addItems = function(t) {
                return c.a && c.a("string" === o.type(t) ? o(t) : t), s
            }, s.getItems = function() {
                return c.g ? c.g() : {}
            }, s.update = function(t) {
                return c.e && c.e({}, !t), s
            }, s.force = function(t) {
                return c.f && c.f("string" === o.type(t) ? o(t) : t), s
            }, s.loadAll = function() {
                return c.e && c.e({
                    all: !0
                }, !0), s
            }, s.destroy = function() {
                return o(l.appendScroll).off("." + d, c.e), o(t).off("." + d), c = {}, e
            }, n(s, l, i, c, d), l.chainable ? i : s
        }
        var o = t.jQuery || t.Zepto,
            r = 0,
            a = !1;
        o.fn.Lazy = o.fn.lazy = function(t) {
            return new i(this, t)
        }, o.Lazy = o.lazy = function(t, n, r) {
            if (o.isFunction(n) && (r = n, n = []), o.isFunction(r)) {
                t = o.isArray(t) ? t : [t], n = o.isArray(n) ? n : [n];
                for (var a = i.prototype.config, s = a._f || (a._f = {}), l = 0, c = t.length; l < c; l++)(a[t[l]] === e || o.isFunction(a[t[l]])) && (a[t[l]] = r);
                for (var d = 0, u = n.length; d < u; d++) s[n[d]] = t[0]
            }
        }, i.prototype.config = {
            name: "lazy",
            chainable: !0,
            autoDestroy: !0,
            bind: "load",
            threshold: 500,
            visibleOnly: !1,
            appendScroll: t,
            scrollDirection: "both",
            imageBase: null,
            defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder: null,
            delay: -1,
            combined: !1,
            attribute: "data-src",
            srcsetAttribute: "data-srcset",
            sizesAttribute: "data-sizes",
            retinaAttribute: "data-retina",
            loaderAttribute: "data-loader",
            imageBaseAttribute: "data-imagebase",
            removeAttribute: !0,
            handledName: "handled",
            loadedName: "loaded",
            effect: "show",
            effectTime: 0,
            enableThrottle: !0,
            throttle: 250,
            beforeLoad: e,
            afterLoad: e,
            onError: e,
            onFinishedAll: e
        }, o(t).on("load", function() {
            a = !0
        })
    }(window),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["jquery"], function(t) {
            return e(t)
        }) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(t.jQuery)
    }(this, function(t) {
        ! function() {
            "use strict";

            function e(e, i) {
                if (this.el = e, this.$el = t(e), this.s = t.extend({}, n, i), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = t(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(t(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
            }
            var n = {
                mode: "lg-slide",
                cssEasing: "ease",
                easing: "linear",
                speed: 600,
                height: "100%",
                width: "100%",
                addClass: "",
                startClass: "lg-start-zoom",
                backdropDuration: 150,
                hideBarsDelay: 6e3,
                useLeft: !1,
                closable: !0,
                loop: !0,
                escKey: !0,
                keyPress: !0,
                controls: !0,
                slideEndAnimatoin: !0,
                hideControlOnEnd: !1,
                mousewheel: !0,
                getCaptionFromTitleOrAlt: !0,
                appendSubHtmlTo: ".lg-sub-html",
                subHtmlSelectorRelative: !1,
                preload: 1,
                showAfterLoad: !0,
                selector: "",
                selectWithin: "",
                nextHtml: "",
                prevHtml: "",
                index: !1,
                iframeMaxWidth: "100%",
                download: !0,
                counter: !0,
                appendCounterTo: ".lg-toolbar",
                swipeThreshold: 50,
                enableSwipe: !0,
                enableDrag: !0,
                dynamic: !1,
                dynamicEl: [],
                galleryId: 1
            };
            e.prototype.init = function() {
                var e = this;
                e.s.preload > e.$items.length && (e.s.preload = e.$items.length);
                var n = window.location.hash;
                n.indexOf("lg=" + this.s.galleryId) > 0 && (e.index = parseInt(n.split("&slide=")[1], 10), t("body").addClass("lg-from-hash"), t("body").hasClass("lg-on") || (setTimeout(function() {
                    e.build(e.index)
                }), t("body").addClass("lg-on"))), e.s.dynamic ? (e.$el.trigger("onBeforeOpen.lg"), e.index = e.s.index || 0, t("body").hasClass("lg-on") || setTimeout(function() {
                    e.build(e.index), t("body").addClass("lg-on")
                })) : e.$items.on("click.lgcustom", function(n) {
                    try {
                        n.preventDefault(), n.preventDefault()
                    } catch (t) {
                        n.returnValue = !1
                    }
                    e.$el.trigger("onBeforeOpen.lg"), e.index = e.s.index || e.$items.index(this), t("body").hasClass("lg-on") || (e.build(e.index), t("body").addClass("lg-on"))
                })
            }, e.prototype.build = function(e) {
                var n = this;
                n.structure(), t.each(t.fn.lightGallery.modules, function(e) {
                    n.modules[e] = new t.fn.lightGallery.modules[e](n.el)
                }), n.slide(e, !1, !1, !1), n.s.keyPress && n.keyPress(), n.$items.length > 1 ? (n.arrow(), setTimeout(function() {
                    n.enableDrag(), n.enableSwipe()
                }, 50), n.s.mousewheel && n.mousewheel()) : n.$slide.on("click.lg", function() {
                    n.$el.trigger("onSlideClick.lg")
                }), n.counter(), n.closeGallery(), n.$el.trigger("onAfterOpen.lg"), n.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                    n.$outer.removeClass("lg-hide-items"), clearTimeout(n.hideBartimeout), n.hideBartimeout = setTimeout(function() {
                        n.$outer.addClass("lg-hide-items")
                    }, n.s.hideBarsDelay)
                }), n.$outer.trigger("mousemove.lg")
            }, e.prototype.structure = function() {
                var e, n = "",
                    i = "",
                    o = 0,
                    r = "",
                    a = this;
                for (t("body").append('<div class="lg-backdrop"></div>'), t(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), o = 0; o < this.$items.length; o++) n += '<div class="lg-item"></div>';
                if (this.s.controls && this.$items.length > 1 && (i = '<div class="lg-actions"><button class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (r = '<div class="lg-sub-html"></div>'), e = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + n + '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + i + r + "</div></div>", t("body").append(e), this.$outer = t(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), a.setTop(), t(window).on("resize.lg orientationchange.lg", function() {
                        setTimeout(function() {
                            a.setTop()
                        }, 100)
                    }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                    var s = this.$outer.find(".lg-inner");
                    s.css("transition-timing-function", this.s.cssEasing), s.css("transition-duration", this.s.speed + "ms")
                }
                setTimeout(function() {
                    t(".lg-backdrop").addClass("in")
                }), setTimeout(function() {
                    a.$outer.addClass("lg-visible")
                }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = t(window).scrollTop()
            }, e.prototype.setTop = function() {
                if ("100%" !== this.s.height) {
                    var e = t(window).height(),
                        n = (e - parseInt(this.s.height, 10)) / 2,
                        i = this.$outer.find(".lg");
                    e >= parseInt(this.s.height, 10) ? i.css("top", n + "px") : i.css("top", "0px")
                }
            }, e.prototype.doCss = function() {
                return !! function() {
                    var t = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                        e = document.documentElement,
                        n = 0;
                    for (n = 0; n < t.length; n++)
                        if (t[n] in e.style) return !0
                }()
            }, e.prototype.isVideo = function(t, e) {
                var n;
                if (n = this.s.dynamic ? this.s.dynamicEl[e].html : this.$items.eq(e).attr("data-html"), !t) return n ? {
                    html5: !0
                } : (console.error("lightGallery :- data-src is not pvovided on slide item " + (e + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), !1);
                var i = t.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                    o = t.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                    r = t.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                    a = t.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
                return i ? {
                    youtube: i
                } : o ? {
                    vimeo: o
                } : r ? {
                    dailymotion: r
                } : a ? {
                    vk: a
                } : void 0
            }, e.prototype.counter = function() {
                this.s.counter && t(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
            }, e.prototype.addHtml = function(e) {
                var n, i, o = null;
                if (this.s.dynamic ? this.s.dynamicEl[e].subHtmlUrl ? n = this.s.dynamicEl[e].subHtmlUrl : o = this.s.dynamicEl[e].subHtml : (i = this.$items.eq(e)).attr("data-sub-html-url") ? n = i.attr("data-sub-html-url") : (o = i.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !o && (o = i.attr("title") || i.find("img").first().attr("alt"))), !n)
                    if (null != o) {
                        var r = o.substring(0, 1);
                        "." !== r && "#" !== r || (o = this.s.subHtmlSelectorRelative && !this.s.dynamic ? i.find(o).html() : t(o).html())
                    } else o = "";
                ".lg-sub-html" === this.s.appendSubHtmlTo ? n ? this.$outer.find(this.s.appendSubHtmlTo).load(n) : this.$outer.find(this.s.appendSubHtmlTo).html(o) : n ? this.$slide.eq(e).load(n) : this.$slide.eq(e).append(o), null != o && ("" === o ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [e])
            }, e.prototype.preload = function(t) {
                var e = 1,
                    n = 1;
                for (e = 1; e <= this.s.preload && !(e >= this.$items.length - t); e++) this.loadContent(t + e, !1, 0);
                for (n = 1; n <= this.s.preload && !(t - n < 0); n++) this.loadContent(t - n, !1, 0)
            }, e.prototype.loadContent = function(e, n, i) {
                var o, r, a, s, l, c, d = this,
                    u = !1,
                    h = function(e) {
                        for (var n = [], i = [], o = 0; o < e.length; o++) {
                            var a = e[o].split(" ");
                            "" === a[0] && a.splice(0, 1), i.push(a[0]), n.push(a[1])
                        }
                        for (var s = t(window).width(), l = 0; l < n.length; l++)
                            if (parseInt(n[l], 10) > s) {
                                r = i[l];
                                break
                            }
                    };
                d.s.dynamic ? (d.s.dynamicEl[e].poster && (u = !0, a = d.s.dynamicEl[e].poster), c = d.s.dynamicEl[e].html, r = d.s.dynamicEl[e].src, d.s.dynamicEl[e].responsive && h(d.s.dynamicEl[e].responsive.split(",")), s = d.s.dynamicEl[e].srcset, l = d.s.dynamicEl[e].sizes) : (d.$items.eq(e).attr("data-poster") && (u = !0, a = d.$items.eq(e).attr("data-poster")), c = d.$items.eq(e).attr("data-html"), r = d.$items.eq(e).attr("href") || d.$items.eq(e).attr("data-src"), d.$items.eq(e).attr("data-responsive") && h(d.$items.eq(e).attr("data-responsive").split(",")), s = d.$items.eq(e).attr("data-srcset"), l = d.$items.eq(e).attr("data-sizes"));
                var p = !1;
                d.s.dynamic ? d.s.dynamicEl[e].iframe && (p = !0) : "true" === d.$items.eq(e).attr("data-iframe") && (p = !0);
                var f = d.isVideo(r, e);
                if (!d.$slide.eq(e).hasClass("lg-loaded")) {
                    if (p) d.$slide.eq(e).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + d.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + r + '"  allowfullscreen="true"></iframe></div></div>');
                    else if (u) {
                        var g = "";
                        g = f && f.youtube ? "lg-has-youtube" : f && f.vimeo ? "lg-has-vimeo" : "lg-has-html5", d.$slide.eq(e).prepend('<div class="lg-video-cont ' + g + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + a + '" /></div></div>')
                    } else f ? (d.$slide.eq(e).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), d.$el.trigger("hasVideo.lg", [e, r, c])) : d.$slide.eq(e).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + r + '" /></div>');
                    if (d.$el.trigger("onAferAppendSlide.lg", [e]), o = d.$slide.eq(e).find(".lg-object"), l && o.attr("sizes", l), s) {
                        o.attr("srcset", s);
                        try {
                            picturefill({
                                elements: [o[0]]
                            })
                        } catch (t) {
                            console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")
                        }
                    }
                    ".lg-sub-html" !== this.s.appendSubHtmlTo && d.addHtml(e), d.$slide.eq(e).addClass("lg-loaded")
                }
                d.$slide.eq(e).find(".lg-object").on("load.lg error.lg", function() {
                    var n = 0;
                    i && !t("body").hasClass("lg-from-hash") && (n = i), setTimeout(function() {
                        d.$slide.eq(e).addClass("lg-complete"), d.$el.trigger("onSlideItemLoad.lg", [e, i || 0])
                    }, n)
                }), f && f.html5 && !u && d.$slide.eq(e).addClass("lg-complete"), !0 === n && (d.$slide.eq(e).hasClass("lg-complete") ? d.preload(e) : d.$slide.eq(e).find(".lg-object").on("load.lg error.lg", function() {
                    d.preload(e)
                }))
            }, e.prototype.slide = function(e, n, i, o) {
                var r = this.$outer.find(".lg-current").index(),
                    a = this;
                if (!a.lGalleryOn || r !== e) {
                    var s = this.$slide.length,
                        l = a.lGalleryOn ? this.s.speed : 0;
                    if (!a.lgBusy) {
                        var c, d, u;
                        if (this.s.download)(c = a.s.dynamic ? !1 !== a.s.dynamicEl[e].downloadUrl && (a.s.dynamicEl[e].downloadUrl || a.s.dynamicEl[e].src) : "false" !== a.$items.eq(e).attr("data-download-url") && (a.$items.eq(e).attr("data-download-url") || a.$items.eq(e).attr("href") || a.$items.eq(e).attr("data-src"))) ? (t("#lg-download").attr("href", c), a.$outer.removeClass("lg-hide-download")) : a.$outer.addClass("lg-hide-download");
                        if (this.$el.trigger("onBeforeSlide.lg", [r, e, n, i]), a.lgBusy = !0, clearTimeout(a.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                                a.addHtml(e)
                            }, l), this.arrowDisable(e), o || (e < r ? o = "prev" : e > r && (o = "next")), n) this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), s > 2 ? (d = e - 1, u = e + 1, 0 === e && r === s - 1 ? (u = 0, d = s - 1) : e === s - 1 && 0 === r && (u = 0, d = s - 1)) : (d = 0, u = 1), "prev" === o ? a.$slide.eq(u).addClass("lg-next-slide") : a.$slide.eq(d).addClass("lg-prev-slide"), a.$slide.eq(e).addClass("lg-current");
                        else a.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === o ? (this.$slide.eq(e).addClass("lg-prev-slide"), this.$slide.eq(r).addClass("lg-next-slide")) : (this.$slide.eq(e).addClass("lg-next-slide"), this.$slide.eq(r).addClass("lg-prev-slide")), setTimeout(function() {
                            a.$slide.removeClass("lg-current"), a.$slide.eq(e).addClass("lg-current"), a.$outer.removeClass("lg-no-trans")
                        }, 50);
                        a.lGalleryOn ? (setTimeout(function() {
                            a.loadContent(e, !0, 0)
                        }, this.s.speed + 50), setTimeout(function() {
                            a.lgBusy = !1, a.$el.trigger("onAfterSlide.lg", [r, e, n, i])
                        }, this.s.speed)) : (a.loadContent(e, !0, a.s.backdropDuration), a.lgBusy = !1, a.$el.trigger("onAfterSlide.lg", [r, e, n, i])), a.lGalleryOn = !0, this.s.counter && t("#lg-counter-current").text(e + 1)
                    }
                    a.index = e
                }
            }, e.prototype.goToNextSlide = function(t) {
                var e = this,
                    n = e.s.loop;
                t && e.$slide.length < 3 && (n = !1), e.lgBusy || (e.index + 1 < e.$slide.length ? (e.index++, e.$el.trigger("onBeforeNextSlide.lg", [e.index]), e.slide(e.index, t, !1, "next")) : n ? (e.index = 0, e.$el.trigger("onBeforeNextSlide.lg", [e.index]), e.slide(e.index, t, !1, "next")) : e.s.slideEndAnimatoin && !t && (e.$outer.addClass("lg-right-end"), setTimeout(function() {
                    e.$outer.removeClass("lg-right-end")
                }, 400)))
            }, e.prototype.goToPrevSlide = function(t) {
                var e = this,
                    n = e.s.loop;
                t && e.$slide.length < 3 && (n = !1), e.lgBusy || (e.index > 0 ? (e.index--, e.$el.trigger("onBeforePrevSlide.lg", [e.index, t]), e.slide(e.index, t, !1, "prev")) : n ? (e.index = e.$items.length - 1, e.$el.trigger("onBeforePrevSlide.lg", [e.index, t]), e.slide(e.index, t, !1, "prev")) : e.s.slideEndAnimatoin && !t && (e.$outer.addClass("lg-left-end"), setTimeout(function() {
                    e.$outer.removeClass("lg-left-end")
                }, 400)))
            }, e.prototype.keyPress = function() {
                var e = this;
                this.$items.length > 1 && t(window).on("keyup.lg", function(t) {
                    e.$items.length > 1 && (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()), 39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()))
                }), t(window).on("keydown.lg", function(t) {
                    !0 === e.s.escKey && 27 === t.keyCode && (t.preventDefault(), e.$outer.hasClass("lg-thumb-open") ? e.$outer.removeClass("lg-thumb-open") : e.destroy())
                })
            }, e.prototype.arrow = function() {
                var t = this;
                this.$outer.find(".lg-prev").on("click.lg", function() {
                    t.goToPrevSlide()
                }), this.$outer.find(".lg-next").on("click.lg", function() {
                    t.goToNextSlide()
                })
            }, e.prototype.arrowDisable = function(t) {
                !this.s.loop && this.s.hideControlOnEnd && (t + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), t > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
            }, e.prototype.setTranslate = function(t, e, n) {
                this.s.useLeft ? t.css("left", e) : t.css({
                    transform: "translate3d(" + e + "px, " + n + "px, 0px)"
                })
            }, e.prototype.touchMove = function(e, n) {
                var i = n - e;
                Math.abs(i) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), i, 0), this.setTranslate(t(".lg-prev-slide"), -this.$slide.eq(this.index).width() + i, 0), this.setTranslate(t(".lg-next-slide"), this.$slide.eq(this.index).width() + i, 0))
            }, e.prototype.touchEnd = function(t) {
                var e = this;
                "lg-slide" !== e.s.mode && e.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                    e.$outer.removeClass("lg-dragging"), t < 0 && Math.abs(t) > e.s.swipeThreshold ? e.goToNextSlide(!0) : t > 0 && Math.abs(t) > e.s.swipeThreshold ? e.goToPrevSlide(!0) : Math.abs(t) < 5 && e.$el.trigger("onSlideClick.lg"), e.$slide.removeAttr("style")
                }), setTimeout(function() {
                    e.$outer.hasClass("lg-dragging") || "lg-slide" === e.s.mode || e.$outer.removeClass("lg-slide")
                }, e.s.speed + 100)
            }, e.prototype.enableSwipe = function() {
                var t = this,
                    e = 0,
                    n = 0,
                    i = !1;
                t.s.enableSwipe && t.doCss() && (t.$slide.on("touchstart.lg", function(n) {
                    t.$outer.hasClass("lg-zoomed") || t.lgBusy || (n.preventDefault(), t.manageSwipeClass(), e = n.originalEvent.targetTouches[0].pageX)
                }), t.$slide.on("touchmove.lg", function(o) {
                    t.$outer.hasClass("lg-zoomed") || (o.preventDefault(), n = o.originalEvent.targetTouches[0].pageX, t.touchMove(e, n), i = !0)
                }), t.$slide.on("touchend.lg", function() {
                    t.$outer.hasClass("lg-zoomed") || (i ? (i = !1, t.touchEnd(n - e)) : t.$el.trigger("onSlideClick.lg"))
                }))
            }, e.prototype.enableDrag = function() {
                var e = this,
                    n = 0,
                    i = 0,
                    o = !1,
                    r = !1;
                e.s.enableDrag && e.doCss() && (e.$slide.on("mousedown.lg", function(i) {
                    e.$outer.hasClass("lg-zoomed") || e.lgBusy || t(i.target).text().trim() || (i.preventDefault(), e.manageSwipeClass(), n = i.pageX, o = !0, e.$outer.scrollLeft += 1, e.$outer.scrollLeft -= 1, e.$outer.removeClass("lg-grab").addClass("lg-grabbing"), e.$el.trigger("onDragstart.lg"))
                }), t(window).on("mousemove.lg", function(t) {
                    o && (r = !0, i = t.pageX, e.touchMove(n, i), e.$el.trigger("onDragmove.lg"))
                }), t(window).on("mouseup.lg", function(a) {
                    r ? (r = !1, e.touchEnd(i - n), e.$el.trigger("onDragend.lg")) : (t(a.target).hasClass("lg-object") || t(a.target).hasClass("lg-video-play")) && e.$el.trigger("onSlideClick.lg"), o && (o = !1, e.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
                }))
            }, e.prototype.manageSwipeClass = function() {
                var t = this.index + 1,
                    e = this.index - 1;
                this.s.loop && this.$slide.length > 2 && (0 === this.index ? e = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (t = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), e > -1 && this.$slide.eq(e).addClass("lg-prev-slide"), this.$slide.eq(t).addClass("lg-next-slide")
            }, e.prototype.mousewheel = function() {
                var t = this;
                t.$outer.on("mousewheel.lg", function(e) {
                    e.deltaY && (e.deltaY > 0 ? t.goToPrevSlide() : t.goToNextSlide(), e.preventDefault())
                })
            }, e.prototype.closeGallery = function() {
                var e = this,
                    n = !1;
                this.$outer.find(".lg-close").on("click.lg", function() {
                    e.destroy()
                }), e.s.closable && (e.$outer.on("mousedown.lg", function(e) {
                    n = !!(t(e.target).is(".lg-outer") || t(e.target).is(".lg-item ") || t(e.target).is(".lg-img-wrap"))
                }), e.$outer.on("mousemove.lg", function() {
                    n = !1
                }), e.$outer.on("mouseup.lg", function(i) {
                    (t(i.target).is(".lg-outer") || t(i.target).is(".lg-item ") || t(i.target).is(".lg-img-wrap") && n) && (e.$outer.hasClass("lg-dragging") || e.destroy())
                }))
            }, e.prototype.destroy = function(e) {
                var n = this;
                e || (n.$el.trigger("onBeforeClose.lg"), t(window).scrollTop(n.prevScrollTop)), e && (n.s.dynamic || this.$items.off("click.lg click.lgcustom"), t.removeData(n.el, "lightGallery")), this.$el.off(".lg.tm"), t.each(t.fn.lightGallery.modules, function(t) {
                    n.modules[t] && n.modules[t].destroy()
                }), this.lGalleryOn = !1, clearTimeout(n.hideBartimeout), this.hideBartimeout = !1, t(window).off(".lg"), t("body").removeClass("lg-on lg-from-hash"), n.$outer && n.$outer.removeClass("lg-visible"), t(".lg-backdrop").removeClass("in"), setTimeout(function() {
                    n.$outer && n.$outer.remove(), t(".lg-backdrop").remove(), e || n.$el.trigger("onCloseAfter.lg")
                }, n.s.backdropDuration + 50)
            }, t.fn.lightGallery = function(n) {
                return this.each(function() {
                    if (t.data(this, "lightGallery")) try {
                        t(this).data("lightGallery").init()
                    } catch (t) {
                        console.error("lightGallery has not initiated properly")
                    } else t.data(this, "lightGallery", new e(this, n))
                })
            }, t.fn.lightGallery.modules = {}
        }()
    }),
    /*! lg-thumbnail - v1.1.0 - 2017-08-08
     * http://sachinchoolur.github.io/lightGallery
     * Copyright (c) 2017 Sachin N; Licensed GPLv3 */
    function(t, e) {
        "function" == typeof define && define.amd ? define(["jquery"], function(t) {
            return e(t)
        }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(0, function(t) {
        ! function() {
            "use strict";
            var e = {
                    thumbnail: !0,
                    animateThumb: !0,
                    currentPagerPosition: "middle",
                    thumbWidth: 100,
                    thumbHeight: "80px",
                    thumbContHeight: 100,
                    thumbMargin: 5,
                    exThumbImage: !1,
                    showThumbByDefault: !0,
                    toogleThumb: !0,
                    pullCaptionUp: !0,
                    enableThumbDrag: !0,
                    enableThumbSwipe: !0,
                    swipeThreshold: 50,
                    loadYoutubeThumbnail: !0,
                    youtubeThumbSize: 1,
                    loadVimeoThumbnail: !0,
                    vimeoThumbSize: "thumbnail_small",
                    loadDailymotionThumbnail: !0
                },
                n = function(n) {
                    return this.core = t(n).data("lightGallery"), this.core.s = t.extend({}, e, this.core.s), this.$el = t(n), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"), this.left = 0, this.init(), this
                };
            n.prototype.init = function() {
                var t = this;
                this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() {
                    t.core.$outer.addClass("lg-thumb-open")
                }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb && this.core.doCss() ? (this.core.s.enableThumbDrag && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
            }, n.prototype.build = function() {
                function e(t, e, n) {
                    var a, s = i.core.isVideo(t, n) || {},
                        l = "";
                    s.youtube || s.vimeo || s.dailymotion ? s.youtube ? a = i.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + s.youtube[1] + "/" + i.core.s.youtubeThumbSize + ".jpg" : e : s.vimeo ? i.core.s.loadVimeoThumbnail ? (a = "//i.vimeocdn.com/video/error_" + r + ".jpg", l = s.vimeo[1]) : a = e : s.dailymotion && (a = i.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + s.dailymotion[1] : e) : a = e, o += '<div data-vimeo-id="' + l + '" class="lg-thumb-item" style="width:' + i.core.s.thumbWidth + "px; height: " + i.core.s.thumbHeight + "; margin-right: " + i.core.s.thumbMargin + 'px"><img src="' + a + '" /></div>', l = ""
                }
                var n, i = this,
                    o = "",
                    r = "",
                    a = '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
                switch (this.core.s.vimeoThumbSize) {
                    case "thumbnail_large":
                        r = "640";
                        break;
                    case "thumbnail_medium":
                        r = "200x150";
                        break;
                    case "thumbnail_small":
                        r = "100x75"
                }
                if (i.core.$outer.addClass("lg-has-thumb"), i.core.$outer.find(".lg").append(a), i.$thumbOuter = i.core.$outer.find(".lg-thumb-outer"), i.thumbOuterWidth = i.$thumbOuter.width(), i.core.s.animateThumb && i.core.$outer.find(".lg-thumb").css({
                        width: i.thumbTotalWidth + "px",
                        position: "relative"
                    }), this.core.s.animateThumb && i.$thumbOuter.css("height", i.core.s.thumbContHeight + "px"), i.core.s.dynamic)
                    for (var s = 0; s < i.core.s.dynamicEl.length; s++) e(i.core.s.dynamicEl[s].src, i.core.s.dynamicEl[s].thumb, s);
                else i.core.$items.each(function(n) {
                    i.core.s.exThumbImage ? e(t(this).attr("href") || t(this).attr("data-src"), t(this).attr(i.core.s.exThumbImage), n) : e(t(this).attr("href") || t(this).attr("data-src"), t(this).find("img").attr("src"), n)
                });
                i.core.$outer.find(".lg-thumb").html(o), (n = i.core.$outer.find(".lg-thumb-item")).each(function() {
                    var e = t(this),
                        n = e.attr("data-vimeo-id");
                    n && t.getJSON("//www.vimeo.com/api/v2/video/" + n + ".json?callback=?", {
                        format: "json"
                    }, function(t) {
                        e.find("img").attr("src", t[0][i.core.s.vimeoThumbSize])
                    })
                }), n.eq(i.core.index).addClass("active"), i.core.$el.on("onBeforeSlide.lg.tm", function() {
                    n.removeClass("active"), n.eq(i.core.index).addClass("active")
                }), n.on("click.lg touchend.lg", function() {
                    var e = t(this);
                    setTimeout(function() {
                        (i.thumbClickable && !i.core.lgBusy || !i.core.doCss()) && (i.core.index = e.index(), i.core.slide(i.core.index, !1, !0, !1))
                    }, 50)
                }), i.core.$el.on("onBeforeSlide.lg.tm", function() {
                    i.animateThumb(i.core.index)
                }), t(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                    setTimeout(function() {
                        i.animateThumb(i.core.index), i.thumbOuterWidth = i.$thumbOuter.width()
                    }, 200)
                })
            }, n.prototype.setTranslate = function(t) {
                this.core.$outer.find(".lg-thumb").css({
                    transform: "translate3d(-" + t + "px, 0px, 0px)"
                })
            }, n.prototype.animateThumb = function(t) {
                var e = this.core.$outer.find(".lg-thumb");
                if (this.core.s.animateThumb) {
                    var n;
                    switch (this.core.s.currentPagerPosition) {
                        case "left":
                            n = 0;
                            break;
                        case "middle":
                            n = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                            break;
                        case "right":
                            n = this.thumbOuterWidth - this.core.s.thumbWidth
                    }
                    this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * t - 1 - n, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (e.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || e.animate({
                        left: -this.left + "px"
                    }, this.core.s.speed)) : this.core.doCss() || e.css("left", -this.left + "px"), this.setTranslate(this.left)
                }
            }, n.prototype.enableThumbDrag = function() {
                var e = this,
                    n = 0,
                    i = 0,
                    o = !1,
                    r = !1,
                    a = 0;
                e.$thumbOuter.addClass("lg-grab"), e.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(t) {
                    e.thumbTotalWidth > e.thumbOuterWidth && (t.preventDefault(), n = t.pageX, o = !0, e.core.$outer.scrollLeft += 1, e.core.$outer.scrollLeft -= 1, e.thumbClickable = !1, e.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
                }), t(window).on("mousemove.lg.thumb", function(t) {
                    o && (a = e.left, r = !0, i = t.pageX, e.$thumbOuter.addClass("lg-dragging"), (a -= i - n) > e.thumbTotalWidth - e.thumbOuterWidth && (a = e.thumbTotalWidth - e.thumbOuterWidth), a < 0 && (a = 0), e.setTranslate(a))
                }), t(window).on("mouseup.lg.thumb", function() {
                    r ? (r = !1, e.$thumbOuter.removeClass("lg-dragging"), e.left = a, Math.abs(i - n) < e.core.s.swipeThreshold && (e.thumbClickable = !0)) : e.thumbClickable = !0, o && (o = !1, e.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
                })
            }, n.prototype.enableThumbSwipe = function() {
                var t = this,
                    e = 0,
                    n = 0,
                    i = !1,
                    o = 0;
                t.core.$outer.find(".lg-thumb").on("touchstart.lg", function(n) {
                    t.thumbTotalWidth > t.thumbOuterWidth && (n.preventDefault(), e = n.originalEvent.targetTouches[0].pageX, t.thumbClickable = !1)
                }), t.core.$outer.find(".lg-thumb").on("touchmove.lg", function(r) {
                    t.thumbTotalWidth > t.thumbOuterWidth && (r.preventDefault(), n = r.originalEvent.targetTouches[0].pageX, i = !0, t.$thumbOuter.addClass("lg-dragging"), o = t.left, (o -= n - e) > t.thumbTotalWidth - t.thumbOuterWidth && (o = t.thumbTotalWidth - t.thumbOuterWidth), o < 0 && (o = 0), t.setTranslate(o))
                }), t.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                    t.thumbTotalWidth > t.thumbOuterWidth && i ? (i = !1, t.$thumbOuter.removeClass("lg-dragging"), Math.abs(n - e) < t.core.s.swipeThreshold && (t.thumbClickable = !0), t.left = o) : t.thumbClickable = !0
                })
            }, n.prototype.toogle = function() {
                var t = this;
                t.core.s.toogleThumb && (t.core.$outer.addClass("lg-can-toggle"), t.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), t.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                    t.core.$outer.toggleClass("lg-thumb-open")
                }))
            }, n.prototype.thumbkeyPress = function() {
                var e = this;
                t(window).on("keydown.lg.thumb", function(t) {
                    38 === t.keyCode ? (t.preventDefault(), e.core.$outer.addClass("lg-thumb-open")) : 40 === t.keyCode && (t.preventDefault(), e.core.$outer.removeClass("lg-thumb-open"))
                })
            }, n.prototype.destroy = function() {
                this.core.s.thumbnail && this.core.$items.length > 1 && (t(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
            }, t.fn.lightGallery.modules.Thumbnail = n
        }()
    }), window.cyclerDefaultFadeOutTime = 0, window.imageCyclerInterval = 5e3;
var allowScroll = !0,
    worldwidePageContent = {};
worldwidePageContent.prevScrollpos = window.pageYOffset, worldwidePageContentcurrentScrollPos = window.pageYOffset, worldwidePageContent.prevScrollposFilter = window.pageYOffset, $(document).on("click", "#worldwide-menu-toggle", function() {
    $(this).toggleClass("open"), $(".mobile-nav-slide-out").toggleClass("open-nav")
}), $(document).on("ready page:load page:restore", function() {
    $(".lazy").Lazy({
        scrollDirection: "both",
        effect: "fadeIn",
        visibleOnly: !1,
        effectTime: 500,
        throttle: 250,
        threshold: 100,
        onError: function(t) {
            console.log("error loading " + t.data("src"))
        }
    })
}), $(document).ready(function() {
    document.body.setAttribute("data-no-turbolink", !0), $(window).scroll(function() {
        navHideShow()
    })
}), $(document).on("click", ".mobile-menu-btn", function(t) {
    t.preventDefault(), $("body").toggleClass("fixed-body"), $(this).toggleClass("is-open"), $(".navigation-bottom-row").slideToggle(), setTimeout(function() {
        $(".navigation-bottom-row").toggleClass("fade-in")
    }, 100)
}), $(document).ready(function() {
    $(".inv-cta-btn").on("click", function() {
        $(".home-filters").addClass("sticky-home-filters"), $("html, body").animate({
            scrollTop: 200
        }, 500)
    })
}), $(document).ready(function() {
    $(".home-filter-toggle").on("click", function() {
        $(".home-filter-toggle").hasClass("open-filter-toggle") ? $(".home-filter-toggle").text("Show Filters").removeClass("open-filter-toggle") : $(".home-filter-toggle").text("Hide Filters").addClass("open-filter-toggle"), $(".worldwide-filters-wrap").toggleClass("open-filters")
    })
}), $(document).ready(function() {
    $(document).scroll(function() {
        if ($(document).width() > 991) {
            var t = $(document).scrollTop(),
                e = $(document).height() - $(document).scrollTop();
            t > 122 && $(".right-show").addClass("shift-up1"), t < 122 && $(".right-show").removeClass("shift-up1"), t > 180 && $(".right-show").addClass("shift-up2"), t < 180 && $(".right-show").removeClass("shift-up2"), e > 800 && $(".right-show").removeClass("shift-up3"), e < 800 && $(".right-show").addClass("shift-up3"), e > 1750 && $(".right-show").removeClass("shift-hide"), e < 1750 && $(".right-show").addClass("shift-hide"), e > 1550 && $(".right-show").removeClass("shift-hide2"), e < 1550 && $(".right-show").addClass("shift-hide2")
        }
    })
}), $(document).on("click", ".show-car-thumbs a", function() {
    var t = $(this).data("index");
    $(".current-photo").text(t)
}), $(document).on("click", ".next", function() {
    var t = parseInt($(".current-photo").text());
    $(".current-photo").text(t + 1)
}), $(document).on("click", ".prev", function() {
    var t = parseInt($(".current-photo").text());
    $(".current-photo").text(t - 1)
}), $(document).on("click", ".custom-box", function() {
    $(this).hasClass("open") ? $(this).toggleClass("open") : ($(".custom-box.open").toggleClass("open"), $(this).toggleClass("open"))
}), $(document).on("ready", function() {
    $(".read-more-specs").on("click", function() {
        $(".spec-summary-container").toggleClass("open-specs"), $(".spec-summary-container").hasClass("open-specs") ? $(".read-more-specs span").text("View Less") : $(".read-more-specs span").text("View More")
    })
}), $(document).on("ready", function() {
    $(".read-more").on("click", function() {
        $(".shortened-desc").toggleClass("desc-hide"), $(".full-desc").toggleClass("desc-hide"), $(".full-desc").hasClass("desc-hide") ? $(".read-more span").text("Read More") : $(".read-more span").text("Read Less")
    })
}), $(document).on("click", "#worldwide-video-thumb", function(t) {
    t.preventDefault(), t.stopPropagation(), toggleVideo("on"), document.querySelector(".vehicle-top-image").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
}), $(document).on("click", ".show-car-thumbs a", function(t) {
    t.preventDefault(), toggleVideo("off")
}), $(document).ready(function() {
    $("#mute-video").click(function() {
        $("video").prop("muted") ? ($(this).toggleClass("video-mute"), $("video").prop("muted", !1)) : ($(this).toggleClass("video-mute"), $("video").prop("muted", !0))
    }), $("video").on("ended", function() {
        $(this).prop("loop", "loop"), $(this).prop("muted", "muted"), $(this)[0].play(), $("#mute-video").toggleClass("video-mute")
    })
}), $(document).ready(function() {
    fullWidth()
}), $(document).ready(function() {
    if ("set" !== sessionStorage.getItem("set")) {
        var t = "#vip-auto-modal";
        !["/vehicles/vip-members-only"].includes(window.location.pathname) && !$("#vip_exist").length > 0 && setTimeout(function() {
            $(t).modal(), sessionStorage.setItem("set", "set")
        }, 2e4)
    }
}), $(document).ready(function() {
    $("a.section-toggler").on("click", function(t) {
        t.preventDefault(), $(this).toggleClass("open-faq"), $(this).closest(".qq").find(".answer").slideToggle()
    })
}), $(document).ready(function() {
    "ssform" === sessionStorage.getItem("ssform") && ($(".contact-success.l-flash-success.ww").toggle(), $("#worldwide-consignment-form").toggle(), $("html, body").animate({
        scrollTop: $(".contact-success.l-flash-success.ww").offset().top - 200
    }, 300), sessionStorage.setItem("ssform", "refresh")), $("#worldwide-consignment-form").submit(function() {
        sessionStorage.setItem("ssform", "ssform")
    })
}), $(document).ready(function() {
    $("#worldwide_consignment_make_id").on("change", function() {
        var t = $("#worldwide_consignment_make_id option:selected").text();
        $("#sharpspring_vehicle_make").attr("value", t), $("#sharpspring_vehicle_make").text(t)
    }), $("#worldwide_consignment_model_id").on("change", function() {
        var t = $("#worldwide_consignment_model_id option:selected").text();
        $("#sharpspring_vehicle_model").attr("value", t), $("#sharpspring_vehicle_model").text(t)
    })
});