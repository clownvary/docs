'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var UTFPunctuationsString = exports.UTFPunctuationsString = ' ! " # % & \' ( ) * , - . / : ; ? @ [ \\ ] { } \xA1 \xAB \xAD \xB7 \xBB \xBF \u037E \u0387 \u055A \u055B \u055C \u055D \u055E \u055F \u0589 \u058A \u05BE \u05C0 \u05C3 \u05F3 \u05F4 \u060C \u061B \u061F \u066A \u066B \u066C \u066D \u06D4 \u0700 \u0701 \u0702 \u0703 \u0704 \u0705 \u0706 \u0707 \u0708 \u0709 \u070A \u070B \u070C \u070D \u0964 \u0965 \u0970 \u0DF4 \u0E4F \u0E5A \u0E5B \u0F04 \u0F05 \u0F06 \u0F07 \u0F08 \u0F09 \u0F0A \u0F0B \u0F0C \u0F0D \u0F0E \u0F0F \u0F10 \u0F11 \u0F12 \u0F3A \u0F3B \u0F3C \u0F3D \u0F85 \u104A \u104B \u104C \u104D \u104E \u104F \u10FB \u1361 \u1362 \u1363 \u1364 \u1365 \u1366 \u1367 \u1368 \u166D \u166E \u169B \u169C \u16EB \u16EC \u16ED \u17D4 \u17D5 \u17D6 \u17D7 \u17D8 \u17D9 \u17DA \u17DC \u1800 \u1801 \u1802 \u1803 \u1804 \u1805 \u1806 \u1807 \u1808 \u1809 \u180A \u2010 \u2011 \u2012 \u2013 \u2014 \u2015 \u2016 \u2017 \u2018 \u2019 \u201A \u201B \u201C \u201D \u201E \u201F \u2020 \u2021 \u2022 \u2023 \u2024 \u2025 \u2026 \u2027 \u2030 \u2031 \u2032 \u2033 \u2034 \u2035 \u2036 \u2037 \u2038 \u2039 \u203A \u203B \u203C \u203D \u203E \u2041 \u2042 \u2043 \u2045 \u2046 \u2048 \u2049 \u204A \u204B \u204C \u204D \u207D \u207E \u208D \u208E \u2329 \u232A \u3001 \u3002 \u3003 \u3008 \u3009 \u300A \u300B \u300C \u300D \u300E \u300F \u3010 \u3011 \u3014 \u3015 \u3016 \u3017 \u3018 \u3019 \u301A \u301B \u301C \u301D \u301E \u301F \u3030 \uFD3E \uFD3F \uFE30 \uFE31 \uFE32 \uFE35 \uFE36 \uFE37 \uFE38 \uFE39 \uFE3A \uFE3B \uFE3C \uFE3D \uFE3E \uFE3F \uFE40 \uFE41 \uFE42 \uFE43 \uFE44 \uFE49 \uFE4A \uFE4B \uFE4C \uFE50 \uFE51 \uFE52 \uFE54 \uFE55 \uFE56 \uFE57 \uFE58 \uFE59 \uFE5A \uFE5B \uFE5C \uFE5D \uFE5E \uFE5F \uFE60 \uFE61 \uFE63 \uFE68 \uFE6A \uFE6B \uFF01 \uFF02 \uFF03 \uFF05 \uFF06 \uFF07 \uFF08 \uFF09 \uFF0A \uFF0C \uFF0D \uFF0E \uFF0F \uFF1A \uFF1B \uFF1F \uFF20 \uFF3B \uFF3C \uFF3D \uFF5B \uFF5D \uFF61 \uFF62 \uFF63 \uFF64 \t \x0B \f \x1F   \xA0 \u1680 \u2000 \u2001 \u2002 \u2003 \u2004 \u2005 \u2006 \u2007 \u2008 \u2009 \u200A \u200B \u2028 \u202F \u3000';

var isDigit = exports.isDigit = function isDigit(c) {return c >= '0' && c <= '9';};

var isLetter = exports.isLetter = function isLetter(c) {return !!('' + c).match(new RegExp('[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u021F\u0222-\u0233\u0250-\u02AD\u02B0-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u037A\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D7\u03DA-\u03F3\u0400-\u0481\u048C-\u04C4\u04C7\u04C8\u04CB\u04CC\u04D0-\u04F5\u04F8\u04F9\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0640-\u064A\u0671-\u06D3\u06D5\u06E5\u06E6\u06FA-\u06FC\u0710\u0712-\u072C\u0780-\u07A5\u0905-\u0939\u093D\u0950\u0958-\u0961\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B36-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CDE\u0CE0\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D60\u0D61\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6A\u0F88-\u0F8B\u1000-\u1021\u1023-\u1027\u1029\u102A\u1050-\u1055\u10A0-\u10C5\u10D0-\u10F6\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1200-\u1206\u1208-\u1246\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1286\u1288\u128A-\u128D\u1290-\u12AE\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12CE\u12D0-\u12D6\u12D8-\u12EE\u12F0-\u130E\u1310\u1312-\u1315\u1318-\u131E\u1320-\u1346\u1348-\u135A\u13A0-\u13F4\u1401-\u166C\u166F-\u1676\u1681-\u169A\u16A0-\u16EA\u1780-\u17B3\u1820-\u1877\u1880-\u18A8\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u207F\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2131\u2133-\u2139\u3005\u3006\u3031-\u3035\u3041-\u3094\u309D\u309E\u30A1-\u30FA\u30FC-\u30FE\u3105-\u312C\u3131-\u318E\u31A0-\u31B7\u3400-\u4DB5\u4E00-\u9FA5\uA000-\uA48C\uAC00-\uD7A3\uF900-\uFA2D\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE72\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'));};

var isLetterOrDigit = exports.isLetterOrDigit = function isLetterOrDigit(c) {return isLetter(c) || isDigit(c);};

var isSymbol = exports.isSymbol = function isSymbol(c) {
  var re = new RegExp('[$+<->^`|~\xA2-\xA9\xAC\xAE-\xB1\xB4\xB6\xB8\xD7\xF7\u02B9\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u0374\u0375\u0384\u0385\u0482\u06E9\u06FD\u06FE\u09F2\u09F3\u09FA\u0B70\u0E3F\u0F01-\u0F03\u0F13-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCF\u17DB\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u207A-\u207C\u208A-\u208C\u20A0-\u20AF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u2132\u213A\u2190-\u21F3\u2200-\u22F1\u2300-\u2328\u232B-\u237B\u237D-\u239A\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2595\u25A0-\u25F7\u2600-\u2613\u2619-\u2671\u2701-\u2704\u2706-\u2709\u270C-\u2727\u2729-\u274B\u274D\u274F-\u2752\u2756\u2758-\u275E\u2761-\u2767\u2794\u2798-\u27AF\u27B1-\u27BE\u2800-\u28FF\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u3200-\u321C\u322A-\u3243\u3260-\u327B\u327F\u328A-\u32B0\u32C0-\u32CB\u32D0-\u32FE\u3300-\u3376\u337B-\u33DD\u33E0-\u33FE\uA490-\uA4A1\uA4A4-\uA4B3\uA4B5-\uA4C0\uA4C2-\uA4C4\uA4C6\uFB29\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]');
  return re.test('' + c);
};

var isPunctuation = exports.isPunctuation = function isPunctuation(c) {return UTFPunctuationsString.indexOf(c) >= 0;};

var isPrintableChar = exports.isPrintableChar = function isPrintableChar(c) {
  if (!isLetterOrDigit(c) && !isPunctuation(c) && !isSymbol(c)) {
    return c === ' ';
  }
  return true;
};

var isAscii = exports.isAscii = function isAscii(c) {return c >= '!' && c <= '~';};

var isAsciiLetter = exports.isAsciiLetter = function isAsciiLetter(c) {return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z';};

var isUpper = exports.isUpper = function isUpper(c) {return c.toUpperCase() === c;};

var isLower = exports.isLower = function isLower(c) {return c.toLowerCase() === c;};

var isAlphanumeric = exports.isAlphanumeric = function isAlphanumeric(c) {return isLetter(c) || isDigit(c);};

var isAciiAlphanumeric = exports.isAciiAlphanumeric = function isAciiAlphanumeric(c) {
  if ((c < '0' || c > '9') && (c < 'A' || c > 'Z')) {
    if (c >= 'a') {
      return c <= 'z';
    }
    return false;
  }
  return true;
};

var setChar = exports.setChar = function setChar(input, ch, pos) {
  if (pos >= input.length || pos < 0) {
    return input;
  }
  return '' || input.substr(0, pos) + ch + input.substr(pos + 1);
};