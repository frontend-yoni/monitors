function WidgetDDManager() {
    let me = this;
    let cloneUtil = new WidgetDDCloneUtil(me);
    let scrollManager = new WidgetDDScrollManager();
    let staticDataStuff = StaticDataStuff.getInstance();
    let html = JJPower.query('html');
    /** Externally Set **/
    let dropTarget;
    let dropTargetComponent;
    let initiatorComponent;
    let leftListComponent;
    let screenRoomDiv;
    /** Internally Set **/
    let ddItem;
    let prevEvent;
    let currentEvent;
    let startEvent;
    let isDragging;
    let isFirstMove;
    let managementAnimationObject;
    let widgetData;

    /** Public API **/
    this.setAsDraggable = function (draggableContainer, draggableClass, dragInitiatorComponent) {
        applyDraggable(draggableContainer, draggableClass, dragInitiatorComponent);
    };

    this.setLeftListComponent = function (leftListComponentI) {
        leftListComponent = leftListComponentI;
    };

    this.setScreenRoomDiv = function (screenRoomDivI) {
        screenRoomDiv = screenRoomDivI;
    };

    this.getWidgetItemBCRect = function (widgetIndex) {
        return leftListComponent.getWidgetBCRect(widgetIndex);
    };

    this.getDDData = function () {
        return ddItem.jjGetData();
    };

    this.getIsDragging = function () {
        return isDragging;
    };

    this.getDDItem = function () {
        return ddItem;
    };

    this.setDropTarget = function (dropWidgetDiv) {
        if (dropWidgetDiv) {
            cloneUtil.setDropTargetBCRect(dropWidgetDiv.getBoundingClientRect());
        } else {
            cloneUtil.setDropTargetBCRect(undefined);
        }
    };

    this.setDropTargetComponent = function (dropTargetComponentI) {
        dropTargetComponent = dropTargetComponentI;
    };

    this.setAsUnDroppable = function () {
        cloneUtil.setDropTargetBCRect(undefined);
    };

    this.onReleaseEnd = function () {
        onReleaseEnd();
    };

    /** Private Functions **/
    function applyDraggable(draggableContainer, draggableClass, dragInitiatorComponent) {
        let thisForMouseDown = { draggableClass, dragInitiatorComponent };
        let instanceOfMouseDownForGivenClass = onMouseDown.bind(thisForMouseDown);
        draggableContainer.jjAddEventListener('mousedown', instanceOfMouseDownForGivenClass);
    }

    function startDDManagementAnimation() {
        managementAnimationObject = JJPower.jjAnimateForever(ddFrame);
    }

    function stopDDManagementAnimation() {
        JJPower.jjStopAnimatingForever(managementAnimationObject);
    }

    function ddFrame(frameTime) {
        if (currentEvent !== prevEvent) {
            runMoveFrame();
        }
        runScrollFrame(frameTime);
        prevEvent = currentEvent;
    }

    function runMoveFrame() {
        cloneUtil.runCloneMoveFrame(currentEvent);
    }

    function runScrollFrame(frameTime) {
        if (widgetData.dragToScreen) {
            scrollManager.runScrollFrame(currentEvent, frameTime);
        }
    }

    /** Mouse **/
    function onMouseDown(e) {
        e.preventDefault();
        let target = e.target.closest(`.${this.draggableClass}`);
        if (target) {
            ddItem = JJPower.enhance(target);
            document.jjAddEventListener('mouseup', onMouseUp);
            document.jjAddEventListener('mousemove', onMouseMove);
            startEvent = e;
            currentEvent = e;
            isDragging = true;
            isFirstMove = true;
            onDragStart(e);
        }
    }

    function onMouseMove(e) {
        e.preventDefault();
        currentEvent = e;
        if (isFirstMove) { //First move
            applyHTMLClasses();
        }
        isFirstMove = false;
    }

    function onMouseUp() {
        document.jjRemoveEventListener('mousemove', onMouseMove);
        document.jjRemoveEventListener('mouseup', onMouseUp);
        if (isDragging) {
            onDragRelease();
        }

        isDragging = false;
    }

    /** DD Life Cycle **/
    function onDragStart(e) {
        widgetData = staticDataStuff.getWidgetItemData(ddItem.jjGetIndex());
        scrollManager.setScrollContainer(screenRoomDiv, true, true);

        cloneUtil.reactToDragStart(ddItem, startEvent);
        scrollManager.activateNow(startEvent);
        startDDManagementAnimation();
    }

    function onDragRelease() {
        if (dropTargetComponent) {
            dropTargetComponent.onDragRelease();
        }

        cloneUtil.reactToDragRelease();
        stopDDManagementAnimation();
    }

    function onReleaseEnd() {
        removeHTMLClasses();
        if (dropTargetComponent) {
            dropTargetComponent.onReleaseEnd();
        }
    }

    /** Class Stuff **/
    function applyHTMLClasses() {
        html.jjAddClass('WidgetDragAndDropGo');
        if (widgetData.dragToScreen) {
            html.jjAddClass('WidgetDragAndDropGo_Screen');
        } else {
            html.jjAddClass('WidgetDragAndDropGo_Rolodex');
        }
    }

    function removeHTMLClasses() {
        html.jjRemoveClass('WidgetDragAndDropGo', 'WidgetDragAndDropGo_Screen', 'WidgetDragAndDropGo_Rolodex');
    }
}

WidgetDDManager.getInstance = function () {
    if (!WidgetDDManager.instance) {
        WidgetDDManager.instance = new WidgetDDManager();
    }
    return WidgetDDManager.instance;
};