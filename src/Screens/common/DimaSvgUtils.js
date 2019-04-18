{
    var BASE_PATH = 'M44.2,4.1H32.4c-0.4,0-0.8-0.4-0.8-0.8V0.7c0-0.4-0.4-0.8-0.8-0.8H14.2c-0.4,0-0.8,0.4-0.8,0.8v2.6c0,0.4-0.4,0.8-0.8,0.8\n' +
        '\t\t\tH0.8C0.4,4.1,0,4.5,0,4.9v3.3C0,8.7,0.4,9,0.8,9h43.4C44.6,9,45,8.7,45,8.3V4.9C45,4.5,44.6,4.1,44.2,4.1z';

    var SCREEN_EXPAND_BUTTON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
</svg>`;

    var SCREEN_SHRINK_BUTTON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
</svg>`;

    var APP_BACKGROUND_SVG = `<svg xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 1440 900"
 width="1440px" height="900px" preserveAspectRatio="xMaxYMid slice">
    <path d="M754,485L716,735L882,538Z" fill="#ccd5d8" stroke="#ccd5d8" stroke-width="1.51"/>
    <path d="M716,735L885,765L882,538Z" fill="#cad1d4" stroke="#cad1d4" stroke-width="1.51"/>
    <path d="M754,485L489,691L716,735Z" fill="#ccd6d9" stroke="#ccd6d9" stroke-width="1.51"/>
    <path d="M489,691L779,922L716,735Z" fill="#cad1d4" stroke="#cad1d4" stroke-width="1.51"/>
    <path d="M716,735L779,922L885,765Z" fill="#c8ced0" stroke="#c8ced0" stroke-width="1.51"/>
    <path d="M882,538L990,271L754,485Z" fill="#cdd7dc" stroke="#cdd7dc" stroke-width="1.51"/>
    <path d="M754,485L363,528L489,691Z" fill="#cfdade" stroke="#cfdade" stroke-width="1.51"/>
    <path d="M1165,475L990,271L882,538Z" fill="#ccd5d9" stroke="#ccd5d9" stroke-width="1.51"/>
    <path d="M885,765L1165,475L882,538Z" fill="#cad1d3" stroke="#cad1d3" stroke-width="1.51"/>
    <path d="M1309,802L1165,475L885,765Z" fill="#c6cbcd" stroke="#c6cbcd" stroke-width="1.51"/>
    <path d="M480,198L363,528L754,485Z" fill="#d1dfe4" stroke="#d1dfe4" stroke-width="1.51"/>
    <path d="M779,922L1063,967L885,765Z" fill="#c6c9cb" stroke="#c6c9cb" stroke-width="1.51"/>
    <path d="M990,271L727,109L754,485Z" fill="#d0dde2" stroke="#d0dde2" stroke-width="1.51"/>
    <path d="M727,109L480,198L754,485Z" fill="#d3e1e7" stroke="#d3e1e7" stroke-width="1.51"/>
    <path d="M1063,967L1309,802L885,765Z" fill="#c4c7c8" stroke="#c4c7c8" stroke-width="1.51"/>
    <path d="M1185,979L1309,802L1063,967Z" fill="#c2c4c4" stroke="#c2c4c4" stroke-width="1.51"/>
    <path d="M489,691L351,1071L779,922Z" fill="#c9d0d3" stroke="#c9d0d3" stroke-width="1.51"/>
    <path d="M363,528L165,633L489,691Z" fill="#d0dce1" stroke="#d0dce1" stroke-width="1.51"/>
    <path d="M122,411L165,633L363,528Z" fill="#d3e2e7" stroke="#d3e2e7" stroke-width="1.51"/>
    <path d="M941,-95L701,0L727,109Z" fill="#d6e7ed" stroke="#d6e7ed" stroke-width="1.51"/>
    <path d="M727,109L701,0L480,198Z" fill="#d6e6ed" stroke="#d6e6ed" stroke-width="1.51"/>
    <path d="M247,1038L351,1071L489,691Z" fill="#cbd3d7" stroke="#cbd3d7" stroke-width="1.51"/>
    <path d="M779,922L962,1265L1063,967Z" fill="#c5c8ca" stroke="#c5c8ca" stroke-width="1.51"/>
    <path d="M1063,967L1216,1237L1185,979Z" fill="#c2c4c5" stroke="#c2c4c5" stroke-width="1.51"/>
    <path d="M474,1233L660,1246L779,922Z" fill="#c8ced0" stroke="#c8ced0" stroke-width="1.51"/>
    <path d="M660,1246L962,1265L779,922Z" fill="#c6cbcd" stroke="#c6cbcd" stroke-width="1.51"/>
    <path d="M1430,1083L1450,633L1309,802Z" fill="#c1c2c2" stroke="#c1c2c2" stroke-width="1.51"/>
    <path d="M1309,802L1450,633L1165,475Z" fill="#c5c9cb" stroke="#c5c9cb" stroke-width="1.51"/>
    <path d="M1165,475L1261,97L990,271Z" fill="#cdd7db" stroke="#cdd7db" stroke-width="1.51"/>
    <path d="M990,271L941,-95L727,109Z" fill="#d3e2e7" stroke="#d3e2e7" stroke-width="1.51"/>
    <path d="M165,633L247,1038L489,691Z" fill="#ced8dc" stroke="#ced8dc" stroke-width="1.51"/>
    <path d="M351,1071L474,1233L779,922Z" fill="#c9d0d3" stroke="#c9d0d3" stroke-width="1.51"/>
    <path d="M127,168L122,411L480,198Z" fill="#d7e9f0" stroke="#d7e9f0" stroke-width="1.51"/>
    <path d="M480,198L122,411L363,528Z" fill="#d4e4ea" stroke="#d4e4ea" stroke-width="1.51"/>
    <path d="M218,1186L474,1233L351,1071Z" fill="#cbd3d7" stroke="#cbd3d7" stroke-width="1.51"/>
    <path d="M1537,354L1261,97L1165,475Z" fill="#cbd3d6" stroke="#cbd3d6" stroke-width="1.51"/>
    <path d="M1261,97L941,-95L990,271Z" fill="#d1dee3" stroke="#d1dee3" stroke-width="1.51"/>
    <path d="M701,0L459,-44L480,198Z" fill="#d7eaf0" stroke="#d7eaf0" stroke-width="1.51"/>
    <path d="M476,-368L459,-44L701,0Z" fill="#d8ebf2" stroke="#d8ebf2" stroke-width="1.51"/>
    <path d="M962,1265L1216,1237L1063,967Z" fill="#c3c6c7" stroke="#c3c6c7" stroke-width="1.51"/>
    <path d="M1185,979L1430,1083L1309,802Z" fill="#c1c1c2" stroke="#c1c1c2" stroke-width="1.51"/>
    <path d="M459,-44L127,168L480,198Z" fill="#d8ebf3" stroke="#d8ebf3" stroke-width="1.51"/>
    <path d="M-70,508L-20,635L122,411Z" fill="#d5e6ec" stroke="#d5e6ec" stroke-width="1.51"/>
    <path d="M122,411L-20,635L165,633Z" fill="#d4e3e9" stroke="#d4e3e9" stroke-width="1.51"/>
    <path d="M165,633L-59,954L247,1038Z" fill="#ced8dd" stroke="#ced8dd" stroke-width="1.51"/>
    <path d="M-59,954L218,1186L247,1038Z" fill="#cdd8dc" stroke="#cdd8dc" stroke-width="1.51"/>
    <path d="M247,1038L218,1186L351,1071Z" fill="#ccd5d9" stroke="#ccd5d9" stroke-width="1.51"/>
    <path d="M1216,1237L1430,1083L1185,979Z" fill="#c1c2c2" stroke="#c1c2c2" stroke-width="1.51"/>
    <path d="M1766,375L1537,354L1450,633Z" fill="#c7ccce" stroke="#c7ccce" stroke-width="1.51"/>
    <path d="M1450,633L1537,354L1165,475Z" fill="#c7ccce" stroke="#c7ccce" stroke-width="1.51"/>
    <path d="M1597,204L1342,3L1261,97Z" fill="#ced8dc" stroke="#ced8dc" stroke-width="1.51"/>
    <path d="M1261,97L1342,3L941,-95Z" fill="#d2dfe4" stroke="#d2dfe4" stroke-width="1.51"/>
    <path d="M-144,147L-70,508L122,411Z" fill="#d8ebf2" stroke="#d8ebf2" stroke-width="1.51"/>
    <path d="M-20,635L-59,954L165,633Z" fill="#d1dfe4" stroke="#d1dfe4" stroke-width="1.51"/>
    <path d="M-331,614L-59,954L-20,635Z" fill="#d2dfe5" stroke="#d2dfe5" stroke-width="1.51"/>
    <path d="M1537,354L1597,204L1261,97Z" fill="#cbd3d7" stroke="#cbd3d7" stroke-width="1.51"/>
    <path d="M1766,375L1597,204L1537,354Z" fill="#c9d1d4" stroke="#c9d1d4" stroke-width="1.51"/>
    <path d="M194,-278L112,-46L459,-44Z" fill="#dcf1f9" stroke="#dcf1f9" stroke-width="1.51"/>
    <path d="M459,-44L112,-46L127,168Z" fill="#dbf0f8" stroke="#dbf0f8" stroke-width="1.51"/>
    <path d="M127,168L-144,147L122,411Z" fill="#daeef5" stroke="#daeef5" stroke-width="1.51"/>
    <path d="M1597,204L1439,-110L1342,3Z" fill="#ced9de" stroke="#ced9de" stroke-width="1.51"/>
    <path d="M1247,-383L1061,-432L941,-95Z" fill="#d3e1e7" stroke="#d3e1e7" stroke-width="1.51"/>
    <path d="M1825,754L1766,375L1450,633Z" fill="#c5c8ca" stroke="#c5c8ca" stroke-width="1.51"/>
    <path d="M1216,1237L1515,1309L1430,1083Z" fill="#c0c0c0" stroke="#c0c0c0" stroke-width="1.51"/>
    <path d="M962,1265L1515,1309L1216,1237Z" fill="#c2c3c3" stroke="#c2c3c3" stroke-width="1.51"/>
    <path d="M-41,1353L1515,1309L962,1265Z" fill="#c6cbcc" stroke="#c6cbcc" stroke-width="1.51"/>
    <path d="M-41,1353L962,1265L660,1246Z" fill="#c9d0d3" stroke="#c9d0d3" stroke-width="1.51"/>
    <path d="M1853,-86L1430,-251L1439,-110Z" fill="#cfdadf" stroke="#cfdadf" stroke-width="1.51"/>
    <path d="M1825,754L1450,633L1430,1083Z" fill="#c1c1c1" stroke="#c1c1c1" stroke-width="1.51"/>
    <path d="M719,-414L701,0L941,-95Z" fill="#d6e7ed" stroke="#d6e7ed" stroke-width="1.51"/>
    <path d="M719,-414L476,-368L701,0Z" fill="#d8eaf0" stroke="#d8eaf0" stroke-width="1.51"/>
    <path d="M112,-46L-144,147L127,168Z" fill="#dcf2fb" stroke="#dcf2fb" stroke-width="1.51"/>
    <path d="M-70,508L-331,614L-20,635Z" fill="#d4e4ea" stroke="#d4e4ea" stroke-width="1.51"/>
    <path d="M-173,-148L-144,147L112,-46Z" fill="#def6ff" stroke="#def6ff" stroke-width="1.51"/>
    <path d="M1061,-432L719,-414L941,-95Z" fill="#d5e4ea" stroke="#d5e4ea" stroke-width="1.51"/>
    <path d="M1805,1030L1825,754L1430,1083Z" fill="#bfbfbf" stroke="#bfbfbf" stroke-width="1.51"/>
    <path d="M476,-368L194,-278L459,-44Z" fill="#daeef6" stroke="#daeef6" stroke-width="1.51"/>
    <path d="M1247,-383L941,-95L1342,3Z" fill="#d2dfe4" stroke="#d2dfe4" stroke-width="1.51"/>
    <path d="M1439,-110L1430,-251L1342,3Z" fill="#cfdbe0" stroke="#cfdbe0" stroke-width="1.51"/>
    <path d="M1853,-86L1439,-110L1597,204Z" fill="#cfdadf" stroke="#cfdadf" stroke-width="1.51"/>
    <path d="M-59,954L-41,1353L218,1186Z" fill="#ced9de" stroke="#ced9de" stroke-width="1.51"/>
    <path d="M218,1186L-41,1353L474,1233Z" fill="#ccd6da" stroke="#ccd6da" stroke-width="1.51"/>
    <path d="M474,1233L-41,1353L660,1246Z" fill="#cbd3d6" stroke="#cbd3d6" stroke-width="1.51"/>
    <path d="M-282,1080L-41,1353L-59,954Z" fill="#cfdadf" stroke="#cfdadf" stroke-width="1.51"/>
    <path d="M1430,-251L1247,-383L1342,3Z" fill="#d0dce1" stroke="#d0dce1" stroke-width="1.51"/>
    <path d="M-391,356L-331,614L-70,508Z" fill="#d6e7ed" stroke="#d6e7ed" stroke-width="1.51"/>
    <path d="M1758,1154L1805,1030L1430,1083Z" fill="#bfbfbf" stroke="#bfbfbf" stroke-width="1.51"/>
    <path d="M1515,1309L1758,1154L1430,1083Z" fill="#bfbfbf" stroke="#bfbfbf" stroke-width="1.51"/>
    <path d="M1766,375L1835,204L1597,204Z" fill="#cad2d5" stroke="#cad2d5" stroke-width="1.51"/>
    <path d="M1825,754L1835,204L1766,375Z" fill="#c7cdcf" stroke="#c7cdcf" stroke-width="1.51"/>
    <path d="M-331,614L-282,1080L-59,954Z" fill="#cfdbdf" stroke="#cfdbdf" stroke-width="1.51"/>
    <path d="M-367,-93L-320,242L-144,147Z" fill="#ddf3fb" stroke="#ddf3fb" stroke-width="1.51"/>
    <path d="M-144,147L-320,242L-70,508Z" fill="#d9ecf4" stroke="#d9ecf4" stroke-width="1.51"/>
    <path d="M-320,242L-391,356L-70,508Z" fill="#d8eaf1" stroke="#d8eaf1" stroke-width="1.51"/>
    <path d="M-331,614L-394,1149L-282,1080Z" fill="#cfdadf" stroke="#cfdadf" stroke-width="1.51"/>
    <path d="M-320,242L-367,-93L-391,356Z" fill="#dbf1f9" stroke="#dbf1f9" stroke-width="1.51"/>
    <path d="M-80,-324L-173,-148L112,-46Z" fill="#def6ff" stroke="#def6ff" stroke-width="1.51"/>
    <path d="M194,-278L-80,-324L112,-46Z" fill="#ddf4fd" stroke="#ddf4fd" stroke-width="1.51"/>
    <path d="M476,-368L-80,-324L194,-278Z" fill="#dcf2fa" stroke="#dcf2fa" stroke-width="1.51"/>
    <path d="M-281,-417L-80,-324L476,-368Z" fill="#def5fe" stroke="#def5fe" stroke-width="1.51"/>
    <path d="M-282,1080L-394,1149L-41,1353Z" fill="#cfdadf" stroke="#cfdadf" stroke-width="1.51"/>
    <path d="M-391,356L-394,1149L-331,614Z" fill="#d2e0e5" stroke="#d2e0e5" stroke-width="1.51"/>
    <path d="M1835,204L1853,-86L1597,204Z" fill="#cdd7db" stroke="#cdd7db" stroke-width="1.51"/>
    <path d="M1430,-251L1806,-391L1247,-383Z" fill="#cfdadf" stroke="#cfdadf" stroke-width="1.51"/>
    <path d="M1825,754L1853,-86L1835,204Z" fill="#cad1d4" stroke="#cad1d4" stroke-width="1.51"/>
    <path d="M-281,-417L-367,-93L-173,-148Z" fill="#def6ff" stroke="#def6ff" stroke-width="1.51"/>
    <path d="M-173,-148L-367,-93L-144,147Z" fill="#def6ff" stroke="#def6ff" stroke-width="1.51"/>
    <path d="M1853,-86L1806,-391L1430,-251Z" fill="#cfdadf" stroke="#cfdadf" stroke-width="1.51"/>
    <path d="M1247,-383L1806,-391L1061,-432Z" fill="#d0dce0" stroke="#d0dce0" stroke-width="1.51"/>
    <path d="M1061,-432L-281,-417L719,-414Z" fill="#d9ecf3" stroke="#d9ecf3" stroke-width="1.51"/>
    <path d="M719,-414L-281,-417L476,-368Z" fill="#dbf0f8" stroke="#dbf0f8" stroke-width="1.51"/>
    <path d="M-80,-324L-281,-417L-173,-148Z" fill="#def6ff" stroke="#def6ff" stroke-width="1.51"/>
</svg>`;
}


{

    var CHROME_CAST_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" opacity=".1" fill="none"/>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
</svg>
`;


    var VIDEO_CAMERA_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
</svg>
    `;

    var FILM_STRIP_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
    `;

    var HDMI_CABLE_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"/>
</svg>
    `;

    var VIDEO_GAME_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" d="M0 0v24h24V0H0zm23 16c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v8z"/>
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
</svg>
    `;

    var DESK_CLOCK_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M-618-568H782v3600H-618zM0 0h24v24H0z" fill="none"/>
    <path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
</svg>
    `;

    var MOUSE_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"/>
</svg>
    `;

    var PRINTER_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
    `;

    var RADIO_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
    `;

    var SPEAKER_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 1.99 2 1.99L17 22c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 2c1.1 0 2 .9 2 2s-.9 2-2 2c-1.11 0-2-.9-2-2s.89-2 2-2zm0 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
</svg>
    `;

    var PAPER_CLIP_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
    `;

    var FLOWER_SVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
        </svg>  
    `;
}