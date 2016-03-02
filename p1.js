var p1 =
[
    ["open", "stdIn", "r", "fp"],
    ["set", "data", ""],
    ["do"],
            ["read", "fp", -1, "buffer"],
            ["add", "data", "buffer", "data"],
            ["EOF", "fp", "temp"],
            ["not", "temp", "temp"],
    ["while", "temp", ""],
    
    ["close", "fp" ],
    // Process Data
    ["create", "stdOut", "wo+", "fp2"],
    ["write", "fp2", "data"],
    ["close", "fp2"]    
];
