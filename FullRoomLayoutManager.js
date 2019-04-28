function FullRoomLayoutManager(completeRoomComp) {
    let genUtils = JJGeneralUtils.getInstance();
    let scrollBarBottomPad;
    let scrollBarSize;
    /** Constants **/
    const SCREEN_BOTTOM = 30; //css --screenBottomPosition
    const SCREEN_EDGE_WIDTH = 8;
    const EMPTY_WALL_HEIGHT = 100;
    const EXTRA_HIT_AREA_WIDTH = 20; //css --extraHitAreaWidth
    /** Externally Set **/
    let roomDiv;
    let wallContainerDiv;
    let wallDiv;
    let tableDiv;
    let bottomPadDiv;
    let tableScreensObjArray;
    let wallScreenObj;
    //Components
    let tableLayoutManager;
    let wallLayoutManager;

    /** Internally Set **/
    let roomBCRect;
    let tableAreaHeight;
    let wallAreaHeight;
    let tableTop;
    let wallTop;
    let wallTopChangeAmount;
    let singleWidth = 160;
    let singleHeight = 100;
    let wallTableMaxOverlap = singleHeight * 0.8;

    /** Public APIs **/
    this.setExternalDiv = function (completeRoomDivI, wallContainerDivI, wallDivI, tableDivI, bottomPadDivI) {
        roomDiv = completeRoomDivI;
        wallContainerDiv = wallContainerDivI;
        wallDiv = wallDivI;
        tableDiv = tableDivI;
        bottomPadDiv = bottomPadDivI;
    };

    this.initialize = function () {
        roomBCRect = roomDiv.getBoundingClientRect();
        scrollBarSize = genUtils.getScrollWidth(roomDiv);
        scrollBarBottomPad = Math.max(10, scrollBarSize);
    };

    this.setData = function (tableScreensObjArrayI, wallScreenObjI) {
        tableScreensObjArray = tableScreensObjArrayI;
        wallScreenObj = wallScreenObjI;
    };

    this.adjustWallAndTableVerticalLayout = function () {
        adjustWallAndTableVerticalLayout();
    };

    this.readjustWallScreenTopAfterExpandOrShrink = function (shiftAmount) {
        readjustWallScreenTopAfterExpandOrShrink(shiftAmount);
    };

    /** Public APIs for internal use **/
    this.setTableLayoutManager = function (tableLayoutManagerI) {
        tableLayoutManager = tableLayoutManagerI;
    };

    this.setWallLayoutManager = function (wallLayoutManagerI) {
        wallLayoutManager = wallLayoutManagerI;
    };

    this.getWallHeight = function () {
        return wallAreaHeight;
    };

    this.removeFocusFromAllScreens = function (exceptThisOne) {
        let focusedScreens = roomDiv.jjQueryAll('.ScreenComponentMainDiv.FocusedScreen');
        for (let screenDiv of focusedScreens) {
            if (screenDiv !== exceptThisOne) {
                screenDiv.jjRemoveClass('FocusedScreen');
            }
        }
    };

    this.readjustBottomPadAgain = function () {
        adjustBottomPad();
    };

    /** Private Functions **/
    function adjustWallAndTableVerticalLayout() {
        calculateHeights();
        calculateTops();

        wallDiv.jjStyle({
            top: wallTop + 'px',
            height: wallAreaHeight + 'px'
        });

        tableDiv.jjStyle({
            top: tableTop + 'px',
            height: tableAreaHeight + 'px'
        }).jjAddEventListener('transitionend', tableLayoutManager.adjustHorizontalLayoutIfNeeded);  //In case a vertical scroll bar suddenly disappears;

        adjustBottomPad();

        //In case a vertical scroll bar suddenly appeared
        tableLayoutManager.adjustHorizontalLayoutIfNeeded();
    }

    //Shift up for expand, bottom for shrink
    function readjustWallScreenTopAfterExpandOrShrink(shiftAmount) {
        shiftAmount -= wallTopChangeAmount;

        let maxWallTop = tableTop - wallAreaHeight + wallTableMaxOverlap;
        wallTop += shiftAmount;
        wallTop = Math.max(0, wallTop);
        wallTop = Math.min(maxWallTop, wallTop);
        wallDiv.jjStyle({
            top: wallTop + 'px'
        });
    }

    function adjustBottomPad() {
        var top = tableTop + tableAreaHeight - 1 + scrollBarBottomPad;
        let hasHorizontalScroll = roomDiv.scrollWidth > roomDiv.clientWidth;

        if (hasHorizontalScroll) {
            top -= scrollBarBottomPad;
        }
        bottomPadDiv.jjStyle({
            top: top + 'px'
        });
    }

    function calculateTops() {
        let prevWallTop = wallTop;
        tableTop = roomBCRect.height - tableAreaHeight - scrollBarBottomPad;
        let maxWallTop = tableTop - wallAreaHeight + wallTableMaxOverlap;
        let preferredWallTop = maxWallTop - singleHeight;
        preferredWallTop = Math.max(0, preferredWallTop);

        if (!wallTop || wallScreenObj.height === 0 || !wallScreenObj.heightPixel) { //First time to set, or maybe just removed wall screen
            wallTop = preferredWallTop;
        }

        if (wallTop > maxWallTop) {
            wallTop = maxWallTop;
        }

        if (wallTop < 0) { //Need vertical scroll
            wallTop = 0;
            tableTop = wallAreaHeight - wallTableMaxOverlap;
        }
        wallTopChangeAmount = wallTop - prevWallTop;
    }

    function calculateHeights() {
        calculateTableHeight(); //Table First!
        calculateWallHeight();
    }

    function calculateTableHeight() {
        let tallestScreenPixel = SCREEN_BOTTOM + singleHeight;
        let screenHeight;
        for (let screenData of tableScreensObjArray) {
            screenHeight = screenData.height * singleHeight + 2 * SCREEN_EDGE_WIDTH;
            tallestScreenPixel = Math.max(tallestScreenPixel, screenHeight + SCREEN_BOTTOM);
        }
        tableAreaHeight = tallestScreenPixel + singleHeight + 2 * SCREEN_EDGE_WIDTH;
    }

    function calculateWallHeight() {
        wallAreaHeight = wallScreenObj.height * singleHeight + 2 * SCREEN_EDGE_WIDTH + 20;
        wallLayoutManager = Math.max(EMPTY_WALL_HEIGHT, wallAreaHeight);
    }
}