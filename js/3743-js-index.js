// 屏幕自适应
var zoom = 1;
var adaptViewport = (function() {
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.match(/MSIE (\d+)/g);
        if (msie != null) {
            return parseInt(msie[0].match(/\d+/g)[0]);
        }
        // IE 11
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        return false;
    }
    var minWidth = 1200; // 最小宽度
    var designWidth = 1920; // 设计稿宽度
    var isFirefox = navigator.userAgent.indexOf("Firefox") != -1
    var ieVersion = detectIE();

    function resize() {
        // doc.clientWidth不包含滚动栏宽度
        var ww = document.documentElement.clientWidth || window.innerWidth;
        var realWid = Math.max(ww, minWidth);
        zoom = realWid / designWidth;
        if (ieVersion && ieVersion < 9) {
            return;
        }
        // firefox不支持zoom. ie9,10,11 zoom表现奇怪
        if (isFirefox || ieVersion >= 9) {
            if (zoom !== 1) {
                if (!$('.wrap').parent().hasClass('wrap-scale')) {
                    $('.wrap').wrap('<div class="wrap-scale"></div>')
                    $('.wrap-scale').css('position', 'relative');
                    $('.wrap').data('originHeight', $('.wrap').outerHeight())
                }
                var transformOrigin = '0% 0%';
                $('.wrap').css({
                    'width': designWidth,
                    'transform': 'scale(' + zoom + ')',
                    'transform-origin': transformOrigin,
                    'margin-left': 0
                })
                $('.dia').css({
                    'transform': 'scale(' + zoom + ')',
                    'transform-origin': transformOrigin,
                })
                $('.wrap-scale').css({
                    'width': (realWid > minWidth ? 'auto' : minWidth),
                    'height': $('.wrap').data('originHeight') * zoom,
                    'overflow': 'hidden'
                })
            }
        } else {
            $('.wrap').css({
                'width': designWidth,
                'zoom': zoom
            });
            $('.dia').css({
                'zoom': zoom
            });
        }
    }
    resize();
    window.onresize = resize;
    // 当切换tab等情形导致.wrap高度改变时，调用此函数。
    function resizeWrapScale() {
        $('.wrap-scale').css({
            'height': $('.wrap').outerHeight() * zoom
        })
    }
    return {
        resizeWrapScale: resizeWrapScale
    }
})();

//弹窗  调用方法试例：TGDialogS('pop1')
function TGDialogS(e) {
    closeDialog();
    $("#" + e).css("display", "block");
    $("#" + e).css({
        "position": "fixed",
        "left": "50%",
        "top": "50%",
        "z-index": "999",
        "margin-top": -($("#" + e).height() / 2),
        "margin-left": -($("#" + e).width() / 2),
    })
    $("#" + e).addClass("pop_block");
    $(".dialog").css("display", "block");
}

function closeDialog() {
    $(".pop_block").css("display", "none");
    $(".dialog").css("display", "none");
};
//轮播
var swiper = new Swiper('.swiper-container', {
    loop: true,
    observer: true,
    observeParents: true,
    pagination: {
        el: '.default_point',
        clickable: true,
    },
    navigation: {
        nextEl: '.btn_next',
        prevEl: '.btn_prev',
    },
});
//查看详情
$(".icon_default").click(function() {
    TGDialogS("diaDefault");
});

//获取select的值
var selectOptions = false;
var selectIndex = 0;
$("#serverSelect").on("change", function() {
    // options = $(this).find('option:selected').val();
    selectIndex = $(this).get(0).selectedIndex;
    if (selectIndex == null || selectIndex == 0) {
        $("#tip1").show();
        selectOptions = false;
    } else {
        $("#tip1").hide();
        selectOptions = true;
    }
});

$(".btn_redeem").click(function(event) {
    if (selectOptions) {
        $("#tip1").hide();
        TGDialogS('diaConfirm');
    } else {
        $("#tip1").show();
    }
});