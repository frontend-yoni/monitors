function WallLayoutManager(wallComponent, roomLayoutManager) {
    let me = this;
    roomLayoutManager.setWallLayoutManager(me);

    let commonLayout = CommonLayout.getInstance();
    /** Const **/
    const SCREEN_EDGE_WIDTH = 8;
    /** Externally Set **/
    /* Structure */
    let wallDiv;
    let wallContainerDiv;
    let completeRoomDiv;
    /* Data */
    let screenDataObj;
    /** Internally Set **/
    /* Measurement */
    let singleWidth = 160;
    let singleHeight = 100;
    let visibleWallWidth;

    /** Public APIs **/
    this.setExternalDivs = function (wallDivI, wallContainerDivI, completeRoomDivI) {
        wallDiv = wallDivI;
        wallContainerDiv = wallContainerDivI;
        completeRoomDiv = completeRoomDivI;
    };

    this.setData = function (screenDataObjI) {
        screenDataObj = screenDataObjI;
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

    this.addTableScreen = function () {
        addScreen();
    };

    this.getMeasurementsPack = function () {
        return { singleWidth, singleHeight, SCREEN_EDGE_WIDTH };
    };

    this.removeFocusFromAllScreens = function (exceptThisOne) {
        roomLayoutManager.removeFocusFromAllScreens(exceptThisOne);
    };

    /** Private Functions **/
    function runInitialLayout() {
        visibleWallWidth = wallDiv.getBoundingClientRect().width;
        readjustLayout();
    }

    function readjustLayout() {
        calculateScreenObjMeasurements();
        positionDivByData();
        adjustStickyPosition();
    }

    function adjustStickyPosition() {
        let screenEdge = screenDataObj.leftPixel + screenDataObj.widthPixel;
        if (screenEdge > visibleWallWidth) {
            wallContainerDiv.jjSetLeft(visibleWallWidth - screenEdge);
        } else {
            wallDiv.jjSetLeft(0);
        }
    }

    /** Interactions **/
    function changeWidth(screenDataObj, shiftAmount) {
        screenDataObj.width = screenDataObj.width + shiftAmount;
        screenDataObj.widthPixel += shiftAmount * singleWidth;
        let screenDiv = screenDataObj.screenDiv;

        let widthChange = shiftAmount * singleWidth;
        screenDataObj.leftPixel = screenDiv.jjTotallyUnreliableLeft - widthChange / 2;
        readjustLayout();

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

        roomLayoutManager.adjustWallAndTableVerticalLayout();

        //Shift up for expand, bottom for shrink
        roomLayoutManager.readjustWallScreenTopAfterExpandOrShrink(-shiftAmount * singleHeight);


        readjustLayout();

        if (screenDataObj.height === 0) {
            deleteScreen(screenDataObj);
        }
    }

    function deleteScreen(screenObj) {
        let screenDiv = screenObj.screenDiv;
        let newLeft = screenObj.leftPixel + screenObj.widthPixel / 2 - SCREEN_EDGE_WIDTH;
        let newTop = screenObj.topPixel + screenObj.heightPixel / 2 - SCREEN_EDGE_WIDTH;

        screenObj.deleteWidthAndHeight();
        screenDiv
            .jjStyle({
                top: newTop + 'px'
            })
            .jjSetLeft(newLeft)
            .jjAddClass('RemoveScreen')
            .jjAddEventListener('transitionend', onAnimationEnd);

        roomLayoutManager.adjustWallAndTableVerticalLayout();

        /*Inner Functions*/
        function onAnimationEnd() {
            screenDiv.jjRemoveEventListener('transitionend', onAnimationEnd);
            screenDiv.jjClear();
            wallComponent.respondToScreenDelete();
        }
    }

    /** Quick Utils **/
    function calculateScreenObjMeasurements() {
        let visibleWallHeight = roomLayoutManager.getWallHeight();

        let width = screenDataObj.width * singleWidth;
        let height = screenDataObj.height * singleHeight;
        let left = (visibleWallWidth - width) / 2;
        let top = (visibleWallHeight - height) / 2;

        screenDataObj.leftPixel = Math.max(SCREEN_EDGE_WIDTH + 10, left);
        screenDataObj.topPixel = Math.max(SCREEN_EDGE_WIDTH + 10, top);
        screenDataObj.widthPixel = width + 2 * SCREEN_EDGE_WIDTH;
        screenDataObj.heightPixel = height + 2 * SCREEN_EDGE_WIDTH;
    }

    function positionDivByData() {
        screenDataObj.screenDiv.jjStyle({
            width: screenDataObj.width * singleWidth + 'px',
            height: screenDataObj.height * singleHeight + 'px',
            top: screenDataObj.topPixel + 'px'
        }).jjSetLeft(screenDataObj.leftPixel);
    }

    function addScreen() {
        let screenDiv = screenDataObj.screenDiv;
        screenDiv.jjClear();
        screenDiv.jjRemoveClass('RemoveScreen')
            .jjStyle({
                width: 0,
                height: 0
            });

        screenDataObj.initializeParams();
        roomLayoutManager.adjustWallAndTableVerticalLayout();
        runInitialLayout();
    }

    /** Scroll **/
    function shiftScrollAfterWidthExpansion(screenDataObj) {
        return commonLayout.shiftScrollAfterWidthExpansion(screenDataObj, completeRoomDiv, visibleWallWidth);
    }
}