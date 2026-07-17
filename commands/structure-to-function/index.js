const input = document.getElementById("fileInput");
const submitButton = document.getElementById("submit");
const list = document.getElementById("fileList");

import { readRootSync, Cursor } from "./nbt/main.js";

/**
 * @type {File[]}
 */
let uploadedFiles = [];

input.onchange = (e) => {
    const invalidFiles = [];
    for (const file of e.target.files) {
        if (!file.name.endsWith(".mcstructure")) {
            invalidFiles.push(file.name);
        } else {
            uploadedFiles.push(file);
        }
    }

    if (invalidFiles.length !== 0) {
        alert(`Invalid files that didn't get added: ${invalidFiles.join(", ")}`);
    }

    renderFiles();

    input.value = "";
};

function renderFiles() {
    list.innerHTML = "";
    for (let i = 0; i < uploadedFiles.length; ++i) {
        const item = document.createElement("div");

        const span = document.createElement("span");
        span.innerHTML = uploadedFiles[i].name;

        const button = document.createElement("button");
        button.innerHTML = "Remove";
        button.onclick = () => {
            uploadedFiles.splice(i, 1);
            renderFiles();
        };

        item.appendChild(span);
        item.appendChild(button);

        list.appendChild(item);
    }
}

submitButton.onclick = async () => {
    for (const file of uploadedFiles) {
        const structure = readRootSync(Cursor.create(await file.bytes()));
        console.log("parsing done: " + file.name);

        const blockPositionData = structure.structure.palette.default.block_position_data;

        const data = Object.entries(blockPositionData)
            .sort((a, b) => parseInt(a[0]) > parseInt(b[0]))
            .map((v) => v[1].block_entity_data?.Command)
            .filter((v) => v)
            .map((v) => (v.startsWith("/") ? v.substring(1, v.length) : v))
            .map((v) => v.replaceAll("run /", "run "))
            .join("\n");

        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([data], { type: "text/plain" }));
        a.download = `${file.name.replace(".mcstructure", ".mcfunction")}`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

    uploadedFiles = [];
    renderFiles();
};
