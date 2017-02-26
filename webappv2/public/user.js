var URL = "https://8e18edcadb514940add0f29a2115b4d1-vp0.us.blockchain.ibm.com:5001/chaincode"
var myKeyVals =       {
        "jsonrpc": "2.0",
        "method": "invoke",
        "params": {
            "type": 1,
            "chaincodeID": {
            "name": "cd2696a855af534ab8187c8577b16da839d5e4d1fd457631daf0c4e5086ac45d9e0680644dd64163a8b8096482df44a867c6bb5573f9ca3cd52ac1edf4e92128"
            },
            "ctorMsg": {
            "function": "setConsent",
            "args": [
                "test"
            ]
            },
            "secureContext": "user_type1_0"
        },
        "id": 2
    };
var user = "test";

function consent(flag) {
    $('#output').empty();
    var input = document.getElementById("example-text-input").value;
    if (input === "") {
        $('#output').append('<h1 class="text-warning">Enter a username</h1>');
        return
    }
    myKeyVals.params.ctorMsg.args = [input, flag.toString()];
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
            
            if (resultData.error == null || resultData.error == undefined) {
                if (flag) {
                    $('#output').append('<h1 class="text-success">Consent granted for user "' + input + '"</h1>');
                }
                else {
                    $('#output').append('<h1 class="text-danger">Consent revoked for user "' + input + '"</h1>');
                }
                
                console.log(resultData.result.message);
            }
            else {
                $('#output').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}