<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
	<title>输入验证码</title>
	<!--<%@include file="../Home/Head.jsp"%> -->

	<link rel="stylesheet" href="<s:theme code=" common" />" >
	<link rel="stylesheet" href="<s:theme code=" index" />" >
	<script type="text/javascript">
		$(function () {
			var windowInnerHeight = window.innerHeight; //获取当前浏览器窗口高度
			var windowInnerWidth = window.innerWidth; // 获取浏览器窗口宽度
			// $('.Verification-page').height(window.innerHeight);
			$('.Verification-page').css('min-height', '600px');
			// var bodyMinHeight = (window.innerWidth * 1.5) + 'px';
			if (window.innerHeight < 600) {
				$('.footer').css('position', 'absolute'); //也可以在css文件夹写个类名，然后相对应的removeClass和addClass既可
			} else {
				$('.footer').css('position', 'fixed');
			}
			$(window).resize(function () {
				$('.Verification-page').height(window.innerHeight);
			});
			$("input,textarea,select").focus(function () {
				if (window.innerHeight > 600) {
					$('.footer').css('position', 'absolute');
				}
			});
			$("input,textarea,select").blur(function () {
				setTimeout(function () {
					var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
					if (window.innerHeight > 600) {
						$('.footer').css('position', 'fixed');
					}
					// $('html').animate({scrollTop: '0px'}, 100);
				}, 100);
			});
			// $('#text').blur(function () {
			//     $('html').animate({scrollTop: '0px'}, 100);
			//     $('.Verification-page').height(windowInnerHeight);
			// })
		});

	</script>
</head>

<body class="Verification-page" style="position:relative;">

	<div class="boxpanel">
		<!--1001修改-->
		<div class="whitepanel">
			<input type="hidden" value="${id}" id="txtId" />
			<input placeholder="请输入验证码" id="text" maxlength="4" type="number" />
			<div style="margin-top: 15px;font-size:14px;color: #955409;text-align: center;">
				<%--亲爱的楼主，扫码验真平台即日起至6月30日<br/>
              每天21:30-次日7:30、6月26号17:00-次日7:00进行系统维护暂停服务。<br/>
              请您错开以上时段进行扫码验真，<br/>  
              感谢您的理解和支持！<br/>--%>
				<%--为了给各位楼主提供更好的验真服务，<br/>
              1916沙龙平台将对二维码验真服务<br/>
              进行升级维护，即日起至6月30日<br/>
              每天21:30-次日8:30、6月14日22:00-6月<br/>
              17日8:00暂停服务，给您带来不便敬请谅解。<br/>--%>
			</div>
			<!--<a href="javascript:void(0);">提&nbsp;&nbsp;交</a>-->
			<!--1001删除-->
		</div>

	</div>
	<!--1001修改-->

	<!--1001 footer单独拿出来 复制下面整块，删去原先footer-->
	<div class="footer" style="position: absolute;bottom: 0px;">
		<a href="javascript:void(0);" id="vericationBtn" onclick="checkCode()">提&nbsp;&nbsp;交</a>
		<p style="font-size:9px;">本平台含有烟草内容 18岁以下谢绝关注</p>
		<p style="font-size:9px;">服务支持：武汉黄鹤楼漫天游文化传播有限公司</p>
	</div>
	<script type="text/javascript">
		function checkCode() {
			if ($("#text").val() == '') {
				alert('请输入验证码');
				return false;
			}
			var reg = /^[0-9]{4}$/;
			if (!reg.test($("#text").val())) {
				alert('验证码为4位数字');
				return false;
			}
			$.ajax({
				url: sitePath + '/Code/checkVerifyCode',
				data: {
					id: $("#txtId").val(),
					code: $("#text").val()
				},
				type: "post",
				success: function (result) {
					dataObj = JSON.parse(result);
					if (dataObj.result == 'SUCCESS') {
						if (!dataObj.follow) {
							location = sitePath + '/User/WxFollow?id=' + $("#txtId").val();
						} else if (dataObj.test == 1) {
							location = sitePath + '/Product/RealTest?id=' + $("#txtId").val();
						} else if (dataObj.count == 1) {
							location = sitePath + '/Product/RealFirst?id=' + $("#txtId").val();
						} else {
							location = sitePath + '/Product/Real?id=' + $("#txtId").val();
						}
					} else {
						if (dataObj.verifyTimes < 3) {
							location = 'VerificationMore?id=' + $("#txtId").val();
						} else {
							location = 'VerificationError?id=' + $("#txtId").val();
						}
					}
				},
				error: function (e) {
					console.log(e);
				}
			});
		}

	</script>
</body>

</html>
