/**
 * Faceted Summit Typography — Progressive Enhancement Script
 * Splits text into .fx-w word boxes on whitespace (preserving Arabic ligatures)
 * Replaces trailing period with .fx-dot while keeping screen reader announcement.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FacetedText = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Process a single text node, wrapping words in <span class="fx-w">
   */
  function wrapTextNode(node, isTier1, isLastInContainer) {
    var text = node.nodeValue;
    if (!text) return;

    var fragment = document.createDocumentFragment();

    // Check if trailing period exists at the end of the element
    var hasTrailingPeriod = false;
    if (isTier1 && isLastInContainer && /\.\s*$/.test(text)) {
      hasTrailingPeriod = true;
      text = text.replace(/\.\s*$/, '');
    }

    // Split on whitespace only so Arabic shaping and ligatures remain intact
    var words = text.split(/(\s+)/);

    for (var i = 0; i < words.length; i++) {
      var item = words[i];
      if (!item) continue;

      if (/^\s+$/.test(item)) {
        // Retain whitespace verbatim
        fragment.appendChild(document.createTextNode(item));
      } else {
        var span = document.createElement('span');
        span.className = 'fx-w';
        span.textContent = item;
        fragment.appendChild(span);
      }
    }

    if (hasTrailingPeriod) {
      // Append the custom .fx-dot circle and accessible sr-only period
      var dotSpan = document.createElement('span');
      dotSpan.className = 'fx-dot';
      dotSpan.setAttribute('aria-hidden', 'true');
      fragment.appendChild(dotSpan);

      var srPeriod = document.createElement('span');
      srPeriod.className = 'fx-sr-only';
      srPeriod.textContent = '.';
      fragment.appendChild(srPeriod);
    }

    node.parentNode.replaceChild(fragment, node);
  }

  /**
   * Traverse element child nodes recursively and split text nodes
   */
  function processElement(el) {
    if (!el || el.dataset.fxReady === 'true') return;

    var isTier1 = el.classList.contains('fx-1') || el.dataset.fxTier === '1';

    // Find all text node descendants
    var walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (node.parentNode && (node.parentNode.classList.contains('fx-w') || node.parentNode.classList.contains('fx-sr-only'))) {
            return NodeFilter.FILTER_REJECT;
          }
          return node.nodeValue.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      },
      false
    );

    var textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (var j = 0; j < textNodes.length; j++) {
      var isLast = (j === textNodes.length - 1);
      wrapTextNode(textNodes[j], isTier1, isLast);
    }

    el.dataset.fxReady = 'true';
  }

  /**
   * Enhance all matching elements in a root container
   */
  function init(container) {
    var scope = container || document;
    var targets = scope.querySelectorAll('[data-fx], .fx-text, .fx-1, .fx-2');
    for (var i = 0; i < targets.length; i++) {
      processElement(targets[i]);
    }
  }

  // Auto-init on DOMContentLoaded if in browser
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        init();
      });
    } else {
      init();
    }
  }

  return {
    init: init,
    enhance: processElement
  };
}));
