(function() {

    var $mindInput = window.document.querySelector('input[name="mind"]');
    var $mindSpan = window.document.querySelector('#others-mind');

    function submitMind(msg) {
        var data = {
            mind: msg
        };
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                var getMinds = new XMLHttpRequest();
                getMinds.onreadystatechange = function() {
                    if (getMinds.readyState == 4 && getMinds.status == 200) {
                        var msg = JSON.parse(getMinds.responseText);
                        $mindSpan.innerText = msg.mind;
                    }
                };
                getMinds.open('get', '/rest/mind');
                getMinds.send();
            }
        };
        req.open('post', '/rest/mind');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify(data));
    }

    $mindInput.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            var msg = $mindInput.value;
            submitMind(msg);
            $mindInput.value = '';
        }
    });
}());
