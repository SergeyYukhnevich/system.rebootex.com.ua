var Login = function() {

    var handleLogin = function() {

        var loginForm = $('.login-form');

        loginForm.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },
            messages: {
                username: {
                    required: "Введите логин"
                },
                password: {
                    required: "Введите пароль"
                }
            },
            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function(error, element) {
                error.insertAfter(element);
            },
            submitHandler: function(form) {
                $.post(form.action, getFormData(form))
                    .success(function (res) {
                        form.reset();
                        console.log('success', res);
                    })
                    .error(function (res) {
                        console.log('error', res);
                    });
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if (loginForm.validate().form()) {
                    $.post(loginForm.action, getFormData(loginForm), function (res) {
                        console.log(res);
                    });
                }
                return false;
            }
        });
    };

    var handleForgetPassword = function() {

        var forgetForm = $('.forget-form');

        forgetForm.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "Введите адрес электронной почты",
                    email: "Введите верный адрес электронной почты"
                }
            },
            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function(error, element) {
                error.insertAfter(element);
            },
            submitHandler: function(form) {
                form.submit();
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if (forgetForm.validate().form()) {
                    forgetForm.submit();
                }
                return false;
            }
        });

    };

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleForgetPassword();

        }

    };

    function getFormData(form) {

        var data = {};

        $(form).find('input.form-control').each(function () {
            data[$(this).attr('name')] = $(this).val();
        });

        $(form).find('input[type="checkbox"], input[type="radio"]').each(function () {
            data[$(this).attr('name')] = $(this).prop('checked');
        });

        return data;
    }

}();

jQuery(document).ready(function() {
    Login.init();
});
jQuery(document).on('pjax:complete', function () {
    Login.init();
});