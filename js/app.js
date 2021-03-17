//SLIDERS
if($('.slider__body').length>0){
	$('.slider__body').slick({
		//autoplay: true,
		//infinite: false,
		dots: true,
		arrows: false,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		adaptiveHeight:true,
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
}
$('.wrapper').addClass('loaded');$('.icon-menu').click(function(event) {	$(this).toggleClass('active');	$('.menu__body').toggleClass('active');	$('body').toggleClass('lock');});function ibg(){	$.each($('.ibg'), function(index, val) {		if($(this).find('img').length>0){			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');		}	});}ibg();
//FORMS
function forms(){
	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}else{
				this.value = $(this).attr('data-value');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			if (this.value == '') {
				if(!$(this).hasClass('l')){
					this.value = $(this).attr('data-value');
				}
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
			if($(this).hasClass('vn')){
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});
}
forms();

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
		var er=0;
		var form=$(this).parents('form');
		var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);
		
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
		var er=0;
		var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
				er++;
			addError(input);
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
		return er;
}
function formLoad(){
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
	$('.popup').hide();
	popupOpen('message.'+ms,'');
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form,input__name,error_text){
		var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form){
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}

	sectors($(this).scrollTop());
$(window).scroll(function(event) {
		var scr=$(this).scrollTop();
	sectors(scr);
});
function sectors(scr){
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var headerheight=80;
	if(w<768){headerheight=50;}
	if(scr>0){
		$('header').addClass('scroll');
	}else{
		$('header').removeClass('scroll');
	}
	if(scr>h){
		$('#up').fadeIn(300);
	}else{
		$('#up').fadeOut(300);
	}
	$.each($('.sector'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=$(this).offset().top;
		if(scr>=tot && scr<=tot+th-h){
			$('.sector.scroll').removeClass('scroll');
			$(this).addClass('scroll');
		}
		if($(this).hasClass('scroll')){
			if(scr>=tot && scr<=tot+th-h){
				if($(this).hasClass('normalscroll')){
					$('body').addClass('scroll');
				}else{
					$('body').removeClass('scroll');
				}
			}else{
				if($(this).hasClass('normalscroll')){
					$('body').removeClass('scroll');
				}
			}
		}
		if(scr>tot-h/1.5 && scr<tot+th){
			if($('.dotts').length>0){
				dotts(index,0);
			}
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
		if(scr>tot-h && scr<tot+th){
			$(this).addClass('view');
			if($(this).hasClass('padding')){
					var ps=100-(tot-scr)/h*100;
					var p=headerheight/100*ps;
				if(p>=headerheight){p=headerheight;}
				$(this).css({paddingTop:p});
			}
		}else{
			$(this).removeClass('view');
		}
	});
	/*
	$.each($('.lz').not('.load'), function(index, val) {
			var img=$(this).data('image');
		if(scr>tot-h && scr<tot+th){
			$(this).html('<img src="'+img+'" alt="" />');
			$(this).addClass('load');
		}
	});
	*/
}
function dotts(ind,init){
	if(init==true){
		$.each($('.sector'), function(index, val) {
			$('.dotts-list').append('<li></li>');
		});
	}
	$('.dotts-list li').removeClass('active').eq(ind).addClass('active');
}
$('body').on('click', '.dotts-list li', function(event) {
		var n=$(this).index()+1;
		var offset=0;
	$('body,html').animate({scrollTop: $('.sector-'+n).offset().top+offset},800, function() {});
});

