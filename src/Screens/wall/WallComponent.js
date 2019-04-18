function WallComponent(directPapaComponent, roomLayoutManager, ddManager) {
    let me = this;
    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let completeRoomDiv;
    let wallContainerDiv;
    let wallDiv;
    //Data
    let screenDataObj = new ScreenDataObj();
    /** Internally Set **/
    let layoutManager = new WallLayoutManager(me, roomLayoutManager);
    //Structure
    let screenDiv;
    let addButton;
    //Component
    let screenComp;

    /** Public APIs **/
    this.setExternalDiv = function (wallDivI, wallContainerDivI, completeRoomDivI) {
        wallDiv = wallDivI;
        wallContainerDiv = wallContainerDivI;
        completeRoomDiv = completeRoomDivI;
    };

    this.setData = function (screenDataObjI) {
        screenDataObj = screenDataObjI;
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    /** Internally Used Public APIs **/
    this.respondToScreenDelete = function () {
        respondToScreenDelete();
    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        createScreen();

        layoutManager.setExternalDivs(wallDiv, wallContainerDiv, completeRoomDiv, addButton);
        layoutManager.setData(screenDataObj);
        layoutManager.runInitialLayout();
    }

    function createScreen() {
        screenDiv = wallDiv.jjAppend('div')
            .jjAddClass('WallScreenDiv')
            .jjSetData(screenDataObj);

        addButton = wallDiv.jjAppend('div')
            .jjAddClass('WallComponentAddButton')
            .jjAddEventListener('click', addScreen);
        addAddButtonIcon(addButton);

        screenDataObj.screenDiv = screenDiv;
        screenComp = new ScreenComponent(me, layoutManager, ddManager);
        screenComp.setExternalDiv(screenDiv);
        screenComp.setData(screenDataObj);
        screenComp.drawComponent();
    }

    function addAddButtonIcon(buttonDiv) {
        buttonDiv.innerHTML = SCREEN_EXPAND_BUTTON_SVG;
    }

    /** Draw **/
    function resize() {
        layoutManager.runInitialLayout();
    }

    /** Actions **/
    function respondToScreenDelete() {
        wallDiv.jjAddClass('emptyWall');
    }

    function addScreen(){
        wallDiv.jjRemoveClass('emptyWall');
        layoutManager.addTableScreen();
        screenComp.drawComponent();
    }
}