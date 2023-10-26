window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 1280 || document.documentElement.scrollTop > 1280) {
    document.getElementById("hamburger").style.background = "#001753";
} else {
    document.getElementById("hamburger").style.background = "none";
    }
}

window.addEventListener("DOMContentLoaded", function() {
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }
    
    function mask(event) {
        var matrix = "+7 (___)-___-____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
        } else setCursorPosition(this.value.length, this)
    };
        var input = document.querySelector("#phone");
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
    });

    $(document).ready(function() {

        $("form").submit(function() { 
            var th = $(this);
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            $.ajax({
                type: "POST",
                url: "mail.php", 
                data: th.serialize()
            }).done(function() {
                modal.style.display = "block";
                span.onclick = function() {
                    modal.style.display = "none";
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
                setTimeout(function() {
                    th.trigger("reset");
                }, 1000);
            });
            return false;
        });
    
    });
