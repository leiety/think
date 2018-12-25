$(function() {
	swal.setDefaults({confirmButtonClass: 'bg-themeprimary', allowOutsideClick: false, confirmButtonText: '确定', cancelButtonText: '取消', reverseButtons: true});

})

function swloading(msg='') {
	msg = msg?msg:'服务器处理中！';
	swal({
	  title: msg,  
	  onOpen: () => {
	    swal.showLoading()
	  }
	});
}

function bepost(that) {
	that.bootstrapValidator({
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        var bv = that.data('bootstrapValidator');
        swpost(that.attr('action'), that.serialize(), bv);
    });
}

function swget(url='') {
    swloading();
    $.ajax({
		url: url,
		type: "get",
		dataType: "json",
		success: function (result) {
			if (result.code == 1) {
				swal({
					type: 'success',
					title: result.msg,
					timer: result.wait*1000,
					onClose: () => {
						window.location.href=result.url;
					}
				})
			} else {
				swal(result.msg, '', 'error');
			}
		},
		error: function (xhr) {
			if(bv) bv.disableSubmitButtons(false);
			if (xhr.status==200) {
				swal("错误提示：返回数据错误#" + xhr.status, '', 'error');
			}else{
				swal("错误提示： " + xhr.status + " " + xhr.statusText, '', 'error');
			}
		}
	});
}

function swpost(url='', data='', bv='') {
    swloading();
	    $.ajax({
			url: url,
			data: data,
			type: "POST",
			dataType: "json",
			success: function (result) {
				if(bv) bv.disableSubmitButtons(false);
				if (result.code == 1) {
					swal({
						type: 'success',
						title: result.msg,
						timer: result.wait*1000,
						onClose: () => {
							window.location.href=result.url;
						}
					})
				} else {
					swal(result.msg, '', 'error');
				}
			},
			error: function (xhr) {
				if(bv) bv.disableSubmitButtons(false);
				if (xhr.status==200) {
					swal("错误提示：返回数据错误#" + xhr.status, '', 'error');
				}else{
					swal("错误提示： " + xhr.status + " " + xhr.statusText, '', 'error');
				}
			}
		});
}

function daojishi(type, result) {
	swal({
		type: type,
		title: result.msg,
		html: '<strong>'+ result.wait +'</strong>',
		timer: result.wait*1000,
		onOpen: () => {
			timerInterval = setInterval(() => {
				swal.getContent().querySelector('strong')
				.textContent = Math.round(swal.getTimerLeft()/1000)
			}, 1000)
		},
		onClose: () => {
			clearInterval(timerInterval);
			window.location.href=result.url;
		}
	})
}