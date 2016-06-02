/*!
 * Formtools v1.0 (http://nyxgear.github.io/formtools)
 * Copyright 2016 nyxgear
 * Licensed under the MIT license
 */
(function ( $ ) {
	var form;
	var s;
    var t;

	var clearErrorsAndFill = function (data) {

		form.find(s.error.class).removeClass(s.error.class.replace('.', ''));
		if (s.error.fields) {
			$(s.error.fields).text('');
		}

		if (s.verbose || data) {
			form.find('input, select, textarea').each(function() {
				var f =  $(this);

                if (f.data('ft-date-format') !== undefined) {
                    s.dateFormat = f.data('ft-date-format');
                }

				if (s.verbose) {
					if (f.attr('aria-describedby')) {
						$('#' + f.attr('aria-describedby')).detach();
					}
				}

				if (data && (data[ f.attr('name')] !== undefined) ) {

					if (f.attr('type') == 'date') {
                        var mDate = moment(data[ f.attr('name')], s.dateFormat, true);
                        f.val(mDate.format(s.dateFormat));

					} else {
						f.val(data[f.attr('name')]);
					}

				}
			});
		}
	};

 	var fieldValidate = function (f) {
		var isValid = true;


        s = $.extend(
            true,
            {},
            _settings,
            $.fn.formtools.settings,
            form.data('ft-settings'),
            formTagSettings(),
            fieldTagSettings(f)
        );

		/** VALIDATE FIELD **/
		// if optional and there's no content in filed, skip validation
		if (f.val() || !s.v.ftOptional) {

			// ft-required
			if (s.v.ftRequired && !f.val()) {
				isValid = false;
                s.error.dMsg = _t('ft-required');
			}

			// ft-minlength
			if (s.v.ftMinLength && (f.val().length < s.v.ftMinLength)) {
				isValid = false;
                s.error.dMsg = _t('ft-min-length') + ' ' + s.v.ftMinLength;
			}

			// regex
			if (s.v.ftRegex) {
				var regex = new RegExp(s.v.ftRegex);

				if (!regex.test(f.val())) {
					isValid = false;
                    s.error.dMsg = _t('ft-regex');
				}
			}

			if (f.prop('tagName')!='SELECT' && f.val().length > 0) {

				switch (f.attr('type')) {

					case 'email':
						if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.val())) {
							isValid = false;
                            s.error.dMsg = _t('ft-email-validation');
						}
						break;

					case 'date':
						if (s.v.ftDateFormat) {
                            var dateRange = {};
							if (s.v.ftDateRange) {
								dateRange = s.v.ftDateRange.split(':');
                            }

                            // ft-date-format
							var mDate = moment(f.val(), s.v.ftDateFormat, true);
							if (!mDate.isValid()) {
								isValid = false;
                                s.error.dMsg = _t('ft-date-validation') + ' ' + s.v.ftDateFormat;
							}

							// ft-date-range
							else if(dateRange[0] !== undefined && dateRange[1] !== undefined) {
								if (dateRange[0]) {
									dateRange.min = moment(dateRange[0], moment.ISO_8601);
									if (dateRange.min.isAfter(mDate)) {
										isValid = false;
                                        s.error.dMsg = _t('ft-date-after') + ' ' + dateRange.min.format(s.v.ftDateFormat);
									}
								}
								if (dateRange[1]) {
									dateRange.max = moment(dateRange[1], moment.ISO_8601);
									if (dateRange.max.isBefore(mDate)) {
										isValid = false;
                                        s.error.dMsg = _t('ft-date-before') + ' ' + dateRange.max.format(s.v.ftDateFormat);
									}
								}
							}
						}

						break;
				}
			}
		}

		/** SHOW ERRORS **/
		if (!isValid) {
			f.closest(s.error.parent).addClass(s.error.class.replace('.', ''));

			// if custom error msg is defined then use it
			if (!s.error.msg) {
				s.error.msg = s.error.dMsg;
			}

			if (s.verbose) {
				var errorMsgId = f.attr('id');

				if (errorMsgId == undefined) {
					errorMsgId = new Date().getTime();
				}

				errorMsgId = "_ft-err-" + errorMsgId;

				f.attr('aria-describedby', errorMsgId);
                $.fn.formtools.formatErrorMsg(f,errorMsgId, s.error.msg);

			}

			if (s.error.fields) {
				$(s.error.fields).append(s.error.msg + '<br>');
			}
		}


		return isValid;
	};

	var reset = function (data) {
		s.hooks.preReset(form, data);

		form.trigger('reset');
		clearErrorsAndFill(data);

		s.hooks.postReset(form, data);
	};

	var formValidate = function () {
		var isValid = true;

		s.hooks.preValidate(form);

		clearErrorsAndFill();
		form.find('input, select, textarea').each(function () {
			var $this = $(this);
			if (!$this.prop('disabled') && !fieldValidate($this)) {
				isValid = false;
			}
		});

		s.hooks.postValidate(form);

		return isValid;
	};


	$.fn.formtools = function(action, data) {

		if (this.prop('tagName') == 'FORM') {
			form = this;

			s = $.extend(true, {}, _settings, $.fn.formtools.settings, this.data('ft-settings'), formTagSettings());


			/* validate form */
			if (action === "validate") {
				return formValidate();
			}

			/* reset form */
			else if (action === "reset") {
				reset(data);
			}

			/* form settings */
			else if (action === "settings") {
				console.log("on setting!");
				console.log(data);
				form.data('ft-settings', data)
			}

			/* unrecognized action */
			else {
				console.error('[form2] WARNING: invalid action');
				console.error('[form2] given action:');
				console.error(action);
			}
		} else {
			console.warn('[form2] WARNING: attempted execution of an action on non-form object');
			console.warn('[form2] action:');
            console.warn(action);
			console.warn('[form2] object:');
            console.warn(this);
		}

	};


    /** Default settings **/
	var _settings = {
		'hooks' : {
			'preValidate' : function (form) {},
			'postValidate' : function (form) {},
			'preReset' : function (form, data) {},
			'postReset' : function (form, data) {}
		},
		'verbose' : false,
        'v' : {
            'ftDateFormat' : 'DD/MM/YYYY',
        },
		'error' : {
			'parent' : '.form-group',
			'class' : '.has-error',
			'fields' : '',
            'msg' : ''
		},
        'language' : 'en',
        'translation' : {
            'en' : {
                'ft-required' : 'Required field',
                'ft-min-length' : 'Minimum characters required:',
                'ft-regex' : 'Error',
                'ft-email-validation' : 'Invalid email address',
                'ft-date-validation' : 'Wrong date. Required date format as:',
                'ft-date-range-after' : 'Required date after:',
                'ft-date-range-before' : 'Required date before:'
            },
            'it' : {
                'ft-required' : 'Campo obbligatorio',
                'ft-min-length' : 'Minimo caratteri richiesti: ',
                'ft-regex' : 'Errore nel campo',
                'ft-email-validation' : 'Indirizzo email non valido',
                'ft-date-validation' : 'Data non valida. Formato data: ',
                'ft-date-range-after' : 'Richiesta una data succesiva a: ',
                'ft-date-range-before' : 'Richiesta una data precedente a: '
            }
        }
	};

    /** Overridable global settings **/
	$.fn.formtools.settings = {
		'hooks' : { },
        'v' : { },
		'error' : { },
        'translation' : {}
	}

    /** Field tag settings **/
    var fieldTagSettings = function (f) {
		var s = {
            'v' : { },
            'error' : { }
        };

        if (f.data('ft-required') !== undefined) {
            s.v.ftRequired = true;
            if (f.data('ft-required') === false) {
                s.v.ftRequired = false;
            }
		}
		if (f.data('ft-optional') !== undefined) {
            s.v.ftOptional = true;
            if (f.data('ft-optional') === false) {
                s.v.ftOptional = false;
            }
		}

        s.v.ftMinLength = f.data('ft-min-length');
        s.v.ftDateFormat = f.data('ft-date-format');
        s.v.ftDateRange = f.data('ft-date-range');
        s.v.ftRegex = f.data('ft-regex');
        s.error.msg = f.data('ft-error-msg');

		return s;
	};

    /** Form tag settings **/
    var formTagSettings = function () {
		var s = fieldTagSettings(form);

        // get verbose mode
		if (form.data('ft-verbose') !== undefined) {
            s.verbose = true;
            if (form.data('ft-verbose') === false) {
                s.verbose = false;
            }
		}

		// get error fields
		if (form.data('ft-error-fields') !== undefined) {
            s.error.fields = form.data('ft-error-fields');
		}

		// override error selector to give error to
		if (form.data('ft-error-parent') !== undefined) {
            s.error.parent = form.data('ft-error-parent');
		}

		// override error class
		if (form.data('ft-error-class') !== undefined) {
            s.error.class = form.data('ft-error-class');
		}

		return s;
	};

    /** Overridable error msg layout **/
	$.fn.formtools.formatErrorMsg = function(field, ftErrorId, ftErrorMsg) {
        field.after(
            $('<span>').attr('id', ftErrorId).addClass('help-block ft-error').text(ftErrorMsg)
        );
    }


    var _t = function (errorMsg) {
        t = s.translation[s.language];

        if ($.fn.formtools.settings.translation['custom']) {
            t = $.extend(true, {}, t, $.fn.formtools.settings.translation['custom']);
        }

        return t[errorMsg];
    }


}( jQuery ));
