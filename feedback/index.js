$(function () {
	$("#contents.contact .main .form .btn a").off("click");
	$("#contents.contact .main .form .btn a").on("click", function (e) {
		e.preventDefault();
		contact();
	});

	function contact() {
		//初回表示
		var form = $("#contactForm").serialize();
		$("#contents.contact .main .form .cover").addClass("show");
		$.ajax({
			type: "POST",
			url: "./contact_check.php",
			dataType: "json",
			data: {
				"subject": $("#vej_subject").val(),
				"name": $("#vej_name").val(),
				"phone": $("#vej_phone").val(),
				"mail": $("#vej_mail").val(),
				"inquiry": $("#vej_inquiry").val()
			},
			success: function (json) {
				if (json.status == "ok") {
					//成功
					$("#contents.contact .main .form ul li").removeClass("alert");
					$("#contents.contact .main .form .btn").addClass("hide");
					$("#contents.contact .main .form .cover").removeClass("show");
					$("#contents.contact .main .form .comp").addClass("show");
				} else {
					$("#contents.contact .main .form ul li").removeClass("alert");
					$("#contents.contact .main .form .cover").removeClass("show");
					$("#contents.contact .main .form .comp").removeClass("show");

					//エラー有り
					if (json.check.subject != "") {
						$("#checkSubject").addClass("alert");
					}
					if (json.check.name != "") {
						$("#checkName").addClass("alert");
					}
					if (json.check.phone != "") {
						$("#checkPhone").addClass("alert");
					}
					if (json.check.mail != "") {
						$("#checkMail").addClass("alert");
					}
					if (json.check.inquiry != "") {
						$("#checkInquiry").addClass("alert");
					}
				}
			},
			error: function () {}
		});
	}
});
