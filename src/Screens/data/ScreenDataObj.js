function ScreenDataObj(width = 1, height = 1) {
    let me = this;
    /* Data */
    this.width = width;
    this.height = height;
    this.widgetMatrix = [];
    this.widgetInstanceDataMatrix = [];
    /* Measurements */
    this.widthPixel;
    this.heightPixel;
    this.leftPixel;
    this.topPixel;
    /* Structure */
    this.screenDiv;

    this.deleteWidthAndHeight = function () {
        this.width = 0;
        this.height = 0;
        this.widthPixel = 0;
        this.heightPixel = 0;
    }

    this.initializeParams = function (width = 1, height = 1) {
        this.width = width;
        this.height = height;
        this.widthPixel = undefined;
        this.heightPixel = undefined;
        this.leftPixel = undefined;
        this.topPixel = undefined;
    }

    this.addWidget = function (row, column, widgetIndex, widgetInstanceData) {
        if (!this.widgetMatrix[row]) {
            this.widgetMatrix[row] = [];
        }
        this.widgetMatrix[row][column] = widgetIndex;

        if (!this.widgetInstanceDataMatrix[row]) {
            this.widgetInstanceDataMatrix[row] = [];
        }
        this.widgetInstanceDataMatrix[row][column] = widgetInstanceData;
    };

    this.removeWidget = function (row, column) {
        this.widgetMatrix[row][column] = undefined;
    };

    this.getWidget = function (row, column) {
        return me.widgetMatrix[row] && me.widgetMatrix[row][column];
    };

    this.getAllWidgets = function () {
        let widgetList = [];
        let widgetIndex;
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                widgetIndex = this.widgetMatrix[row] && this.widgetMatrix[row][column];
                if (widgetIndex !== undefined) {
                    widgetList.push({
                        row,
                        column,
                        widgetIndex
                    })
                }

            }
        }

        return widgetList;
    }
}