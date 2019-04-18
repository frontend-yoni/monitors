function TableLayoutManager(tableComponent, roomLayoutManager) {
    let me = this;
    roomLayoutManager.setTableLayoutManager(me);

    let genUtils = JJGeneralUtils.getInstance();
    let commonLayout = CommonLayout.getInstance();
    const SCREEN_EDGE_WIDTH = 8;
    const MIN_GAP = 15;
    const SCREEN_BOTTOM = 30; //css --screenBottomPosition
    const ADD_BUTTON_BOTTOM = 50;
    const ADD_BUTTON_HEIGHT = 40;
    const ANIMATION_DURATION = 400;

    /** Externally Set **/
    let BUTTON_AREA_WIDTH;
    /* Structure */
    let tablePapaDiv;
    let tableDiv;
    let roomScrollDiv;
    let leftAddButton;
    let rightAddButton;
    /* Data */
    let screenDataObjArray;

    /** Internally Set **/
    /* Measurement */
    let singleWidth = 160;
    let singleHeight = 100;
    let visibleTableWidth;
    /* Layout */

    /** Public APIs **/
    this.setExternalDivs = function (tablePapaDivI, tableDivI, roomScrollDivI, leftAddButtonI, rightAddButtonI, BUTTON_AREA_WIDTHI) {
        tablePapaDiv = tablePapaDivI;
        tableDiv = tableDivI;
        roomScrollDiv = roomScrollDivI;
        leftAddButton = leftAddButtonI;
        rightAddButton = rightAddButtonI;
        BUTTON_AREA_WIDTH = BUTTON_AREA_WIDTHI;

        leftAddButton.jjAddEventListener('click', addScreen_left);
        rightAddButton.jjAddEventListener('click', addScreen_right);
    };

    this.setData = function (screenDataObjArrayI) {
        screenDataObjArray = screenDataObjArrayI;
    };

    this.runInitialLayout = function () {
        runInitialLayout();
    };

    this.changeWidth = function (screenDataObj, shiftAmount) {
        changeWidth(screenDataObj, shiftAmount);
    };

    this.changeHeight = function (screenDataObj, shiftAmount) {
        changeHeight(screenDataObj, shiftAmount);
    };

    this.deleteScreen = function (screenDataObj) {
        deleteScreen(screenDataObj);
    };

    this.removeFocusFromAllScreens = function (exceptThisOne) {
        roomLayoutManager.removeFocusFromAllScreens(exceptThisOne);
    };

    //In case a vertical scroll bar suddenly appears
    this.adjustHorizontalLayoutIfNeeded = function () {
        adjustHorizontalLayoutIfNeeded();
    };

    /* Getters */
    this.getMeasurementsPack = function () {
        return { singleWidth, singleHeight, SCREEN_EDGE_WIDTH, visibleTableWidth };
    };

    /** Private Functions **/
    function runInitialLayout() {
        visibleTableWidth = tablePapaDiv.getBoundingClientRect().width - 2 * BUTTON_AREA_WIDTH;
        calculateAndRealignDOM();
    }

    function calculateMeasurementsOnData() {
        let totalScreensWidth = 0;
        let screenCount = screenDataObjArray.length;
        for (let dataObj of screenDataObjArray) {
            dataObj.widthPixel = dataObj.width * singleWidth + 2 * SCREEN_EDGE_WIDTH;
            dataObj.heightPixel = dataObj.height * singleHeight + 2 * SCREEN_EDGE_WIDTH;
            totalScreensWidth += dataObj.widthPixel;
        }
        let gap = (visibleTableWidth - totalScreensWidth) / (screenCount + 1);
        gap = Math.max(gap, MIN_GAP);

        let totalLeft = gap;
        for (let screenData of screenDataObjArray) {
            screenData.leftPixel = totalLeft;
            totalLeft += screenData.widthPixel + gap;
        }
    }

    function calculateAndRealignDOM() {
        calculateMeasurementsOnData();
        alignScreensDOMToData();
        alignContainerHeight();
    }

    function alignContainerHeight() {
        roomLayoutManager.adjustWallAndTableVerticalLayout();
    }

    /** Actions! **/
    function addScreen_left() {
        let newScreen = new ScreenDataObj();
        screenDataObjArray.unshift(newScreen);
        tableComponent.addNewScreen(newScreen, true);
        calculateAndRealignDOM();
        animateNewScreen_left(newScreen);
    }

    function addScreen_right() {
        let newScreen = new ScreenDataObj();
        screenDataObjArray.push(newScreen);
        tableComponent.addNewScreen(newScreen, false);
        calculateAndRealignDOM();
        animateNewScreen_right(newScreen);
    }

    function animateNewScreen_left(newScreen) {
        let screenDiv = newScreen.screenDiv;
        screenDiv.jjStyle({
            width: 0,
            height: 0
        });
        screenDiv.jjForceStyleRecalc();
        screenDiv.jjStyle({
            width: newScreen.width * singleWidth + 'px',
            height: newScreen.height * singleHeight + 'px'
        });
    }

    function animateNewScreen_right(newScreen) {
        let leftStart = newScreen.leftPixel + newScreen.width * singleWidth;

        let screenDiv = newScreen.screenDiv;
        screenDiv.jjStyle({
            width: 0,
            height: 0,
            left: leftStart + 'px',
            transition: 'none'
        });
        screenDiv.jjForceStyleRecalc();
        screenDiv.jjStyle({
            transition: ''
        });

        let fullScrollWidth = roomScrollDiv.scrollWidth;
        let visibleAreaWidth = roomScrollDiv.clientWidth;
        let currentScroll = roomScrollDiv.scrollLeft;
        let newScrollPosition = fullScrollWidth - visibleAreaWidth;

        screenDiv.jjStyle({
            width: newScreen.width * singleWidth + 'px',
            left: newScreen.leftPixel + 'px',
            height: newScreen.height * singleHeight + 'px'
        });
        roomScrollDiv.jjAnimateScroll_horizontal(newScrollPosition - currentScroll, ANIMATION_DURATION);
    }

    function deleteScreen(screenObj) {
        let screenDiv = screenObj.screenDiv;
        genUtils.removeFromArray(screenDataObjArray, screenObj);

        let currentLeft = screenDiv.jjTotallyUnreliableLeft;
        screenDiv.jjAddClass('BeforeRemoveScreen')
            .jjStyle({
                width: screenObj.widthPixel + 'px',
                height: screenObj.heightPixel + 'px'
            })
            .jjSetLeft(currentLeft - SCREEN_EDGE_WIDTH);
        screenDiv.jjForceStyleRecalc();
        screenDiv.jjRemoveClass('BeforeRemoveScreen');

        let newLeft = screenObj.leftPixel + screenObj.widthPixel / 2 - SCREEN_EDGE_WIDTH;
        screenDiv.jjSetLeft(newLeft)
            .jjAddClass('RemoveScreen')
            .jjAddEventListener('transitionend', onAnimationEnd);

        calculateAndRealignDOM();

        if (newLeft > rightAddButton.jjTotallyUnreliableLeft - BUTTON_AREA_WIDTH) {
            screenDiv.jjSetLeft(rightAddButton.jjTotallyUnreliableLeft - BUTTON_AREA_WIDTH);
        }

        /*Inner Functions*/
        function onAnimationEnd() {
            screenDiv.jjRemoveMe();
            roomLayoutManager.readjustBottomPadAgain();
        }
    }

    /** Adjustments **/
    function changeWidth(screenDataObj, shiftAmount) {
        screenDataObj.width = screenDataObj.width + shiftAmount;
        screenDataObj.widthPixel += shiftAmount * singleWidth;
        let screenDiv = screenDataObj.screenDiv;

        let widthChange = shiftAmount * singleWidth;
        screenDataObj.leftPixel = screenDiv.jjTotallyUnreliableLeft - widthChange / 2;
        readjustHorizontalLayout();

        if (screenDataObj.width === 0) {
            deleteScreen(screenDataObj);
        }

        if (shiftAmount > 0) {
            shiftScrollAfterWidthExpansion(screenDataObj);
        }
    }

    function changeHeight(screenDataObj, shiftAmount) {
        screenDataObj.height = screenDataObj.height + shiftAmount;
        screenDataObj.heightPixel += shiftAmount * singleHeight;

        let screenDiv = screenDataObj.screenDiv;
        screenDiv.jjStyle({
            height: screenDataObj.height * singleHeight + 'px'
        });

        if (screenDataObj.height === 0) {
            deleteScreen(screenDataObj);
        }
        alignContainerHeight();
    }

    function readjustHorizontalLayout() {
        let prevScreenEnd = 0;
        for (let dataObj of screenDataObjArray) {
            dataObj.leftPixel = Math.max(dataObj.leftPixel, prevScreenEnd + MIN_GAP);
            resetScreenLayout(dataObj);
            prevScreenEnd = dataObj.leftPixel + dataObj.widthPixel;
        }

        readjustHorizontalLayout_extra();
    }

    function readjustHorizontalLayout_extra() {
        let lastScreen = screenDataObjArray[screenDataObjArray.length - 1];
        let lastScreenEnd = lastScreen.leftPixel + lastScreen.widthPixel;
        let rightOverflow = lastScreenEnd - visibleTableWidth;

        if (rightOverflow > 0) {
            calculateAndRealignDOM();
        }
    }

    function resetScreenLayout(dataObj) {
        let contentWidth = dataObj.widthPixel - SCREEN_EDGE_WIDTH * 2;
        dataObj.screenDiv.jjStyle({
            width: contentWidth + 'px'
        }).jjSetLeft(dataObj.leftPixel);
    }

    /** Utils **/

    /** DOM **/
    function alignScreensDOMToData() {
        for (let dataObj of screenDataObjArray) {
            setScreenDivMeasurements(dataObj);
        }
        setRightAddButtonPosition();
    }

    function setRightAddButtonPosition() {
        let screensEnd = 0;
        let lastScreen = screenDataObjArray[screenDataObjArray.length - 1];
        if (lastScreen) {
            screensEnd = lastScreen.leftPixel + lastScreen.width * singleWidth + SCREEN_EDGE_WIDTH + MIN_GAP;
        }
        screensEnd = Math.max(visibleTableWidth, screensEnd);
        rightAddButton.jjSetLeft(screensEnd + BUTTON_AREA_WIDTH);
    }

    function setScreenDivMeasurements(dataObj) {
        let screenDiv = dataObj.screenDiv;
        screenDiv.jjStyle({
            width: dataObj.width * singleWidth + 'px',
            height: dataObj.height * singleHeight + 'px',
        }).jjSetLeft(dataObj.leftPixel);
    }

    //In case a vertical scroll bar suddenly appears
    function adjustHorizontalLayoutIfNeeded() {
        let prevVisibleWidth = visibleTableWidth;
        visibleTableWidth = tablePapaDiv && tablePapaDiv.getBoundingClientRect().width - 2 * BUTTON_AREA_WIDTH;
        if (prevVisibleWidth && prevVisibleWidth !== visibleTableWidth) {
            calculateMeasurementsOnData();
            alignScreensDOMToData();
        }
    }

    /** Scroll **/
    function shiftScrollAfterWidthExpansion(screenDataObj) {
        return commonLayout.shiftScrollAfterWidthExpansion(screenDataObj, roomScrollDiv, visibleTableWidth);
    }
}