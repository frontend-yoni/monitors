function CompleteMonitorPage(directPapaComponent, dataManager) {
    let me = this;
    let ddManager = WidgetDDManager.getInstance();
    let widgetComponent = WidgetConfigModal.getInstance();

    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let tableScreensDataArray = [new ScreenDataObj(), new ScreenDataObj(), new ScreenDataObj()];
    let wallScreenDataObj = new ScreenDataObj();
    let completeData;
    /** Internally Set **/
        //Structure
    let backgroundDiv;
    let leftListDiv;
    let screenRoomDiv;
    let bottomRolodexDiv;
    let modalDiv;
    //Components
    let roomComponent = new FullRoomComponent(me, ddManager);
    let leftListComp = new LeftWidgetSelectionComponent(me, ddManager);
    let bottomRolodexComp = new BottomWidgetRolodex(me, ddManager);

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        externalDiv = JJPower.enhance(divHTML)
            .jjAddClass('CompleteMonitorPage');
    };

    this.setData = function (completeDataI) {
        completeData = completeDataI;
        tableScreensDataArray = completeData.tableScreenDataAray;
        wallScreenDataObj = completeData.wallScreenData;
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        backgroundDiv = externalDiv.jjAppend('div')
            .jjAddClass('RoomBackgroundDiv');
        backgroundDiv.innerHTML = APP_BACKGROUND_SVG;

        screenRoomDiv = externalDiv.jjAppend('div')
            .jjAddClass('MonitorPageScreenRoomDiv');

        bottomRolodexDiv = externalDiv.jjAppend('div')
            .jjAddClass('MonitorPageBottomRolodexDiv');

        leftListDiv = externalDiv.jjAppend('div')
            .jjAddClass('MonitorPageLeftListDiv');

        modalDiv = externalDiv.jjAppend('div')
            .jjAddClass('FullWidgetConfigModal');

        drawScreenRoom();
        drawLeftList();
        drawBottomRolodex();
        prepModal();
    }

    function drawBottomRolodex() {
        bottomRolodexComp.setExternalDiv(bottomRolodexDiv);
        bottomRolodexComp.drawComponent();
    }

    function drawScreenRoom() {
        roomComponent.setExternalDiv(screenRoomDiv);
        roomComponent.setData(tableScreensDataArray, wallScreenDataObj);
        roomComponent.drawComponent();
    }

    function drawLeftList() {
        leftListComp.setExternalDiv(leftListDiv);
        leftListComp.drawComponent();
    }

    function prepModal(){
        widgetComponent.setExternalDiv(modalDiv);
        //widgetComponent.openModal(JJPower.enhance(document.createElement('div')), 2);
    }

    /** Draw **/
    function resize() {
        roomComponent.resize();
    }
}