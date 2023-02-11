import { AgmMarker, GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager } from '@agm/core';
import { Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
var AgmSnazzyInfoWindow = /** @class */ (function () {
    function AgmSnazzyInfoWindow(_marker, _wrapper, _manager, _loader) {
        this._marker = _marker;
        this._wrapper = _wrapper;
        this._manager = _manager;
        this._loader = _loader;
        /**
         * Changes the open status of the snazzy info window.
         */
        this.isOpen = false;
        /**
         * Emits when the open status changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Choose where you want the info window to be displayed, relative to the marker.
         */
        this.placement = 'top';
        /**
         * The max width in pixels of the info window.
         */
        this.maxWidth = 200;
        /**
         * The max height in pixels of the info window.
         */
        this.maxHeight = 200;
        /**
         * Determines if the info window will open when the marker is clicked.
         * An internal listener is added to the Google Maps click event which calls the open() method.
         */
        this.openOnMarkerClick = true;
        /**
         * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
         * This will not activate on the Google Maps drag event when the user is panning the map.
         */
        this.closeOnMapClick = true;
        /**
         * Determines if the info window will close when any other Snazzy Info Window is opened.
         */
        this.closeWhenOthersOpen = false;
        /**
         * Determines if the info window will show a close button.
         */
        this.showCloseButton = true;
        /**
         * Determines if the info window will be panned into view when opened.
         */
        this.panOnOpen = true;
        /**
         * Emits before the info window opens.
         */
        this.beforeOpen = new EventEmitter();
        /**
         * Emits before the info window closes.
         */
        this.afterClose = new EventEmitter();
        this._snazzyInfoWindowInitialized = null;
    }
    /**
     * @internal
     */
    AgmSnazzyInfoWindow.prototype.ngOnChanges = function (changes) {
        if (this._nativeSnazzyInfoWindow == null) {
            return;
        }
        if ('isOpen' in changes && this.isOpen) {
            this._openInfoWindow();
        }
        else if ('isOpen' in changes && !this.isOpen) {
            this._closeInfoWindow();
        }
        if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
            this._updatePosition();
        }
    };
    /**
     * @internal
     */
    AgmSnazzyInfoWindow.prototype.ngAfterViewInit = function () {
        var _this = this;
        var m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
        this._snazzyInfoWindowInitialized = this._loader.load()
            .then(function () { return require('snazzy-info-window'); })
            .then(function (module) { return Promise.all([module, m, _this._wrapper.getNativeMap()]); })
            .then(function (elems) {
            var options = {
                map: elems[2],
                content: '',
                placement: _this.placement,
                maxWidth: _this.maxWidth,
                maxHeight: _this.maxHeight,
                backgroundColor: _this.backgroundColor,
                padding: _this.padding,
                border: _this.border,
                borderRadius: _this.borderRadius,
                fontColor: _this.fontColor,
                pointer: _this.pointer,
                shadow: _this.shadow,
                closeOnMapClick: _this.closeOnMapClick,
                openOnMarkerClick: _this.openOnMarkerClick,
                closeWhenOthersOpen: _this.closeWhenOthersOpen,
                showCloseButton: _this.showCloseButton,
                panOnOpen: _this.panOnOpen,
                wrapperClass: _this.wrapperClass,
                callbacks: {
                    beforeOpen: function () {
                        _this._createViewContent();
                        _this.beforeOpen.emit();
                    },
                    afterOpen: function () {
                        _this.isOpenChange.emit(_this.openStatus());
                    },
                    afterClose: function () {
                        _this.afterClose.emit();
                        _this.isOpenChange.emit(_this.openStatus());
                    },
                },
            };
            if (elems[1] != null) {
                options.marker = elems[1];
            }
            else {
                options.position = {
                    lat: _this.latitude,
                    lng: _this.longitude,
                };
            }
            _this._nativeSnazzyInfoWindow = new elems[0](options);
        });
        this._snazzyInfoWindowInitialized.then(function () {
            if (_this.isOpen) {
                _this._openInfoWindow();
            }
        });
    };
    AgmSnazzyInfoWindow.prototype._openInfoWindow = function () {
        var _this = this;
        this._snazzyInfoWindowInitialized.then(function () {
            _this._createViewContent();
            _this._nativeSnazzyInfoWindow.open();
        });
    };
    AgmSnazzyInfoWindow.prototype._closeInfoWindow = function () {
        var _this = this;
        this._snazzyInfoWindowInitialized.then(function () {
            _this._nativeSnazzyInfoWindow.close();
        });
    };
    AgmSnazzyInfoWindow.prototype._createViewContent = function () {
        if (this._viewContainerRef.length === 1) {
            return;
        }
        var evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
        // we have to run this in a separate cycle.
        setTimeout(function () {
            evr.detectChanges();
        });
    };
    AgmSnazzyInfoWindow.prototype._updatePosition = function () {
        this._nativeSnazzyInfoWindow.setPosition({
            lat: this.latitude,
            lng: this.longitude,
        });
    };
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    AgmSnazzyInfoWindow.prototype.openStatus = function () {
        return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
    };
    /**
     * @internal
     */
    AgmSnazzyInfoWindow.prototype.ngOnDestroy = function () {
        if (this._nativeSnazzyInfoWindow) {
            this._nativeSnazzyInfoWindow.destroy();
        }
    };
    AgmSnazzyInfoWindow.ctorParameters = function () { return [
        { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
        { type: GoogleMapsAPIWrapper },
        { type: MarkerManager },
        { type: MapsAPILoader }
    ]; };
    AgmSnazzyInfoWindow.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'agm-snazzy-info-window',
                    template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
                },] }
    ];
    AgmSnazzyInfoWindow.ctorParameters = function () { return [
        { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
        { type: GoogleMapsAPIWrapper },
        { type: MarkerManager },
        { type: MapsAPILoader }
    ]; };
    AgmSnazzyInfoWindow.propDecorators = {
        latitude: [{ type: Input }],
        longitude: [{ type: Input }],
        isOpen: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        placement: [{ type: Input }],
        maxWidth: [{ type: Input }],
        maxHeight: [{ type: Input }],
        backgroundColor: [{ type: Input }],
        padding: [{ type: Input }],
        border: [{ type: Input }],
        borderRadius: [{ type: Input }],
        fontColor: [{ type: Input }],
        fontSize: [{ type: Input }],
        pointer: [{ type: Input }],
        shadow: [{ type: Input }],
        openOnMarkerClick: [{ type: Input }],
        closeOnMapClick: [{ type: Input }],
        wrapperClass: [{ type: Input }],
        closeWhenOthersOpen: [{ type: Input }],
        showCloseButton: [{ type: Input }],
        panOnOpen: [{ type: Input }],
        beforeOpen: [{ type: Output }],
        afterClose: [{ type: Output }],
        _outerWrapper: [{ type: ViewChild, args: ['outerWrapper', { read: ElementRef, static: false },] }],
        _viewContainerRef: [{ type: ViewChild, args: ['viewContainer', { read: ViewContainerRef, static: false },] }],
        _templateRef: [{ type: ContentChild, args: [TemplateRef, { static: false },] }]
    };
    return AgmSnazzyInfoWindow;
}());
export { AgmSnazzyInfoWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25henp5LWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9zbmF6enktaW5mby13aW5kb3cvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NuYXp6eS1pbmZvLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDMUYsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBd0IsUUFBUSxFQUFFLE1BQU0sRUFBaUIsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJek47SUFvSkUsNkJBQzBDLE9BQWtCLEVBQ2xELFFBQThCLEVBQzlCLFFBQXVCLEVBQ3ZCLE9BQXNCO1FBSFUsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFlO1FBQ3ZCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUF0SWhDOztXQUVHO1FBQ00sV0FBTSxHQUFHLEtBQUssQ0FBQztRQUV4Qjs7V0FFRztRQUNPLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFFNUU7O1dBRUc7UUFDTSxjQUFTLEdBQXdDLEtBQUssQ0FBQztRQUVoRTs7V0FFRztRQUNNLGFBQVEsR0FBb0IsR0FBRyxDQUFDO1FBRXpDOztXQUVHO1FBQ00sY0FBUyxHQUFvQixHQUFHLENBQUM7UUE4QzFDOzs7V0FHRztRQUNNLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUVsQzs7O1dBR0c7UUFDTSxvQkFBZSxHQUFHLElBQUksQ0FBQztRQVFoQzs7V0FFRztRQUNNLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUVyQzs7V0FFRztRQUNNLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWhDOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7V0FFRztRQUNPLGVBQVUsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVwRTs7V0FFRztRQUNPLGVBQVUsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQWtCMUQsaUNBQTRCLEdBQXdCLElBQUksQ0FBQztJQU9oRSxDQUFDO0lBRUo7O09BRUc7SUFDSCx5Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxJQUFJLENBQUMsdUJBQXVCLElBQUksSUFBSSxFQUFFO1lBQ3hDLE9BQU87U0FDUjtRQUNELElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjthQUFNLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sSUFBSSxXQUFXLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDN0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNkNBQWUsR0FBZjtRQUFBLGlCQXNEQztRQXJEQyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckYsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2FBQ3BELElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQTdCLENBQTZCLENBQUM7YUFDekMsSUFBSSxDQUFDLFVBQUMsTUFBVyxJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQXRELENBQXNELENBQUM7YUFDN0UsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUNWLElBQU0sT0FBTyxHQUFRO2dCQUNuQixHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsS0FBSSxDQUFDLFNBQVM7Z0JBQ3pCLFFBQVEsRUFBRSxLQUFJLENBQUMsUUFBUTtnQkFDdkIsU0FBUyxFQUFFLEtBQUksQ0FBQyxTQUFTO2dCQUN6QixlQUFlLEVBQUUsS0FBSSxDQUFDLGVBQWU7Z0JBQ3JDLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztnQkFDckIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO2dCQUNuQixZQUFZLEVBQUUsS0FBSSxDQUFDLFlBQVk7Z0JBQy9CLFNBQVMsRUFBRSxLQUFJLENBQUMsU0FBUztnQkFDekIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO2dCQUNyQixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU07Z0JBQ25CLGVBQWUsRUFBRSxLQUFJLENBQUMsZUFBZTtnQkFDckMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLGlCQUFpQjtnQkFDekMsbUJBQW1CLEVBQUUsS0FBSSxDQUFDLG1CQUFtQjtnQkFDN0MsZUFBZSxFQUFFLEtBQUksQ0FBQyxlQUFlO2dCQUNyQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFNBQVM7Z0JBQ3pCLFlBQVksRUFBRSxLQUFJLENBQUMsWUFBWTtnQkFDL0IsU0FBUyxFQUFFO29CQUNULFVBQVUsRUFBRTt3QkFDVixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDMUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsVUFBVSxFQUFFO3dCQUNWLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3ZCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO2lCQUNGO2FBQ0YsQ0FBQztZQUNGLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDcEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLFFBQVEsR0FBRztvQkFDakIsR0FBRyxFQUFFLEtBQUksQ0FBQyxRQUFRO29CQUNsQixHQUFHLEVBQUUsS0FBSSxDQUFDLFNBQVM7aUJBQ3BCLENBQUM7YUFDSDtZQUNELEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSSxLQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLDZDQUFlLEdBQXpCO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyw4Q0FBZ0IsR0FBMUI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUM7WUFDckMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLGdEQUFrQixHQUE1QjtRQUNFLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkMsT0FBTztTQUNSO1FBQ0QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUUsMkNBQTJDO1FBQzNDLFVBQVUsQ0FBQztZQUNULEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyw2Q0FBZSxHQUF6QjtRQUNFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7WUFDdkMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3Q0FBVSxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9FLENBQUM7SUFFRDs7T0FFRztJQUNILHlDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDOztnQkFoSWtELFNBQVMsdUJBQXpELFFBQVEsWUFBSSxJQUFJLFlBQUksUUFBUTtnQkFDWCxvQkFBb0I7Z0JBQ3BCLGFBQWE7Z0JBQ2QsYUFBYTs7O2dCQXhKakMsU0FBUyxTQUFDO29CQUNULDhDQUE4QztvQkFDOUMsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLDhFQUE4RTtpQkFDekY7OztnQkFUUSxTQUFTLHVCQTBKYixRQUFRLFlBQUksSUFBSSxZQUFJLFFBQVE7Z0JBMUpiLG9CQUFvQjtnQkFBaUIsYUFBYTtnQkFBNUIsYUFBYTs7OzJCQWVwRCxLQUFLOzRCQU1MLEtBQUs7eUJBS0wsS0FBSzsrQkFLTCxNQUFNOzRCQUtOLEtBQUs7MkJBS0wsS0FBSzs0QkFLTCxLQUFLO2tDQUtMLEtBQUs7MEJBS0wsS0FBSzt5QkFNTCxLQUFLOytCQUtMLEtBQUs7NEJBS0wsS0FBSzsyQkFLTCxLQUFLOzBCQU9MLEtBQUs7eUJBTUwsS0FBSztvQ0FNTCxLQUFLO2tDQU1MLEtBQUs7K0JBTUwsS0FBSztzQ0FLTCxLQUFLO2tDQUtMLEtBQUs7NEJBS0wsS0FBSzs2QkFLTCxNQUFNOzZCQUtOLE1BQU07Z0NBS04sU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQztvQ0FLM0QsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDOytCQUtsRSxZQUFZLFNBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7SUF1STVDLDBCQUFDO0NBQUEsQUF0UkQsSUFzUkM7U0FqUlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdtTWFya2VyLCBHb29nbGVNYXBzQVBJV3JhcHBlciwgTWFwc0FQSUxvYWRlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFNraXBTZWxmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdhZ20tc25henp5LWluZm8td2luZG93JyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNvdXRlcldyYXBwZXI+PGRpdiAjdmlld0NvbnRhaW5lcj48L2Rpdj48L2Rpdj48bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtU25henp5SW5mb1dpbmRvdyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFRoZSBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHdoZXJlIHRoZSBpbmZvIHdpbmRvdyBpcyBhbmNob3JlZC5cbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXG4gICAqL1xuICBASW5wdXQoKSBsYXRpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9uZ2l0dWRlIHdoZXJlIHRoZSBpbmZvIHdpbmRvdyBpcyBhbmNob3JlZC5cbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXG4gICAqL1xuICBASW5wdXQoKSBsb25naXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgb3BlbiBzdGF0dXMgb2YgdGhlIHNuYXp6eSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIGlzT3BlbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSBvcGVuIHN0YXR1cyBjaGFuZ2VzLlxuICAgKi9cbiAgQE91dHB1dCgpIGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBDaG9vc2Ugd2hlcmUgeW91IHdhbnQgdGhlIGluZm8gd2luZG93IHRvIGJlIGRpc3BsYXllZCwgcmVsYXRpdmUgdG8gdGhlIG1hcmtlci5cbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgPSAndG9wJztcblxuICAvKipcbiAgICogVGhlIG1heCB3aWR0aCBpbiBwaXhlbHMgb2YgdGhlIGluZm8gd2luZG93LlxuICAgKi9cbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlciB8IHN0cmluZyA9IDIwMDtcblxuICAvKipcbiAgICogVGhlIG1heCBoZWlnaHQgaW4gcGl4ZWxzIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIG1heEhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gMjAwO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3IgdG8gdXNlIGZvciB0aGUgYmFja2dyb3VuZCBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogQSBjdXN0b20gcGFkZGluZyBzaXplIGFyb3VuZCB0aGUgY29udGVudCBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBwYWRkaW5nOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGJvcmRlciBhcm91bmQgdGhlIGluZm8gd2luZG93LiBTZXQgdG8gZmFsc2UgdG8gY29tcGxldGVseSByZW1vdmUgdGhlIGJvcmRlci5cbiAgICogVGhlIHVuaXRzIHVzZWQgZm9yIGJvcmRlciBzaG91bGQgYmUgdGhlIHNhbWUgYXMgcG9pbnRlci5cbiAgICovXG4gIEBJbnB1dCgpIGJvcmRlcjoge3dpZHRoOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmd9IHwgYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBjdXN0b20gQ1NTIGJvcmRlciByYWRpdXMgcHJvcGVydHkgdG8gc3BlY2lmeSB0aGUgcm91bmRlZCBjb3JuZXJzIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIGJvcmRlclJhZGl1czogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9udCBjb2xvciB0byB1c2UgZm9yIHRoZSBjb250ZW50IGluc2lkZSB0aGUgYm9keSBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBmb250Q29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSB0byB1c2UgZm9yIHRoZSBjb250ZW50IGluc2lkZSB0aGUgYm9keSBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBmb250U2l6ZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBwb2ludGVyIGZyb20gdGhlIGluZm8gd2luZG93IHRvIHRoZSBtYXJrZXIuXG4gICAqIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgcG9pbnRlci5cbiAgICogVGhlIHVuaXRzIHVzZWQgZm9yIHBvaW50ZXIgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIGJvcmRlci5cbiAgICovXG4gIEBJbnB1dCgpIHBvaW50ZXI6IHN0cmluZyB8IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBDU1MgcHJvcGVydGllcyBmb3IgdGhlIHNoYWRvdyBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgc2hhZG93LlxuICAgKi9cbiAgQElucHV0KCkgc2hhZG93OiBib29sZWFuIHwge2g/OiBzdHJpbmcsIHY/OiBzdHJpbmcsIGJsdXI6IHN0cmluZywgc3ByZWFkOiBzdHJpbmcsIG9wYWNpdHk6IG51bWJlciwgY29sb3I6IHN0cmluZ307XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgb3BlbiB3aGVuIHRoZSBtYXJrZXIgaXMgY2xpY2tlZC5cbiAgICogQW4gaW50ZXJuYWwgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIEdvb2dsZSBNYXBzIGNsaWNrIGV2ZW50IHdoaWNoIGNhbGxzIHRoZSBvcGVuKCkgbWV0aG9kLlxuICAgKi9cbiAgQElucHV0KCkgb3Blbk9uTWFya2VyQ2xpY2sgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIGNsb3NlIHdoZW4gdGhlIG1hcCBpcyBjbGlja2VkLiBBbiBpbnRlcm5hbCBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgR29vZ2xlIE1hcHMgY2xpY2sgZXZlbnQgd2hpY2ggY2FsbHMgdGhlIGNsb3NlKCkgbWV0aG9kLlxuICAgKiBUaGlzIHdpbGwgbm90IGFjdGl2YXRlIG9uIHRoZSBHb29nbGUgTWFwcyBkcmFnIGV2ZW50IHdoZW4gdGhlIHVzZXIgaXMgcGFubmluZyB0aGUgbWFwLlxuICAgKi9cbiAgQElucHV0KCkgY2xvc2VPbk1hcENsaWNrID0gdHJ1ZTtcblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgd3JhcHBlciBjb250YWluZXIgb2YgdGhlIGluZm8gd2luZG93LlxuICAgKiBDYW4gYmUgdXNlZCBmb3IgYXBwbHlpbmcgY3VzdG9tIENTUyB0byB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSB3cmFwcGVyQ2xhc3M6IHN0cmluZztcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBjbG9zZSB3aGVuIGFueSBvdGhlciBTbmF6enkgSW5mbyBXaW5kb3cgaXMgb3BlbmVkLlxuICAgKi9cbiAgQElucHV0KCkgY2xvc2VXaGVuT3RoZXJzT3BlbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIHNob3cgYSBjbG9zZSBidXR0b24uXG4gICAqL1xuICBASW5wdXQoKSBzaG93Q2xvc2VCdXR0b24gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIGJlIHBhbm5lZCBpbnRvIHZpZXcgd2hlbiBvcGVuZWQuXG4gICAqL1xuICBASW5wdXQoKSBwYW5Pbk9wZW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBiZWZvcmUgdGhlIGluZm8gd2luZG93IG9wZW5zLlxuICAgKi9cbiAgQE91dHB1dCgpIGJlZm9yZU9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgYmVmb3JlIHRoZSBpbmZvIHdpbmRvdyBjbG9zZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgYWZ0ZXJDbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ291dGVyV3JhcHBlcicsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSkgX291dGVyV3JhcHBlcjogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBAVmlld0NoaWxkKCd2aWV3Q29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogZmFsc2V9KSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIF90ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwcm90ZWN0ZWQgX25hdGl2ZVNuYXp6eUluZm9XaW5kb3c6IGFueTtcbiAgcHJvdGVjdGVkIF9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQ6IFByb21pc2U8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBfbWFya2VyOiBBZ21NYXJrZXIsXG4gICAgcHJpdmF0ZSBfd3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsXG4gICAgcHJpdmF0ZSBfbWFuYWdlcjogTWFya2VyTWFuYWdlcixcbiAgICBwcml2YXRlIF9sb2FkZXI6IE1hcHNBUElMb2FkZXIsXG4gICkge31cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoJ2lzT3BlbicgaW4gY2hhbmdlcyAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5fb3BlbkluZm9XaW5kb3coKTtcbiAgICB9IGVsc2UgaWYgKCdpc09wZW4nIGluIGNoYW5nZXMgJiYgIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLl9jbG9zZUluZm9XaW5kb3coKTtcbiAgICB9XG4gICAgaWYgKCgnbGF0aXR1ZGUnIGluIGNoYW5nZXMgfHwgJ2xvbmdpdHVkZScgaW4gY2hhbmdlcykgJiYgdGhpcy5fbWFya2VyID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IG0gPSB0aGlzLl9tYW5hZ2VyICE9IG51bGwgPyB0aGlzLl9tYW5hZ2VyLmdldE5hdGl2ZU1hcmtlcih0aGlzLl9tYXJrZXIpIDogbnVsbDtcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQgPSB0aGlzLl9sb2FkZXIubG9hZCgpXG4gICAgICAudGhlbigoKSA9PiByZXF1aXJlKCdzbmF6enktaW5mby13aW5kb3cnKSlcbiAgICAgIC50aGVuKChtb2R1bGU6IGFueSkgPT4gUHJvbWlzZS5hbGwoW21vZHVsZSwgbSwgdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKV0pKVxuICAgICAgLnRoZW4oKGVsZW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHtcbiAgICAgICAgICBtYXA6IGVsZW1zWzJdLFxuICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgbWF4V2lkdGg6IHRoaXMubWF4V2lkdGgsXG4gICAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLm1heEhlaWdodCxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgIHBhZGRpbmc6IHRoaXMucGFkZGluZyxcbiAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXMsXG4gICAgICAgICAgZm9udENvbG9yOiB0aGlzLmZvbnRDb2xvcixcbiAgICAgICAgICBwb2ludGVyOiB0aGlzLnBvaW50ZXIsXG4gICAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvdyxcbiAgICAgICAgICBjbG9zZU9uTWFwQ2xpY2s6IHRoaXMuY2xvc2VPbk1hcENsaWNrLFxuICAgICAgICAgIG9wZW5Pbk1hcmtlckNsaWNrOiB0aGlzLm9wZW5Pbk1hcmtlckNsaWNrLFxuICAgICAgICAgIGNsb3NlV2hlbk90aGVyc09wZW46IHRoaXMuY2xvc2VXaGVuT3RoZXJzT3BlbixcbiAgICAgICAgICBzaG93Q2xvc2VCdXR0b246IHRoaXMuc2hvd0Nsb3NlQnV0dG9uLFxuICAgICAgICAgIHBhbk9uT3BlbjogdGhpcy5wYW5Pbk9wZW4sXG4gICAgICAgICAgd3JhcHBlckNsYXNzOiB0aGlzLndyYXBwZXJDbGFzcyxcbiAgICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgIGJlZm9yZU9wZW46ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlVmlld0NvbnRlbnQoKTtcbiAgICAgICAgICAgICAgdGhpcy5iZWZvcmVPcGVuLmVtaXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZnRlck9wZW46ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLm9wZW5TdGF0dXMoKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWZ0ZXJDbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFmdGVyQ2xvc2UuZW1pdCgpO1xuICAgICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMub3BlblN0YXR1cygpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGVsZW1zWzFdICE9IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zLm1hcmtlciA9IGVsZW1zWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICAgICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdyA9IG5ldyBlbGVtc1swXShvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICB0aGlzLl9vcGVuSW5mb1dpbmRvdygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb3BlbkluZm9XaW5kb3coKSB7XG4gICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fY3JlYXRlVmlld0NvbnRlbnQoKTtcbiAgICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cub3BlbigpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jbG9zZUluZm9XaW5kb3coKSB7XG4gICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVWaWV3Q29udGVudCgpIHtcbiAgICBpZiAodGhpcy5fdmlld0NvbnRhaW5lclJlZi5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZXZyID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGVtcGxhdGVSZWYpO1xuICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cuc2V0Q29udGVudCh0aGlzLl9vdXRlcldyYXBwZXIubmF0aXZlRWxlbWVudCk7XG4gICAgLy8gd2UgaGF2ZSB0byBydW4gdGhpcyBpbiBhIHNlcGFyYXRlIGN5Y2xlLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZXZyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdXBkYXRlUG9zaXRpb24oKSB7XG4gICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5zZXRQb3NpdGlvbih7XG4gICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSBTbmF6enkgSW5mbyBXaW5kb3cgaXMgaW5pdGlhbGl6ZWQgYW5kIG9wZW4uXG4gICAqL1xuICBvcGVuU3RhdHVzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93ICYmIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cuaXNPcGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdykge1xuICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iXX0=