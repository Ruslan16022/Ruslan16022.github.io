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
/* topbar */
var topMenu = (function() {
	$(".btn_menu").click(function() {
		$(".topbar_menu").show(200);
	});
	$(".menu_clo").click(function() {
		$(this).parent(".topbar_menu").hide(0);
	});
})();

//获取select的值
var selectOptions = false;
var selectIndex = 0; //option的索引值
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