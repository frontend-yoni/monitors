function WidgetDDScrollManager() {
    let generalUtil = JJGeneralUtils.getInstance();

    /** Constants **/
    let SCROLL_ACTIVATION_AREA_SIZE = 75; //The area on the edges of the container that moving the mouse there triggers scroll
    let MIN_PIXEL_PER_SECOND = 200;
    let MAX_PIXEL_PER_SECOND = 800;
    /** External Div **/
    let scrollingDiv;
    let frameTime = 0;
    let isVertical = true;
    let isHorizontal = true;
    let mouseEvent;
    /** Internally Set **/
    let bcRect;
    let pixelPerSecond_h;
    let pixelPerSecond_v;
    let lastFrameTime;
    let isInsideScrollDiv;
    let prevMouseEvent;

    /** Public APIs **/
    this.setScrollContainer = function (scrollingDivI, isVerticalI = true, isHorizontalI) {
        scrollingDiv = JJPower.enhance(scrollingDivI);
        isVertical = isVerticalI;
        isHorizontal = isHorizontalI;
    };

    this.onPreDragMouseDown = function (mouseEventI) {
        prevMouseEvent = mouseEventI;
    };

    this.activateNow = function (mouseEventI) {
        mouseEvent = mouseEventI;
        activateNow();
    };

    this.runScrollFrame = function (mouseEventI, frameTimeI) {
        mouseEvent = mouseEventI;
        frameTime = frameTimeI;
        runFrame();
    };

    /** Private Functions **/
    function runFrame() {
        let inside = generalUtil.checkIfMouseInside(scrollingDiv, mouseEvent, bcRect);

        if (inside) {
            uponMovingInside();
        }

        prevMouseEvent = mouseEvent;
        lastFrameTime = frameTime;
    }

    function uponMovingInside() {
        determineScrollSpeeds();
        if (pixelPerSecond_v || pixelPerSecond_h) {
            performScrolling();
        }
    }

    /** Event Listeners **/
    function activateNow() {
        isInsideScrollDiv = false;
        updateBCRect();
    }

    /** Scroll Animation **/
    function performScrolling() {
        if (isVertical) {
            verticalScrollFrame();
        }
        if (isHorizontal) {
            horizontalScrollFrame();
        }
    }

    function verticalScrollFrame() {
        determineScrollSpeed_Vertical();
        if (pixelPerSecond_v) {
            performScroll_Vertical();
        }
    }

    function horizontalScrollFrame() {
        determineScrollSpeed_Horizontal();
        if (pixelPerSecond_h) {
            performScroll_Horizontal();
        }
    }

    function determineScrollSpeeds() {
        if (isVertical) {
            determineScrollSpeed_Vertical();
        }
        if (isHorizontal) {
            determineScrollSpeed_Horizontal();
        }
    }

    /** Util **/
    function determineScrollSpeed_Horizontal() {
        let leftDelta = mouseEvent.clientX - bcRect.left;
        let rightDelta = bcRect.width - leftDelta;
        if (leftDelta <= SCROLL_ACTIVATION_AREA_SIZE) { //Left side
            pixelPerSecond_h = -1 * calculateScrollSpeed(leftDelta);
        } else if (rightDelta <= SCROLL_ACTIVATION_AREA_SIZE) { //Right side
            pixelPerSecond_h = calculateScrollSpeed(rightDelta);
        } else { //None
            pixelPerSecond_h = 0;
        }
    }

    function performScroll_Horizontal() {
        let shiftPixels = getShiftPixels(pixelPerSecond_h);
        scrollHorizontally(shiftPixels);
    }

    function determineScrollSpeed_Vertical() {
        let topDelta = mouseEvent.clientY - bcRect.top;
        let bottomDelta = bcRect.height - topDelta;

        if (topDelta <= SCROLL_ACTIVATION_AREA_SIZE) { //Top side
            pixelPerSecond_v = -1 * calculateScrollSpeed(topDelta);
        } else if (bottomDelta <= SCROLL_ACTIVATION_AREA_SIZE) { //Bottom side
            pixelPerSecond_v = calculateScrollSpeed(bottomDelta);
        } else { //None
            pixelPerSecond_v = 0;
        }
    }

    function performScroll_Vertical() {
        let shiftPixels = getShiftPixels(pixelPerSecond_v);
        scrollVertically(shiftPixels);
    }

    function getShiftPixels(pixelPerSecond) {
        let secondsPast = (frameTime - lastFrameTime) / 1000;
        let shiftPixels = secondsPast * pixelPerSecond;
        shiftPixels = Math.round(shiftPixels) || shiftPixels;
        return shiftPixels;
    }

    function calculateScrollSpeed(delta) {
        let speed = 0;
        let ratio;

        if (delta > 0 && delta <= SCROLL_ACTIVATION_AREA_SIZE) {
            ratio = 1 - delta / SCROLL_ACTIVATION_AREA_SIZE;
        }
        else if (delta <= 0) {
            ratio = 1;
        }

        if (ratio >= 0) {
            speed = generalUtil.getValueByProgress(MIN_PIXEL_PER_SECOND, MAX_PIXEL_PER_SECOND, ratio);
        }
        return speed;
    }

    function scrollVertically(shiftPixels) {
        let newScrollTop = scrollingDiv.scrollTop + shiftPixels;
        newScrollTop = Math.max(newScrollTop, 0);
        if (shiftPixels && newScrollTop !== scrollingDiv.scrollTop) {
            scrollingDiv.scrollTop = newScrollTop;
        }

    }

    function scrollHorizontally(shiftPixels) {
        let newScrollLeft = scrollingDiv.scrollLeft + shiftPixels;
        newScrollLeft = Math.max(newScrollLeft, 0);
        if (shiftPixels && newScrollLeft !== scrollingDiv.scrollLeft) {
            scrollingDiv.scrollLeft = newScrollLeft;
        }
    }

    /** Measurements Calculations **/
    function updateBCRect() {
        bcRect = scrollingDiv.getBoundingClientRect();
    }
}

