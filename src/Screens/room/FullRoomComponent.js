function FullRoomComponent(directPapaComponent, ddManager) {
    let me = this;
    let layoutManager = new FullRoomLayoutManager(me);
    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let tableScreensDataArray = [new ScreenDataObj(), new ScreenDataObj(), new ScreenDataObj()];
    let wallScreenDataObj = new ScreenDataObj();

    /** Internally Set **/
        //Structure
    let completeRoomDiv;
    let wallContainerDiv;
    let wallDiv;
    let tableDiv;
    let bottomPadDiv;

    //Components
    let wallComponent = new WallComponent(me, layoutManager, ddManager);
    let tableComponent = new TableComponent(me, layoutManager, ddManager);

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        completeRoomDiv = JJPower.enhance(divHTML)
            .jjAddClass('CompleteRoomDiv');
        ddManager.setScreenRoomDiv(completeRoomDiv);
    };

    this.setData = function (tableScreensDataArrayI, wallScreenDataObjI) {
        tableScreensDataArray = tableScreensDataArrayI;
        wallScreenDataObj = wallScreenDataObjI;
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    /** Internally Used Public APIs **/
    this.onWidgetDragStart = function(e){

    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        wallContainerDiv = completeRoomDiv.jjAppend('div')
            .jjAddClass('CompleteRoomWallContainerDiv');

        tableDiv = completeRoomDiv.jjAppend('div')
            .jjAddClass('CompleteRoomTableDiv');

        wallDiv = wallContainerDiv.jjAppend('div')
            .jjAddClass('CompleteRoomWallDiv');

        bottomPadDiv = completeRoomDiv.jjAppend('div')
            .jjAddClass('CompleteRoomBottomPadDiv');

        layoutManager.setExternalDiv(completeRoomDiv, wallContainerDiv, wallDiv, tableDiv, bottomPadDiv);
        layoutManager.setData(tableScreensDataArray, wallScreenDataObj);
        layoutManager.initialize();
        layoutManager.adjustWallAndTableVerticalLayout();

        drawTable();
        drawWall();

        document.addEventListener('click', onDocumentClick);
        completeRoomDiv.jjAddEventListener('mouseleave', onMouseLeave)
    }

    function drawTable() {
        tableComponent.setExternalDiv(tableDiv, completeRoomDiv);
        tableComponent.setData(tableScreensDataArray);
        tableComponent.drawComponent();
    }

    function drawWall() {
        wallComponent.setExternalDiv(wallDiv, wallContainerDiv, completeRoomDiv);
        wallComponent.setData(wallScreenDataObj);
        wallComponent.drawComponent();
    }

    /** Draw **/
    function resize() {
        tableComponent.resize();
        wallComponent.resize();
        layoutManager.removeFocusFromAllScreens();
    }

    function onDocumentClick(e) {
        let clickedTarget = JJPower.enhance(e.target);
        let isInsideScreen = clickedTarget.jjClosest('.ScreenComponentMainDiv');
        if (!isInsideScreen) {
            layoutManager.removeFocusFromAllScreens();
        }
    }

    function onMouseLeave() {
        layoutManager.removeFocusFromAllScreens();
    }
}