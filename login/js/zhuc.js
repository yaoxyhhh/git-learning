window.onload = function() {
	$('form :input').blur(function() {
		var $parent = $(this).parent();

		$parent.find(".formtips").remove();

		if($(this).is('form :input')) {
			if(this.value == "") {
				flag1 = 0;
				flag2 = 0;
				flag3 = 0;
				var errorMsg = '输入不能为空  ';
				$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
			} else {
				// 验证用户名
				if($(this).is('#username')) {
					if(this.value.length < 3) {
						flag1 = 0;
						var errorMsg = '请输入至少3位的用户名';
						$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
					} else {
						flag1 = 1;
						var okMsg = '格式正确';
						$x = this.value;
						$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
					}
				}

				// 验证密码
				if($(this).is('#password')) {
					if(this.value.length < 6 || this.value.length > 20 || (this.value != "" && !/[a-zA-Z0-9]+$/g.test(this.value))) {
						flag2 = 0;
						var errorMsg = '只能输入字母或数字,请输入6-20位的正确的密码';
						$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
					} else {
						flag2 = 1;
						var okMsg = '格式正确';
						$y = this.value;
						$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
					}
				}
				//确认密码
				if($(this).is('#truepw')) {
					if(this.value == "" || this.value != $(this).parent().prev().children('#password').val()) {
						flag2 = 0;
						var errorMsg = '两次密码输入不一致';
						$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
					} else {
						flag2 = 1;
						var okMsg = '格式正确';
						$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
					}
				}
				//邮箱
				if($(this).is('#email')) {
					if((this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value))) {
						flag3 = 0;
						var errorMsg = '请输入正确的E-Mail地址';
						$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
					} else {
						flag3 = 1;
						var okMsg = '格式正确';
						$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
					}
				}
			}
		}
		if(flag1 == 1 && flag2 == 1) {
			$("#buttona").removeAttr("disabled");
		}
		if(flag1 == 1 && flag2 == 1 && flag3 == 1) {
			$("#buttonb").removeAttr("disabled");
		}
	});
	$("#buttona").click(function() {
		$username = $('#username').val();
		$password = $('#password').val();
		$.ajax({
			type: 'post',
			url: 'http://132.232.119.136:81/php.php',
			//      data: "para="+para,  此处data可以为 a=1&b=2类型的字符串 或 json数据。
			data: {
				"uname": $username,
				"upwd": $password
			},
			cache: false,
			async: false,
			dataType: "json",
			success: function(responseData) {
				if(responseData=='1') {
					alert('用户名不存在，请重新输入');
				} else if(responseData=='0'){
					alert('登陆成功');
				}else if(responseData=='2'){
					alert('密码错误,请重新输入');
				}
			},
			error: function() {
				alert("登陆失败");
			}
		})
	})
}