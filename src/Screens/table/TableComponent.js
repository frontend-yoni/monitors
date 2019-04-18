function TableComponent(directPapaComponent, fullRoomLayoutManager, ddManager) {
    let me = this;
    /** CONSTANTS **/
    let BUTTON_AREA_WIDTH = 36; //Must align css .TableComponentAddButton
    /** Externally Set ***/
        //Structure
    let tablePapaDiv;
    let roomScrollDiv;
    //Data
    let dataArr = [new ScreenDataObj(), new ScreenDataObj(), new ScreenDataObj()];
    let screenComponentArray;

    /** Internally Set **/
        //Structure
    let tableDiv;
    let actualTableDiv;
    let leftAddButton;
    let rightAddButton;
    //Measurements
    let screenSizeObj;
    //Utils
    let layoutManager = new TableLayoutManager(me, fullRoomLayoutManager);

    /** Public APIs **/
    this.setExternalDiv = function (tablePapaDivI, roomScrollDivI) {
        tablePapaDiv = tablePapaDivI;
        roomScrollDiv = roomScrollDivI;
    };

    this.setData = function (dataI) {
        dataArr = dataI;
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    /** Called from within **/
    this.addNewScreen = function (screenDataObject, addToBeginning) {
        addScreen(screenDataObject, addToBeginning)
    };

    /** Construction **/
    function drawComponent() {
        construct();
        addScreens();
        layoutManager.runInitialLayout();
    }

    function construct() {
        actualTableDiv = tablePapaDiv.jjAppend('div')
            .jjAddClass('ActualTableDiv')
            .jjSetLeft(BUTTON_AREA_WIDTH);

        leftAddButton = tablePapaDiv.jjAppend('div')
            .jjAddClass('TableComponentAddButton', 'TableComponentAddButton_left');

        rightAddButton = tablePapaDiv.jjAppend('div')
            .jjAddClass('TableComponentAddButton', 'TableComponentAddButton_right');


        addAddButtonIcon(leftAddButton);
        addAddButtonIcon(rightAddButton);

        layoutManager.setData(dataArr);
        layoutManager.setExternalDivs(tablePapaDiv, actualTableDiv, roomScrollDiv, leftAddButton, rightAddButton, BUTTON_AREA_WIDTH);
        screenSizeObj = layoutManager.getMeasurementsPack();
    }

    function addScreens() {
        screenComponentArray = [];
        for (let i = 0; i < dataArr.length; i++) {
            addScreen(dataArr[i]);
        }
    }

    function addScreen(screenDataObj, addToBeginning) {
        let screenDiv = actualTableDiv.jjAppend('div')
            .jjAddClass('TableComponentScreenWrapper')
            .jjSetData(screenDataObj);

        if (addToBeginning) {
            actualTableDiv.insertBefore(screenDiv, actualTableDiv.jjGetChildren()[0]);
            actualTableDiv.jjForceStyleRecalc();
        }

        screenDataObj.screenDiv = screenDiv;
        addScreenComponent(screenDataObj, screenDiv, addToBeginning);
    }

    function addScreenComponent(screenDataObj, screenDiv, insertToBeginning) {
        let screenComp = new ScreenComponent(me, layoutManager, ddManager);
        screenComp.setData(screenDataObj);
        screenComp.setExternalDiv(screenDiv);
        screenComp.drawComponent();

        if (!insertToBeginning) {
            screenComponentArray.push(screenComp);
        } else {
            screenComponentArray.unshift(screenComp);
        }
    }

    function addAddButtonIcon(buttonDiv) {
        buttonDiv.innerHTML = SCREEN_EXPAND_BUTTON_SVG;
    }

    /** Draw **/
    function resize() {
        layoutManager.runInitialLayout();
    }
}