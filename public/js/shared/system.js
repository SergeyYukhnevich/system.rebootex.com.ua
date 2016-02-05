var System = function () {

    // Handles custom checkboxes & radios using jQuery Uniform plugin
    var handleUniform = function() {
        if (!$().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .make-switch, .icheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)");
        if (test.size() > 0) {
            test.each(function() {
                if ($(this).parents(".checker").size() === 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    };

    // Handle Select2 Dropdowns
    var handleSelect2 = function() {
        if ($().select2) {
            $.fn.select2.defaults.set("theme", "bootstrap");
            $('.select2me').select2({
                placeholder: "Select",
                width: 'auto',
                allowClear: true
            });
        }
    };

    // Handles Pjax requests
    var handlePjax = function () {

        if ($.support.pjax) {
            var pageContent = $('.page-content');

            $(document).on('click', 'a[data-pjax]', function (event) {
                var attr = $(this).attr('data-pjax');

                if (attr) {
                    pageContent = $(attr);
                }

                System.scrollTop();
                System.blockUI();

                $.pjax.defaults.timeout = 3000;
                $.pjax.click(event, { container: pageContent });
            });
        }

        $(document).on('pjax:end', function () {
            System.initPjax();
            System.unblockUI();
        });
    };

    return {
        
        //main function to initiate the app
        init: function () {
            handleUniform();
            handleSelect2();
            handlePjax();
        },

        //main function to initiate core javascript after ajax complete
        initPjax: function () {
            handleUniform();
            handleSelect2();
            handlePjax();
        },

        // API

        // Initializes uniform elements
        initUniform: function(els) {
            if (els) {
                $(els).each(function() {
                    if ($(this).parents(".checker").size() === 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            } else {
                handleUniform();
            }
        },

        // Wrapper function to update/sync jquery uniform checkbox & radios
        updateUniform: function(els) {
            $.uniform.update(els); // update the uniform checkbox & radios UI after the actual input control state changed
        },

        // Wrapper function to scroll(focus) to an element
        scrollTo: function (element, offset) {
            position = element ? element.offset().top : 0;
            $('html, body').animate({
                scrollTop: position + (offset ? offset : 0)
            }, 'slow');
        },

        // Function to scroll to the top
        scrollTop: function () {
            this.scrollTo();
        },

        // Wrapper function to  block element(indicate loading)
        blockUI: function () {
            $.blockUI({
                message: '<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
                baseZ: 1000,
                css: {
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.3,
                    cursor: 'wait'
                }
            });
        },

        // Wrapper function to  un-block element(finish loading)
        unblockUI: function () {
            setTimeout(function () {
                $.unblockUI();
            }, 2000);
        }

    };

}();

jQuery(document).ready(function() {
    System.init();
});