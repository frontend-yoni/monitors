function ScreenComponent(directPapaComponent, layoutManager, ddManager) {
    let me = this;
    /** CONSTANTS **/
    const BASE_WIDTH = 45;
    const BASE_HEIGHT = 9;

    /** Externally Set ***/
        //Structure
    let screenDiv;
    let widthPlusButton;
    let heightPlusButton;
    let widthMinusButton;
    let heightMinusButton;
    let deleteButton;
    let subDivideContainer;
    let miniScreensContainerDiv;
    let extraHitArea;
    let dottedHighlightDiv;
    let rowDivideArr = [];
    let columnDivideArr = [];
    //Layout
    let data;
    let singleWidth;
    let singleHeight;
    //Data
    let dataObj = new ScreenDataObj(); //ScreenDataObject
    /** Internally Set **/
        //Structure
    let buttonsArea;
    //State
    let hasJustChangedSize;
    let showFocusUponDrop;
    //Components
    let miniScreensComp = new MiniScreenDivsComponent(me, layoutManager, ddManager);

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        screenDiv = JJPower.enhance(divHTML);
    };

    this.setData = function (dataObjI) {
        dataObj = dataObjI;
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {

    };

    /** Internally Called Public APIs **/
    this.onDragRelease = function () {
        if (showFocusUponDrop) {
            requestAnimationFrame(focusScreenOnHover);
        }
    };

    /** Construction **/
    function drawComponent() {
        singleWidth = layoutManager.getMeasurementsPack().singleWidth;
        singleHeight = layoutManager.getMeasurementsPack().singleHeight;
        rowDivideArr = [];
        columnDivideArr = [];
        construct();
    }

    function construct() {
        screenDiv.jjAddClass('ScreenComponentMainDiv')
            .jjAddEventListener('mouseenter', onMouseEnter)
            .jjAddEventListener('mouseleave', onMouseLeave);

        dottedHighlightDiv = screenDiv.jjAppend('div')
            .jjAddClass('ScreenComponentDottedHighlight');

        extraHitArea = screenDiv.jjAppend('div')
            .jjAddClass('ScreenComponentExtraHitArea');

        attachBorderAndBG();
        attachBase();
        attachDividers();
        attachPlusButtons();
        attachMiniScreens();
    }

    function attachMiniScreens() {
        miniScreensContainerDiv = screenDiv.jjAppend('div')
            .jjAddClass('ScreenComponentMiniScreensDiv');
        miniScreensComp.setExternalDiv(miniScreensContainerDiv);
        miniScreensComp.setData(dataObj);
        miniScreensComp.drawComponent();
    }

    function attachDividers() {
        subDivideContainer = screenDiv.jjAppend('div')
            .jjAddClass('ScreenComponentSubDivideContainer');
        initializeDividers();
    }

    function attachBorderAndBG() {
        let borderDiv = screenDiv.jjAppend('div')
            .jjAddClass('ScreenComponentBorderDiv');

        let bgDiv = screenDiv.jjAppend('div')
            .jjAddClass('ScreenComponentBGDiv');
    }

    function attachBase() {
        let baseSVG = screenDiv.jjAppend('svg')
            .jjAddClass('ScreenComponentBaseSVG')
            .jjAttr({
                viewBox: `0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`
            });

        let basePath = baseSVG.jjAppend('g').jjAppend('path')
            .jjAttr({
                d: BASE_PATH
            })
    }

    function attachPlusButtons() {
        buttonsArea = screenDiv.jjAppend('div')
            .jjAddClass('ScreenButtonsArea');

        widthPlusButton = buttonsArea.jjAppend('div')
            .jjAddClass('ScreenButton', 'ScreenPlusButton', 'ScreenWidthPlusButton')
            .jjAddEventListener('click', changeWidth);
        attachIcon(widthPlusButton, SCREEN_EXPAND_BUTTON_SVG);

        heightPlusButton = buttonsArea.jjAppend('div')
            .jjAttr({
                viewBox: '0 0 24 24'
            })
            .jjAddClass('ScreenButton', 'ScreenPlusButton', 'ScreenHeightPlusButton')
            .jjAddEventListener('click', changeHeight);
        attachIcon(heightPlusButton, SCREEN_EXPAND_BUTTON_SVG);

        widthMinusButton = buttonsArea.jjAppend('div')
            .jjAddClass('ScreenButton', 'ScreenMinusButton', 'ScreenMinusButton_Width')
            .jjAddEventListener('click', onMinusClick_Width);
        attachIcon(widthMinusButton, SCREEN_SHRINK_BUTTON_SVG);

        heightMinusButton = buttonsArea.jjAppend('div')
            .jjAddClass('ScreenButton', 'ScreenMinusButton', 'ScreenMinusButton_Height')
            .jjAddEventListener('click', onMinusClick_Height);
        attachIcon(heightMinusButton, SCREEN_SHRINK_BUTTON_SVG);

        deleteButton = buttonsArea.jjAppend('div')
            .jjAddClass('ScreenButton', 'ScreenDeleteButton')
            .jjAddEventListener('click', onDeleteClick);
        attachIcon(deleteButton, SCREEN_EXPAND_BUTTON_SVG);
    }

    function attachIcon(button, svgStr) {
        button.innerHTML = svgStr;
    }

    function initializeDividers() {
        for (let row = 1; row < dataObj.height; row++) {
            getRowDividerByIndex(row);
        }
        for (let column = 1; column < dataObj.width; column++) {
            getColumnDividerByIndex(column);
        }
    }

    function getRowDividerByIndex(index) {
        if (!rowDivideArr[index]) {
            rowDivideArr[index] = subDivideContainer.jjAppend('div')
                .jjAddClass('ScreenSubDivideDiv', 'ScreenSubDivideDiv_Row');
        }
        positionRowDivide(rowDivideArr[index], index);
        return rowDivideArr[index];
    }

    function getColumnDividerByIndex(index) {
        if (!columnDivideArr[index]) {
            columnDivideArr[index] = subDivideContainer.jjAppend('div')
                .jjAddClass('ScreenSubDivideDiv', 'ScreenSubDivideDiv_Column');
        }
        positionColumnDivide(columnDivideArr[index], index);
        return columnDivideArr[index];
    }

    function positionRowDivide(divideDiv, index) {
        divideDiv.jjStyle({
            bottom: index * singleHeight + 'px'
        })
    }

    function positionColumnDivide(divideDiv, index) {
        divideDiv.jjStyle({
            left: index * singleWidth + 'px'
        })
    }

    function focusScreenOnHover() {
        layoutManager.removeFocusFromAllScreens(screenDiv);
        screenDiv.jjAddClass('FocusedScreen');
    }

    /** Dynamic **/
    function onMinusClick_Width(e) {
        changeWidth(e, -1)
    }

    function onMinusClick_Height(e) {
        changeHeight(e, -1)
    }

    function changeWidth(e, changeAmount = 1) {
        layoutManager.changeWidth(dataObj, changeAmount);
        initializeDividers();
        hasJustChangedSize = true;

        miniScreensComp.removeScreensOnResize();
        miniScreensComp.drawComponent();
    }

    function changeHeight(e, changeAmount = 1) {
        layoutManager.changeHeight(dataObj, changeAmount);
        initializeDividers();
        hasJustChangedSize = true;

        miniScreensComp.removeScreensOnResize();
        miniScreensComp.drawComponent();
    }

    function onDeleteClick() {
        layoutManager.deleteScreen(dataObj);

        miniScreensComp.removeScreensOnResize(true);
    }

    function onMouseEnter(e) {
        if (ddManager.getIsDragging()) {
            showFocusUponDrop = true;
            return;
        }

        focusScreenOnHover();
    }

    function onMouseLeave(e) {
        if (!hasJustChangedSize) {
            layoutManager.removeFocusFromAllScreens();
        }
        hasJustChangedSize = false;
        showFocusUponDrop = false;
    }
}