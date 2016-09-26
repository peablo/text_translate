var TOOLTIP_CLASS = 'text-translate',
    TOOLTIP_CONTAINER_CLASS = 'text-translate-container',
    TOOLTIP_BOTTOM_MARGIN = 20;

var text_translate_module = angular.module('text_translate_directive', []);

var text_translate_directive = function($compile) {
  return {
    "restrict": "A",
    "scope": {
        "originalText": "="
    },
    "compile": function compile() {
      return {
        post: function postLink(scope, iElement) {
          var template = angular.element(
            '<aside ' +
              'class="' + TOOLTIP_CLASS + '"' +
              'ng-bind-html="translatedText">' +
            '</aside>'),
              toolTip = $compile(template)(scope);

          function translateOriginalText() {
            //tbd
          }

          function bindTooltip() {
            scope.translatedText = translateOriginalText();
          }

          function appendToolTip() {
            iElement.addClass(TOOLTIP_CONTAINER_CLASS);
            iElement.append(toolTip);
          }

          function positionTooltip() {
            var parentWidth = iElement.width(),
                tooltipHeight = toolTip.height(),
                windowScroll = angular.element(window).scrollTop(),
                offset = iElement.offset();

            toolTip.css('width', parentWidth);

            /**
            * Since our tooltip is going to have an absolute positioning, we're
            * going to give it the parent's offset respective to the browser
            * window as top and left properties, plus the window scroll and the
            * desired margin.
            */
            offset.top -= tooltipHeight + TOOLTIP_BOTTOM_MARGIN + windowScroll;
            toolTip.css(offset); //
          }

          function init() {
            bindTooltip();
            appendToolTip();
            positionTooltip();
          }

          init();
        }
      }
    }
  }
};

text_translate_module.directive('textTranslate', text_translate_directive);
