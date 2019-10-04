'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyTagName = "autorenametaggo";
;
function findPairedTag(text, pos, startTag, endTag, isStartTagNew, emptyTagOffset) {
    let startPositionDic = {};
    let startTagDepth = null;
    let pairedStartTag;
    let pairedEndTag;
    function inRange(pos, start, len) {
        return (start + 1) <= pos && pos <= (start + len + 1);
    }
    function pushToDic(dic, key, value) {
        if (!dic[key]) {
            dic[key] = [];
        }
        dic[key].push(value);
    }
    function parseOnStartTag(name, startOffset) {
        if (inRange(pos, startOffset, name.length)) {
            startTagDepth = (startPositionDic[endTag] ? startPositionDic[endTag].length : 0) + 1;
            pushToDic(startPositionDic, endTag, startOffset);
        }
        else {
            pushToDic(startPositionDic, name, startOffset);
        }
    }
    function parseOnEndTag(name, startOffset) {
        let startPosition;
        if (startPositionDic[name] && startPositionDic[name].length > 0) {
            startPosition = startPositionDic[name].pop();
        }
        // True if start tag is new tag 
        if (startTagDepth !== null && endTag === name && startTagDepth === startPositionDic[endTag].length + 1) {
            return pairedEndTag = { startOffset: startOffset + 2, endOffset: startOffset + 2 + endTag.length };
        }
        else if (inRange(pos, startOffset + 1, name.length)) {
            if (startPositionDic[startTag] && startPositionDic[startTag].length > 0) {
                startPosition = startPositionDic[startTag].pop();
                return pairedStartTag = { startOffset: startPosition + 1, endOffset: startPosition + 1 + startTag.length };
            }
        }
        return null;
    }
    // Hack here to remove php tag to void conflict with HTML/XML tag
    //text = text.replace("<?php", "??php").replace("<?=", "??=").replace("?>", "??");
    text = text.replace(/<\?/g, "??");
    text = text.replace(/<\?php/g, "??php");
    text = text.replace(/<\?=/g, "??=");
    text = text.replace(/\?>/g, "??");
    // Hack here of empty tag
    if (startTag === "" && !isStartTagNew) {
        pos += exports.emptyTagName.length;
    }
    if (emptyTagOffset) {
        text = text.slice(0, emptyTagOffset) + exports.emptyTagName + text.slice(emptyTagOffset);
        if (startTag === "") {
            startTag = exports.emptyTagName;
        }
        else if (endTag === "") {
            endTag = exports.emptyTagName;
        }
    }
    let regex = new RegExp("<(\/?)(" + startTag + "|" + endTag + ")(?:\\s[^\\s>]*?[^\\s\\/>]+?)*?>", "g");
    let result = null;
    while ((result = regex.exec(text)) !== null) {
        if (result[1] === "") {
            parseOnStartTag(result[2], result.index);
        }
        else {
            let pairedTag = parseOnEndTag(result[2], result.index);
            if (pairedTag) {
                return pairedTag;
            }
        }
    }
    return null;
}
exports.findPairedTag = findPairedTag;
//# sourceMappingURL=tagParser.js.map