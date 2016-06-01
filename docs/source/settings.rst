########
Settings
########

.. _javascript-configurations:

=========================
Javascript configurations
=========================

| Pay attention to define all javascript configurations before yours js code!
|
|


Explicit / Verbose errors
-------------------------

| `Default value:`  **true**
|
| With "verbose mode" switched on, error messages will appear after each input tag that contains errors.
| You can customize the verbose behaviour in this way:
|

.. code-block:: javascript
	
	$.fn.formtools.settings.verbose = false;

| If you want, you can also define a `custom error message container`_ which is the tag placed after your input to show error.
|
|

.. _error-class:

Error class
-----------

| `Default value:`  ``.has-error``
|
| Since formtools is designed to work with bootsrap, it use by default the bootstrap error class.
| If you don't use bootstrap, you can customize the error class in this way:
|

.. code-block:: javascript
	
	$.fn.formtools.settings.error.class = '.myCustomClass';

|

.. _parent-error-class:

Parent error class
------------------

| `Default value:`  ``.form-group``
|
| As already said, working on a bootsrap based DOM structure, the default parent class is ``.form-group`` (parent of input).
| If you don't use bootstrap, you can customize the parent error class to achieve your needs.
| This class will be searched as the **closest DOM element of the input** and, when found, on input errors it will receives the defined error class.
|

.. code-block:: javascript
	
	$.fn.formtools.settings.error.parent = '.oneParentInputElement';

|


Custom places for errors
--------------------------

| `Default value: nothing`
|
| If you want to gather erros in specific places, you can set up selectors that will be filled with errors.
| If verbose mode is active, erros will be placed **also** under inputs.
|

.. code-block:: javascript
	
	$.fn.formtools.settings.error.fields = '.oneDiv #myErrorContainer';

|


Global default error message
----------------------------

| `Default value: nothing`
|
| If you want to define a global error message used on all errors of all inputs:
|

.. code-block:: javascript
	
	$.fn.formtools.settings.error.msg = 'Message for all errors';

|


Define translations
-------------------

| You can define and use custom translations.
|
| To define a translation:
|

.. code-block:: javascript
	
	$.fn.formtools.settings.translation.en = {
		'ft-required' : 'Required field',
		'ft-minlength' : 'Minimum characters required:',
		'ft-regex' : 'Error',
		'ft-email-validation' : 'Invalid email address',
		'ft-date-validation' : 'Wrong date. Required date format as:',
		'ft-date-range-after' : 'Required date after:',
		'ft-date-range-before' : 'Required date before:'
	};
	
	$.fn.formtools.settings.translation.es = { ... };

|


Set up the default language
---------------------------

| `Default value:`  **en**
|
| You should set up formtools to use a default language. You can also ask to use a translation defined by you.
|

.. code-block:: javascript
	
	$.fn.formtools.settings.language = 'en';

|


.. _javascript-configured-validators:

Validators
----------

| `Default value:`  **the only one validator defined by default is**  ``ftDateFormat="DD/MM/YYYY"``
|
| If you want define default ("global") validators, to apply to all forms:
|

.. code-block:: javascript
	
	$.fn.formtools.settings.v = {
		'ftDateFormat' : 'MM/DD/YYYY',
		'ftRequired' : ''  // all fields of all forms will be required
	};

|
| To define any validator in the settings, just take the HTML defined validator name, remove dashes and convert it to camelCase format.
| (i.e.  data-ft-optional  ->  ftOptional)
|
| Another one example:
|

.. code-block:: javascript
	
	$.fn.formtools.settings.v = {
		'ftDateFormat' : 'MM/DD/YYYY',
		'ftRegex' : '([A-Z])\w+'  // all fields of all forms will require at least one word containing upper letters
	};

|


Hooks
-----

| `Default value:`  **no hooks defined**
|
| If you need to do something before formtools actions you can set up hooks in this way:
|

.. code-block:: javascript
	
	$.fn.formtools.settings.hooks = {
		'preValidate' : function (form) { ... },
		'postValidate' : function (form) { ... },
		'preReset' : function (form, data) { ... },
		'postReset' : function (form, data) { ... }
	};

|


Custom error message container
------------------------------

| If you need to cutomize the error message placed after the input, you can overwrite this function:
|

.. code-block:: javascript

    $.fn.formtools.formatErrorMsg = function(field, ftErrorId, ftErrorMsg) {
        field.after(
            $('<span>').attr('id', ftErrorId).addClass('help-block ft-error').text(ftErrorMsg)
        );
    }

| Pay attention to give the ``ftErrorId`` to the element that you generate.
| This is really important to allow formtools detach the element from the page when field will become valid.
|
|
