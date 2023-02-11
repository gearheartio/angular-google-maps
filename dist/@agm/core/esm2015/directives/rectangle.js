import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { RectangleManager } from '../services/managers/rectangle-manager';
export class AgmRectangle {
    constructor(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Rectangle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this rectangle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this rectangle by dragging the control points shown at
         * the center and around the circumference of the rectangle. Defaults to false.
         */
        this.editable = false;
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
         * Whether this rectangle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the rectangle's is changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the rectangle.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the rectangle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the rectangle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the rectangle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the rectangle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on rectangle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on rectangle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the rectangle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the rectangle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._rectangleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    ngOnInit() {
        this._manager.addRectangle(this);
        this._rectangleAddedToManager = true;
        this._registerEventListeners();
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._rectangleAddedToManager) {
            return;
        }
        if (changes['north'] ||
            changes['east'] ||
            changes['south'] ||
            changes['west']) {
            this._manager.setBounds(this);
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
        this._updateRectangleOptionsChanges(changes);
    }
    _updateRectangleOptionsChanges(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => AgmRectangle._mapOptions.indexOf(k) !== -1);
        optionKeys.forEach(k => {
            options[k] = changes[k].currentValue;
        });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _registerEventListeners() {
        let events = new Map();
        events.set('bounds_changed', this.boundsChange);
        events.set('click', this.rectangleClick);
        events.set('dblclick', this.rectangleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('rightclick', this.rightClick);
        events.forEach((eventEmitter, eventName) => {
            this._eventSubscriptions.push(this._manager
                .createEventObservable(eventName, this)
                .subscribe(value => {
                switch (eventName) {
                    case 'bounds_changed':
                        this._manager.getBounds(this).then(bounds => eventEmitter.emit({
                            north: bounds.getNorthEast().lat(),
                            east: bounds.getNorthEast().lng(),
                            south: bounds.getSouthWest().lat(),
                            west: bounds.getSouthWest().lng(),
                        }));
                        break;
                    default:
                        eventEmitter.emit({
                            coords: { lat: value.latLng.lat(), lng: value.latLng.lng() },
                        });
                }
            }));
        });
    }
    /** @internal */
    ngOnDestroy() {
        this._eventSubscriptions.forEach(function (s) {
            s.unsubscribe();
        });
        this._eventSubscriptions = null;
        this._manager.removeRectangle(this);
    }
    /**
     * Gets the LatLngBounds of this Rectangle.
     */
    getBounds() {
        return this._manager.getBounds(this);
    }
}
AgmRectangle._mapOptions = [
    'fillColor',
    'fillOpacity',
    'strokeColor',
    'strokeOpacity',
    'strokePosition',
    'strokeWeight',
    'visible',
    'zIndex',
    'clickable',
];
AgmRectangle.ctorParameters = () => [
    { type: RectangleManager }
];
AgmRectangle.decorators = [
    { type: Directive, args: [{
                selector: 'agm-rectangle',
            },] }
];
AgmRectangle.ctorParameters = () => [
    { type: RectangleManager }
];
AgmRectangle.propDecorators = {
    north: [{ type: Input }],
    east: [{ type: Input }],
    south: [{ type: Input }],
    west: [{ type: Input }],
    clickable: [{ type: Input }],
    draggable: [{ type: Input, args: ['rectangleDraggable',] }],
    editable: [{ type: Input }],
    fillColor: [{ type: Input }],
    fillOpacity: [{ type: Input }],
    strokeColor: [{ type: Input }],
    strokeOpacity: [{ type: Input }],
    strokePosition: [{ type: Input }],
    strokeWeight: [{ type: Input }],
    visible: [{ type: Input }],
    zIndex: [{ type: Input }],
    boundsChange: [{ type: Output }],
    rectangleClick: [{ type: Output }],
    rectangleDblClick: [{ type: Output }],
    drag: [{ type: Output }],
    dragEnd: [{ type: Output }],
    dragStart: [{ type: Output }],
    mouseDown: [{ type: Output }],
    mouseMove: [{ type: Output }],
    mouseOut: [{ type: Output }],
    mouseOver: [{ type: Output }],
    mouseUp: [{ type: Output }],
    rightClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZWN0YW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQVF2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUsxRSxNQUFNLE9BQU8sWUFBWTtJQXFLdkIsWUFBb0IsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFoSjlDOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7V0FFRztRQUNILDJDQUEyQztRQUNkLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFL0M7OztXQUdHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQXNCMUI7OztXQUdHO1FBQ00sbUJBQWMsR0FBb0MsUUFBUSxDQUFDO1FBRXBFOztXQUVHO1FBQ00saUJBQVksR0FBRyxDQUFDLENBQUM7UUFFMUI7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBT3hCOztXQUVHO1FBRUgsaUJBQVksR0FBc0MsSUFBSSxZQUFZLEVBRS9ELENBQUM7UUFFSjs7V0FFRztRQUVILG1CQUFjLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFMUU7O1dBRUc7UUFFSCxzQkFBaUIsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUU3RTs7V0FFRztRQUNPLFNBQUksR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUxRTs7V0FFRztRQUNPLFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUU3RTs7V0FFRztRQUVILGNBQVMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVyRTs7V0FFRztRQUVILGNBQVMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVyRTs7V0FF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S0wsS0FBSzttQkFLTCxLQUFLO3dCQUtMLEtBQUs7d0JBTUwsS0FBSyxTQUFDLG9CQUFvQjt1QkFNMUIsS0FBSzt3QkFLTCxLQUFLOzBCQUtMLEtBQUs7MEJBS0wsS0FBSzs0QkFLTCxLQUFLOzZCQU1MLEtBQUs7MkJBS0wsS0FBSztzQkFLTCxLQUFLO3FCQUtMLEtBQUs7MkJBS0wsTUFBTTs2QkFRTixNQUFNO2dDQU1OLE1BQU07bUJBTU4sTUFBTTtzQkFLTixNQUFNO3dCQUtOLE1BQU07d0JBTU4sTUFBTTt3QkFNTixNQUFNO3VCQU1OLE1BQU07d0JBS04sTUFBTTtzQkFNTixNQUFNO3lCQUtOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL21hcC10eXBlcyc7XG5pbXBvcnQge1xuICBMYXRMbmdCb3VuZHMsXG4gIExhdExuZ0JvdW5kc0xpdGVyYWwsXG4gIE1vdXNlRXZlbnQgYXMgTWFwTW91c2VFdmVudCxcbn0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgUmVjdGFuZ2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3JlY3RhbmdsZS1tYW5hZ2VyJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLXJlY3RhbmdsZScsXG59KVxuZXhwb3J0IGNsYXNzIEFnbVJlY3RhbmdsZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIG5vcnRoIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGUgKHJlcXVpcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpIG5vcnRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBlYXN0IHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGUgKHJlcXVpcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpIGVhc3Q6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNvdXRoIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGUgKHJlcXVpcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpIHNvdXRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZXN0IHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGUgKHJlcXVpcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpIHdlc3Q6IG51bWJlcjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBSZWN0YW5nbGUgaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyByZWN0YW5nbGUgb3ZlciB0aGUgbWFwLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdyZWN0YW5nbGVEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgcmVjdGFuZ2xlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sIHBvaW50cyBzaG93biBhdFxuICAgKiB0aGUgY2VudGVyIGFuZCBhcm91bmQgdGhlIGNpcmN1bWZlcmVuY2Ugb2YgdGhlIHJlY3RhbmdsZS4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsbCBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXG4gICAqL1xuICBASW5wdXQoKSBmaWxsQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZpbGwgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wLlxuICAgKi9cbiAgQElucHV0KCkgZmlsbE9wYWNpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIHBvc2l0aW9uLiBEZWZhdWx0cyB0byBDRU5URVIuXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZCBvbiBJbnRlcm5ldCBFeHBsb3JlciA4IGFuZCBlYXJsaWVyLlxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlUG9zaXRpb246ICdDRU5URVInIHwgJ0lOU0lERScgfCAnT1VUU0lERScgPSAnQ0VOVEVSJztcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VXZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgcmVjdGFuZ2xlIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgekluZGV4IGNvbXBhcmVkIHRvIG90aGVyIHBvbHlzLlxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgcmVjdGFuZ2xlJ3MgaXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBib3VuZHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMYXRMbmdCb3VuZHNMaXRlcmFsPiA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTGF0TG5nQm91bmRzTGl0ZXJhbFxuICA+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWN0YW5nbGVDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSByZWN0YW5nbGUuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcmVjdGFuZ2xlRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSByZWN0YW5nbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSByZWN0YW5nbGUuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgbW91c2VEb3duOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgcmVjdGFuZ2xlLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIG1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIHJlY3RhbmdsZSBtb3VzZW91dC5cbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZU91dDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIHJlY3RhbmdsZSBtb3VzZW92ZXIuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgbW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZVVwOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgcmVjdGFuZ2xlIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcmlnaHRDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIHByaXZhdGUgX3JlY3RhbmdsZUFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX21hcE9wdGlvbnM6IHN0cmluZ1tdID0gW1xuICAgICdmaWxsQ29sb3InLFxuICAgICdmaWxsT3BhY2l0eScsXG4gICAgJ3N0cm9rZUNvbG9yJyxcbiAgICAnc3Ryb2tlT3BhY2l0eScsXG4gICAgJ3N0cm9rZVBvc2l0aW9uJyxcbiAgICAnc3Ryb2tlV2VpZ2h0JyxcbiAgICAndmlzaWJsZScsXG4gICAgJ3pJbmRleCcsXG4gICAgJ2NsaWNrYWJsZScsXG4gIF07XG5cbiAgcHJpdmF0ZSBfZXZlbnRTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hbmFnZXI6IFJlY3RhbmdsZU1hbmFnZXIpIHt9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9tYW5hZ2VyLmFkZFJlY3RhbmdsZSh0aGlzKTtcbiAgICB0aGlzLl9yZWN0YW5nbGVBZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKCF0aGlzLl9yZWN0YW5nbGVBZGRlZFRvTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydub3J0aCddIHx8XG4gICAgICBjaGFuZ2VzWydlYXN0J10gfHxcbiAgICAgIGNoYW5nZXNbJ3NvdXRoJ10gfHxcbiAgICAgIGNoYW5nZXNbJ3dlc3QnXVxuICAgICkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXRCb3VuZHModGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydlZGl0YWJsZSddKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldEVkaXRhYmxlKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZHJhZ2dhYmxlJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0RHJhZ2dhYmxlKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldFZpc2libGUodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZVJlY3RhbmdsZU9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmVjdGFuZ2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlczoge1xuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlO1xuICB9KSB7XG4gICAgbGV0IG9wdGlvbnM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgIGxldCBvcHRpb25LZXlzID0gT2JqZWN0LmtleXMoY2hhbmdlcykuZmlsdGVyKFxuICAgICAgayA9PiBBZ21SZWN0YW5nbGUuX21hcE9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTEsXG4gICAgKTtcbiAgICBvcHRpb25LZXlzLmZvckVhY2goayA9PiB7XG4gICAgICBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XG4gICAgfSk7XG4gICAgaWYgKG9wdGlvbktleXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IGV2ZW50czogTWFwPHN0cmluZywgRXZlbnRFbWl0dGVyPGFueT4+ID0gbmV3IE1hcDxcbiAgICAgIHN0cmluZyxcbiAgICAgIEV2ZW50RW1pdHRlcjxhbnk+XG4gICAgPigpO1xuICAgIGV2ZW50cy5zZXQoJ2JvdW5kc19jaGFuZ2VkJywgdGhpcy5ib3VuZHNDaGFuZ2UpO1xuICAgIGV2ZW50cy5zZXQoJ2NsaWNrJywgdGhpcy5yZWN0YW5nbGVDbGljayk7XG4gICAgZXZlbnRzLnNldCgnZGJsY2xpY2snLCB0aGlzLnJlY3RhbmdsZURibENsaWNrKTtcbiAgICBldmVudHMuc2V0KCdkcmFnJywgdGhpcy5kcmFnKTtcbiAgICBldmVudHMuc2V0KCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kKTtcbiAgICBldmVudHMuc2V0KCdkcmFnU3RhcnQnLCB0aGlzLmRyYWdTdGFydCk7XG4gICAgZXZlbnRzLnNldCgnbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcbiAgICBldmVudHMuc2V0KCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQpO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3ZlcicsIHRoaXMubW91c2VPdmVyKTtcbiAgICBldmVudHMuc2V0KCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgICBldmVudHMuc2V0KCdyaWdodGNsaWNrJywgdGhpcy5yaWdodENsaWNrKTtcblxuICAgIGV2ZW50cy5mb3JFYWNoKChldmVudEVtaXR0ZXIsIGV2ZW50TmFtZSkgPT4ge1xuICAgICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuX21hbmFnZXJcbiAgICAgICAgICAuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPE1hcE1vdXNlRXZlbnQ+KGV2ZW50TmFtZSwgdGhpcylcbiAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2JvdW5kc19jaGFuZ2VkJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLmdldEJvdW5kcyh0aGlzKS50aGVuKGJvdW5kcyA9PlxuICAgICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBub3J0aDogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxuICAgICAgICAgICAgICAgICAgICBlYXN0OiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nKCksXG4gICAgICAgICAgICAgICAgICAgIHNvdXRoOiBib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXG4gICAgICAgICAgICAgICAgICAgIHdlc3Q6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSxcbiAgICAgICAgICAgICAgICAgIH0gYXMgTGF0TG5nQm91bmRzTGl0ZXJhbCksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBldmVudEVtaXR0ZXIuZW1pdCh7XG4gICAgICAgICAgICAgICAgICBjb29yZHM6IHsgbGF0OiB2YWx1ZS5sYXRMbmcubGF0KCksIGxuZzogdmFsdWUubGF0TG5nLmxuZygpIH0sXG4gICAgICAgICAgICAgICAgfSBhcyBNb3VzZUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHM6IFN1YnNjcmlwdGlvbikge1xuICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgdGhpcy5fbWFuYWdlci5yZW1vdmVSZWN0YW5nbGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgTGF0TG5nQm91bmRzIG9mIHRoaXMgUmVjdGFuZ2xlLlxuICAgKi9cbiAgZ2V0Qm91bmRzKCk6IFByb21pc2U8TGF0TG5nQm91bmRzPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpO1xuICB9XG59XG4iXX0=