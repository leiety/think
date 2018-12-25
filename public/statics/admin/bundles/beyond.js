function getThemeColorFromCss(n) {
	var t = $("<span><\/span>").hide().appendTo("body"),
	i;
	return t.addClass(n),
	i = t.css("color"),
	t.remove(),
	i
}
function InitiateSideMenu() {
	$(".sidebar-toggler").on("click",
	function() {
		return $("#sidebar").toggleClass("hide"),
		$(".sidebar-toggler").toggleClass("active"),
		$("#footer").toggleClass("f100"),
		!1
	});
	var n = $("#sidebar").hasClass("menu-compact");
	$("#sidebar-collapse").on("click",
	function() {
		if ($("#sidebar").is(":visible") || $("#sidebar").toggleClass("hide"), $("#sidebar").toggleClass("menu-compact"),  $("#footer").toggleClass("f80"), $(".sidebar-collapse").toggleClass("active"), n = $("#sidebar").hasClass("menu-compact"), $(".sidebar-menu").closest("div").hasClass("slimScrollDiv") && ($(".sidebar-menu").slimScroll({
			destroy: !0
		}), $(".sidebar-menu").attr("style", "")), n) $(".open > .submenu").removeClass("open");
		else if ($(".page-sidebar").hasClass("sidebar-fixed")) {
			var t = readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html" ? "right": "left";
			$(".sidebar-menu").slimscroll({
				height: "auto",
				position: t,
				size: "3px",
				color: themeprimary
			})
		}
	});
	$(".sidebar-menu").on("click",
	function(t) {
		var i = $(t.target).closest("a"),
		u,
		r,
		f;
		if (i && i.length != 0) {
			if (!i.hasClass("menu-dropdown")) return n && i.get(0).parentNode.parentNode == this && (u = i.find(".menu-text").get(0), t.target != u && !$.contains(u, t.target)) ? !1 : void 0;
			if (r = i.next().get(0), !$(r).is(":visible")) {
				if (f = $(r.parentNode).closest("ul"), n && f.hasClass("sidebar-menu")) return;
				f.find("> .open > .submenu").each(function() {
					this == r || $(this.parentNode).hasClass("active") || $(this).slideUp(200).parent().removeClass("open")
				})
			}
			return n && $(r.parentNode.parentNode).hasClass("sidebar-menu") ? !1 : ($(r).slideToggle(200).parent().toggleClass("open"), !1)
		}
	})
}
function InitiateWidgets() {
	$('.widget-buttons *[data-toggle="maximize"]').on("click",
	function(n) {
		n.preventDefault();
		var t = $(this).parents(".widget").eq(0),
		i = $(this).find("i").eq(0),
		r = "fa-compress",
		u = "fa-expand";
		t.hasClass("maximized") ? (i && i.addClass(u).removeClass(r), t.removeClass("maximized"), t.find(".widget-body").css("height", "auto")) : (i && i.addClass(r).removeClass(u), t.addClass("maximized"), maximize(t))
	});
	$('.widget-buttons *[data-toggle="collapse"]').on("click",
	function(n) {
		n.preventDefault();
		var t = $(this).parents(".widget").eq(0),
		r = t.find(".widget-body"),
		i = $(this).find("i"),
		u = "fa-plus",
		f = "fa-minus",
		e = 300;
		t.hasClass("collapsed") ? (i && i.addClass(f).removeClass(u), t.removeClass("collapsed"), r.slideUp(0,
		function() {
			r.slideDown(e)
		})) : (i && i.addClass(u).removeClass(f), r.slideUp(200,
		function() {
			t.addClass("collapsed")
		}))
	});
	$('.widget-buttons *[data-toggle="dispose"]').on("click",
	function(n) {
		n.preventDefault();
		var i = $(this),
		t = i.parents(".widget").eq(0);
		t.hide(300,
		function() {
			t.remove()
		})
	})
}
function maximize(n) {
	if (n) {
		var t = $(window).height(),
		i = n.find(".widget-header").height();
		n.find(".widget-body").height(t - i)
	}
}
function scrollTo(n, t) {
	var i = n && n.size() > 0 ? n.offset().top: 0;
	jQuery("html,body").animate({
		scrollTop: i + (t ? t: 0)
	},
	"slow")
}
function Notify(n, t, i, r, u, f) {
	toastr.options.positionClass = "toast-" + t;
	toastr.options.extendedTimeOut = 0;
	toastr.options.timeOut = i;
	toastr.options.closeButton = f;
	toastr.options.iconClass = u + " toast-" + r;
	toastr.custom(n)
}
function InitiateSettings() {
	if (readCookie("navbar-fixed-top") != null && readCookie("navbar-fixed-top") == "true" && ($("#checkbox_fixednavbar").prop("checked", !0), $(".navbar").addClass("navbar-fixed-top")), readCookie("sidebar-fixed") != null && readCookie("sidebar-fixed") == "true" && ($("#checkbox_fixedsidebar").prop("checked", !0), $(".page-sidebar").addClass("sidebar-fixed"), !$(".page-sidebar").hasClass("menu-compact"))) {
		var n = readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html" ? "right": "left";
		$(".sidebar-menu").slimscroll({
			height: "auto",
			position: n,
			size: "3px",
			color: themeprimary
		})
	}
	readCookie("breadcrumbs-fixed") != null && readCookie("breadcrumbs-fixed") == "true" && ($("#checkbox_fixedbreadcrumbs").prop("checked", !0), $(".page-breadcrumbs").addClass("breadcrumbs-fixed"));
	readCookie("page-header-fixed") != null && readCookie("page-header-fixed") == "true" && ($("#checkbox_fixedheader").prop("checked", !0), $(".page-header").addClass("page-header-fixed"));
	$("#checkbox_fixednavbar").change(function() {
		$(".navbar").toggleClass("navbar-fixed-top");
		$("#checkbox_fixedsidebar").is(":checked") && ($("#checkbox_fixedsidebar").prop("checked", !1), $(".page-sidebar").toggleClass("sidebar-fixed"));
		$("#checkbox_fixedbreadcrumbs").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedbreadcrumbs").prop("checked", !1), $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
		$("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1), $(".page-header").toggleClass("page-header-fixed"));
		setCookiesForFixedSettings()
	});
	$("#checkbox_fixedsidebar").change(function() {
		$(".page-sidebar").toggleClass("sidebar-fixed");
		$("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0), $(".navbar").toggleClass("navbar-fixed-top"));
		$("#checkbox_fixedbreadcrumbs").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedbreadcrumbs").prop("checked", !1), $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
		$("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1), $(".page-header").toggleClass("page-header-fixed"));
		setCookiesForFixedSettings()
	});
	$("#checkbox_fixedbreadcrumbs").change(function() {
		$(".page-breadcrumbs").toggleClass("breadcrumbs-fixed");
		$("#checkbox_fixedsidebar").is(":checked") || ($("#checkbox_fixedsidebar").prop("checked", !0), $(".page-sidebar").toggleClass("sidebar-fixed"));
		$("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0), $(".navbar").toggleClass("navbar-fixed-top"));
		$("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1), $(".page-header").toggleClass("page-header-fixed"));
		setCookiesForFixedSettings()
	});
	$("#checkbox_fixedheader").change(function() {
		$(".page-header").toggleClass("page-header-fixed");
		$("#checkbox_fixedbreadcrumbs").is(":checked") || ($("#checkbox_fixedbreadcrumbs").prop("checked", !0), $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
		$("#checkbox_fixedsidebar").is(":checked") || ($("#checkbox_fixedsidebar").prop("checked", !0), $(".page-sidebar").toggleClass("sidebar-fixed"));
		$("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0), $(".navbar").toggleClass("navbar-fixed-top"));
		setCookiesForFixedSettings()
	})
}
function setCookiesForFixedSettings() {
	createCookie("navbar-fixed-top", $("#checkbox_fixednavbar").is(":checked"), 100);
	createCookie("sidebar-fixed", $("#checkbox_fixedsidebar").is(":checked"), 100);
	createCookie("breadcrumbs-fixed", $("#checkbox_fixedbreadcrumbs").is(":checked"), 100);
	createCookie("page-header-fixed", $("#checkbox_fixedheader").is(":checked"), 100);
	var n = readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html" ? "right": "left";
	$("#checkbox_fixedsidebar").is(":checked") ? $(".page-sidebar").hasClass("menu-compact") || $(".sidebar-menu").slimscroll({
		position: n,
		size: "3px",
		color: themeprimary,
		height: "auto"
	}) : $(".sidebar-menu").closest("div").hasClass("slimScrollDiv") && ($(".sidebar-menu").slimScroll({
		destroy: !0
	}), $(".sidebar-menu").attr("style", ""))
}
function getcolor(n) {
	switch (n) {
	case "themeprimary":
		return themeprimary;
	case "themesecondary":
		return themesecondary;
	case "themethirdcolor":
		return themethirdcolor;
	case "themefourthcolor":
		return themefourthcolor;
	case "themefifthcolor":
		return themefifthcolor;
	default:
		return n
	}
}
function switchClasses(n, t) {
	var u = document.getElementsByClassName(n),
	r;
	for (i = u.length - 1; i >= 0; i--) hasClass(u[i], "dropdown-menu") || (addClass(u[i], n + "-temp"), removeClass(u[i], n));
	for (r = document.getElementsByClassName(t), i = r.length - 1; i >= 0; i--) hasClass(r[i], "dropdown-menu") || (addClass(r[i], n), removeClass(r[i], t));
	for (tempClasses = document.getElementsByClassName(n + "-temp"), i = tempClasses.length - 1; i >= 0; i--) hasClass(tempClasses[i], "dropdown-menu") || (addClass(tempClasses[i], t), removeClass(tempClasses[i], n + "-temp"))
}
function addClass(n, t) {
	var i = n.className;
	i && (i += " ");
	n.className = i + t
}
function removeClass(n, t) {
	var i = " " + n.className + " ";
	n.className = i.replace(" " + t, "").replace(/^\s+/g, "").replace(/\s+$/g, "")
}
function hasClass(n, t) {
	var i = " " + n.className + " ",
	r = " " + t + " ";
	return i.indexOf(r) != -1
}
var themeprimary = getThemeColorFromCss("themeprimary"),
themesecondary = getThemeColorFromCss("themesecondary"),
themethirdcolor = getThemeColorFromCss("themethirdcolor"),
themefourthcolor = getThemeColorFromCss("themefourthcolor"),
themefifthcolor = getThemeColorFromCss("themefifthcolor"),
rtlchanger,
popovers,
hoverpopovers,
position;
$("#skin-changer li a").click(function() {
	createCookie("current-skin", $(this).attr("rel"), 10);
	window.location.reload()
});
rtlchanger = document.getElementById("rtl-changer");
location.pathname != "/index-rtl-fa.html" && location.pathname != "/index-rtl-ar.html" && (readCookie("rtl-support") ? (switchClasses("pull-right", "pull-left"), switchClasses("databox-right", "databox-left"), switchClasses("item-right", "item-left"), $(".navbar-brand small img").attr("src", "assets/img/logo-rtl.png"), rtlchanger != null && (document.getElementById("rtl-changer").checked = !0)) : rtlchanger != null && (rtlchanger.checked = !1), rtlchanger != null && (rtlchanger.onchange = function() {
	this.checked ? createCookie("rtl-support", "true", 10) : eraseCookie("rtl-support");
	setTimeout(function() {
		window.location.reload()
	},
	600)
}));
$(window).load(function() {
	setTimeout(function() {
		$(".loading-container").addClass("loading-inactive")
	},
	1e3)
});
$("#btn-setting").on("click",
function() {
	$(".navbar-account").toggleClass("setting-open")
});
$("#fullscreen-toggler").on("click",
function() {
	var n = document.documentElement;
	$("body").hasClass("full-screen") ? ($("body").removeClass("full-screen"), $("#fullscreen-toggler").removeClass("active"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()) : ($("body").addClass("full-screen"), $("#fullscreen-toggler").addClass("active"), n.requestFullscreen ? n.requestFullscreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.webkitRequestFullscreen ? n.webkitRequestFullscreen() : n.msRequestFullscreen && n.msRequestFullscreen())
});
popovers = $("[data-toggle=popover]");
$.each(popovers,
function() {
	$(this).popover({
		html: !0,
		template: '<div class="popover ' + $(this).data("class") + '"><div class="arrow"><\/div><h3 class="popover-title ' + $(this).data("titleclass") + '">Popover right<\/h3><div class="popover-content"><\/div><\/div>'
	})
});
hoverpopovers = $("[data-toggle=popover-hover]");
$.each(hoverpopovers,
function() {
	$(this).popover({
		html: !0,
		template: '<div class="popover ' + $(this).data("class") + '"><div class="arrow"><\/div><h3 class="popover-title ' + $(this).data("titleclass") + '">Popover right<\/h3><div class="popover-content"><\/div><\/div>',
		trigger: "hover"
	})
});
$("[data-toggle=tooltip]").tooltip({
	html: !0
});
InitiateSideMenu();
InitiateSettings();
InitiateWidgets();
$("#chat-link").click(function() {
	$(".page-chatbar").toggleClass("open");
	$("#chat-link").toggleClass("open")
});
$(".page-chatbar .chatbar-contacts .contact").on("click",
function() {
	$(".page-chatbar .chatbar-contacts").hide();
	$(".page-chatbar .chatbar-messages").show()
});
$(".page-chatbar .chatbar-messages .back").on("click",
function() {
	$(".page-chatbar .chatbar-contacts").show();
	$(".page-chatbar .chatbar-messages").hide()
});
position = readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html" ? "right": "left";
$(".chatbar-messages .messages-list").slimscroll({
	position: position,
	size: "4px",
	color: themeprimary,
	height: $(window).height() - 250
});
$(".chatbar-contacts .contacts-list").slimscroll({
	position: position,
	size: "4px",
	color: themeprimary,
	height: $(window).height() - 86
})