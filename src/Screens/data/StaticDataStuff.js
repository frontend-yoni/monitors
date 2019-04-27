function StaticDataStuff() {
    let me = this;

    let iconList = [
        CHROME_CAST_SVG,
        VIDEO_CAMERA_SVG,
        FILM_STRIP_SVG,
        HDMI_CABLE_SVG,
        VIDEO_GAME_SVG,
        DESK_CLOCK_SVG,
        MOUSE_SVG,
        SPEAKER_SVG,
        RADIO_SVG,
        PRINTER_SVG,
        PAPER_CLIP_SVG,
        FLOWER_SVG,
    ];

    let nameList = [
        'Google Chromecast',
        'Sony Super 35mm Camera',
        'Last Action Hero',
        'High Speed HDMI',
        'Atari 2600',
        '16th Century Pendulum Clock',
        'AmazonBasics Slim Bluetooth Mouse',
        'Audio Opulence Speakers',
        'Satellite Radio',
        'Epson All in One',
        'Pack of Paperclips',
        'Terracotta Flower Pot'
    ];

    let widgetIndexToFieldsMap = createWidgetIndexToFieldsMap();

    let widgetObjectArr = createAvailableWidgetArr();

    /*** Public APIs **/
    this.getWidgetListLength = function () {
        return widgetObjectArr.length;
    };

    this.getScreenWidgetCount = function () {
        return 5;
    };

    this.getWidgetItemData = function (index) {
        return widgetObjectArr[index % widgetObjectArr.length];
    };

    this.jjCreateElementByInnerHTML = function (innerHTML) {
        let papaDiv = document.createElement('span');
        papaDiv.innerHTML = innerHTML;
        return JJPower.enhance(papaDiv.firstChild);
    };

    this.populateDivWithSVG = function (div, svgStr) {
        div.innerHTML = svgStr;
    };

    /** Private Functions **/
    function createAvailableWidgetArr() {
        let arr = [];
        for (let i = 0; i < iconList.length; i++) {
            arr.push(createWidgetData(i));
        }
        return arr;
    }

    function createWidgetData(index) {
        let dragToScreen = index <= 4;
        return {
            icon: iconList[index],
            name: nameList[index],
            index: index,
            dragToScreen: dragToScreen,
            configFields: widgetIndexToFieldsMap[index]
        }
    }

    /** Mock **/
    function createWidgetIndexToFieldsMap() {
        let map = {};
        for (let i = 0; i < iconList.length; i++) {
            map[i] = createConfigFieldsByIndex(i);
        }
        return map;
    }

    function createConfigFieldsByIndex(widgetIndex) {
        let fieldsCount = ((widgetIndex + 1) * 2) % 5 + (widgetIndex * 3) % 7;
        fieldsCount = Math.max(5, fieldsCount);

        let fieldsArr = [];
        for (let i = 0; i < fieldsCount; i++) {
            fieldsArr.push('Configuration Filed ' + (i + 1));
        }
        return fieldsArr;
    }
}

StaticDataStuff.getInstance = function () {
    if (!StaticDataStuff.instance) {
        StaticDataStuff.instance = new StaticDataStuff();
    }
    return StaticDataStuff.instance;
};