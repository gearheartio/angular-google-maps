import { __awaiter, __generator, __read } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolylineManager = /** @class */ (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    PolylineManager._convertPoints = function (line) {
        var path = line._getPoints().map(function (point) {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    };
    PolylineManager._convertPath = function (path) {
        var symbolPath = google.maps.SymbolPath[path];
        if (typeof symbolPath === 'number') {
            return symbolPath;
        }
        else {
            return path;
        }
    };
    PolylineManager._convertIcons = function (line) {
        var icons = line._getIcons().map(function (agmIcon) { return ({
            fixedRotation: agmIcon.fixedRotation,
            offset: agmIcon.offset,
            repeat: agmIcon.repeat,
            icon: {
                anchor: new google.maps.Point(agmIcon.anchorX, agmIcon.anchorY),
                fillColor: agmIcon.fillColor,
                fillOpacity: agmIcon.fillOpacity,
                path: PolylineManager._convertPath(agmIcon.path),
                rotation: agmIcon.rotation,
                scale: agmIcon.scale,
                strokeColor: agmIcon.strokeColor,
                strokeOpacity: agmIcon.strokeOpacity,
                strokeWeight: agmIcon.strokeWeight,
            },
        }); });
        // prune undefineds;
        icons.forEach(function (icon) {
            Object.entries(icon).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], val = _b[1];
                if (typeof val === 'undefined') {
                    delete icon[key];
                }
            });
            if (typeof icon.icon.anchor.x === 'undefined' ||
                typeof icon.icon.anchor.y === 'undefined') {
                delete icon.icon.anchor;
            }
        });
        return icons;
    };
    PolylineManager.prototype.addPolyline = function (line) {
        var _this = this;
        var polylinePromise = this._mapsWrapper.getNativeMap()
            .then(function () { return [PolylineManager._convertPoints(line),
            PolylineManager._convertIcons(line)]; })
            .then(function (_a) {
            var _b = __read(_a, 2), path = _b[0], icons = _b[1];
            return _this._mapsWrapper.createPolyline({
                clickable: line.clickable,
                draggable: line.draggable,
                editable: line.editable,
                geodesic: line.geodesic,
                strokeColor: line.strokeColor,
                strokeOpacity: line.strokeOpacity,
                strokeWeight: line.strokeWeight,
                visible: line.visible,
                zIndex: line.zIndex,
                path: path,
                icons: icons,
            });
        });
        this._polylines.set(line, polylinePromise);
    };
    PolylineManager.prototype.updatePolylinePoints = function (line) {
        var _this = this;
        var path = PolylineManager._convertPoints(line);
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    PolylineManager.prototype.updateIconSequences = function (line) {
        return __awaiter(this, void 0, void 0, function () {
            var icons, m;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mapsWrapper.getNativeMap()];
                    case 1:
                        _a.sent();
                        icons = PolylineManager._convertIcons(line);
                        m = this._polylines.get(line);
                        if (m == null) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, m.then(function (l) { return _this._zone.run(function () { return l.setOptions({ icons: icons }); }); })];
                }
            });
        });
    };
    PolylineManager.prototype.setPolylineOptions = function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    PolylineManager.prototype.deletePolyline = function (line) {
        var _this = this;
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    PolylineManager.prototype.getMVCPath = function (agmPolyline) {
        return __awaiter(this, void 0, void 0, function () {
            var polyline;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._polylines.get(agmPolyline)];
                    case 1:
                        polyline = _a.sent();
                        return [2 /*return*/, polyline.getPath()];
                }
            });
        });
    };
    PolylineManager.prototype.getPath = function (agmPolyline) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMVCPath(agmPolyline)];
                    case 1: return [2 /*return*/, (_a.sent()).getArray()];
                }
            });
        });
    };
    PolylineManager.prototype.createEventObservable = function (eventName, line) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolylineManager.prototype.createPathEventObservable = function (line) {
        return __awaiter(this, void 0, void 0, function () {
            var mvcPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMVCPath(line)];
                    case 1:
                        mvcPath = _a.sent();
                        return [2 /*return*/, createMVCEventObservable(mvcPath)];
                }
            });
        });
    };
    PolylineManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    PolylineManager.decorators = [
        { type: Injectable }
    ];
    PolylineManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return PolylineManager;
}());
export { PolylineManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLbEU7SUFLRSx5QkFBb0IsWUFBa0MsRUFBVSxLQUFhO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIckUsZUFBVSxHQUNkLElBQUksR0FBRyxFQUFrQyxDQUFDO0lBRWtDLENBQUM7SUFFbEUsOEJBQWMsR0FBN0IsVUFBOEIsSUFBaUI7UUFDN0MsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQXVCO1lBQ3pELE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBa0IsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVjLDRCQUFZLEdBQTNCLFVBQTRCLElBQ0c7UUFDN0IsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDbEMsT0FBTyxVQUFVLENBQUM7U0FDbkI7YUFBSztZQUNKLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRWMsNkJB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S0FDeEQ7SUFFRCwrQ0FBcUIsR0FBckIsVUFBeUIsU0FBaUIsRUFBRSxJQUFpQjtRQUE3RCxpQkFNQztRQUxDLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUFxQjtZQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFXO2dCQUN6QyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLG1EQUF5QixHQUEvQixVQUFnQyxJQUFpQjs7Ozs7NEJBQy9CLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFyQyxPQUFPLEdBQUcsU0FBMkI7d0JBQzNDLHNCQUFPLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFDOzs7O0tBQzFDOztnQkFqSWlDLG9CQUFvQjtnQkFBaUIsTUFBTTs7O2dCQUw5RSxVQUFVOzs7Z0JBTEYsb0JBQW9CO2dCQU5SLE1BQU07O0lBa0ozQixzQkFBQztDQUFBLEFBdklELElBdUlDO1NBdElZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFnbVBvbHlsaW5lLCBQYXRoRXZlbnQgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3BvbHlsaW5lJztcbmltcG9ydCB7IEFnbVBvbHlsaW5lUG9pbnQgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50JztcbmltcG9ydCB7IGNyZWF0ZU1WQ0V2ZW50T2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL3V0aWxzL212Y2FycmF5LXV0aWxzJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHsgSWNvblNlcXVlbmNlLCBMYXRMbmcsIExhdExuZ0xpdGVyYWwsIE1WQ0FycmF5LCBQb2x5bGluZSB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb2x5bGluZU1hbmFnZXIge1xuICBwcml2YXRlIF9wb2x5bGluZXM6IE1hcDxBZ21Qb2x5bGluZSwgUHJvbWlzZTxQb2x5bGluZT4+ID1cbiAgICAgIG5ldyBNYXA8QWdtUG9seWxpbmUsIFByb21pc2U8UG9seWxpbmU+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7fVxuXG4gIHByaXZhdGUgc3RhdGljIF9jb252ZXJ0UG9pbnRzKGxpbmU6IEFnbVBvbHlsaW5lKTogQXJyYXk8TGF0TG5nTGl0ZXJhbD4ge1xuICAgIGNvbnN0IHBhdGggPSBsaW5lLl9nZXRQb2ludHMoKS5tYXAoKHBvaW50OiBBZ21Qb2x5bGluZVBvaW50KSA9PiB7XG4gICAgICByZXR1cm4ge2xhdDogcG9pbnQubGF0aXR1ZGUsIGxuZzogcG9pbnQubG9uZ2l0dWRlfSBhcyBMYXRMbmdMaXRlcmFsO1xuICAgIH0pO1xuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2NvbnZlcnRQYXRoKHBhdGg6ICdDSVJDTEUnIHwgJ0JBQ0tXQVJEX0NMT1NFRF9BUlJPVycgfCAnQkFDS1dBUkRfT1BFTl9BUlJPVycgfCAnRk9SV0FSRF9DTE9TRURfQVJST1cnIHxcbiAgJ0ZPUldBUkRfQ0xPU0VEX0FSUk9XJyB8IHN0cmluZyk6IG51bWJlciB8IHN0cmluZ3tcbiAgICBjb25zdCBzeW1ib2xQYXRoID0gZ29vZ2xlLm1hcHMuU3ltYm9sUGF0aFtwYXRoXTtcbiAgICBpZiAodHlwZW9mIHN5bWJvbFBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gc3ltYm9sUGF0aDtcbiAgICB9IGVsc2V7XG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfY29udmVydEljb25zKGxpbmU6IEFnbVBvbHlsaW5lKTogQXJyYXk8SWNvblNlcXVlbmNlPiB7XG4gICAgY29uc3QgaWNvbnMgPSBsaW5lLl9nZXRJY29ucygpLm1hcChhZ21JY29uID0+ICh7XG4gICAgICBmaXhlZFJvdGF0aW9uOiBhZ21JY29uLmZpeGVkUm90YXRpb24sXG4gICAgICBvZmZzZXQ6IGFnbUljb24ub2Zmc2V0LFxuICAgICAgcmVwZWF0OiBhZ21JY29uLnJlcGVhdCxcbiAgICAgIGljb246IHtcbiAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoYWdtSWNvbi5hbmNob3JYLCBhZ21JY29uLmFuY2hvclkpLFxuICAgICAgICBmaWxsQ29sb3I6IGFnbUljb24uZmlsbENvbG9yLFxuICAgICAgICBmaWxsT3BhY2l0eTogYWdtSWNvbi5maWxsT3BhY2l0eSxcbiAgICAgICAgcGF0aDogUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0UGF0aChhZ21JY29uLnBhdGgpLFxuICAgICAgICByb3RhdGlvbjogYWdtSWNvbi5yb3RhdGlvbixcbiAgICAgICAgc2NhbGU6IGFnbUljb24uc2NhbGUsXG4gICAgICAgIHN0cm9rZUNvbG9yOiBhZ21JY29uLnN0cm9rZUNvbG9yLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiBhZ21JY29uLnN0cm9rZU9wYWNpdHksXG4gICAgICAgIHN0cm9rZVdlaWdodDogYWdtSWNvbi5zdHJva2VXZWlnaHQsXG4gICAgICB9LFxuICAgIH0gYXMgSWNvblNlcXVlbmNlKSk7XG4gICAgLy8gcHJ1bmUgdW5kZWZpbmVkcztcbiAgICBpY29ucy5mb3JFYWNoKGljb24gPT4ge1xuICAgICAgT2JqZWN0LmVudHJpZXMoaWNvbikuZm9yRWFjaCgoW2tleSwgdmFsXSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBkZWxldGUgKGljb24gYXMgYW55KVtrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgaWNvbi5pY29uLmFuY2hvci54ID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICB0eXBlb2YgaWNvbi5pY29uLmFuY2hvci55ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGRlbGV0ZSBpY29uLmljb24uYW5jaG9yO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGljb25zO1xuICB9XG5cbiAgYWRkUG9seWxpbmUobGluZTogQWdtUG9seWxpbmUpIHtcbiAgICBjb25zdCBwb2x5bGluZVByb21pc2UgPSB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKVxuICAgIC50aGVuKCgpID0+IFsgUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0UG9pbnRzKGxpbmUpLFxuICAgICAgICAgICAgICAgICAgUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0SWNvbnMobGluZSldKVxuICAgIC50aGVuKChbcGF0aCwgaWNvbnNdOiBbTGF0TG5nTGl0ZXJhbFtdLCBJY29uU2VxdWVuY2VbXV0pID0+XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVQb2x5bGluZSh7XG4gICAgICAgIGNsaWNrYWJsZTogbGluZS5jbGlja2FibGUsXG4gICAgICAgIGRyYWdnYWJsZTogbGluZS5kcmFnZ2FibGUsXG4gICAgICAgIGVkaXRhYmxlOiBsaW5lLmVkaXRhYmxlLFxuICAgICAgICBnZW9kZXNpYzogbGluZS5nZW9kZXNpYyxcbiAgICAgICAgc3Ryb2tlQ29sb3I6IGxpbmUuc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IGxpbmUuc3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiBsaW5lLnN0cm9rZVdlaWdodCxcbiAgICAgICAgdmlzaWJsZTogbGluZS52aXNpYmxlLFxuICAgICAgICB6SW5kZXg6IGxpbmUuekluZGV4LFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBpY29uczogaWNvbnMsXG4gICAgfSkpO1xuICAgIHRoaXMuX3BvbHlsaW5lcy5zZXQobGluZSwgcG9seWxpbmVQcm9taXNlKTtcbiAgfVxuXG4gIHVwZGF0ZVBvbHlsaW5lUG9pbnRzKGxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGF0aCA9IFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBvaW50cyhsaW5lKTtcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlsaW5lKSA9PiB7IHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7IGwuc2V0UGF0aChwYXRoKTsgfSk7IH0pO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlSWNvblNlcXVlbmNlcyhsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpO1xuICAgIGNvbnN0IGljb25zID0gUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0SWNvbnMobGluZSk7XG4gICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gbS50aGVuKGwgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gbC5zZXRPcHRpb25zKHtpY29uczogaWNvbnN9KSApICk7XG4gIH1cblxuICBzZXRQb2x5bGluZU9wdGlvbnMobGluZTogQWdtUG9seWxpbmUsIG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0pOlxuICAgICAgUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSkudGhlbigobDogUG9seWxpbmUpID0+IHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgfVxuXG4gIGRlbGV0ZVBvbHlsaW5lKGxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5bGluZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5kZWxldGUobGluZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0TVZDUGF0aChhZ21Qb2x5bGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPE1WQ0FycmF5PExhdExuZz4+IHtcbiAgICBjb25zdCBwb2x5bGluZSA9IGF3YWl0IHRoaXMuX3BvbHlsaW5lcy5nZXQoYWdtUG9seWxpbmUpO1xuICAgIHJldHVybiBwb2x5bGluZS5nZXRQYXRoKCk7XG4gIH1cblxuICBhc3luYyBnZXRQYXRoKGFnbVBvbHlsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8QXJyYXk8TGF0TG5nPj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRNVkNQYXRoKGFnbVBvbHlsaW5lKSkuZ2V0QXJyYXkoKTtcbiAgfVxuXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgbGluZTogQWdtUG9seWxpbmUpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKS50aGVuKChsOiBQb2x5bGluZSkgPT4ge1xuICAgICAgICBsLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUGF0aEV2ZW50T2JzZXJ2YWJsZShsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8T2JzZXJ2YWJsZTxQYXRoRXZlbnQ+PiB7XG4gICAgY29uc3QgbXZjUGF0aCA9IGF3YWl0IHRoaXMuZ2V0TVZDUGF0aChsaW5lKTtcbiAgICByZXR1cm4gY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlKG12Y1BhdGgpO1xuICB9XG59XG4iXX0=