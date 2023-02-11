import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { MarkerManager } from './marker-manager';
var InfoWindowManager = /** @class */ (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude,
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
            disableAutoPan: infoWindow.disableAutoPan,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
        var _this = this;
        return new Observable(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    InfoWindowManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone },
        { type: MarkerManager }
    ]; };
    InfoWindowManager.decorators = [
        { type: Injectable }
    ];
    InfoWindowManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone },
        { type: MarkerManager }
    ]; };
    return InfoWindowManager;
}());
export { InfoWindowManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3ctbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUk1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQ7SUFLRSwyQkFDWSxZQUFrQyxFQUFVLEtBQWEsRUFDekQsY0FBNkI7UUFEN0IsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUN6RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUxqQyxpQkFBWSxHQUNoQixJQUFJLEdBQUcsRUFBc0MsQ0FBQztJQUlOLENBQUM7SUFFN0MsNENBQWdCLEdBQWhCLFVBQWlCLFVBQXlCO1FBQTFDLGlCQVlDO1FBWEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ25CLDhCQUE4QjtZQUM5QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjtRQUNELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQWE7WUFDaEMsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFD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SSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVBOztPQUVHO0lBQ0osaURBQXFCLEdBQXJCLFVBQXlCLFNBQWlCLEVBQUUsVUFBeUI7UUFBckUsaUJBTUM7UUFMQyxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUMsUUFBcUI7WUFDMUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBYTtnQkFDbkQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFJLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7WUFDN0UsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXZFeUIsb0JBQW9CO2dCQUFpQixNQUFNO2dCQUN6QyxhQUFhOzs7Z0JBUDFDLFVBQVU7OztnQkFKRixvQkFBb0I7Z0JBTFIsTUFBTTtnQkFPbEIsYUFBYTs7SUFnRnRCLHdCQUFDO0NBQUEsQUE5RUQsSUE4RUM7U0E3RVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZvLXdpbmRvdyc7XG5cbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHsgSW5mb1dpbmRvdywgSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi9tYXJrZXItbWFuYWdlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZvV2luZG93TWFuYWdlciB7XG4gIHByaXZhdGUgX2luZm9XaW5kb3dzOiBNYXA8QWdtSW5mb1dpbmRvdywgUHJvbWlzZTxJbmZvV2luZG93Pj4gPVxuICAgICAgbmV3IE1hcDxBZ21JbmZvV2luZG93LCBQcm9taXNlPEluZm9XaW5kb3c+PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIF9tYXJrZXJNYW5hZ2VyOiBNYXJrZXJNYW5hZ2VyKSB7fVxuXG4gIGRlbGV0ZUluZm9XaW5kb3coaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlXaW5kb3cgPSB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdyk7XG4gICAgaWYgKGlXaW5kb3cgPT0gbnVsbCkge1xuICAgICAgLy8gaW5mbyB3aW5kb3cgYWxyZWFkeSBkZWxldGVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiBpV2luZG93LnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIGkuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd3MuZGVsZXRlKGluZm9XaW5kb3cpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRQb3NpdGlvbihpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKChpOiBJbmZvV2luZG93KSA9PiBpLnNldFBvc2l0aW9uKHtcbiAgICAgIGxhdDogaW5mb1dpbmRvdy5sYXRpdHVkZSxcbiAgICAgIGxuZzogaW5mb1dpbmRvdy5sb25naXR1ZGUsXG4gICAgfSkpO1xuICB9XG5cbiAgc2V0WkluZGV4KGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpXG4gICAgICAgIC50aGVuKChpOiBJbmZvV2luZG93KSA9PiBpLnNldFpJbmRleChpbmZvV2luZG93LnpJbmRleCkpO1xuICB9XG5cbiAgb3BlbihpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKCh3KSA9PiB7XG4gICAgICBpZiAoaW5mb1dpbmRvdy5ob3N0TWFya2VyICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlck1hbmFnZXIuZ2V0TmF0aXZlTWFya2VyKGluZm9XaW5kb3cuaG9zdE1hcmtlcikudGhlbigobWFya2VyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oKG1hcCkgPT4gdy5vcGVuKG1hcCwgbWFya2VyKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oKG1hcCkgPT4gdy5vcGVuKG1hcCkpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigodykgPT4gdy5jbG9zZSgpKTtcbiAgfVxuXG4gIHNldE9wdGlvbnMoaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdywgb3B0aW9uczogSW5mb1dpbmRvd09wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IGkuc2V0T3B0aW9ucyhvcHRpb25zKSk7XG4gIH1cblxuICBhZGRJbmZvV2luZG93KGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpIHtcbiAgICBjb25zdCBvcHRpb25zOiBJbmZvV2luZG93T3B0aW9ucyA9IHtcbiAgICAgIGNvbnRlbnQ6IGluZm9XaW5kb3cuY29udGVudCxcbiAgICAgIG1heFdpZHRoOiBpbmZvV2luZG93Lm1heFdpZHRoLFxuICAgICAgekluZGV4OiBpbmZvV2luZG93LnpJbmRleCxcbiAgICAgIGRpc2FibGVBdXRvUGFuOiBpbmZvV2luZG93LmRpc2FibGVBdXRvUGFuLFxuICAgIH07XG4gICAgaWYgKHR5cGVvZiBpbmZvV2luZG93LmxhdGl0dWRlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgaW5mb1dpbmRvdy5sb25naXR1ZGUgPT09ICdudW1iZXInKSB7XG4gICAgICBvcHRpb25zLnBvc2l0aW9uID0ge2xhdDogaW5mb1dpbmRvdy5sYXRpdHVkZSwgbG5nOiBpbmZvV2luZG93LmxvbmdpdHVkZX07XG4gICAgfVxuICAgIGNvbnN0IGluZm9XaW5kb3dQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zKTtcbiAgICB0aGlzLl9pbmZvV2luZG93cy5zZXQoaW5mb1dpbmRvdywgaW5mb1dpbmRvd1Byb21pc2UpO1xuICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlcyBhIEdvb2dsZSBNYXBzIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gSW5mb1dpbmRvdyBhcyBhbiBPYnNlcnZhYmxlXG4gICAgKi9cbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKChpOiBJbmZvV2luZG93KSA9PiB7XG4gICAgICAgIGkuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==