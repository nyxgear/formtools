.. formtools documentation master file, created by
   sphinx-quickstart on Mon Apr 25 16:26:50 2016.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

#########
Formtools
#########

==================
What is Formtools?
==================
  Formtools is a lightweight (4.84 KB!) and powerful JQuery plugin that lets you validate, reset, and fill your HTML forms.
  It is designed to be extensible and customizable to fit your needs.
  You can easily define your input validators in the HTML markup and validate the form via Javascript with just one line of code!


=================
How to include it
=================
  Just put the following line before your javascript

  .. code-block:: html

      <script src="https://cdn.jsdelivr.net/gh/nyxgear/formtools@v1.1.0/dist/formtools.min.js"></script>

  or, if you want to get formtools part of your project, you can include its minified file directly.


============
Dependencies
============
  - |jQuery_link|
  - |Moment.js_link|
  - (|Bootstrap_link|)
 
| Since formtools is a jQuery plugin it requires |jQuery_link|.
| The only one real dependency is this!!
|  
| If you want validate dates you must also include |Moment.js_link|
| 
| Formtools is thought to work by default on |Bootstrap_link| based template structure.
| **But!** If you don't use bootstrap is not a problem.
| You can easly define your custom settings to match your own template structure.
| The only two things you need to set up are the :ref:`custom error class <error-class>` and the :ref:`parent error class <parent-error-class>`.
  
  
  
.. table of contents
.. toctree::
   :hidden:
   :maxdepth: 2
   
   self
   validators
   how-to-validate
   settings
   changelog


.. External links

.. |jQuery_link| raw:: html

   <a href="https://jquery.com/" target="_blank">jQuery</a>

.. |Moment.js_link| raw:: html

   <a href="http://momentjs.com/" target="_blank">Moment.js</a>

.. |Bootstrap_link| raw:: html

   <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>

