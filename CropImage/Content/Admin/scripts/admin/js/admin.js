if ("undefined" == typeof jQuery) throw new Error("jQuery plugins need to be before this file"); $.AdminBSB = {}, $.AdminBSB.options = { colors: { red: "#F44336", pink: "#E91E63", purple: "#9C27B0", deepPurple: "#673AB7", indigo: "#3F51B5", blue: "#2196F3", lightBlue: "#03A9F4", cyan: "#00BCD4", teal: "#009688", green: "#4CAF50", lightGreen: "#8BC34A", lime: "#CDDC39", yellow: "#ffe821", amber: "#FFC107", orange: "#FF9800", deepOrange: "#FF5722", brown: "#795548", grey: "#9E9E9E", blueGrey: "#607D8B", black: "#000000", white: "#ffffff" }, leftSideBar: { scrollColor: "rgba(0,0,0,0.5)", scrollWidth: "4px", scrollAlwaysVisible: !1, scrollBorderRadius: "0", scrollRailBorderRadius: "0", scrollActiveItemWhenPageLoad: !0, breakpointWidth: 1170 }, dropdownMenu: { effectIn: "fadeIn", effectOut: "fadeOut" } }, $.AdminBSB.leftSideBar = { activate: function () { var e = this, t = $("body"), o = $(".overlay"); $(window).click(function (n) { var a = $(n.target); "i" === n.target.nodeName.toLowerCase() && (a = $(n.target).parent()), !a.hasClass("bars") && e.isOpen() && 0 === a.parents("#leftsidebar").length && (a.hasClass("js-right-sidebar") || o.fadeOut(), t.removeClass("overlay-open")) }), $.each($(".menu-toggle.toggled"), function (e, t) { $(t).next().slideToggle(0) }), $.each($(".menu .list li.active"), function (e, t) { var o = $(t).find("a:eq(0)"); o.addClass("toggled"), o.next().show() }), $(".menu-toggle").on("click", function (e) { var t = $(this), o = t.next(); if ($(t.parents("ul")[0]).hasClass("list")) { var n = $(e.target).hasClass("menu-toggle") ? e.target : $(e.target).parents(".menu-toggle"); $.each($(".menu-toggle.toggled").not(n).next(), function (e, t) { $(t).is(":visible") && ($(t).prev().toggleClass("toggled"), $(t).slideUp()) }) } t.toggleClass("toggled"), o.slideToggle(320) }), e.setMenuHeight(), e.checkStatuForResize(!0), $(window).resize(function () { e.setMenuHeight(), e.checkStatuForResize(!1) }), Waves.attach(".menu .list a", ["waves-block"]), Waves.init() }, setMenuHeight: function (e) { if (void 0 !== $.fn.slimScroll) { var t = $.AdminBSB.options.leftSideBar, o = $(window).height() - ($(".legal").outerHeight() + $(".user-info").outerHeight() + $(".navbar").innerHeight()), n = $(".list"); if (n.slimscroll({ height: o + "px", color: t.scrollColor, size: t.scrollWidth, alwaysVisible: t.scrollAlwaysVisible, borderRadius: t.scrollBorderRadius, railBorderRadius: t.scrollRailBorderRadius }), $.AdminBSB.options.leftSideBar.scrollActiveItemWhenPageLoad) { var a = $(".menu .list li.active")[0].offsetTop; a > 150 && n.slimscroll({ scrollTo: a + "px" }) } } }, checkStatuForResize: function (e) { var t = $("body"), o = $(".navbar .navbar-header .bars"), n = t.width(); e && t.find(".content, .sidebar").addClass("no-animate").delay(1e3).queue(function () { $(this).removeClass("no-animate").dequeue() }), n < $.AdminBSB.options.leftSideBar.breakpointWidth ? (t.addClass("ls-closed"), o.fadeIn()) : (t.removeClass("ls-closed"), o.fadeOut()) }, isOpen: function () { return $("body").hasClass("overlay-open") } }, $.AdminBSB.rightSideBar = { activate: function () { var e = this, t = $("#rightsidebar"), o = $(".overlay"); $(window).click(function (n) { var a = $(n.target); "i" === n.target.nodeName.toLowerCase() && (a = $(n.target).parent()), !a.hasClass("js-right-sidebar") && e.isOpen() && 0 === a.parents("#rightsidebar").length && (a.hasClass("bars") || o.fadeOut(), t.removeClass("open")) }), $(".js-right-sidebar").on("click", function () { t.toggleClass("open"), e.isOpen() ? o.fadeIn() : o.fadeOut() }) }, isOpen: function () { return $(".right-sidebar").hasClass("open") } }; var $searchBar = $(".search-bar"); $.AdminBSB.search = { activate: function () { var e = this; $(".js-search").on("click", function () { e.showSearchBar(), console.log("Hello from SearchBar") }), $searchBar.find(".close-search").on("click", function () { e.hideSearchBar() }), $searchBar.find('input[type="text"]').on("keyup", function (t) { 27 == t.keyCode && e.hideSearchBar() }) }, showSearchBar: function () { $searchBar.addClass("open"), $searchBar.find('input[type="text"]').focus() }, hideSearchBar: function () { $searchBar.removeClass("open"), $searchBar.find('input[type="text"]').val("") } }, $.AdminBSB.navbar = { activate: function () { var e = $("body"), t = $(".overlay"); $(".bars").on("click", function () { e.toggleClass("overlay-open"), e.hasClass("overlay-open") ? t.fadeIn() : t.fadeOut() }), $('.nav [data-close="true"]').on("click", function () { var e = $(".navbar-toggle").is(":visible"), t = $(".navbar-collapse"); e && t.slideUp(function () { t.removeClass("in").removeAttr("style") }) }) } }, $.AdminBSB.input = { activate: function () { $(".form-control").focus(function () { $(this).parent().addClass("focused") }), $(".form-control").focusout(function () { var e = $(this); e.parents(".form-group").hasClass("form-float") ? "" == e.val() && e.parents(".form-line").removeClass("focused") : e.parents(".form-line").removeClass("focused") }), $("body").on("click", ".form-float .form-line .form-label", function () { $(this).parent().find("input").focus() }), $(".form-control").each(function () { "" !== $(this).val() && $(this).parents(".form-line").addClass("focused") }) } }, $.AdminBSB.select = { activate: function () { $.fn.selectpicker && $("select:not(.ms)").selectpicker() } }, $.AdminBSB.dropdownMenu = { activate: function () { var e = this; $(".dropdown, .dropup, .btn-group").on({ "show.bs.dropdown": function () { var t = e.dropdownEffect(this); e.dropdownEffectStart(t, t.effectIn) }, "shown.bs.dropdown": function () { var t = e.dropdownEffect(this); t.effectIn && t.effectOut && e.dropdownEffectEnd(t, function () { }) }, "hide.bs.dropdown": function (t) { var o = e.dropdownEffect(this); o.effectOut && (t.preventDefault(), e.dropdownEffectStart(o, o.effectOut), e.dropdownEffectEnd(o, function () { o.dropdown.removeClass("open") })) } }), Waves.attach(".dropdown-menu li a", ["waves-block"]), Waves.init() }, dropdownEffect: function (e) { var t = $.AdminBSB.options.dropdownMenu.effectIn, o = $.AdminBSB.options.dropdownMenu.effectOut, n = $(e), a = $(".dropdown-menu", e); if (n.length > 0) { var r = n.data("effect-in"), i = n.data("effect-out"); void 0 !== r && (t = r), void 0 !== i && (o = i) } return { target: e, dropdown: n, dropdownMenu: a, effectIn: t, effectOut: o } }, dropdownEffectStart: function (e, t) { t && (e.dropdown.addClass("dropdown-animating"), e.dropdownMenu.addClass("animated dropdown-animated"), e.dropdownMenu.addClass(t)) }, dropdownEffectEnd: function (e, t) { e.dropdown.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { e.dropdown.removeClass("dropdown-animating"), e.dropdownMenu.removeClass("animated dropdown-animated"), e.dropdownMenu.removeClass(e.effectIn), e.dropdownMenu.removeClass(e.effectOut), "function" == typeof t && t() }) } }; var edge = "Microsoft Edge", ie10 = "Internet Explorer 10", ie11 = "Internet Explorer 11", opera = "Opera", firefox = "Mozilla Firefox", chrome = "Google Chrome", safari = "Safari"; $.AdminBSB.browser = { activate: function () { "" !== this.getClassName() && $("html").addClass(this.getClassName()) }, getBrowser: function () { var e = navigator.userAgent.toLowerCase(); return /edge/i.test(e) ? edge : /rv:11/i.test(e) ? ie11 : /msie 10/i.test(e) ? ie10 : /opr/i.test(e) ? opera : /chrome/i.test(e) ? chrome : /firefox/i.test(e) ? firefox : navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) ? safari : void 0 }, getClassName: function () { var e = this.getBrowser(); return e === edge ? "edge" : e === ie11 ? "ie11" : e === ie10 ? "ie10" : e === opera ? "opera" : e === chrome ? "chrome" : e === firefox ? "firefox" : e === safari ? "safari" : "" } }, $(function () { $.AdminBSB.browser.activate(), $.AdminBSB.leftSideBar.activate(), $.AdminBSB.rightSideBar.activate(), $.AdminBSB.navbar.activate(), $.AdminBSB.dropdownMenu.activate(), $.AdminBSB.input.activate(), $.AdminBSB.select.activate(), $.AdminBSB.search.activate(), setTimeout(function () { $(".page-loader-wrapper").fadeOut() }, 50) });