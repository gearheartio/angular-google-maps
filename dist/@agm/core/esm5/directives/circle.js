import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { CircleManager } from '../services/managers/circle-manager';
var AgmCircle = /** @class */ (function () {
    function AgmCircle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    AgmCircle.prototype.ngOnInit = function () {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    AgmCircle.prototype.ngOnChanges = function (changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    };
    AgmCircle.prototype._updateCircleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmCircle._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmCircle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragstart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                switch (eventName) {
                    case 'radius_changed':
                        _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                        break;
                    case 'center_changed':
                        _this._manager.getCenter(_this).then(function (center) {
                            return eventEmitter.emit({ lat: center.lat(), lng: center.lng() });
                        });
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    };
    /** @internal */
    AgmCircle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    };
    /**
     * Gets the LatLngBounds of this Circle.
     */
    AgmCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
    AgmCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
    AgmCircle._mapOptions = [
        'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
        'visible', 'zIndex', 'clickable',
    ];
    AgmCircle.ctorParameters = function () { return [
        { type: CircleManager }
    ]; };
    AgmCircle.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-circle',
                },] }
    ];
    AgmCircle.ctorParameters = function () { return [
        { type: CircleManager }
    ]; };
    AgmCircle.propDecorators = {
        latitude: [{ type: Input }],
        longitude: [{ type: Input }],
        clickable: [{ type: Input }],
        draggable: [{ type: Input, args: ['circleDraggable',] }],
        editable: [{ type: Input }],
        fillColor: [{ type: Input }],
        fillOpacity: [{ type: Input }],
        radius: [{ type: Input }],
        strokeColor: [{ type: Input }],
        strokeOpacity: [{ type: Input }],
        strokePosition: [{ type: Input }],
        strokeWeight: [{ type: Input }],
        visible: [{ type: Input }],
        zIndex: [{ type: Input }],
        centerChange: [{ type: Output }],
        circleClick: [{ type: Output }],
        circleDblClick: [{ type: Output }],
        drag: [{ type: Output }],
        dragEnd: [{ type: Output }],
        dragStart: [{ type: Output }],
        mouseDown: [{ type: Output }],
        mouseMove: [{ type: Output }],
        mouseOut: [{ type: Output }],
        mouseOver: [{ type: Output }],
        mouseUp: [{ type: Output }],
        radiusChange: [{ type: Output }],
        rightClick: [{ type: Output }]
    };
    return AgmCircle;
}());
export { AgmCircle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jaXJjbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBS25ILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUVwRTtJQXVKRSxtQkFBb0IsUUFBdUI7UUFBdkIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQXpJM0M7O1dBRUc7UUFDTSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFNUM7OztXQUdHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQVkxQjs7V0FFRztRQUNNLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFZcEI7OztXQUdHO1FBQ00sbUJBQWMsR0FBb0MsUUFBUSxDQUFDO1FBRXBFOztXQUVHO1FBQ00saUJBQVksR0FBRyxDQUFDLENBQUM7UUFFMUI7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBT3hCOztXQUVHO1FBQ08saUJBQVksR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFFeEY7O1dBRUc7UUFDTyxnQkFBVyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRWpGOztXQUVHO1FBQ08sbUJBQWMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVwRjs7V0FFRztRQUNPLFNBQUksR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUxRTs7V0FFRztRQUNPLFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUU3RTs7V0FFRztRQUNPLGNBQVMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUvRTs7V0FFRztRQUNPLGNBQVMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUvRTs7V0FFRztRQUNPLGNBQVMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUvRTs7V0FFRztRQUNPLGFBQVEsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUU5RTs7V0FFRztRQUNPLGNBQVMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUvRTs7V0FFRztRQUNPLFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUU3RTs7V0FFRztRQUNPLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFFMUU7O1dBRUc7UUFDTyxlQUFVLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFeEUsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBTzlCLHdCQUFtQixHQUFtQixFQUFFLENBQUM7SUFFSCxDQUFDO0lBRS9DLGdCQUFnQjtJQUNoQiw0QkFBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLCtCQUFXLEdBQVgsVUFBWSxPQUFzQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUNELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTywrQ0FBMkIsR0FBbkMsVUFBb0MsT0FBMkM7UUFDN0UsSUFBSSxPQUFPLEdBQThCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLFVBQVUsR0FDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUM7UUFDOUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsSUFBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVPLDJDQUF1QixHQUEvQjtRQUFBLGlCQWtDQztRQWpDQyxJQUFJLE1BQU0sR0FBbUMsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDbEYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWSxFQUFFLFNBQVM7WUFDckMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FDekIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBZ0IsU0FBUyxFQUFFLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7Z0JBQ2xGLFFBQVEsU0FBUyxFQUFFO29CQUNqQixLQUFLLGdCQUFnQjt3QkFDbkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO3dCQUMxRSxNQUFNO29CQUNSLEtBQUssZ0JBQWdCO3dCQUNuQixLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsQ0FBQyxJQUFJLENBQzlCLFVBQUMsTUFBTTs0QkFDSCxPQUFBLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQWtCLENBQUM7d0JBQTFFLENBQTBFLENBQUMsQ0FBQzt3QkFDcEYsTUFBTTtvQkFDUjt3QkFDRSxZQUFZLENBQUMsSUFBSSxDQUNiLEVBQUMsTUFBTSxFQUFFLEVBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUMsRUFBZSxDQUFDLENBQUM7aUJBQ25GO1lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtJQUNoQiwrQkFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFTLENBQWUsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUFTLEdBQVQsY0FBcUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsNkJBQVMsR0FBVCxjQUErQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQWpHdkQscUJBQVcsR0FBYTtRQUNyQyxXQUFXLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYztRQUM1RixTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVc7S0FDakMsQ0FBQzs7Z0JBSTRCLGFBQWE7OztnQkF2SjVDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7OztnQkFKUSxhQUFhOzs7MkJBU25CLEtBQUs7NEJBS0wsS0FBSzs0QkFLTCxLQUFLOzRCQU1MLEtBQUssU0FBQyxpQkFBaUI7MkJBTXZCLEtBQUs7NEJBS0wsS0FBSzs4QkFLTCxLQUFLO3lCQUtMLEtBQUs7OEJBS0wsS0FBSztnQ0FLTCxLQUFLO2lDQU1MLEtBQUs7K0JBS0wsS0FBSzswQkFLTCxLQUFLO3lCQUtMLEtBQUs7K0JBS0wsTUFBTTs4QkFLTixNQUFNO2lDQUtOLE1BQU07dUJBS04sTUFBTTswQkFLTixNQUFNOzRCQUtOLE1BQU07NEJBS04sTUFBTTs0QkFLTixNQUFNOzJCQUtOLE1BQU07NEJBS04sTUFBTTswQkFLTixNQUFNOytCQUtOLE1BQU07NkJBS04sTUFBTTs7SUFzR1QsZ0JBQUM7Q0FBQSxBQWxQRCxJQWtQQztTQS9PWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9tYXAtdHlwZXMnO1xuaW1wb3J0IHsgTGF0TG5nLCBMYXRMbmdCb3VuZHMsIExhdExuZ0xpdGVyYWwsIE1vdXNlRXZlbnQgYXMgTWFwTW91c2VFdmVudCB9IGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IENpcmNsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1jaXJjbGUnLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21DaXJjbGUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBsYXRpdHVkZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIChyZXF1aXJlZCkuXG4gICAqL1xuICBASW5wdXQoKSBsYXRpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY2xpY2thYmxlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgKHJlcXVpcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpIGxvbmdpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIENpcmNsZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrYWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIGNpcmNsZSBvdmVyIHRoZSBtYXAuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ2NpcmNsZURyYWdnYWJsZScpIGRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBjaXJjbGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2wgcG9pbnRzIHNob3duIGF0XG4gICAqIHRoZSBjZW50ZXIgYW5kIGFyb3VuZCB0aGUgY2lyY3VtZmVyZW5jZSBvZiB0aGUgY2lyY2xlLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkIG5hbWVkIGNvbG9ycy5cbiAgICovXG4gIEBJbnB1dCgpIGZpbGxDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsbCBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjAuXG4gICAqL1xuICBASW5wdXQoKSBmaWxsT3BhY2l0eTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcmFkaXVzIGluIG1ldGVycyBvbiB0aGUgRWFydGgncyBzdXJmYWNlLlxuICAgKi9cbiAgQElucHV0KCkgcmFkaXVzID0gMDtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIHBvc2l0aW9uLiBEZWZhdWx0cyB0byBDRU5URVIuXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZCBvbiBJbnRlcm5ldCBFeHBsb3JlciA4IGFuZCBlYXJsaWVyLlxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlUG9zaXRpb246ICdDRU5URVInIHwgJ0lOU0lERScgfCAnT1VUU0lERScgPSAnQ0VOVEVSJztcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VXZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgY2lyY2xlIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgekluZGV4IGNvbXBhcmVkIHRvIG90aGVyIHBvbHlzLlxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlJ3MgY2VudGVyIGlzIGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgY2VudGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBjaXJjbGVDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgY2lyY2xlRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgbW91c2VEb3duOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIGNpcmNsZSBtb3VzZW91dC5cbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZU91dDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIGNpcmNsZSBtb3VzZW92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZVVwOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlJ3MgcmFkaXVzIGlzIGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgcmFkaXVzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGNpcmNsZSBpcyByaWdodC1jbGlja2VkIG9uLlxuICAgKi9cbiAgQE91dHB1dCgpIHJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICBwcml2YXRlIF9jaXJjbGVBZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zOiBzdHJpbmdbXSA9IFtcbiAgICAnZmlsbENvbG9yJywgJ2ZpbGxPcGFjaXR5JywgJ3N0cm9rZUNvbG9yJywgJ3N0cm9rZU9wYWNpdHknLCAnc3Ryb2tlUG9zaXRpb24nLCAnc3Ryb2tlV2VpZ2h0JyxcbiAgICAndmlzaWJsZScsICd6SW5kZXgnLCAnY2xpY2thYmxlJyxcbiAgXTtcblxuICBwcml2YXRlIF9ldmVudFN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFuYWdlcjogQ2lyY2xlTWFuYWdlcikge31cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX21hbmFnZXIuYWRkQ2lyY2xlKHRoaXMpO1xuICAgIHRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgaWYgKCF0aGlzLl9jaXJjbGVBZGRlZFRvTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXRDZW50ZXIodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydlZGl0YWJsZSddKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldEVkaXRhYmxlKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZHJhZ2dhYmxlJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0RHJhZ2dhYmxlKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldFZpc2libGUodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydyYWRpdXMnXSkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXRSYWRpdXModGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZUNpcmNsZU9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2lyY2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlczoge1twcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGxldCBvcHRpb25zOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgbGV0IG9wdGlvbktleXMgPVxuICAgICAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoayA9PiBBZ21DaXJjbGUuX21hcE9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTEpO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoaykgPT4geyBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xuICAgIGlmIChvcHRpb25LZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxldCBldmVudHM6IE1hcDxzdHJpbmcsIEV2ZW50RW1pdHRlcjxhbnk+PiA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudEVtaXR0ZXI8YW55Pj4oKTtcbiAgICBldmVudHMuc2V0KCdjZW50ZXJfY2hhbmdlZCcsIHRoaXMuY2VudGVyQ2hhbmdlKTtcbiAgICBldmVudHMuc2V0KCdjbGljaycsIHRoaXMuY2lyY2xlQ2xpY2spO1xuICAgIGV2ZW50cy5zZXQoJ2RibGNsaWNrJywgdGhpcy5jaXJjbGVEYmxDbGljayk7XG4gICAgZXZlbnRzLnNldCgnZHJhZycsIHRoaXMuZHJhZyk7XG4gICAgZXZlbnRzLnNldCgnZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZCk7XG4gICAgZXZlbnRzLnNldCgnZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnQpO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICBldmVudHMuc2V0KCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSk7XG4gICAgZXZlbnRzLnNldCgnbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0KTtcbiAgICBldmVudHMuc2V0KCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3Zlcik7XG4gICAgZXZlbnRzLnNldCgnbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgZXZlbnRzLnNldCgncmFkaXVzX2NoYW5nZWQnLCB0aGlzLnJhZGl1c0NoYW5nZSk7XG4gICAgZXZlbnRzLnNldCgncmlnaHRjbGljaycsIHRoaXMucmlnaHRDbGljayk7XG5cbiAgICBldmVudHMuZm9yRWFjaCgoZXZlbnRFbWl0dGVyLCBldmVudE5hbWUpID0+IHtcbiAgICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgIHRoaXMuX21hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPE1hcE1vdXNlRXZlbnQ+KGV2ZW50TmFtZSwgdGhpcykuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgY2FzZSAncmFkaXVzX2NoYW5nZWQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuZ2V0UmFkaXVzKHRoaXMpLnRoZW4oKHJhZGl1cykgPT4gZXZlbnRFbWl0dGVyLmVtaXQocmFkaXVzKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcl9jaGFuZ2VkJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLmdldENlbnRlcih0aGlzKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAoY2VudGVyKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoe2xhdDogY2VudGVyLmxhdCgpLCBsbmc6IGNlbnRlci5sbmcoKX0gYXMgTGF0TG5nTGl0ZXJhbCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KFxuICAgICAgICAgICAgICAgICAgICB7Y29vcmRzOiB7bGF0OiB2YWx1ZS5sYXRMbmcubGF0KCksIGxuZzogdmFsdWUubGF0TG5nLmxuZygpfX0gYXMgTW91c2VFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzOiBTdWJzY3JpcHRpb24pIHsgcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgIHRoaXMuX21hbmFnZXIucmVtb3ZlQ2lyY2xlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIExhdExuZ0JvdW5kcyBvZiB0aGlzIENpcmNsZS5cbiAgICovXG4gIGdldEJvdW5kcygpOiBQcm9taXNlPExhdExuZ0JvdW5kcz4geyByZXR1cm4gdGhpcy5fbWFuYWdlci5nZXRCb3VuZHModGhpcyk7IH1cblxuICBnZXRDZW50ZXIoKTogUHJvbWlzZTxMYXRMbmc+IHsgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Q2VudGVyKHRoaXMpOyB9XG59XG4iXX0=