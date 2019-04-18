function WidgetDDCloneUtil(ddManager) {
    let html = JJPower.query('html');
    let isDismissState = !ddManager;
    /* Clone */
    let cloneContainer;
    let itemClone;
    /* Orig */
    let ddItem;
    let dropTargetBCRect;
    /* Measurements */
    let itemBCRect;
    /* Mouse */
    let startEvent;
    let currentEvent;

    /** Public APIs **/
    this.reactToDragStart = function (ddItemI, startEventI) {
        startEvent = startEventI;
        currentEvent = startEvent;
        ddItem = ddItemI;
        itemBCRect = ddItem.getBoundingClientRect();
        dropTargetBCRect = itemBCRect;
        createClone();
    };

    this.runCloneMoveFrame = function (currentEventI) {
        currentEvent = currentEventI;
        positionClone();
    };

    this.reactToDragRelease = function () {
        beginReleaseSequence();
    };

    this.setDropTargetBCRect = function (dropTargetBCRectI) {
        dropTargetBCRect = dropTargetBCRectI || itemBCRect;
    };

    this.dismissWidgetDiv = function (widgetDiv, dropTargetBCRectI) {
        ddItem = widgetDiv;
        itemBCRect = ddItem.getBoundingClientRect();
        dropTargetBCRect = dropTargetBCRectI;
        createClone(true);
        cloneContainer.jjAddClass('dismissClone');
        cloneContainer.jjForceStyleRecalc();
        beginReleaseSequence();
    };

    /** Private Function **/

    /** Interaction **/
    function createClone(isDismiss) {
        removeClone();
        let containerPapa = JJPower.enhance(ddItem.parentNode);
        if (isDismiss) {
            containerPapa = JJPower.query('.CompleteMonitorPage');
        }
        cloneContainer = containerPapa.jjAppend('div')
            .jjAddClass('WidgetDDCloneContainer');

        itemClone = ddItem.cloneNode(true);
        itemClone = JJPower.enhance(itemClone);
        itemClone.jjAddClass('WidgetDDActualClone');

        let bgDiv = cloneContainer.jjAppend('div')
            .jjAddClass('WidgetDDCloneBackground');

        cloneContainer.appendChild(itemClone);
        adjustCloneSize();
    }

    function removeClone() {
        if (cloneContainer) {
            cloneContainer.jjRemoveMe();
        }
    }

    /** Life Cycle **/
    function beginReleaseSequence() {
        cloneContainer.jjAddClass('WidgetDDCloneReleaseAnimation');

        if (dropTargetBCRect === itemBCRect) { //No drop target detected
            cloneContainer.jjAddClass('CloneFadeAway');
        }

        applyDropCoordinates();

        cloneContainer.jjAddEventListener('transitionend', onDropTransitionEnd);
    }

    function onDropTransitionEnd(e) {
        if (e.target !== e.currentTarget) {
            return;
        }
        if (ddManager) {
            ddManager.onReleaseEnd();
        }

        removeClone();
        cloneContainer.jjRemoveEventListener('transitionend', onDropTransitionEnd);
    }

    /** Adjustments **/
    function adjustCloneSize() {
        cloneContainer.jjStyle({
            width: itemBCRect.width + 'px',
            height: itemBCRect.height + 'px',
            top: itemBCRect.top + 'px',
            left: itemBCRect.left + 'px'
        });
    }

    function positionClone() {
        let xDelta = currentEvent.clientX - startEvent.clientX;
        let yDelta = currentEvent.clientY - startEvent.clientY;
        cloneContainer.jjQuickTransform(xDelta, yDelta);
    }

    function applyDropCoordinates() {
        let left = dropTargetBCRect.left;
        let top = dropTargetBCRect.top;

        let relativeX = left - itemBCRect.left;
        let relativeY = top - itemBCRect.top;

        cloneContainer.jjQuickTransform(relativeX, relativeY, 0);
    }
}