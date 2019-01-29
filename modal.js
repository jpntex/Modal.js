/**
 * Modal.js
 * @author Joao Teixeira
 * @version 1.0
 * Copyright (c) Joao Teixeira
 * https://github.com/jpntex
 *
 */

var Modal = (function() {
  function Modal(type, options) {

    var defaults = {
      title: 'Notification', // modal title
      message: '', // modal message
      autoOpen: true, // show modal when declared
      closeOnEscape: true, // close when escape key pressed
      closeOnBlur: true, // close when overlay is clicked
      animated: true, // animate modal

      // button options
      buttonLbl: 'OK', // main button label
      buttonClass: '', // main button class
      cancelLbl: 'Cancel', // cancel button label

      // callbacks
      onConfirm: function() {}, // callback on confirm
      onCancel: function() {}, // callback on cancel
      onClose: function() {} // callback on close
    };

    this.type = type;
    this.options = extend(defaults, options);

    // animations not supported on IE9
    if (navigator.appVersion.indexOf("MSIE 9") !== -1) {
      this.options.animated = false;
    }

    this.init();
  }

  // modal templates
  var templates = {
    modal: '<div class="modal-box">' +
      '<div class="modal-title">[[title]]<div class="close-modal" data-action="close">&times;</div></div>' +
      '<div class="modal-message">[[message]]</div>' +
      '<div class="modal-buttons">[[buttons]]</div>' +
      '</div>',
    btn: '<div class="modal-btn" data-action="close">[[label]]</div>',
    btnAlert: '<div class="modal-btn btn-alert" data-action="close">[[label]]</div>',
    btnConfirm: '<div class="modal-btn btn-confirm [[classes]]" data-action="confirm">[[label]]</div>'
  };

  // generates the modal html from the templates given the modal's type and options
  function buildModal(type, options) {
    var modal = document.createElement('div');
    modal.className = 'modal';

    if (options.closeOnBlur) modal.setAttribute('data-action', 'close');

    var modalTmplt = templates.modal;

    // set modal animations
    if (options.animated) {
      modal.className += ' fadeIn';
    }

    modalTmplt = modalTmplt.replace('[[title]]', options.title);
    modalTmplt = modalTmplt.replace('[[message]]', options.message);

    // add buttons based on modal type
    switch (type) {
      case 'confirm':
        var buttons = templates.btn.replace('[[label]]', options.cancelLbl);
        buttons += templates.btnConfirm.replace('[[label]]', options.buttonLbl).replace('[[classes]]', options.buttonClass);
        modalTmplt = modalTmplt.replace('[[buttons]]', buttons);
        break;
      case 'alert':
        var buttons = templates.btnAlert.replace('[[label]]', options.buttonLbl);
        modalTmplt = modalTmplt.replace('[[buttons]]', buttons);
        break;
    }

    modal.innerHTML = modalTmplt;
    return modal;
  }


  // handle modal events
  Modal.prototype.handleEvent = function(event) {
    var dataAction = event.target.getAttribute('data-action');

    // animation ended callback
    if (event.type === 'animationend') {
      return this.onAnimationEnd(event);
    }

    // check if 'Esc' key was pressed and close modal if set
    if (this.options.closeOnEscape) {
      if (event.keyCode === 27) {
        this.options.onCancel();
        return this.close();
      }
    }

    if (dataAction === 'close') {
      this.options.onCancel();
      return this.close();
    }

    if (dataAction === 'confirm') {
      this.options.onConfirm();
      return this.close();
    }
  };

  // animation end event handler
  Modal.prototype.onAnimationEnd = function(event) {
    this.modal.removeEventListener('animationend', this);
    document.body.removeChild(this.modal);
    this.options.onClose();
    return this;
  };

  // initialize modal creation
  Modal.prototype.init = function() {
    this.modal = buildModal(this.type, this.options);
    if (this.options.autoOpen) this.open();
  };

  // open modal
  Modal.prototype.open = function() {
    // reset to fadeIn animation on open
    if (this.options.animated) {
      this.modal.className = 'modal fadeIn';
    }

    // append modal to the body
    document.body.appendChild(this.modal);

    // attach events listeners
    this.modal.addEventListener('click', this);
    document.onkeyup = this.handleEvent.bind(this);

    return this;
  };

  // close modal
  Modal.prototype.close = function() {
    // clean events listeners
    this.modal.removeEventListener('click', this);
    document.onkeyup = null;

    if (this.options.animated) {
      this.modal.addEventListener('animationend', this);
      this.modal.className = 'modal fadeOut';
    } else {
      document.body.removeChild(this.modal);
      this.options.onClose();
    }

    return this;
  };

  // helper functions
  function extend(obj1, obj2) {
    for (var key in obj2)
      if (obj2.hasOwnProperty(key))
        obj1[key] = obj2[key];
    return obj1;
  }

  function isFunction(fn) {
    return typeof fn === 'function';
  }

  // modal interfaces
  return {
    confirm: function(options, onConfirm, onCancel, onClose) {
      options = (typeof options === 'string') ? {
        message: options
      } : options;

      if (isFunction(onClose)) options.onClose = onClose;
      if (isFunction(onCancel)) options.onCancel = onCancel;
      if (isFunction(onConfirm)) options.onConfirm = onConfirm;

      return new Modal('confirm', options);
    },
    alert: function(options, onClose) {
      options = (typeof options === 'string') ? {
        message: options
      } : options;

      if (isFunction(onClose)) options.onClose = onClose;

      return new Modal('alert', options);
    }
  };
})();
