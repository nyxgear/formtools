#################
Define validators
#################

Formtools is designed to accept configurations and validators hierarchically.

Levels importance (from lowest to highest):
  1. :ref:`Javascript configurations <javascript-configurations>`
  2. `Validators on the form tag`_ (They overwrite `Javascript configurations`)
  3. `Validators on the input tag`_ (They overwrite both `Validators on the form tag` and `Javascript configurations`)


Validators are defined within the HTML form structure.

===========================
Validators on the input tag
===========================

You can put the following attributes on form inputs

+----------------------------------------------------------------------+
| **<input [validators] ...>**                                         |
+---------------------------+------------------------------------------+
| `Required`_               | ``data-ft-required``                     |
+---------------------------+------------------------------------------+
| `Optional`_               | ``data-ft-optional``                     |
+---------------------------+------------------------------------------+
| `Minlength`_              | ``data-ft-minlength="5"``                |
+---------------------------+------------------------------------------+
| `Regex`_                  | ``data-ft-regex="([A-Z])\w+"``           |
+---------------------------+------------------------------------------+
| `DateFormat`_             | ``data-ft-date-format="YYYY"``           |
+---------------------------+------------------------------------------+
| `DateRange`_              | ``data-ft-date-range="1900-01-01:0"``    |
+---------------------------+------------------------------------------+


Required
--------

| ``data-ft-required``
|
| It makes the field required, not empty.
| Blanks are considered empty.
|

.. code-block:: html
	
	<input type="text" name="address" data-ft-required />

| To overwrite the preset value: ``data-ft-required="[true|false]"``
|
|



Optional
--------

| ``data-ft-optional``
|
| Use the optional validator to allow empty field and at the same time validate it if any content has been inserted.
|

.. code-block:: html
	
	<input type="text" name="address" data-ft-optional data-ft-regex="([A-Z])\w+" />

| To overwrite the preset value: ``data-ft-optional="[true|false]"``
|
|



Minlength
---------

| ``data-ft-minlength="5"``
|
| As the maxlength HTML input requirement, you can ask for a minimum length of the content.
|

.. code-block:: html
	
	<input type="text" name="address" data-ft-minlength="5" />

| To overwrite the preset value just define the validator
|
|



Regex
-----

| ``data-ft-regex="([A-Z])\w+"``
|
| Just use a regex to validate the field.
|

.. code-block:: html
	
	<input type="text" name="address" data-ft-regex="([A-Z])\w+" />

| To overwrite the preset value just define the validator
|
|


DateFormat
----------

| ``data-ft-date-format="YYYY"``
|
| Using |moment.js-date-sintax| you can specify a date format required.
|

.. code-block:: html
	
	<input type="date" name="costructionYear" data-ft-date-format="YYYY" />

| To overwrite the preset value just define the validator
|
|



DateRange
---------

| ``data-ft-date-range="1900-01-01:0"``
|
| Based on the |ISO-8601| standard it expect a `StartDate:EndDate` sintax.
| The 0 value means `no limit`.
|
| **WARNING!**
| The range must be defined in the ISO 8601 format, don't use the *data-ft-date-format* defined format!
|
| The following example require a date after the first january of 1900
|

.. code-block:: html
	
	<input type="date" name="costructionDate" data-ft-date-range="1900-01-01:0" data-ft-date-format="MM/DD/YYYY" />

| To overwrite the preset value just define the validator
|
|



===========================
Validators on the form tag
===========================

You can put the these attributes on form tags

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **<form  [validators] ...>**                                                                                                                                                                                                                                                          |
+---------------------------+------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| `Required`                | ``data-ft-required``                     | All inputs in the form are required. It follows `Required`_ overwriting rules to overwrite :ref:`Javascript configured validators <javascript-configured-validators>`                                          |
+---------------------------+------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| `Optional`                | ``data-ft-optional``                     | All inputs in the form are optional. It follows `Optional`_ overwriting rules to overwrite :ref:`Javascript configured validators <javascript-configured-validators>`                                          |
+---------------------------+------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| `Minlength`               | ``data-ft-minlength="5"``                | All inputs in the form must have at least 5 characters. It follows `Minlength`_ overwriting rules to overwrite :ref:`Javascript configured validators <javascript-configured-validators>`                      |
+---------------------------+------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| `RegEx`                   | ``data-ft-regex="([A-Z])\w+"``           | All inputs in the form must match the regex. It follows `Regex`_ overwriting rules to overwrite :ref:`Javascript configured validators <javascript-configured-validators>`                                     |
+---------------------------+------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| `DateFormat`              | ``data-ft-date-format="YYYY"``           | All `type="date"` inputs in the form must match the date format. It follows `DateFormat`_ overwriting rules to overwrite :ref:`Javascript configured validators <javascript-configured-validators>`            |
+---------------------------+------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| `DateRange`               | ``data-ft-date-range="1900-01-01:0"``    | All `type="date"` inputs in the form must match the date range. It follows `DateRange`_ overwriting rules to overwrite :ref:`Javascript configured validators <javascript-configured-validators>`              |
+---------------------------+------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+



.. External links

.. |moment.js-date-sintax| raw:: html
    
	<a href="http://momentjs.com/docs/#/displaying/format/" target="_blank">moment.js date sintax</a>

.. |ISO-8601| raw:: html
    
	<a href="http://www.iso.org/iso/home/standards/iso8601.htm" target="_blank">ISO 8601</a>
	