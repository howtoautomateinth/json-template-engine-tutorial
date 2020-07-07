const template = {
    foo: "bar",
    "#comment": "put comment",
    foo2: {
        "#if": {
            condition: "{{foo2.enable}}",
            then: { data: "foo2-then" },
            else: { data: "foo2-else" }
        }
    },
    foos: {
        "#each": {
            values: "#range(3, 0)", // or [0, 1, 2]
            iteration: "foo-{{iteration.value}}-{{iteration.index}}"
        }
    },
    testSteps: "{{test}}",
    excludeField: {
        notParsed: "{{qwe}}"
    }
};
let jsonArray = [];
const data = {
    foo2: {
        enable: false
    },
    test: getAllTestStep()
};

function getAllTestStep() {
    return jsonArray;
}

function getTestStep(selectorValue, expectedValue) {
    return jsonArray.push({
        selector: selectorValue,
        expected: expectedValue
    });
}

async function compileJsonTemplate(template, data, options) {
    return await JsonParser.compile(template, data, options);
}

async function compileData() {
    var jsonObject = await compileJsonTemplate(template, data, options)
    console.log(jsonObject);
}

const JSONTemplateEngine = require("json-template-engine");
const JsonParser = new JSONTemplateEngine();

const options = {
    helpers: true, // parse helpers? default true
    values: true, // parse values? default true
    exclude: ["excludeField"] // which fields in the object should be excluded (fields will not be parsed), default []
};

getTestStep("div", "IBM.N");
getTestStep("div", "Something");
compileData();
