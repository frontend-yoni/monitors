function ScreenRoomInternalDDManager(ddManager) {
    /** Externally Set **/
    //Structure
    let screenRoomDiv;

    /** Public APIs **/
    this.setScreenRoomDiv = function(screenRoomDivI){
        screenRoomDiv = screenRoomDivI;
        ddManager.setAsDraggable(screenRoomDiv, 'MiniScreenWidgetDiv');
    }
}