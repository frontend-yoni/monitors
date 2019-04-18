function CommonLayout() {
    const ANIMATION_DURATION = 400;

    /** Public APIs **/
    this.shiftScrollAfterWidthExpansion = function (screenDataObj, scrollDiv, scrollVisibleWidth,) {
        shiftScrollAfterWidthExpansion(screenDataObj, scrollDiv, scrollVisibleWidth);
    };

    /** Scroll **/
    function shiftScrollAfterWidthExpansion(screenDataObj, scrollDiv, scrollVisibleWidth) {
        let scrollLeft = scrollDiv.scrollLeft;
        let visibleEdge = scrollLeft + scrollVisibleWidth;
        let screenEdge = screenDataObj.leftPixel + screenDataObj.widthPixel;
        if (screenEdge > visibleEdge) {
            let newScrollLeft = screenEdge - scrollVisibleWidth;
            scrollDiv.jjAnimateScroll_horizontal(newScrollLeft - scrollLeft, ANIMATION_DURATION);
        }
    }
}

CommonLayout.getInstance = function () {
    if (!CommonLayout.instance) {
        CommonLayout.instance = new CommonLayout();
    }
    return CommonLayout.instance;
};